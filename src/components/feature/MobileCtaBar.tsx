import { useEffect, useState } from 'react';
import Button from '@/components/base/Button';

export default function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-background-300/70 bg-background-50/95 px-4 pb-3 pt-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <Button to="/assessment" variant="primary" size="md" fullWidth>
        Take the Assessment
      </Button>
      <p className="mt-1.5 text-center font-label text-[0.65rem] uppercase tracking-[0.1em] text-foreground-600">
        Free clinical review · Pay only if prescribed
      </p>
    </div>
  );
}