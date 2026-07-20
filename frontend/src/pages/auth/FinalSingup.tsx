import React, { useState } from 'react'

import Button from '../../componenets/ui/Button.js'
import Input from '../../componenets/ui/Input.js'
import { AuthReviewSection, AuthReviewRow, AuthTermsModal } from '../../componenets/ui/AuthReview.js'

const ghostBtnClass =
  'rounded-md px-4 py-2.5 text-sm font-medium border-[1.5px] border-border text-text-secondary hover:border-border-secondary hover:text-text-primary transition'

const primaryBtnClass =
  'rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed'

export default function FinalSingup() {
  const [agreed, setAgreed] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  return (
    <div className="w-full max-w-[420px]">
      <h1 className="text-2xl font-semibold text-text-primary mb-1">Review your information</h1>
      <p className="text-sm text-text-secondary mb-6">
        Make sure everything is correct before you create your organization.
      </p>

      <AuthReviewSection title="Owner information">
        <AuthReviewRow label="Full name" />
        <AuthReviewRow label="Email" />
        <AuthReviewRow label="Phone number" />
      </AuthReviewSection>

      <AuthReviewSection title="Organization information">
        <AuthReviewRow label="Organization name" />
        <AuthReviewRow label="Slug" />
        <AuthReviewRow label="Address" />
        <AuthReviewRow label="Company size" />
      </AuthReviewSection>

      <label className="flex items-start gap-2.5 mt-6 mb-6 cursor-pointer select-none">
        <Input
          type="checkbox"
          name="terms"
          checked={agreed}
          onchange={(e) => setAgreed(e.target.checked)}
          className="w-4 h-4 rounded mt-0.5 shrink-0 accent-primary"
        />
        <span className="text-sm text-text-secondary leading-snug">
          I agree to the{' '}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setShowTerms(true)
            }}
            className="text-primary hover:text-primary-hover font-medium"
          >
            Terms of Service and Privacy Policy
          </button>
          .
        </span>
      </label>

      <div className="flex items-center gap-3">
        <Button type="button" disabled={false} text="Previous" className={ghostBtnClass} />
        <Button
          type="button"
          disabled={!agreed}
          text="Create organization"
          className={`flex-1 ${primaryBtnClass}`}
        />
      </div>

      {showTerms && <AuthTermsModal onClose={() => setShowTerms(false)} />}
    </div>
  )
}
