/**
 * Shared building blocks for documentation pages.
 * Styles live in src/styles/site.css (lp-* classes) and use tokens only.
 */
import { useState, type ReactNode, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight, Check, Copy, Info, Warning, CheckCircle, XCircle } from '@phosphor-icons/react';

// ─── Page header ──────────────────────────────────────────────────────────────

const CRUMB_PATHS: Record<string, string> = {
  'Get started': '/get-started/designers',
  Foundations: '/foundations',
  Tokens: '/foundations/tokens',
  Color: '/foundations/color',
  Components: '/components',
  Button: '/components/button',
  Brand: '/brand',
  Layout: '/layout',
  Resources: '/resources',
};

export function PageHeader({
  crumbs = [],
  title,
  lede,
  chips,
}: {
  crumbs?: string[];
  title: ReactNode;
  lede?: ReactNode;
  chips?: ReactNode;
}) {
  return (
    <header className="lp-page-header">
      {crumbs.length > 0 && (
        <nav className="lp-crumbs" aria-label="Breadcrumb">
          {crumbs.map((c, i) => (
            <span key={c} style={{ display: 'contents' }}>
              {i > 0 && <span aria-hidden>/</span>}
              {CRUMB_PATHS[c] ? <Link to={CRUMB_PATHS[c]}>{c}</Link> : <span>{c}</span>}
            </span>
          ))}
        </nav>
      )}
      <h1 className="lp-page-title">{title}</h1>
      {lede && <p className="lp-page-lede">{lede}</p>}
      {chips && <div className="lp-chips">{chips}</div>}
    </header>
  );
}

// ─── Sections ─────────────────────────────────────────────────────────────────

export function Section({
  id,
  title,
  desc,
  children,
  aside,
}: {
  id?: string;
  title?: ReactNode;
  desc?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section id={id} className="lp-section">
      {(title || aside) && (
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            {title && <h2 className="lp-section__title">{title}</h2>}
            {desc && <p className="lp-section__desc">{desc}</p>}
          </div>
          {aside}
        </div>
      )}
      {!title && desc && <p className="lp-section__desc">{desc}</p>}
      {children && <div className={title || desc ? 'lp-section__body' : undefined}>{children}</div>}
    </section>
  );
}

export function Sub({ id, title, children }: { id?: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div id={id} className="lp-subsection">
      <h3 className="lp-subsection__title">{title}</h3>
      {children}
    </div>
  );
}

