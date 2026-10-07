import { useState } from 'react';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenId?: string;
  tone?: 'dark' | 'light';
}

export default function Accordion({ items, defaultOpenId, tone = 'dark' }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  const isDark = tone === 'dark';

  return (
    <div className={`divide-y ${isDark ? 'divide-background-300/70' : 'divide-background-50/15'}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 ${
                  isDark ? 'text-foreground-950 hover:text-primary-700' : 'text-background-50 hover:text-secondary-200'
                }`}
              >
                <span className="font-heading text-base tracking-[-0.005em] md:text-lg">{item.question}</span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                    isDark ? 'border-foreground-950/15' : 'border-background-50/25'
                  }`}
                >
                  <i
                    className={`ri-add-line text-base leading-none transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                    aria-hidden="true"
                  ></i>
                </span>
              </button>
            </h3>
            <div
              className="grid transition-all duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p
                  className={`max-w-3xl pb-6 pr-10 text-sm leading-relaxed ${
                    isDark ? 'text-foreground-700' : 'text-secondary-200'
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}