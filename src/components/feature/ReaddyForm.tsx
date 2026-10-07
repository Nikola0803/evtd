import { useState, type FormEvent } from 'react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: string[];
  maxLength?: number;
}

interface FormResponse {
  code?: string;
  message?: string;
  meta?: { message?: string; detail?: string };
}

interface ReaddyFormProps {
  formId: string;
  formName: string;
  submitAddr: string;
  fields: FormField[];
  submitLabel: string;
  successTitle: string;
  successCopy: string;
  tone?: 'light' | 'dark';
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function ReaddyForm({
  formId,
  formName,
  submitAddr,
  fields,
  submitLabel,
  successTitle,
  successCopy,
  tone = 'light',
}: ReaddyFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState('');

  const isDark = tone === 'dark';
  const labelClass = `block font-label text-[0.72rem] font-semibold uppercase tracking-[0.1em] ${
    isDark ? 'text-secondary-300' : 'text-foreground-600'
  }`;
  const inputClass = `mt-2 w-full rounded-md border px-3.5 py-2.5 text-sm outline-none transition-colors duration-200 ${
    isDark
      ? 'border-background-50/20 bg-background-50/5 text-background-50 placeholder:text-secondary-400 focus:border-primary-400'
      : 'border-foreground-950/12 bg-background-50 text-foreground-950 placeholder:text-foreground-500 focus:border-primary-400'
  }`;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const honeypot = String(formData.get('website_alt') ?? '').trim();
    if (honeypot) {
      setStatus('success');
      return;
    }

    const payload: Record<string, string> = {};
    fields.forEach((field) => {
      const value = formData.get(field.name);
      if (value !== null) {
        const trimmed = String(value).trim();
        if (trimmed) {
          payload[field.name] = trimmed;
        }
      }
    });
    payload.form_name = formName;

    setStatus('submitting');
    setFormError('');

    try {
      const response = await fetch(submitAddr, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(payload).toString(),
      });

      const responseText = await response.text();
      let parsed: FormResponse | null = null;
      try {
        parsed = JSON.parse(responseText) as FormResponse;
      } catch {
        parsed = null;
      }

      const serverMessage =
        parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText || '';
      const isSpam = typeof serverMessage === 'string' && serverMessage.toLowerCase().includes('spam');

      if (response.ok && parsed?.code === 'OK' && !isSpam) {
        setStatus('success');
        form.reset();
      } else {
        setFormError(serverMessage || 'We could not submit your message. Please try again.');
        setStatus('error');
      }
    } catch {
      setFormError('We could not submit your message. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        className={`rounded-2xl border p-7 ${
          isDark ? 'border-background-50/15 bg-background-50/5' : 'border-background-200 bg-background-50'
        }`}
      >
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-full ${
            isDark ? 'bg-primary-500/20 text-secondary-200' : 'bg-secondary-100 text-secondary-900'
          }`}
        >
          <i className="ri-check-line text-xl leading-none" aria-hidden="true"></i>
        </span>
        <h3 className={`mt-5 font-heading text-xl ${isDark ? 'text-background-50' : 'text-foreground-950'}`}>
          {successTitle}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-secondary-300' : 'text-foreground-700'}`}>
          {successCopy}
        </p>
      </div>
    );
  }

  return (
    <form
      id={formId}
      data-readdy-form
      onSubmit={handleSubmit}
      noValidate
      className={`rounded-2xl border p-6 md:p-7 ${
        isDark ? 'border-background-50/15 bg-background-50/5' : 'border-background-200 bg-background-100'
      }`}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const isWide = field.type === 'textarea';
          return (
            <div key={field.name} className={isWide ? 'sm:col-span-2' : ''}>
              <label htmlFor={`${formId}-${field.name}`} className={labelClass}>
                {field.label}
                {field.required ? <span className="ml-1 text-primary-600">*</span> : null}
              </label>

              {field.type === 'textarea' ? (
                <textarea
                  id={`${formId}-${field.name}`}
                  name={field.name}
                  rows={5}
                  maxLength={field.maxLength ?? 500}
                  required={field.required}
                  placeholder={field.placeholder}
                  className={`${inputClass} resize-none`}
                ></textarea>
              ) : field.type === 'select' ? (
                <select
                  id={`${formId}-${field.name}`}
                  name={field.name}
                  required={field.required}
                  defaultValue=""
                  className={`${inputClass} appearance-none`}
                >
                  <option value="" disabled>
                    {field.placeholder || 'Please choose'}
                  </option>
                  {(field.options || []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={`${formId}-${field.name}`}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder}
                  autoComplete="off"
                  className={inputClass}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-2">
        <input
          id={`${formId}-website_alt`}
          type="text"
          name="website_alt"
          className="form-honeypot-field"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          readOnly
        />
      </div>

      {status === 'error' ? (
        <p
          role="alert"
          className={`mt-5 rounded-md px-4 py-3 text-[0.82rem] ${
            isDark ? 'bg-background-50/10 text-secondary-200' : 'bg-accent-100 text-accent-950'
          }`}
        >
          {formError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-[0.72rem] leading-relaxed ${isDark ? 'text-secondary-400' : 'text-foreground-500'}`}>
          Please do not include sensitive medical details in this form.
        </p>
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-5 py-2.5 font-label text-sm font-medium text-background-50 transition-colors duration-200 hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:opacity-60 cursor-pointer"
        >
          <span>{status === 'submitting' ? 'Sending…' : submitLabel}</span>
          <i className="ri-arrow-right-line text-base leading-none" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  );
}