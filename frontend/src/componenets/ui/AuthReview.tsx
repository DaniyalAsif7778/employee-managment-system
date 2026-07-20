import React, { type ReactNode } from 'react'
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react'

import Button from './Button.js'

interface AuthReviewSectionProps {
  title: string
  onEdit?: () => void
  children: ReactNode
}

export function AuthReviewSection({ title, onEdit, children }: AuthReviewSectionProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-text-secondary tracking-wide uppercase">{title}</h4>
        <button
          type="button"
          onClick={onEdit}
          className="text-primary hover:text-primary-hover text-xs font-medium inline-flex items-center gap-1"
        >
          <IconPencil size={12} /> Edit
        </button>
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  )
}

interface AuthReviewRowProps {
  label: string
  value?: string
}

export function AuthReviewRow({ label, value }: AuthReviewRowProps) {
  return (
    <div className="flex items-start gap-2">
      <IconCheck size={14} className="mt-0.5 shrink-0 text-primary" />
      <div className="min-w-0">
        <div className="text-[11px] text-text-disabled">{label}</div>
        <div className="text-sm break-words text-text-primary">
          {value || <span className="text-text-disabled">—</span>}
        </div>
      </div>
    </div>
  )
}

interface AuthTermsModalProps {
  onClose: () => void
}

export function AuthTermsModal({ onClose }: AuthTermsModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-border rounded-xl shadow-lg w-full max-w-md max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="text-base font-semibold text-text-primary">Terms of Service</h3>
          <button type="button" onClick={onClose} className="text-text-disabled">
            <IconX size={18} />
          </button>
        </div>
        <div className="px-5 py-4 overflow-y-auto text-sm text-text-secondary leading-relaxed flex flex-col gap-3">
          <p>
            By creating an organization on Rosterly, you agree to keep your account details accurate
            and to use the platform only for lawful workforce management purposes.
          </p>
          <p>
            Your organization&apos;s data — employee records, attendance, tasks and payroll — belongs
            to you. We store it securely and never share it with third parties without your consent.
          </p>
          <p>
            You&apos;re responsible for how members of your organization use their accounts, including
            keeping login credentials confidential.
          </p>
          <p>
            We may update these terms from time to time. Continued use of Rosterly after an update
            means you accept the revised terms.
          </p>
        </div>
        <div className="px-5 py-4 border-t border-border">
          <Button
            type="button"
            disabled={false}
            text="Close"
            className="w-full rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover"
            onclick={onClose}
          />
        </div>
      </div>
    </div>
  )
}
