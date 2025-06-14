import { useEffect, useState } from 'react'
import { api } from '../utils/api' 
import { Product } from '../interface/produit'
import { Category } from '../interface/category'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api
      .get<Product[]>('/products')
      .then(response => setProducts(response))
      .catch(error => console.error('Erreur lors de la récupération des produits :', error))
    api
      .get<Category[]>('/categories')
      .then(response => setCategories(response))
      .catch(error => console.error('Erreur lors de la récupération des catégories :', error))
  }, [])

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]') as (Product & { quantite: number })[]
    const existingProduct = cart.find(item => item.id_produit === product.id_produit)

    if (existingProduct) {
      existingProduct.quantite += 1
    } else {
      cart.push({ ...product, quantite: 1 })
    }

    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const filteredProducts = products.filter(product => {
    const matchSearch = product.nom_produit.toLowerCase().includes(search.toLowerCase())
    const matchCategory = selectedCategory === 'all' || product.id_categorie === selectedCategory
    return matchSearch && matchCategory
  })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Nos Produits</h2>

        <div className="mt-4 mb-8">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="w-full mt-3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map(cat => (
              <option key={cat.id_categorie} value={cat.id_categorie}>{cat.lib_court}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product, index) => (
            <div key={index} className="group relative px-4 py-6 rounded-md shadow-[0_2px_12px_-3px_rgba(61,63,68,0.3)]">
              <img
                src={product.image_url}
                className="aspect-square w-full rounded-md bg-transparent object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <p className="mt-1 text-sm text-gray-900">{product.nom_produit}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.prix} €</p>
              </div>

              <button
                onClick={() => addToCart(product)}
                className="mt-4 inline-block rounded-md bg-blue-300 px-4 py-2 text-sm font-semibold hover:bg-blue-700"
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
