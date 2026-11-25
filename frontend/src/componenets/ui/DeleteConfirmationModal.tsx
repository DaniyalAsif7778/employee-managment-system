import { AlertTriangle, X, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface DeleteConfirmationModalProps {
  title: string
  message: string
  itemName: string
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  dangerLevel?: 'medium' | 'high'
}

export default function DeleteConfirmationModal({
  title,
  message,
  itemName,
  onConfirm,
  onCancel,
  confirmText = 'Delete',
  dangerLevel = 'high',
}: DeleteConfirmationModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmationInput, setConfirmationInput] = useState('')

  const handleConfirm = async () => {
    setIsDeleting(true)

    // Simulate API call
    setTimeout(() => {
      onConfirm()
      setIsDeleting(false)
    }, 1000)
  }

  const isConfirmationValid =
    dangerLevel === 'high' ? confirmationInput.toLowerCase() === 'delete' : true

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-[#000000] rounded-2xl border border-[#EF4444]/30 w-full max-w-md shadow-2xl shadow-[#EF4444]/10 animate-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#333333]">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#EF4444]/10 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-[#EF4444]" />
                </div>
                <div>
                  <h2 className="text-[20px] font-semibold text-[#E0E0E0] mb-1">{title}</h2>
                  <p className="text-[14px] text-[#9CA3AF]">{message}</p>
                </div>
              </div>
              <button
                onClick={onCancel}
                className="p-1.5 hover:bg-[#1F1F1F] rounded-lg transition-colors ml-2"
              >
                <X className="w-5 h-5 text-[#9CA3AF]" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Item Name Display */}
            <div className="p-4 bg-[#121212] rounded-lg border border-[#333333]">
              <p className="text-[13px] text-[#6B7280] mb-1">You are about to delete:</p>
              <p className="text-[16px] font-semibold text-[#E0E0E0]">{itemName}</p>
            </div>

            {/* Warning Message */}
            <div className="flex items-start gap-3 p-4 bg-[#EF4444]/5 border border-[#EF4444]/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-[14px] text-[#E0E0E0] font-medium mb-1">
                  Warning: This action cannot be undone
                </p>
                <p className="text-[13px] text-[#9CA3AF]">
                  All data associated with this item will be permanently removed from the system.
                </p>
              </div>
            </div>

            {/* Confirmation Input for High Danger */}
            {dangerLevel === 'high' && (
              <div>
                <label className="block text-[14px] text-[#9CA3AF] mb-2">
                  Type <span className="font-mono text-[#EF4444]">DELETE</span> to confirm
                </label>
                <input
                  type="text"
                  value={confirmationInput}
                  onChange={(e) => setConfirmationInput(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#121212] border border-[#333333] rounded-lg text-[#E0E0E0] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:border-transparent transition-all text-[15px]"
                  placeholder="Type DELETE to confirm"
                  autoFocus
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-[#333333] bg-[#0A0A0A]">
            <button
              onClick={onCancel}
              disabled={isDeleting}
              className="px-5 py-2.5 bg-[#121212] hover:bg-[#1F1F1F] text-[#E0E0E0] rounded-lg transition-all border border-[#333333] text-[15px] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={isDeleting || !isConfirmationValid}
              className="px-5 py-2.5 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg transition-all text-[15px] font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" />
                  {confirmText}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
