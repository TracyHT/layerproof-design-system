import React from 'react';
import { Section, Grid, Card, Panel } from './docs';

/** Logo tiles use fixed brand colours on purpose: a logo sample must look the same in both site themes. */
const TILE = { dark: '#1a1a1a', light: '#ffffff', soft: '#f5f5f5' } as const;

const LogoTile = ({ bg, label, children }: { bg: string; label: string; children: React.ReactNode }) => (
  <figure style={{ margin: 0 }}>
    <div
      className="flex items-center justify-center"
      style={{ background: bg, minHeight: 180, borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-subtle)' }}
    >
      {children}
    </div>
    <figcaption className="lp-card__meta" style={{ marginTop: 8 }}>{label}</figcaption>
  </figure>
);

const Symbol = ({ filter, size = 40 }: { filter?: string; size?: number }) => (
  <img src={`${import.meta.env.BASE_URL}symbol.png`} alt="LayerProof symbol" style={{ height: size, width: 'auto', filter }} />
);

const FullLogo = ({ symbolFilter, textColor }: { symbolFilter?: string; textColor: string }) => (
  <div className="flex items-center" style={{ gap: 12 }}>
    <Symbol filter={symbolFilter} />
    <span style={{ fontFamily: '"DM Sans", var(--font-heading)', fontWeight: 700, fontSize: 28, letterSpacing: '-0.01em', color: textColor }}>LayerProof</span>
  </div>
);

export function LogoSection() {
  return (
    <>
      <Section id="our-logo" title="Our logo" desc="The full lockup pairs the layered symbol with the LayerProof wordmark (DM Sans Bold). Use it in colour, black or white.">
        <Grid cols={3}>
          <LogoTile bg={TILE.light} label="Colour, on light"><FullLogo textColor="#1a1a1a" /></LogoTile>
          <LogoTile bg={TILE.dark} label="Colour, on dark"><FullLogo textColor="#ffffff" /></LogoTile>
          <LogoTile bg={TILE.soft} label="Black, one colour"><FullLogo symbolFilter="brightness(0)" textColor="#000000" /></LogoTile>
        </Grid>
      </Section>

      <Section id="symbol" title="Symbol" desc="Use the symbol on its own only where the LayerProof brand is already clear — app icons, avatars, favicons.">
        <Grid cols={3}>
          <LogoTile bg={TILE.light} label="Colour"><Symbol size={64} /></LogoTile>
          <LogoTile bg={TILE.dark} label="White"><Symbol size={64} filter="brightness(0) invert(1)" /></LogoTile>
          <LogoTile bg={TILE.soft} label="Black"><Symbol size={64} filter="brightness(0)" /></LogoTile>
        </Grid>
      </Section>

      <Section id="clearspace" title="Clear space and minimum size" desc="Don't edit, distort, recolour or rearrange the logo. Give it room to breathe.">
        <Panel>
          <div className="flex flex-col md:flex-row items-center justify-center" style={{ gap: 56, padding: '24px 8px' }}>
            {/* Full lockup: x = symbol height on all sides */}
            <div className="relative flex items-center justify-center" style={{ padding: 40, background: 'var(--background-surface-raised)', borderRadius: 'var(--radius-lg)' }}>
              <div className="absolute inset-0" style={{ border: '1px dashed var(--accent-border-default)', borderRadius: 'var(--radius-lg)' }} />
              <div className="absolute" style={{ inset: 40, border: '1px solid var(--border-default)' }} />
              {['top-left', 'bottom-right'].map((pos) => (
                <span key={pos} className="absolute type-label-xs" style={{ color: 'var(--accent-foreground-default)', ...(pos === 'top-left' ? { top: 12, left: 10 } : { bottom: 12, right: 10 }) }}>x</span>
              ))}
              <FullLogo textColor="var(--foreground-primary)" />
            </div>
            {/* Symbol: 1/3 of its height */}
            <div className="relative" style={{ padding: 24, background: 'var(--background-surface-raised)', borderRadius: 'var(--radius-lg)' }}>
              <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: 'var(--radius-lg)', border: '1px dashed var(--accent-border-default)' }} />
              <span className="absolute type-label-xs" style={{ top: 6, right: 8, color: 'var(--accent-foreground-default)' }}>⅓</span>
              <Symbol size={72} />
            </div>
          </div>
        </Panel>
        <Grid cols={3} style={{ marginTop: 12 }}>
          <Card outline title="Clear space (x)" text="x equals the symbol's height. Keep x clear on all four sides of the full lockup." />
          <Card outline title="Symbol clear space" text="On its own, keep a third of the symbol's height clear on every side." />
          <Card outline title="Minimum size" text="Full logo: 120px wide on screen, 1 inch in print. Symbol: 24px." />
        </Grid>
      </Section>
    </>
  );
}
