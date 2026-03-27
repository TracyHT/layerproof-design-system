import { useState } from 'react';
import { Check } from 'lucide-react';

// ─── Shared helpers ────────────────────────────────────────────────────────────

const A = (s: React.CSSProperties) => s; // identity helper for typing inline styles

const heading: React.CSSProperties = {
  fontFamily: '"Anton", sans-serif',
  textTransform: 'uppercase',
};

function CopyChip({ hex, dark }: { hex: string; dark?: boolean }) {
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
      <span className="text-[11px] font-semibold" style={{ color: fg, opacity: 0.65 }}>
        {(dark ? '◼' : '◻')}
      </span>
      <span className="text-[11px] font-mono" style={{ color: fg, opacity: 0.7 }}>
        {copied ? <Check size={11} className="inline" /> : hex}
      </span>
    </button>
  );
}

function GridChip({ name, hex, dark }: { name: string; hex: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-3 rounded-xl p-3 transition-opacity hover:opacity-75 focus:outline-none text-left"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
    >
      <div className="rounded-lg shrink-0" style={{ background: hex, width: 44, height: 44 }} />
      <div>
        <p className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{name}</p>
        <p className="text-xs font-mono" style={{ color: 'var(--color-text-tertiary)' }}>
          {copied ? 'Copied!' : hex}
        </p>
      </div>
    </button>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-semibold tracking-widest uppercase mb-1"
        style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>
        Color
      </p>
      <h3 style={{ ...heading, fontSize: '2rem', color: 'var(--color-text-primary)' }}>
        {title}
      </h3>
    </div>
  );
}

// ─── Pairing card ──────────────────────────────────────────────────────────────