export function Prose({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div className="lp-prose" style={style}>{children}</div>;
}

// ─── Surfaces ─────────────────────────────────────────────────────────────────

export function Panel({ children, tight, style, className = '' }: { children: ReactNode; tight?: boolean; style?: CSSProperties; className?: string }) {
  return <div className={`lp-panel ${tight ? 'lp-panel--tight' : ''} ${className}`} style={style}>{children}</div>;
}

export function Grid({ cols = 3, children, style }: { cols?: 2 | 3 | 4; children: ReactNode; style?: CSSProperties }) {
  return <div className={`lp-grid lp-grid--${cols}`} style={style}>{children}</div>;
}

export function Card({
  title,
  text,
  meta,
  children,
  outline,
  accent,
  style,
}: {
  title?: ReactNode;
  text?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  outline?: boolean;
  accent?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div className={`lp-card ${outline ? 'lp-card--outline' : ''} ${accent ? 'lp-card--accent' : ''}`} style={style}>
      {title && <h3 className="lp-card__title">{title}</h3>}
      {text && <p className="lp-card__text">{text}</p>}
      {meta && <p className="lp-card__meta">{meta}</p>}
      {children}
    </div>
  );
}

export function LinkCard({
  to,
  href,
  title,
  text,
  meta,
  preview,
  outline,
}: {
  to?: string;
  href?: string;
  title: ReactNode;
  text?: ReactNode;
  meta?: ReactNode;
  preview?: ReactNode;
  outline?: boolean;
}) {
  const inner = (
    <>
      {preview && <div style={{ marginBottom: 14 }}>{preview}</div>}
      <span className="lp-card__title" style={{ paddingRight: 24 }}>{title}</span>
      {text && <span className="lp-card__text">{text}</span>}
      {meta && <span className="lp-card__meta">{meta}</span>}
      <ArrowUpRight size={18} className="lp-linkcard__arrow" aria-hidden />
    </>
  );
  const cls = `lp-card lp-linkcard ${outline ? 'lp-card--outline' : ''}`;
  if (href) return <a className={cls} href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
  return <Link className={cls} to={to ?? '/'}>{inner}</Link>;
}

export function Stat({ value, label, text, accent }: { value: ReactNode; label: ReactNode; text?: ReactNode; accent?: boolean }) {
  return (
    <div className={`lp-card ${accent ? 'lp-card--accent' : ''}`}>
      <div className="lp-stat__num" style={accent ? { color: 'var(--accent-foreground-default)' } : undefined}>{value}</div>
      <p className="lp-card__title" style={{ marginTop: 4 }}>{label}</p>
      {text && <p className="lp-card__meta" style={{ marginTop: 2 }}>{text}</p>}
    </div>
  );
}

export function Stage({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return <div className="lp-stage" style={style}>{children}</div>;
}

// ─── Chips ────────────────────────────────────────────────────────────────────

export type ChipTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'inverse';
export function Chip({ tone = 'neutral', children, style }: { tone?: ChipTone; children: ReactNode; style?: CSSProperties }) {
  return <span className={`lp-chip ${tone !== 'neutral' ? `lp-chip--${tone}` : ''}`} style={style}>{children}</span>;
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

export function Tabs<T extends string>({
  tabs,
  active,
  onChange,
  counts,
  label = 'Sections',
}: {
  tabs: readonly T[];
  active: T;
  onChange: (t: T) => void;
  counts?: Partial<Record<T, number>>;
  label?: string;
}) {
  return (
    <div className="lp-tabs" role="tablist" aria-label={label}>
      {tabs.map((t) => (
        <button key={t} role="tab" className="lp-tab" aria-selected={t === active} onClick={() => onChange(t)}>
          {t}
          {counts?.[t] !== undefined && <span className="lp-tab__count">{counts[t]}</span>}
        </button>
      ))}
    </div>
  );
}

export function Segmented<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="lp-segmented" role="group">
      {options.map((o) => (
        <button key={o} aria-pressed={o === value} onClick={() => onChange(o)}>{o}</button>
      ))}
    </div>
  );
}

// ─── Code ─────────────────────────────────────────────────────────────────────

export function CodeBlock({ code, lang = 'CSS', style }: { code: string; lang?: string; style?: CSSProperties }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    try {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <div className="lp-code" style={style}>
      <div className="lp-code__bar">
        <span>{lang}</span>
        <button className="lp-code__copy" onClick={copy} aria-label="Copy code">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return <code className="lp-inline-code">{children}</code>;
}

// ─── Guidance ─────────────────────────────────────────────────────────────────

export function DoDont({ dos, donts }: { dos: ReactNode[]; donts: ReactNode[] }) {
  return (
    <div className="lp-dodont">
      <div className="lp-dodont__col">
        <div className="lp-dodont__head"><CheckCircle size={18} weight="fill" /> Do</div>
        <ul>{dos.map((d, i) => <li key={i}>{d}</li>)}</ul>
      </div>
      <div className="lp-dodont__col lp-dodont__col--dont">
        <div className="lp-dodont__head"><XCircle size={18} weight="fill" /> Don't</div>
        <ul>{donts.map((d, i) => <li key={i}>{d}</li>)}</ul>
      </div>
    </div>
  );
}

export function Callout({ tone = 'accent', children }: { tone?: 'accent' | 'neutral' | 'warning'; children: ReactNode }) {
  const Icon = tone === 'warning' ? Warning : Info;
  return (
    <div className={`lp-callout ${tone !== 'accent' ? `lp-callout--${tone}` : ''}`}>
      <Icon size={18} weight="fill" aria-hidden />
      <div>{children}</div>
    </div>
  );
}

// ─── Rows ─────────────────────────────────────────────────────────────────────

export function Rows({
  cols,
  head,
  rows,
  outline = true,
}: {
  cols: string;
  head?: ReactNode[];
  rows: ReactNode[][];
  outline?: boolean;
}) {
  const style = { ['--lp-row-cols' as string]: cols } as CSSProperties;
  return (
    <div className={`lp-rows ${outline ? 'lp-rows--outline' : ''}`} style={style}>
      {head && (
        <div className="lp-row lp-row--head">
          {head.map((h, i) => <div key={i}>{h}</div>)}
        </div>
      )}
      {rows.map((r, i) => (
        <div key={i} className="lp-row">
          {r.map((c, j) => <div key={j} style={{ minWidth: 0 }}>{c}</div>)}
        </div>
      ))}
    </div>
  );
}
