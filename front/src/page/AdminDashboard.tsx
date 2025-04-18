import React, { useEffect, useState } from 'react'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { api } from '../utils/api'
import { Product } from '../interface/produit'
import { User } from '../interface/user'

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  useEffect(() => {
    fetchUsers()
    fetchProducts()
  }, [])

  const fetchUsers = async () => {
    api
      .get<User[]>('/users')
      .then(response => setUsers(response))
      .catch(error => console.error('Erreur lors de la récupération des utilisateurs :', error))
  }

  const fetchProducts = async () => {
    api
      .get<Product[]>('/products')
      .then(response => setProducts(response))
      .catch(error => console.error('Erreur lors de la récupération des produits :', error))
  }

  const deleteUser = async (id: number) => {
    api
      .delete<void>(`/users/${id}`)
      .then(() => console.log(`Utilisateur avec l'ID ${id} supprimé avec succès.`))
      .catch(error => console.error(`Erreur lors de la suppression de l'utilisateur ${id} :`, error))
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
    setShowConfirmDelete(true)
  }

  const confirmDelete = async () => {
    if (userToDelete) {
      await deleteUser(userToDelete.id_user)
      setUsers(prev => prev.filter(u => u.id_user !== userToDelete.id_user))
      setShowConfirmDelete(false)
      setUserToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowConfirmDelete(false)
    setUserToDelete(null)
  }

  const editUser = (id: number) => {
    setUsers(prev => prev.filter(user => user.id_user !== id))
  }

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(product => product.id_produit !== id))
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      {/* Users Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="bg-white shadow rounded-md p-4 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Admin</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id_user} className="border-t">
                  <td className="p-2">{user.nom}</td>
                  <td className="p-2">{user.mail}</td>
                  <td className="p-2">{user.admin ? 'true' : 'false'}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => handleDeleteClick(user)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      <TrashIcon aria-hidden="true" className="size-6" />
                    </button>
                    <button
                      onClick={() => editUser(user.id_user)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      <PencilSquareIcon aria-hidden="true" className="size-6" />
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Products Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Products</h2>
        <div className="grid md:grid-cols-1 gap-6">
          {products.map(product => (
            <div
              key={product.id_produit}
              className="bg-white rounded-md shadow p-4 flex gap-4"
            >
              <img
                src={product.image_url}
                alt={product.nom_produit}
                className="w-24 h-24 object-contain"
              />
              <div className="flex-1">
                <h3 className="text-lg font-bold">{product.nom_produit}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <p className="text-sm text-gray-500">Forme: {product.forme} | Dosage: {product.dosage}</p>
                <p className="text-sm text-gray-500">Prix: ${product.prix}</p>
                <button
                  onClick={() => deleteProduct(product.id_produit)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-gray-500">Aucun produit disponible.</p>
          )}
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmDelete && userToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirmer la suppression</h2>
            <p className="mb-6">
              Êtes-vous sûr de vouloir supprimer l'utilisateur{' '}
              <strong>{userToDelete.nom}</strong> ?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-800 rounded hover:bg-gray-300"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-blue text-gray-800 rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
