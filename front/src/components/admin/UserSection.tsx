import React from 'react'
import { TrashIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { User } from '../../interface/user'

interface Props {
  users: User[]
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
  setUserToDelete: (user: User) => void
  setUserToEdit: (user: User) => void
  setShowConfirmEdit: (val: boolean) => void
}

export const UserSection: React.FC<Props> = ({
  users,
  setUserToDelete,
  setUserToEdit,
  setShowConfirmEdit
}) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">Utilisateurs</h2>
      <div className="bg-white shadow rounded-md p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-2 text-left">Nom</th>
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
                    onClick={() => {
                      setUserToEdit(user)
                      setShowConfirmEdit(true)
                    }}
                  >
                    <PencilSquareIcon className="w-5 h-5 text-blue-600" />
                  </button>
                  <button onClick={() => setUserToDelete(user)}>
                    <TrashIcon className="w-5 h-5 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
