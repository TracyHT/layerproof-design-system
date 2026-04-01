import { useState, useEffect } from 'react';
import { useToc, TocItem } from '../context/TocContext';

interface ComponentShellProps {
  title: string;
  description: string;
  tabs?: string[];
  defaultTab?: string;
  tocItems?: TocItem[];
  children: React.ReactNode | ((activeTab: string) => React.ReactNode);
}

export function ComponentShell({
  title,
  description,
  tabs = ['Examples', 'Code', 'Usage'],
  defaultTab,
  tocItems = [],
  children,
}: ComponentShellProps) {
  const { setItems } = useToc();
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]);

  useEffect(() => {
    setItems(tocItems);
    return () => setItems([]);
  }, [setItems]);

  return (
    <div>
      {/* Header */}
      <section className="mb-0">
        <h1
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 48,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.1,
            textTransform: 'none',
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 16,
            color: 'var(--color-text-secondary)',
            maxWidth: 640,
            lineHeight: 1.6,
            marginBottom: 28,
          }}
        >
          {description}
        </p>

        {/* Tab bar */}
        <div
          style={{
            borderBottom: '1px solid var(--color-border)',
            display: 'flex',
            gap: 0,
            marginBottom: 32,
          }}
        >
          {tabs.map((tab) => {
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 18px',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  fontFamily: 'var(--font-body)',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--brand-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                  marginBottom: -1,
                  transition: 'color 150ms',
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </section>

      {/* Content */}
      <div>
        {typeof children === 'function' ? children(activeTab) : children}
      </div>
    </div>
  );
}
