import { useState } from 'react';
import { Check } from 'lucide-react';

export const colorHeading: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontWeight: 700,
  letterSpacing: 'var(--ls-h4)',
};

// ─── Copy chip (compact swatch with hex copy) ──────────────────────────────────

export function CopyChip({ hex, dark }: { hex: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  const fg = dark ? '#000' : '#fff';
  return (
    <button
      onClick={copy}
      className="group relative flex flex-col justify-between rounded-lg overflow-hidden transition-transform hover:scale-105 focus:outline-none"
      style={{ background: hex, minHeight: 80, padding: '10px 12px' }}
      title={`Copy ${hex}`}
    >
      <span />
      <span className="text-[11px] font-mono" style={{ color: fg, opacity: 0.7 }}>
        {copied ? <Check size={11} className="inline" /> : hex}
      </span>
    </button>
  );
}

// ─── Pairing card ──────────────────────────────────────────────────────────────

export function PairingCard({
  num, bg, fg, label, sublabel,
}: {
  num: string; bg: string; fg: string; label: string; sublabel: string;
}) {
  return (
    <div className="overflow-hidden flex flex-col" style={{ background: bg, minHeight: 200, borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }} data-num={num}>
      <div className="flex-1 flex items-center justify-center p-8">
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '4rem', color: fg, lineHeight: 1 }}>
          Aa
        </span>
      </div>
      <div className="px-4 pb-4 pt-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium mt-0.5" style={{ fontFamily: 'var(--font-body)', color: fg }}>
            {label}
          </p>
          <p className="text-xs mt-0.5" style={{ fontFamily: 'var(--font-body)', color: fg, opacity: 0.5 }}>
            {sublabel}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Usage sample card ─────────────────────────────────────────────────────────

export function UsageSample({
  num, bg, children,
}: {
  num: string; bg: string; children: React.ReactNode;
}) {
  return (
    <div className="overflow-hidden" style={{ background: bg, minHeight: 180, borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }} data-num={num}>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
}

// ─── Data viz swatch ───────────────────────────────────────────────────────────

export function DataVizSwatch({ label, hex }: { label: string; hex: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(hex); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
      className="flex flex-col overflow-hidden text-left"
      style={{ border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-xl)' }}
    >
      <div style={{ background: hex, height: 56 }} />
      <div className="px-3 py-2" style={{ background: 'var(--background-surface-raised)' }}>
        <p className="type-label-sm">{label}</p>
        <p className="type-body-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--foreground-tertiary)' }}>
          {copied ? 'Copied!' : hex}
        </p>
      </div>
    </button>
  );
}

// ─── Palette column ────────────────────────────────────────────────────────────

export function PaletteColumn({ name, stops }: {
  name: string;
  stops: { label: string; cssVar: string; dark?: boolean }[];
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
      <p className="text-sm font-bold mb-2" style={{ fontFamily: 'var(--font-body)', color: 'var(--foreground-primary)' }}>
        {name}
      </p>
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-subtle)' }}>
        {stops.map((s, i) => (
          <PaletteRow key={s.label} {...s} isLast={i === stops.length - 1} />
        ))}
      </div>
    </div>
  );
}

function PaletteRow({ label, cssVar, dark, isLast }: { label: string; cssVar: string; dark?: boolean; isLast: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (typeof document !== 'undefined') {
      const val = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
      navigator.clipboard.writeText(val);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center px-3 py-2 transition-opacity hover:opacity-80 focus:outline-none text-left"
      style={{
        background: `var(${cssVar})`,
        borderBottom: isLast ? 'none' : '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <span className="text-xs font-medium" style={{ color: dark ? '#000000' : '#ffffff', fontFamily: 'var(--font-body)', opacity: 0.8 }}>
        {copied ? 'Copied!' : label}
      </span>
    </button>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────

export function SectionLabel({ title }: { title: string }) {
  return <h2 className="lp-section__title" style={{ marginBottom: 16 }}>{title}</h2>;
}
