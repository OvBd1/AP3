import React, { useState, useEffect } from 'react'
import { User } from '../../interface/user'

interface Props {
  visible: boolean
  user: User | null
  onClose: () => void
  onSave: (user: User) => void
}

export const EditUserModal: React.FC<Props> = ({ visible, user, onClose, onSave }) => {
  const [formData, setFormData] = useState<User | null>(user)

  useEffect(() => {
    setFormData(user)
  }, [user])

  if (!visible || !formData) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => prev ? { ...prev, [name]: value } : null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData) {
      onSave(formData)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Modifier l'utilisateur</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {(['nom', 'prenom', 'mail', 'num_tel', 'admin'] as Array<keyof User>).map(field => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={String(formData[field] || '')}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          ))}
          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-800 rounded hover:bg-gray-200">
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
