import { useEffect, useState } from 'react';
import {
  useForm,
  useController,
  type Control,
  type UseFormTrigger,
  type UseControllerProps,
} from 'react-hook-form';
import { Pencil, Check, X } from 'lucide-react';

import Button from '../../componenets/ui/Button.js';
import Input from '../../componenets/ui/Input.js';
import {
  AuthReviewSection,
  AuthTermsModal,
} from '../../componenets/ui/AuthReview.js';
import { useOrganizationSlice } from '../../store/OrganizationSlice.js';
import { useAdminSlice } from '../../store/AdminSlice.js';
import { useTermsConditionSlice } from '../../store/TermsConditionSlce.js';
import { useRegister } from '../../hooks/useAuth.js';

import { type RegistrationData } from '../../types/singupTypes.js';

const ghostBtnClass =
  'rounded-md px-4 py-2.5 text-sm font-medium border-[1.5px] border-border text-text-secondary hover:border-border-secondary hover:text-text-primary transition';

const primaryBtnClass =
  'rounded-md py-2.5 text-base font-medium bg-primary text-primary-fg hover:bg-primary-hover active:bg-primary-pressed active:scale-[0.98] transition disabled:opacity-40 disabled:cursor-not-allowed';

const iconBtnClass =
  'p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-black/5 transition';

/* ---------- API error parsing ---------- */

const FORM_FIELDS = [
  'fullName',
  'email',
  'password',
  'confirmPassword',
  'orgName',
  'address',
  'industry',
  'companySize',
] as const;

type FormField = (typeof FORM_FIELDS)[number];

type ParsedApiErrors = {
  fields: Partial<Record<FormField, string>>;
  general: string | null;
};

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null;

const isFormField = (v: string): v is FormField =>
  (FORM_FIELDS as readonly string[]).includes(v);

// Finds the errors array wherever the HTTP client put it
function extractErrorList(error: unknown): unknown[] | undefined {
  if (!isRecord(error)) return undefined;

  const candidates: unknown[] = [
    isRecord(error.response) && isRecord(error.response.data)
      ? error.response.data.errors
      : undefined,
    isRecord(error.data) ? error.data.errors : undefined,
    error.errors,
  ];

  return candidates.find(Array.isArray);
}

function extractServerMessage(error: unknown): string | null {
  if (!isRecord(error)) return null;

  if (
    isRecord(error.response) &&
    isRecord(error.response.data) &&
    typeof error.response.data.message === 'string'
  ) {
    return error.response.data.message;
  }
  return null;
}

/**
 * Expects: errors = [{ orgName: '...', address: '...' }, { email: '...' }]
 * Every step is checked before anything renders:
 *  - errors must be an array
 *  - each item must be an object
 *  - each value must be a non-empty string
 *  - keys matching a form field go on that field, others go to `general`
 */
function parseApiErrors(error: unknown): ParsedApiErrors {
  const result: ParsedApiErrors = { fields: {}, general: null };
  if (!error) return result;

  const list = extractErrorList(error);

  if (list) {
    const unmapped: string[] = [];

    for (const item of list) {
      if (!isRecord(item)) continue;

      for (const [key, message] of Object.entries(item)) {
        if (typeof message !== 'string' || !message.trim()) continue;

        if (isFormField(key)) {
          if (!result.fields[key]) result.fields[key] = message;
        } else {
          unmapped.push(message);
        }
      }
    }

    if (unmapped.length) result.general = unmapped.join('. ');
  }

  if (Object.keys(result.fields).length === 0 && !result.general) {
    result.general =
      extractServerMessage(error) ??
      (error instanceof Error
        ? error.message
        : 'Registration failed. Please try again.');
  }

  return result;
}

/* ---------- Review field ---------- */

type FieldRules = NonNullable<UseControllerProps<RegistrationData>['rules']>;

type ReviewFieldProps = {
  name: keyof RegistrationData;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  rules?: FieldRules;
  control: Control<RegistrationData>;
  trigger: UseFormTrigger<RegistrationData>;
};

