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
  IconX,
} from '@tabler/icons-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ACCEPTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
]

interface CoverImagePickerProps {
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

export default function CoverImagePicker({
  label = 'Select a cover image',
  disabled = false,
  className = '',
  register,
  error,
  onRemove,
}: CoverImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const inputId = useId()
  const errorId = useId()
  const previewId = useId()

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null)

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(null)

  const [localError, setLocalError] =
    useState<string | null>(null)

  const [isPreviewOpen, setIsPreviewOpen] =
    useState(false)

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

    if (!file) {
      return
    }

    // Validate file type
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setLocalError(
        'Choose a PNG, JPEG, WebP, SVG, or GIF image.'
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
    setIsPreviewOpen(false)

    // Send valid file to React Hook Form
    register?.onChange(event)
  }

  const clearPicture = () => {
    setLocalError(null)
    setSelectedFile(null)
    setIsPreviewOpen(false)

    // Clear native input
    if (inputRef.current) {
      inputRef.current.value = ''
    }

    // Let parent clear React Hook Form value
    onRemove?.()
  }

  const displayError = localError || error

  return (
    <div
      className={`relative w-full max-w-[640px] ${className}`}
    >
      {/* View / Add button */}
      <button
        type="button"
        className="inline-flex min-h-9 w-[140px] items-center justify-center gap-1.5 rounded-md border-2 border-primary px-2 py-1 text-[12px] font-medium leading-tight transition hover:bg-info/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50"
        onClick={
          selectedFile
            ? () => setIsPreviewOpen(true)
            : openFilePicker
        }
        disabled={disabled}
        aria-controls={
          selectedFile ? previewId : undefined
        }
        aria-expanded={
          selectedFile ? isPreviewOpen : undefined
        }
      >
        <IconPhotoPlus
          size={16}
          aria-hidden="true"
        />

        {selectedFile
          ? 'View'
          : 'Add Cover Image'}
      </button>

      {/* Preview modal */}
      {isPreviewOpen && previewUrl && (
        <div
          id={previewId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="relative flex w-full max-w-3xl flex-col gap-4 overflow-hidden rounded-xl bg-bg/90 p-4 shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <img
              src={previewUrl}
              alt="Selected cover image"
              className="max-h-[70vh] w-full rounded-lg object-contain"
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex min-h-9 items-center justify-center rounded-md border border-error px-4 py-1.5 text-[14px] font-medium text-error transition hover:bg-error hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50"
                onClick={clearPicture}
                disabled={disabled}
              >
                Remove image
              </button>
            </div>

            {/* Close */}
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg/90 text-text-primary shadow-md transition hover:bg-error hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setIsPreviewOpen(false)}
              disabled={disabled}
              aria-label="Close cover image preview"
            >
              <IconX
                size={20}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      )}

      {/* File input */}
      <input
        id={inputId}
        type="file"
        name={register?.name}
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
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

      {/* Error */}
      {displayError && (
        <p
          id={errorId}
          role="alert"
          className="mt-1 text-sm text-error"
        >
          {displayError}
        </p>
      )}
    </div>
  )
}