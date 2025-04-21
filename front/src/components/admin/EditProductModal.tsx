import React, { useEffect, useState } from 'react'
import { Product } from '../../interface/produit'

interface Props {
  visible: boolean
  product: Product | null
  onClose: () => void
  onSave: (updatedProduct: Product) => Promise<void>
}

export const EditProductModal: React.FC<Props> = ({ visible, product, onClose, onSave }) => {
  const [formState, setFormState] = useState<Product | null>(null)

  useEffect(() => {
    setFormState(product)
  }, [product])

  if (!visible || !formState) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState(prev => prev ? { ...prev, [name]: name === 'prix' || name === 'quantite' || name === 'dosage' ? parseFloat(value) : value } : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formState) {
      await onSave(formState)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Modifier un produit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Nom</label>
            <input
              type="text"
              name="nom_produit"
              value={formState.nom_produit}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Forme</label>
            <select
              name="forme"
              value={formState.forme}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="orale">Orale</option>
              <option value="dermique">Dermique</option>
              <option value="injectable">Injectable</option>
              <option value="médicamenteuse">Médicamenteuse</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Dosage</label>
            <input
              type="number"
              name="dosage"
              value={formState.dosage}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Prix (€)</label>
            <input
              type="number"
              step="0.01"
              name="prix"
              value={formState.prix}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Quantité</label>
            <input
              type="number"
              name="quantite"
              value={formState.quantite}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Annuler
            </button>
            <button type="submit" className="px-4 py-2 bg-blue text-white rounded hover:bg-blue-700">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
