import { useEffect, useId, useRef, useState, type ChangeEvent } from 'react'
import { IconPhotoPlus, IconPencil, IconTrash } from '@tabler/icons-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']

interface ProfilePicturePickerProps {
  label?: string
  disabled?: boolean
  className?: string
}

export default function ProfilePicturePicker({
  label = ' ',
  disabled = false,
  className = '',
}: ProfilePicturePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const errorId = useId()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(objectUrl)

    return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const openFilePicker = () => {
    if (!disabled) inputRef.current?.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''

    if (!file) return

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Choose a PNG, JPEG, WebP, or GIF image.')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Choose an image smaller than 5 MB.')
      return
    }

    setError(null)
    setSelectedFile(file)
  }

  const clearPicture = () => {
    setError(null)
    setSelectedFile(null)
  }

  const actionButtonClass =
    'inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg/85   shadow-sm transition hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <div className="group relative h-[120px] w-[120px] overflow-hidden rounded-full border-2 border-primary bg-surface">
        {previewUrl ? (
          <img src={previewUrl} alt="Selected profile picture" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full" aria-hidden="true" />
        )}

        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-bg/55 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          {selectedFile ? (
            <>
              <button
                type="button"
                className={actionButtonClass}
                onClick={openFilePicker}
                disabled={disabled}
                aria-label="Update profile picture"
              >
                <IconPencil size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={actionButtonClass}
                onClick={clearPicture}
                disabled={disabled}
                aria-label="Delete profile picture"
              >
                <IconTrash size={18} aria-hidden="true" />
              </button>
            </>
          ) : (
            <button
              type="button"
              className={actionButtonClass}
              onClick={openFilePicker}
              disabled={disabled}
              aria-label="Select profile picture"
            >
              <IconPhotoPlus size={20} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <span className="text-sm font-medium text-text-secondary">{label}</span>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="sr-only"
        onChange={handleFileChange}
        disabled={disabled}
        aria-label={`${label} file input`}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" className="max-w-[220px] text-center text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}
