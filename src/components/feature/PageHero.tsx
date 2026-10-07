import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/base/Container';

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  children?: ReactNode;
  bg?: 'warm' | 'stone';
}

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  bg = 'stone',
}: PageHeroProps) {
  return (
    <section className={bg === 'stone' ? 'bg-background-100' : 'bg-background-50'}>
      <Container className="pb-14 pt-28 md:pb-16 md:pt-36">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] text-foreground-600">
              {breadcrumbs.map((crumb, index) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {crumb.to ? (
                    <Link to={crumb.to} className="transition-colors duration-200 hover:text-primary-700">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground-800">{crumb.label}</span>
                  )}
                  {index < breadcrumbs.length - 1 ? (
                    <i className="ri-arrow-right-s-line text-sm leading-none text-foreground-400" aria-hidden="true"></i>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <div className="mb-4 flex items-center gap-3 font-label text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-primary-700">
            <span className="h-px w-6 bg-primary-300"></span>
            {eyebrow}
          </div>
        ) : null}

        <h1 className="max-w-3xl font-heading text-[2rem] leading-[1.1] tracking-[-0.015em] text-foreground-950 md:text-[3rem]">
          {title}
        </h1>

        {description ? (
          <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-foreground-700 md:text-[1.05rem]">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-9">{children}</div> : null}
      </Container>
    </section>
  );
}