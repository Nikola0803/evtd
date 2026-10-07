import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'ghost' | 'light' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  icon?: string;
  iconAfter?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-primary-500 text-background-50 hover:bg-primary-600 border border-transparent',
  outline:
    'border border-foreground-950/15 text-foreground-950 hover:border-primary-500 hover:text-primary-700 bg-transparent',
  ghost: 'text-foreground-900 hover:bg-primary-50 border border-transparent',
  light: 'bg-background-50 text-foreground-950 hover:bg-background-100 border border-transparent',
  secondary: 'bg-secondary-100 text-secondary-950 hover:bg-secondary-200 border border-transparent',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm md:text-[0.95rem]',
};

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconAfter,
  type = 'button',
  disabled = false,
  ariaLabel,
  fullWidth = false,
}: ButtonProps) {
  const classes = [
    'group inline-flex items-center justify-center gap-2 rounded-full font-label font-semibold tracking-tight whitespace-nowrap transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background-50',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    disabled ? 'opacity-50 pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      {icon ? <i className={`${icon} text-base leading-none`} aria-hidden="true"></i> : null}
      <span>{children}</span>
      {iconAfter ? (
        <i
          className={`${iconAfter} text-base leading-none transition-transform duration-200 group-hover:translate-x-0.5`}
          aria-hidden="true"
        ></i>
      ) : null}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={classes} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={classes} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}