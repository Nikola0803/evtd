import { useState, type FormEvent } from 'react';

const FORM_ID = 'evolv-newsletter-signup';
const SUBMIT_ADDR = 'https://readdy.ai/api/form/darpsh95p1p9qir6kid0';
const FORM_NAME = 'EVOLV Today Health Newsletter Signup';

interface FormResponse {
  code?: string;
  message?: string;
  meta?: { message?: string; detail?: string };
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function NewsletterForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const honeypot = String(formData.get('website_alt') ?? '').trim();
    if (honeypot) {
      setStatus('success');
      return;
    }

    const email = String(formData.get('email') ?? '').trim();
    if (!email) {
      return;
    }

    setStatus('submitting');
    setFormError('');

    try {
      const response = await fetch(SUBMIT_ADDR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, form_name: FORM_NAME }).toString(),
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
        setFormError(serverMessage || 'We could not subscribe you. Please try again.');
        setStatus('error');
      }
    } catch {
      setFormError('We could not subscribe you. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div
        role="status"
        className="mt-6 flex items-start gap-3 rounded-md border border-background-50/15 bg-background-50/5 p-4"
      >
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-secondary-200">
          <i className="ri-check-line text-base leading-none" aria-hidden="true"></i>
        </span>
        <p className="text-[0.84rem] leading-relaxed text-secondary-200">
          You are on the list. Occasional, plainly written updates only — we never send medical details over
          email.
        </p>
      </div>
    );
  }

  return (
    <form id={FORM_ID} data-readdy-form onSubmit={handleSubmit} noValidate className="mt-6">
      <label
        htmlFor={`${FORM_ID}-email`}
        className="block font-label text-[0.7rem] font-semibold uppercase tracking-[0.1em] text-secondary-300"
      >
        Health notes from EVOLV Today
      </label>
      <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
        <input
          id={`${FORM_ID}-email`}
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          autoComplete="email"
          className="w-full rounded-md border border-background-50/20 bg-background-50/5 px-3.5 py-2.5 text-sm text-background-50 outline-none transition-colors duration-200 placeholder:text-secondary-400 focus:border-primary-400"
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-500 px-5 py-2.5 font-label text-sm font-medium text-background-50 transition-colors duration-200 hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:opacity-60 cursor-pointer"
        >
          {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>

      <input
        id={`${FORM_ID}-website_alt`}
        type="text"
        name="website_alt"
        className="form-honeypot-field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        readOnly
      />

      {status === 'error' ? (
        <p role="alert" className="mt-3 text-[0.78rem] leading-relaxed text-secondary-200">
          {formError}
        </p>
      ) : null}
    </form>
  );
}