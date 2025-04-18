import { useEffect, useState } from 'react'
import { api } from '../utils/api' 
import { Product } from '../interface/produit'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    api
      .get<Product[]>('/products')
      .then(response => setProducts(response))
      .catch(error => console.error('Erreur lors de la récupération des produits :', error))
  }, [])

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[]
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log('Produit ajouté au panier:', product)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Nos Produits</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) => (
            <div key={index} className="group relative">
              <img
                src={product.image_url}
                className="aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.prix} €</p>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