function PairingCard({
  num, bg, fg, label, sublabel,
}: {
  num: string; bg: string; fg: string; label: string; sublabel: string;
}) {
  return (
    <div className="rounded-2xl overflow-hidden flex flex-col" style={{ background: bg, minHeight: 200 }}>
      <div className="flex-1 flex items-center justify-center p-8">
        <span style={{ fontFamily: '"Anton", sans-serif', fontSize: '4rem', color: fg, lineHeight: 1 }}>
          Aa
        </span>
      </div>
      <div className="px-4 pb-4 pt-2 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold" style={{ fontFamily: '"Roboto", sans-serif', color: fg, opacity: 0.5 }}>
            {num}
          </p>
          <p className="text-sm font-medium mt-0.5" style={{ fontFamily: '"Roboto", sans-serif', color: fg }}>
            {label}
          </p>
          <p className="text-xs mt-0.5" style={{ fontFamily: '"Roboto", sans-serif', color: fg, opacity: 0.5 }}>
            {sublabel}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Usage sample card ─────────────────────────────────────────────────────────

function UsageSample({
  num, bg, children,
}: {
  num: string; bg: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: bg, minHeight: 180 }}>
      <div className="p-4">
        <p className="text-xs font-mono mb-3" style={{ color: bg === '#ffffff' ? '#00000040' : '#ffffff40' }}>{num}</p>
        {children}
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function ColorsSection() {
  return (
    <div className="space-y-24" style={{ color: 'var(--color-text-primary)' }}>

      {/* ── CORE PALETTE ──────────────────────────────────── */}
      <div id="core-palette">
        <SectionLabel tag="Color" title="Core Palette" />
        <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
          Black and white are the primary drivers of all LayerProof UI. Every surface, text, and border begins here.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { name: 'Black',    hex: '#000000' },
            { name: 'Surface',  hex: '#111111' },
            { name: 'Elevated', hex: '#1c1c1c' },
            { name: 'Border',   hex: '#2a2a2a' },
          ].map(s => <GridChip key={s.hex} {...s} />)}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { name: 'Subtle',   hex: '#6b6b6b' },
            { name: 'Muted',    hex: '#a3a3a3', dark: true },
            { name: 'Light',    hex: '#d4d4d4', dark: true },
            { name: 'White',    hex: '#ffffff', dark: true },
          ].map(s => <GridChip key={s.hex} {...s} />)}
        </div>
      </div>

      {/* ── CORE PAIRINGS ─────────────────────────────────── */}
      <div id="core-pairings">
        <SectionLabel tag="Color" title="Core Pairings" />
        <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          There are four core pairings we use with typography.
        </p>
        <ol className="text-sm mb-8 space-y-1 list-decimal list-inside" style={{ color: 'var(--color-text-secondary)' }}>
          <li>White on Black</li>
          <li>Black on White</li>
          <li>White on Surface</li>
          <li>Black on Light</li>
        </ol>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <PairingCard num="01" bg="#000000" fg="#ffffff" label="White on Black" sublabel="#fff on #000" />
          <PairingCard num="02" bg="#ffffff" fg="#000000" label="Black on White" sublabel="#000 on #fff" />
          <PairingCard num="03" bg="#111111" fg="#ffffff" label="White on Surface" sublabel="#fff on #111" />
          <PairingCard num="04" bg="#f5f5f5" fg="#000000" label="Black on Light" sublabel="#000 on #f5f5f5" />
        </div>

        {/* Core usage samples */}
        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-tertiary)', fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          In Use
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 01 — Hero headline */}
          <UsageSample num="01" bg="#000000">
            <p style={{ fontFamily: '"Anton", sans-serif', fontSize: '2rem', color: '#ffffff', textTransform: 'uppercase', lineHeight: 1.1 }}>
              From Dump<br />To Done
            </p>
            <p className="mt-2 text-xs" style={{ fontFamily: '"Roboto", sans-serif', color: 'rgba(255,255,255,0.5)' }}>
              Connect once.
            </p>
          </UsageSample>

          {/* 02 — Button pair */}
          <UsageSample num="02" bg="#111111">
            <div className="flex flex-col gap-3 mt-4">
              <button className="rounded-lg px-5 py-2 text-sm font-semibold"
                style={{ background: '#ffffff', color: '#000000', fontFamily: '"Roboto", sans-serif' }}>
                Start now →
              </button>
              <button className="rounded-lg px-5 py-2 text-sm font-semibold"
                style={{ background: 'transparent', color: '#ffffff', border: '1px solid #2a2a2a', fontFamily: '"Roboto", sans-serif' }}>
                Learn more
              </button>
            </div>
          </UsageSample>

          {/* 03 — Card on white */}
          <UsageSample num="03" bg="#ffffff">
            <div className="rounded-xl p-4" style={{ background: '#000000' }}>
              <p style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.1rem', color: '#ffffff', textTransform: 'uppercase' }}>
                LayerProof
              </p>
              <p className="text-xs mt-1" style={{ fontFamily: '"Roboto", sans-serif', color: 'rgba(255,255,255,0.5)' }}>
                Brand identity system
              </p>
            </div>
          </UsageSample>
        </div>
      </div>

      {/* ── SECONDARY PALETTE ─────────────────────────────── */}
      <div id="secondary-palette">
        <SectionLabel tag="Color" title="Secondary Palette" />
        <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
          Yellow and pink are accent-only colors — never use as backgrounds for large areas or primary buttons.
        </p>

        {/* Yellow scale */}
        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>Yellow</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {[
              { hex: '#fef9d0', dark: true },
              { hex: '#fdf0a0', dark: true },
              { hex: '#fae870', dark: true },
              { hex: '#f5dc4a', dark: true },
              { hex: '#f0d040', dark: true },
              { hex: '#c9a800', dark: true },
              { hex: '#9a7e00' },
              { hex: '#6b5700' },
              { hex: '#3d3000' },
            ].map((s, i) => (
              <CopyChip key={s.hex} hex={s.hex} dark={s.dark} />
            ))}
          </div>
        </div>

        {/* Pink scale */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>Pink</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {[
              { hex: '#fde8ef', dark: true },
              { hex: '#fbc5d8', dark: true },
              { hex: '#f598bb', dark: true },
              { hex: '#ef6994', dark: true },
              { hex: '#e8336c' },
              { hex: '#c43460' },
              { hex: '#9a2550' },
              { hex: '#6e1839' },
              { hex: '#440e23' },
            ].map(s => (
              <CopyChip key={s.hex} hex={s.hex} dark={s.dark} />
            ))}
          </div>
        </div>
      </div>

      {/* ── SECONDARY PAIRINGS ────────────────────────────── */}
      <div id="secondary-pairings">
        <SectionLabel tag="Color" title="Secondary Pairings" />
        <p className="text-sm mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          Accent colors always pair against black or white — never against each other.
        </p>
        <ol className="text-sm mb-8 space-y-1 list-decimal list-inside" style={{ color: 'var(--color-text-secondary)' }}>
          <li>Yellow on Black</li>
          <li>Pink on Black</li>
          <li>Black on Yellow</li>
          <li>White on Pink</li>
        </ol>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <PairingCard num="01" bg="#000000" fg="#f0d040" label="Yellow on Black" sublabel="#f0d040 on #000" />
          <PairingCard num="02" bg="#000000" fg="#e8336c" label="Pink on Black" sublabel="#e8336c on #000" />
          <PairingCard num="03" bg="#f0d040" fg="#000000" label="Black on Yellow" sublabel="#000 on #f0d040" />
          <PairingCard num="04" bg="#e8336c" fg="#ffffff" label="White on Pink" sublabel="#fff on #e8336c" />
        </div>

        {/* Secondary usage samples */}
        <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-tertiary)', fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          In Use
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 01 — Accent headline */}
          <UsageSample num="01" bg="#000000">
            <p style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', lineHeight: 1.1 }}>
              <span style={{ color: '#ffffff' }}>From </span>
              <span style={{ color: '#f0d040' }}>Dump</span>
              <br />
              <span style={{ color: '#ffffff' }}>To </span>
              <span style={{ color: '#e8336c' }}>Done</span>
            </p>
          </UsageSample>

          {/* 02 — Badge / tag */}
          <UsageSample num="02" bg="#111111">
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: '#f0d040', color: '#000000', fontFamily: '"Roboto", sans-serif' }}>
                New
              </span>
              <span className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: '#e8336c', color: '#ffffff', fontFamily: '"Roboto", sans-serif' }}>
                Featured
              </span>
              <span className="rounded-full px-3 py-1 text-xs font-semibold"
                style={{ background: '#2a2a2a', color: '#ffffff', fontFamily: '"Roboto", sans-serif' }}>
                Draft
              </span>
            </div>
            <p className="mt-3 text-xs" style={{ fontFamily: '"Roboto", sans-serif', color: 'rgba(255,255,255,0.4)' }}>
              Tags and status badges
            </p>
          </UsageSample>

          {/* 03 — Accent card */}
          <UsageSample num="03" bg="#000000">
            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #2a2a2a' }}>
              <div className="h-2" style={{ background: 'linear-gradient(to right, #f0d040, #e8336c)' }} />
              <div className="p-3">
                <p style={{ fontFamily: '"Anton", sans-serif', fontSize: '1rem', color: '#ffffff', textTransform: 'uppercase' }}>
                  Proof verified
                </p>
                <p className="text-xs mt-1" style={{ fontFamily: '"Roboto", sans-serif', color: 'rgba(255,255,255,0.4)' }}>
                  Accent stripe on dark card
                </p>
              </div>
            </div>
          </UsageSample>
        </div>
      </div>

      {/* ── GUIDELINES ────────────────────────────────────── */}
      <div className="rounded-2xl p-8" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <h3 style={{ ...heading, fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
          Usage Guidelines
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-sm font-semibold mb-3" style={{ color: '#10b981' }}>DO</p>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <li>✓ Use black/white for all primary UI, buttons, and surfaces</li>
              <li>✓ Yellow-500 on black for highlighted headlines or labels</li>
              <li>✓ Pink-500 on black for energetic accents and CTAs</li>
              <li>✓ Use Yellow-600+ when placing yellow on light backgrounds</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold mb-3" style={{ color: '#ef4444' }}>DON'T</p>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              <li>✗ Don't pair yellow and pink together in the same element</li>
              <li>✗ Don't use Yellow-100–400 on white (fails contrast)</li>
              <li>✗ Don't use accents as large fill backgrounds</li>
              <li>✗ Don't use semantic colors for branding or decoration</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
