import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';
  return (
    <div className={`${isCenter ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow ? (
        <div
          className={`mb-4 flex items-center gap-3 font-label text-[0.7rem] font-semibold uppercase tracking-[0.18em] ${
            isCenter ? 'justify-center' : ''
          } ${tone === 'dark' ? 'text-primary-700' : 'text-secondary-300'}`}
        >
          <span className={`h-px w-6 ${tone === 'dark' ? 'bg-primary-300' : 'bg-secondary-500/60'}`}></span>
          {eyebrow}
        </div>
      ) : null}
      <h2
        className={`font-heading text-[1.85rem] leading-[1.1] tracking-[-0.02em] md:text-[2.8rem] ${
          tone === 'dark' ? 'text-foreground-950' : 'text-background-50'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-5 text-[0.95rem] leading-relaxed md:text-base ${
            tone === 'dark' ? 'text-foreground-700' : 'text-secondary-200'
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}