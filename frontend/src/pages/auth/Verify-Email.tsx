import { MailCheck } from 'lucide-react';

import Button from '../../componenets/ui/Button.js';

const primaryBtnClass =
  'w-full rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed';

export default function VerifyEmail() {
  const email = 'user@example.com'; // replace with real email later

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MailCheck size={28} />
      </div>

      <h1 className="text-2xl font-semibold text-text-primary mb-2">
        Verify your email
      </h1>

      <p className="text-sm text-text-secondary mb-1">
        We'll send a verification link to
      </p>
      <p className="text-sm font-medium text-text-primary mb-6 break-all">
        {email}
      </p>

      <Button
        type="button"
        disabled={false}
        text="Send verification email"
        className={primaryBtnClass}
      />

      <button
        type="button"
        className="mt-4 text-sm text-text-secondary hover:text-text-primary transition"
      >
        Back to login
      </button>
    </div>
  );
}