function ReviewField({
  name,
  label,
  placeholder = '',
  type = 'text',
  rules = {},
  control,
  trigger,
}: ReviewFieldProps) {
  const { field, fieldState } = useController({ name, control, rules });
  const [isEditing, setIsEditing] = useState(false);
  const [backup, setBackup] = useState<unknown>('');

  const errorMessage = fieldState.error?.message;
  const isServerError = fieldState.error?.type === 'server';

  // API error on this field: open it for editing so the user can fix it
  useEffect(() => {
    if (isServerError) {
      setBackup(field.value);
      setIsEditing(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isServerError, errorMessage]);

  const startEdit = () => {
    setBackup(field.value);
    setIsEditing(true);
  };

  // trigger() re-validates and clears the server error once the value is valid
  const handleSave = async () => {
    const valid = await trigger(name);
    if (valid) setIsEditing(false);
  };

  const handleCancel = () => {
    field.onChange(backup);
    setIsEditing(false);
  };

  const raw = (field.value as string) ?? '';
  const displayValue = type === 'password' ? '•'.repeat(raw.length) : raw;

  if (isEditing) {
    return (
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Input
            type={type}
            label={label}
            placeholder={placeholder}
            {...(errorMessage ? { error: errorMessage } : {})}
            name={field.name}
            value={raw}
            onChange={field.onChange}
            onBlur={field.onBlur}
            autoFocus
          />
        </div>
        <div className="flex items-center gap-1 pb-1">
          <button
            type="button"
            onClick={handleSave}
            aria-label={`Save ${label}`}
            className={iconBtnClass}
          >
            <Check size={18} />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            aria-label={`Cancel editing ${label}`}
            className={iconBtnClass}
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-center justify-between gap-3 rounded-md px-2 py-2 -mx-2 hover:bg-black/3 transition">
      <div className="min-w-0">
        <p className="text-xs text-text-secondary mb-0.5">{label}</p>
        <p className="text-sm text-text-primary truncate">
          {displayValue || <span className="opacity-50">—</span>}
        </p>
        {errorMessage && (
          <p role="alert" className="text-xs text-red-500 mt-0.5">
            {errorMessage}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={startEdit}
        aria-label={`Edit ${label}`}
        className={`${iconBtnClass} opacity-0 group-hover:opacity-100 focus:opacity-100`}
      >
        <Pencil size={16} />
      </button>
    </div>
  );
}

/* ---------- Page ---------- */

export default function FinalSingup() {
  const { mutate, isPending, isError, error } = useRegister();
console.log(error,isError);

  const [showTerms, setShowTerms] = useState(false);

  const checkBoxCondition = useTermsConditionSlice((state) => state.checkBox);
  const setCheckBoxCondition = useTermsConditionSlice(
    (state) => state.setTermsCheckBox,
  );

  const Admin = useAdminSlice((state) => state);
  const Organization = useOrganizationSlice((state) => state);

  const { control, handleSubmit, trigger, getValues, setError } =
    useForm<RegistrationData>({
      defaultValues: {
        fullName: Admin.fullName ?? '',
        email: Admin.email ?? '',
        password: Admin.password ?? '',
        confirmPassword: Admin.confirmPassword ?? '',
        orgName: Organization.orgName ?? '',
        address: Organization.address ?? '',
        industry: Organization.industry ?? '',
        companySize: Organization.companySize ?? '',
        avatar: Admin.avatar ?? null,
        org_avatar: Organization.org_avatar ?? null,
        org_CoverImage: Organization.org_CoverImage ?? null,
      },
    });

  const parsed = isError ? parseApiErrors(error) : null;

  // Push API field errors (email, orgName, address, password...) into the form
  useEffect(() => {
    if (!isError) return;
    const { fields } = parseApiErrors(error);

    (Object.entries(fields) as [FormField, string][]).forEach(
      ([field, message]) => {
        setError(field, { type: 'server', message });
      },
    );
  }, [isError, error, setError]);

  const onSubmit = (formData: RegistrationData) => {
    if (!checkBoxCondition || isPending) return;
    mutate(formData);
  };

  const shared = { control, trigger };

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-semibold text-text-primary mb-1">
        Review your information
      </h1>

      <p className="text-sm text-text-secondary mb-6">
        Make sure everything is correct before you create your organization.
      </p>

      <AuthReviewSection title="Owner information">
        <ReviewField
          {...shared}
          name="fullName"
          label="Full Name"
          placeholder="Enter your full name"
          rules={{ required: 'Full name is required' }}
        />
        <ReviewField
          {...shared}
          name="email"
          type="email"
          label="Admin Email"
          placeholder="Enter admin email"
          rules={{ required: 'Email is required' }}
        />
        <ReviewField
          {...shared}
          name="password"
          type="password"
          label="Password"
          placeholder="Enter password"
          rules={{ required: 'Password is required' }}
        />
        <ReviewField
          {...shared}
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm password"
          rules={{
            required: 'Please confirm your password',
            validate: (value) =>
              value === getValues('password') || 'Passwords do not match',
          }}
        />
      </AuthReviewSection>

      <AuthReviewSection title="Organization information">
        <ReviewField
          {...shared}
          name="orgName"
          label="Organization Name"
          placeholder="Enter organization name"
          rules={{ required: 'Organization name is required' }}
        />
        <ReviewField
          {...shared}
          name="address"
          label="Address"
          placeholder="Enter organization address"
          rules={{ required: 'Address is required' }}
        />
        <ReviewField
          {...shared}
          name="industry"
          label="Industry"
          placeholder="Enter industry"
          rules={{ required: 'Industry is required' }}
        />
        <ReviewField
          {...shared}
          name="companySize"
          label="Company Size"
          placeholder="Enter company size"
          rules={{ required: 'Company size is required' }}
        />
      </AuthReviewSection>

      <label className="flex items-start gap-2.5 mt-6 mb-6 cursor-pointer select-none">
        <Input
          type="checkbox"
          name="terms"
          className="w-4 h-4 rounded mt-0.5 shrink-0 accent-primary"
          checked={!!checkBoxCondition}
          onChange={() => setCheckBoxCondition(!checkBoxCondition)}
        />

        <span className="text-sm text-text-secondary leading-snug">
          I agree to the{' '}
          <button
            type="button"
            onClick={() => setShowTerms(true)}
            className="text-primary hover:text-primary-hover font-medium"
          >
            Terms of Service and Privacy Policy
          </button>
          .
        </span>
      </label>

      {/* Only errors that don't belong to a specific field */}
      {parsed?.general && (
        <p role="alert" className="text-sm text-red-500 mb-4">
          {parsed.general}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button
          type="button"
          disabled={false}
          text="Previous"
          className={ghostBtnClass}
        />

        <Button
          type="submit"
          disabled={!checkBoxCondition || isPending}
          text={isPending ? 'Creating organization...' : 'Create organization'}
          className={`flex-1 ${primaryBtnClass}`}
        />
      </div>

      {showTerms && <AuthTermsModal onClose={() => setShowTerms(false)} />}
    </form>
  );
}