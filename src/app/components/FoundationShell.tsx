import { useEffect } from 'react';
import { useToc, TocItem } from '../context/TocContext';

interface Props {
  tag?: string;
  title: string;
  description: string;
  tocItems?: TocItem[];
  badge?: string;
  children?: React.ReactNode;
}

/** Shared layout shell for all Foundation sub-pages. */
export function FoundationShell({ tag = 'Foundations', title, description, tocItems = [], badge, children }: Props) {
  const { setItems } = useToc();

  useEffect(() => {
    setItems(tocItems);
    return () => setItems([]);
  }, [setItems]);

  return (
    <div>
      <section className="mb-16">
        {/* Breadcrumb tag + badge */}
        <div className="flex items-center gap-3 mb-3">
          <p className="text-xs font-semibold tracking-widest uppercase"
            style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>
            {tag}
          </p>
          {badge && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: 'var(--pink-500, #e8336c)22', color: 'var(--pink-500, #e8336c)', border: '1px solid var(--pink-500, #e8336c)44' }}>
              {badge}
            </span>
          )}
        </div>

        {/* Title — inherits Anton + uppercase from theme.css */}
        <h1>{title}</h1>

        {/* Yellow accent rule */}
        <div className="mt-4 mb-5" style={{ width: 48, height: 3, background: 'var(--brand-primary)', borderRadius: 2 }} />

        {/* Description */}
        <p className="text-lg" style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-secondary)', maxWidth: 560 }}>
          {description}
        </p>
      </section>
      {children}
    </div>
  );
}

/** Placeholder body for stub pages not yet built out. */
export function ComingSoonBody({ items }: { items: string[] }) {
  return (
    <div className="space-y-3">
      {items.map((label) => (
        <div key={label} className="flex items-center gap-3 rounded-xl px-5 py-4"
          style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <span className="text-sm" style={{ color: 'var(--color-text-primary)', fontFamily: '"Roboto", sans-serif' }}>{label}</span>
          <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
            style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)' }}>
            Coming soon
          </span>
        </div>
      ))}
    </div>
  );
}
