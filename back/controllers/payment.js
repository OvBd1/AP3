import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIP_KEY)

export async function payment(req, res) {
  const cart = req.body.cart
  const line_items = cart.map(item => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: item.nom_produit,
        description: item.description || '',
      },
      unit_amount: Math.round(Number(item.prix) * 100),
    },
    quantity: item.quantite,
  }))

  line_items.push({
    price_data: {
      currency: 'eur',
      product_data: { name: 'Frais de livraison' },
      unit_amount: 200,
    },
    quantity: 1,
  })

  const subtotal = cart.reduce((sum, item) => sum + Number(item.prix) * (item.quantite), 0)
  const tva = Math.round(subtotal * 0.2 * 100) 
  line_items.push({
    price_data: {
      currency: 'eur',
      product_data: { name: 'TVA (20%)' },
      unit_amount: tva,
    },
    quantity: 1,
  })

  console.log('Line items:', line_items)

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:5173/Home',
    cancel_url: 'http://localhost:5173/Cart',
  })

  res.json({ id: session.id })
}