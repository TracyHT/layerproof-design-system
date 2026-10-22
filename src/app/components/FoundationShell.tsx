import { useEffect } from 'react';
import { useToc, TocItem } from '../context/TocContext';
import { PageHeader, Chip, Card } from './docs';

interface Props {
  /** Breadcrumb trail. A single string is treated as one crumb. */
  tag?: string | string[];
  title: string;
  description: string;
  tocItems?: TocItem[];
  badge?: string;
  children?: React.ReactNode;
}

/** Shared layout shell for documentation pages: breadcrumb, title, lede, ToC wiring. */
export function FoundationShell({ tag = 'Foundations', title, description, tocItems = [], badge, children }: Props) {
  const { setItems } = useToc();

  useEffect(() => {
    setItems(tocItems);
    return () => setItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setItems]);

  const crumbs = Array.isArray(tag) ? tag : tag ? [tag] : [];

  return (
    <div>
      <PageHeader
        crumbs={crumbs}
        title={title}
        lede={description}
        chips={badge ? <Chip tone="accent">{badge}</Chip> : undefined}
      />
      {children}
    </div>
  );
}

/** Placeholder body for pages that are still being written. */
export function ComingSoonBody({ items }: { items: string[] }) {
  return (
    <div className="lp-panel">
      <p className="lp-card__meta" style={{ margin: '0 4px 12px' }}>This page is being written. Planned sections:</p>
      <div className="lp-grid lp-grid--2">
        {items.map((label) => (
          <Card key={label} title={label}>
            <div style={{ marginTop: 8 }}><Chip>In progress</Chip></div>
          </Card>
        ))}
      </div>
    </div>
  );
}
