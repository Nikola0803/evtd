import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'sage' | 'stone' | 'outline' | 'dark';
  icon?: string;
  className?: string;
}

const tones = {
  sage: 'bg-secondary-100 text-secondary-900',
  stone: 'bg-background-200 text-foreground-800',
  outline: 'border border-foreground-950/12 text-foreground-800',
  dark: 'bg-foreground-950 text-background-50',
};

export default function Badge({ children, tone = 'sage', icon, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-label text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${tones[tone]} ${className}`}
    >
      {icon ? <i className={`${icon} text-xs leading-none`} aria-hidden="true"></i> : null}
      {children}
    </span>
  );
}