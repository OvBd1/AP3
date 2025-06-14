import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User } from '../interface/user'
import { api } from '../utils/api'

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const connected = localStorage.getItem('token') != null

  const fetchUser = async () => {
    try {
      setLoading(true)
      const data = await api.get<User>('/users/me')
      setUser(data)
      setForm(data)
    } catch (err) {
      setError("Impossible de charger le profil utilisateur.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (connected) fetchUser()
  }, [connected])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return
    try {
      setLoading(true)
      console.log("Saving user profile:", form)
      await api.put<User>(`/users/${form.id_user}`, form)
      await fetchUser()
      setEditMode(false)
      setError(null)
    } catch (err) {
      setError("Erreur lors de la sauvegarde du profil.")
    } finally {
      setLoading(false)
    }
  }

  if (!connected) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Profil</h2>
        <div className="mt-8 text-center">
          <p className="text-red-600">Vous n'êtes pas connecté.</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 text-sm px-4 py-2 font-semibold tracking-wide bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            Se connecter
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return <div className="text-center py-16">Chargement du profil...</div>
  }

  if (error) {
    return <div className="text-center py-16 text-red-600">{error}</div>
  }

  if (!user) return null

  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-2xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Mon profil</h2>
      <div className="bg-white rounded-md shadow-md p-8">
        {/* Affichage des infos du profil */}
        <div className="space-y-4">
          <div>
            <span className="block text-sm font-medium text-gray-700">Nom</span>
            <span className="block text-base text-gray-900 font-semibold">{user.nom}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Prénom</span>
            <span className="block text-base text-gray-900 font-semibold">{user.prenom}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Email</span>
            <span className="block text-base text-gray-900 font-semibold">{user.mail}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Numéro de téléphone</span>
            <span className="block text-base text-gray-900 font-semibold">{user.num_tel}</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Date de naissance</span>
            <span className="block text-base text-gray-900 font-semibold">{
              (() => {
                const d = new Date(user.date_naissance)
                if (isNaN(d.getTime())) return user.date_naissance // fallback si ce n'est pas un timestamp
                return d.toLocaleDateString('fr-FR')
              })()
            }</span>
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700">Admin</span>
            <span className="block text-base text-gray-900 font-semibold">{user.admin ? 'Oui' : 'Non'}</span>
          </div>
        </div>
        <div className="flex gap-4 mt-8">
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold"
          >
            Modifier le profil
          </button>
        </div>
        {/* Formulaire de modification affiché seulement en mode édition */}
        {editMode && form && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Modifier mon profil</h2>
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block font-medium">Nom</label>
                  <input
                    type="text"
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Prénom</label>
                  <input
                    type="text"
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Email</label>
                  <input
                    type="email"
                    name="mail"
                    value={form.mail}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-medium">Numéro de téléphone</label>
                  <input
                    type="text"
                    name="num_tel"
                    value={form.num_tel}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={() => { setEditMode(false); setForm(user) }} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" disabled={loading}>
                    Annuler
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile