import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}

export default function Container({ children, className = '', wide = false }: ContainerProps) {
  return (
    <div className={`mx-auto w-full ${wide ? 'max-w-8xl' : 'max-w-7xl'} px-5 md:px-8 ${className}`}>
      {children}
    </div>
  );
}