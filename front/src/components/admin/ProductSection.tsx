import React from 'react'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Product } from '../../interface/produit'

interface Props {
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
  setProductToDelete: (product: Product) => void
  setProductToEdit: (product: Product) => void
  setShowEditProductModal: (show: boolean) => void
}

export const ProductSection: React.FC<Props> = ({ 
  products, 
  setProductToDelete, 
  setProductToEdit, 
  setShowEditProductModal 
}) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Produits</h2>
      <div className="bg-white shadow rounded-md p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Prix</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id_produit} className="border-t">
                <td className="p-2">{product.nom_produit}</td>
                <td className="p-2">{product.description}</td>
                <td className="p-2">${product.prix}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => { setProductToEdit(product); setShowEditProductModal(true); }}>
                    <PencilSquareIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button onClick={() => setProductToDelete(product)}>
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Aucun produit trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
