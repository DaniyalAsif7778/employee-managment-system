import {
  useEffect,
  useId,
  useRef,
  useState,
  type ChangeEvent,
} from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import {
  IconPhotoPlus,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ACCEPTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
]

interface ProfilePicturePickerProps {
  label?: string
  disabled?: boolean
  className?: string

  // React Hook Form
  register?: UseFormRegisterReturn

  // React Hook Form error
  error?: string | undefined

  // Called when image is removed
  onRemove?: () => void
}

export default function ProfilePicturePicker({
  label = '',
  disabled = false,
  className = '',
  register,
  error,
  onRemove,
}: ProfilePicturePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const errorId = useId()

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [localError, setLocalError] = useState<string | null>(null)

  // Create preview URL
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null)
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)

    setPreviewUrl(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [selectedFile])

  const openFilePicker = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
       console.log('Selected file:', file)
    if (!file) {
      return
    }

    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setLocalError(
        'Choose a PNG, JPEG, WebP, or GIF image.'
      )

      // Clear invalid file
      event.target.value = ''

      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      setLocalError(
        'Choose an image smaller than 5 MB.'
      )

      // Clear invalid file
      event.target.value = ''

      return
    }

    // Valid file
    setLocalError(null)
    setSelectedFile(file)
 

    // Send valid file to React Hook Form
    register?.onChange(event)
  }

  const clearPicture = () => {
    setSelectedFile(null)
    setLocalError(null)

    // Clear native input
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    // Let parent clear React Hook Form value
    onRemove?.()
  }

  const displayError = localError || error

  const actionButtonClass =
    'inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg/85 shadow-sm transition hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <div
      className={`inline-flex flex-col items-center gap-2 ${className}`}
    >
      <div className="group relative h-[120px] w-[120px] overflow-hidden rounded-full border-2 border-primary bg-surface">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Selected profile picture"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="h-full w-full"
            aria-hidden="true"
          />
        )}

        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-bg/55 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          {selectedFile ? (
            <>
              {/* Edit */}
              <button
                type="button"
                className={actionButtonClass}
                onClick={openFilePicker}
                disabled={disabled}
                aria-label="Update profile picture"
              >
                <IconPencil
                  size={18}
                  aria-hidden="true"
                />
              </button>

              {/* Delete */}
              <button
                type="button"
                className={actionButtonClass}
                onClick={clearPicture}
                disabled={disabled}
                aria-label="Delete profile picture"
              >
                <IconTrash
                  size={18}
                  aria-hidden="true"
                />
              </button>
            </>
          ) : (
            /* Add */
            <button
              type="button"
              className={actionButtonClass}
              onClick={openFilePicker}
              disabled={disabled}
              aria-label="Select profile picture"
            >
              <IconPhotoPlus
                size={20}
                aria-hidden="true"
              />
            </button>
          )}
        </div>
      </div>

      {label && (
        <span className="text-sm font-medium text-text-secondary">
          {label}
        </span>
      )}

      <input
        id={inputId}
        type="file"
        name={register?.name}
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="sr-only"
        disabled={disabled}
        aria-label={`${label} file input`}
        aria-invalid={!!displayError}
        aria-describedby={
          displayError ? errorId : undefined
        }
        onBlur={register?.onBlur}
        onChange={handleFileChange}
        ref={(element) => {
          inputRef.current = element
          register?.ref(element)
        }}
      />

      {displayError && (
        <p
          id={errorId}
          role="alert"
          className="max-w-[220px] text-center text-sm text-error"
        >
          {displayError}
        </p>
      )}
    </div>
  )
}