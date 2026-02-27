'use client';

import { useState, useId } from 'react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  /** Allow multiple items to be expanded simultaneously */
  allowMultiple?: boolean;
}

export function Accordion({ items, className, allowMultiple = false }: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
  const baseId = useId();

  function toggle(index: number) {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        if (!allowMultiple) next.clear();
        next.add(index);
      }
      return next;
    });
  }

  return (
    <div className={cn('divide-y divide-surface-200 border-y border-surface-200', className)} role="list">
      {items.map((item, index) => {
        const isOpen = openIndices.has(index);
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={index} role="listitem">
            <h3>
              <button
                id={triggerId}
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-150 hover:text-accent-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="text-base font-medium text-primary-900 pr-2">
                  {item.question}
                </span>
                <svg
                  className={cn(
                    'h-5 w-5 shrink-0 text-primary-400 transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-96 pb-5' : 'max-h-0'
              )}
              hidden={!isOpen}
            >
              <p className="text-sm leading-relaxed text-primary-600">
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
