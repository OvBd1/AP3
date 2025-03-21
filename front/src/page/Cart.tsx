import React, { useEffect, useState } from 'react';

interface Product {
  nom_produit: string;
  description?: string;
  forme: string;
  dosage: string;
  prix: number; // Ensure this is a number
  image_url: string;
  restriction?: string;
  conservation: string;
  id_categorie: number;
  createdAt?: string;
  updatedAt?: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);

  // Load cart data from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Ensure `prix` is a number
    const validatedCart = storedCart.map((product: Product) => ({
      ...product,
      prix: typeof product.prix === 'string' ? parseFloat(product.prix) : product.prix,
    }));
    setCart(validatedCart);
  }, []);

  const groupProducts = (cart: Product[]) => {
    const groupedProducts: { [key: string]: Product } = {};
  
    cart.forEach((product) => {
      if (groupedProducts[product.nom_produit]) {
        // If the product already exists in the groupedProducts, increment the quantity
        groupedProducts[product.nom_produit].quantity += product.quantity || 1;
      } else {
        // If the product does not exist, add it to the groupedProducts with the initial quantity
        groupedProducts[product.nom_produit] = { ...product, quantity: product.quantity || 1 };
      }
    });
  
    return Object.values(groupedProducts);
  };

  // Function to update the quantity of a product in the cart
  const updateQuantity = (index: number, newQuantity: number) => {
    const updatedCart = cart.map((product, i) =>
      i === index ? { ...product, quantity: newQuantity } : product
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Function to remove a product from the cart
  const removeProduct = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Calculate subtotal, shipping, tax, and total
  const groupedCart = groupProducts(cart);
  const subtotal = groupedCart.reduce((sum, product) => sum + (product.prix || 0) * (product.quantity || 1), 0);
  const shipping = 2.0; // Fixed shipping cost
  const tax = subtotal * 0.02; // 2% tax
  const total = subtotal + shipping + tax;

  return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Panier</h2>
      <div className="grid md:grid-cols-3 gap-10 mt-8">
        <div className="md:col-span-2 space-y-4">
          {groupedCart.map((product, index) => {
            const prix = typeof product.prix === 'number' ? product.prix : parseFloat(product.prix);
            return (
              <div key={index} className="flex gap-4 bg-white px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
                <div className="flex gap-4">
                  <div className="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0">
                    <img src={product.image_url} className="w-full h-full object-contain" alt={product.nom_produit} />
                  </div>

                  <div className="flex flex-col gap-4">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900">{product.nom_produit}</h3>
                      <p className="text-sm font-semibold text-slate-500 mt-2">{product.description}</p>
                      <p className="text-sm font-semibold text-slate-500">Form: {product.forme}</p>
                      <p className="text-sm font-semibold text-slate-500">Dosage: {product.dosage}</p>
                      <p className="text-sm font-semibold text-slate-500">Conservation: {product.conservation}</p>
                    </div>

                    <div className="mt-auto flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, Math.max(1, product.quantity - 1))}
                        className="flex items-center justify-center w-5 h-5 bg-slate-400 outline-none rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 124 124">
                          <path d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z" data-original="#000000"></path>
                        </svg>
                      </button>
                      <span className="font-semibold text-sm leading-[18px]">Unité: {product.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(index, product.quantity + 1)}
                        className="flex items-center justify-center w-5 h-5 bg-slate-800 outline-none rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-2 fill-white" viewBox="0 0 42 42">
                          <path d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z" data-original="#000000"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="ml-auto flex flex-col">
                  <div className="flex items-start gap-4 justify-end">
                    <button
                      type="button"
                      onClick={() => removeProduct(index)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" data-original="#000000"></path>
                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" data-original="#000000"></path>
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-900 mt-auto">
                    ${(prix * product.quantity).toFixed(2)}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-md px-4 py-6 h-max shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
          <ul className="text-slate-900 font-medium space-y-4">
            <li className="flex flex-wrap gap-4 text-sm">Subtotal <span className="ml-auto font-semibold">${subtotal.toFixed(2)}</span></li>
            <li className="flex flex-wrap gap-4 text-sm">Shipping <span className="ml-auto font-semibold">${shipping.toFixed(2)}</span></li>
            <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-semibold">${tax.toFixed(2)}</span></li>
            <hr className="border-slate-300" />
            <li className="flex flex-wrap gap-4 text-sm font-semibold">Total <span className="ml-auto">${total.toFixed(2)}</span></li>
          </ul>

          <div className="mt-8 space-y-2">
            <button type="button" className="text-sm px-4 py-2.5 w-full font-semibold tracking-wide bg-transparent hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-md">Buy Now</button>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-4">
            <img src='https://readymadeui.com/images/master.webp' alt="card1" className="w-10 object-contain" />
            <img src='https://readymadeui.com/images/visa.webp' alt="card2" className="w-10 object-contain" />
            <img src='https://readymadeui.com/images/american-express.webp' alt="card3" className="w-10 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;