import type { AnswerValue } from '@/hooks/useAssessmentDraft';
import type { Field } from '../steps';

interface FieldInputProps {
  field: Field;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  error?: string;
}

export default function FieldInput({ field, value, onChange, error }: FieldInputProps) {
  const stringValue = typeof value === 'string' ? value : '';
  const arrayValue = Array.isArray(value) ? value : [];

  const baseInput =
    'w-full rounded-md border bg-background-50 px-4 py-3 text-sm text-foreground-950 outline-none transition-colors duration-200 placeholder:text-foreground-500 focus:border-primary-400';
  const borderClass = error ? 'border-accent-600' : 'border-foreground-950/12';

  return (
    <div className={field.wide ? 'sm:col-span-2' : ''}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <label
          htmlFor={`field-${field.name}`}
          className="font-label text-[0.82rem] font-semibold tracking-tight text-foreground-900"
        >
          {field.label}
          {field.required && !field.optional ? <span className="ml-1 text-primary-600">*</span> : null}
          {field.optional ? (
            <span className="ml-2 font-normal text-foreground-500">Optional</span>
          ) : null}
        </label>
      </div>

      {field.type === 'textarea' ? (
        <textarea
          id={`field-${field.name}`}
          name={field.name}
          rows={4}
          maxLength={field.maxLength ?? 500}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `error-${field.name}` : undefined}
          className={`mt-2.5 resize-none ${baseInput} ${borderClass}`}
        ></textarea>
      ) : null}

      {field.type === 'select' ? (
        <select
          id={`field-${field.name}`}
          name={field.name}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          className={`mt-2.5 appearance-none ${baseInput} ${borderClass}`}
        >
          <option value="">{field.placeholder || 'Please choose'}</option>
          {(field.options || []).map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : null}

      {['text', 'email', 'tel', 'number'].includes(field.type) ? (
        <input
          id={`field-${field.name}`}
          name={field.name}
          type={field.type}
          value={stringValue}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `error-${field.name}` : undefined}
          className={`mt-2.5 ${baseInput} ${borderClass}`}
        />
      ) : null}

      {field.type === 'multiselect' ? (
        <div className="mt-3 flex flex-wrap gap-2.5" role="group" aria-label={field.label}>
          {(field.options || []).map((option) => {
            const active = arrayValue.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => {
                  if (active) {
                    onChange(arrayValue.filter((item) => item !== option.value));
                  } else {
                    onChange([...arrayValue, option.value]);
                  }
                }}
                className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 font-label text-[0.82rem] transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  active
                    ? 'border-primary-500 bg-primary-500 text-background-50'
                    : 'border-foreground-950/12 bg-background-50 text-foreground-800 hover:border-primary-400'
                }`}
              >
                {active ? <i className="ri-check-line text-sm leading-none" aria-hidden="true"></i> : null}
                {option.label}
              </button>
            );
          })}
        </div>
      ) : null}

      {field.type === 'cards' ? (
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2" role="radiogroup" aria-label={field.label}>
          {(field.options || []).map((option) => {
            const active = stringValue === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange(option.value)}
                className={`flex h-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  active
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-foreground-950/12 bg-background-50 hover:border-primary-300'
                }`}
              >
                {option.icon ? (
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      active ? 'bg-primary-500 text-background-50' : 'bg-secondary-100 text-secondary-800'
                    }`}
                  >
                    <i className={`${option.icon} text-base leading-none`} aria-hidden="true"></i>
                  </span>
                ) : (
                  <span
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                      active ? 'border-primary-500 bg-primary-500 text-background-50' : 'border-foreground-950/20'
                    }`}
                  >
                    {active ? <i className="ri-check-line text-xs leading-none" aria-hidden="true"></i> : null}
                  </span>
                )}
                <span>
                  <span className="block font-heading text-[1rem] text-foreground-950">{option.label}</span>
                  {option.description ? (
                    <span className="mt-1 block text-[0.8rem] leading-relaxed text-foreground-600">
                      {option.description}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      {field.type === 'consent' ? (
        <button
          type="button"
          role="checkbox"
          aria-checked={stringValue === 'agreed'}
          onClick={() => onChange(stringValue === 'agreed' ? '' : 'agreed')}
          className={`mt-3 flex w-full items-start gap-3 rounded-2xl border p-5 text-left transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
            error ? 'border-accent-600' : stringValue === 'agreed' ? 'border-primary-500 bg-primary-50' : 'border-foreground-950/12 bg-background-50'
          }`}
        >
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
              stringValue === 'agreed' ? 'border-primary-500 bg-primary-500 text-background-50' : 'border-foreground-950/25'
            }`}
          >
            {stringValue === 'agreed' ? (
              <i className="ri-check-line text-xs leading-none" aria-hidden="true"></i>
            ) : null}
          </span>
          <span className="text-[0.82rem] leading-relaxed text-foreground-700">{field.consentText}</span>
        </button>
      ) : null}

      {field.help && !error ? (
        <p className="mt-2 text-[0.76rem] text-foreground-500">{field.help}</p>
      ) : null}

      {error ? (
        <p id={`error-${field.name}`} role="alert" className="mt-2 flex items-center gap-1.5 text-[0.78rem] text-accent-800">
          <i className="ri-error-warning-line text-sm leading-none" aria-hidden="true"></i>
          {error}
        </p>
      ) : null}
    </div>
  );
}