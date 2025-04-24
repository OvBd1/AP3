import React, { useEffect, useState } from 'react'
import { UserSection } from '../components/admin/UserSection'
import { ProductSection } from '../components/admin/ProductSection'
import { EditUserModal } from '../components/admin/EditUserModal'
import { EditProductModal } from '../components/admin/EditProductModal'
import { ConfirmDeleteModal  } from '../components/admin/ConfirmDeleteModal'
import { api } from '../utils/api'
import { Product } from '../interface/produit'
import { User } from '../interface/user'

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)

  const [showConfirmEdit, setShowConfirmEdit] = useState(false)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)

  const [showEditProductModal, setShowEditProductModal] = useState(false)
  const [productToEdit, setProductToEdit] = useState<Product | null>(null)


  useEffect(() => {
    fetchUsers()
    fetchProducts()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await api.get<User[]>('/users')
      setUsers(response)
    } catch (err) {
      console.error("Erreur fetch users :", err)
    }
    
  }

  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>('/products')
      setProducts(response)
    } catch (err) {
      console.error("Erreur fetch products :", err)
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <UserSection
        users={users}
        setUsers={setUsers}
        setUserToDelete={setUserToDelete}
        setUserToEdit={setUserToEdit}
        setShowConfirmEdit={setShowConfirmEdit}
      />

      <ProductSection
        products={products}
        setProducts={setProducts}
        setProductToDelete={setProductToDelete}
        setProductToEdit={setProductToEdit}
        setShowEditProductModal={setShowEditProductModal}
      />

      {/* Modales */}
      <ConfirmDeleteModal
        visible={!!userToDelete}
        title="Supprimer un utilisateur"
        label={userToDelete?.nom || ''}
        onCancel={() => setUserToDelete(null)}
        onConfirm={async () => {
          if (userToDelete) {
            await api.delete(`/users/${userToDelete.id_user}`)
            setUsers(prev => prev.filter(u => u.id_user !== userToDelete.id_user))
            setUserToDelete(null)
          }
        }}
      />

      <ConfirmDeleteModal
        visible={!!productToDelete}
        title="Supprimer un produit"
        label={productToDelete?.nom_produit || ''}
        onCancel={() => setProductToDelete(null)}
        onConfirm={async () => {
          if (productToDelete) {
            await api.delete(`/products/${productToDelete.id_produit}`)
            setProducts(prev => prev.filter(p => p.id_produit !== productToDelete.id_produit))
            setProductToDelete(null)
          }
        }}
      />

      <EditUserModal
        visible={showConfirmEdit}
        user={userToEdit}
        onClose={() => {
          setShowConfirmEdit(false)
          setUserToEdit(null)
        }}
        onSave={async (user) => {
          await api.put(`/users/${user.id_user}`, user)
          fetchUsers()
          setShowConfirmEdit(false)
        }}
      />

      <EditProductModal
        visible={showEditProductModal}
        product={productToEdit}
        onClose={() => {
          setShowEditProductModal(false)
          setProductToEdit(null)
        }}
        onSave={async (product) => {
          console.log(product)
          await api.put(`/products/${product.id_produit}`, product)
          fetchProducts()
          setShowEditProductModal(false)
        }}
      />
    </div>
  )
}

export default AdminDashboard
