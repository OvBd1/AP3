import React from 'react'

interface Props {
  visible: boolean
  title: string
  label: string
  onCancel: () => void
  onConfirm: () => void
}

export const ConfirmDeleteModal: React.FC<Props> = ({
  visible,
  title,
  label,
  onCancel,
  onConfirm,
}) => {
  if (!visible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <p className="mb-6">Êtes-vous sûr de vouloir supprimer <strong>{label}</strong> ?</p>
        <div className="flex justify-end gap-4">
          <button onClick={onCancel} className="px-4 py-2 text-gray-800 rounded hover:bg-gray-200">
            Annuler
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue text-white rounded hover:bg-red-700">
            Supprimer
          </button>
        </div>
      </div>
    </div>
  )
}
