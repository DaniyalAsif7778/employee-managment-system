import { useEffect, useId, useRef, useState, type ChangeEvent } from 'react'
import { IconPhotoPlus, IconX } from '@tabler/icons-react'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']

interface CoverImagePickerProps {
  label?: string
  disabled?: boolean
  className?: string
}

export default function CoverImagePicker({
  label = 'Select a cover image',
  disabled = false,
  className = '',
}: CoverImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const errorId = useId()
  const previewId = useId()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

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
      setError('Choose a PNG, JPEG, WebP, SVG, or GIF image.')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Choose an image smaller than 5 MB.')
      return
    }

    setError(null)
    setSelectedFile(file)
    setIsPreviewOpen(false)
  }

  return (
    <div className={`relative w-full max-w-[640px] ${className}`}>
      <button
        type="button"
        className="inline-flex min-h-9 w-[140px] items-center justify-center gap-1.5 rounded-md border-2 border-primary px-2 py-1 text-[12px] font-medium leading-tight transition hover:bg-info/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50"
        onClick={selectedFile ? () => setIsPreviewOpen(true) : openFilePicker}
        disabled={disabled}
        aria-controls={selectedFile ? previewId : undefined}
        aria-expanded={selectedFile ? isPreviewOpen : undefined}
      >
        <IconPhotoPlus size={16} aria-hidden="true" />
        {selectedFile ? 'View' : 'add CoverImage'}
      </button>

      {/* FULL SCREEN MODAL PREVIEW */}
      {isPreviewOpen && previewUrl && (
        <div
          id={previewId}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
          onClick={() => setIsPreviewOpen(false)}
        >
          {/* Inner Modal Content Wrapper */}
          <div 
            className="relative w-full max-w-3xl overflow-hidden rounded-xl bg-bg/90 p-4 shadow-2xl flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()} // Prevents closing modal when clicking the picture itself
          >
            <img 
              src={previewUrl} 
              alt="Selected cover image" 
              className="max-h-[70vh] w-full rounded-lg object-contain" 
            />
            
            {/* Clear/Remove Image Action Button at the bottom */}
            <div className="flex justify-end">
              <button
                type="button"
                className="inline-flex min-h-9 items-center justify-center rounded-md border border-error px-4 py-1.5 text-[14px] font-medium text-error transition hover:bg-error hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  setSelectedFile(null)
                  setIsPreviewOpen(false)
                }}
                disabled={disabled}
              >
                Remove image
              </button>
            </div>
            
            <button
              type="button"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-bg/90 text-text-primary shadow-md transition hover:bg-error hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => setIsPreviewOpen(false)}
              disabled={disabled}
              aria-label="Close cover image preview"
            >
              <IconX size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="sr-only"
        onChange={handleFileChange}
        disabled={disabled}
        aria-label={`${label} file input`}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}
