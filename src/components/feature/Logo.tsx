import { Link } from 'react-router-dom';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
}

export default function Logo({ tone = 'dark', className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="EVOLV Today home"
      className={`inline-flex items-baseline font-heading text-[1.15rem] leading-none tracking-[0.01em] transition-colors duration-200 ${
        tone === 'dark' ? 'text-foreground-950' : 'text-background-50'
      } ${className}`}
    >
      <span className="font-semibold">EVOLV</span>
      <span className="ml-1.5 font-light opacity-75">TODAY</span>
    </Link>
  );
}