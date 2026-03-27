import React from 'react';

const LogoCard = ({
  bg,
  children,
}: {
  bg: string;
  children: React.ReactNode;
}) => (
  <div
    className="flex items-center justify-center rounded-2xl min-h-[200px]"
    style={{ background: bg }}
  >
    {children}
  </div>
);

const FullLogo = ({ symbolFilter, textColor }: { symbolFilter?: string; textColor: string }) => (
  <div className="flex items-center gap-3">
    <img
      src={`${import.meta.env.BASE_URL}symbol.png`}
      alt="LayerProof symbol"
      className="h-10 w-auto"
      style={symbolFilter ? { filter: symbolFilter } : undefined}
    />
    <span
      className="text-2xl font-bold"
      style={{ fontFamily: '"DM Sans", sans-serif', color: textColor }}
    >
      LayerProof
    </span>
  </div>
);

export function LogoSection() {
  return (
    <section id="our-logo" className="py-20 px-8" style={{ background: 'var(--color-background)' }}>
      <div className="max-w-6xl mx-auto space-y-20">

        {/* OUR LOGO */}
        <div>
          <h2
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: '"Anton", sans-serif', color: 'var(--color-text-primary)' }}
          >
            OUR LOGO
          </h2>
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>
            Feel free to use our logo in color, black or white.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dark bg — white logo */}
            <LogoCard bg="#111111">
              <FullLogo symbolFilter="brightness(0) invert(1)" textColor="#ffffff" />
            </LogoCard>

            {/* White bg — black logo */}
            <LogoCard bg="#ffffff">
              <FullLogo symbolFilter="brightness(0)" textColor="#000000" />
            </LogoCard>

            {/* Dark bg — color logo */}
            <LogoCard bg="#111111">
              <FullLogo textColor="#ffffff" />
            </LogoCard>
          </div>
        </div>

        {/* SYMBOL */}
        <div id="symbol">
          <h2
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: '"Anton", sans-serif', color: 'var(--color-text-primary)' }}
          >
            SYMBOL
          </h2>
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>
            Use these only when the LayerProof brand is clearly visible or has been well established elsewhere.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Dark bg — white symbol */}
            <LogoCard bg="#111111">
              <img src="/symbol.png" alt="LayerProof symbol white" className="h-16 w-auto" style={{ filter: 'brightness(0) invert(1)' }} />
            </LogoCard>

            {/* White bg — black symbol */}
            <LogoCard bg="#ffffff">
              <img src="/symbol.png" alt="LayerProof symbol black" className="h-16 w-auto" style={{ filter: 'brightness(0)' }} />
            </LogoCard>

            {/* Dark bg — color symbol */}
            <LogoCard bg="#111111">
              <img src="/symbol.png" alt="LayerProof symbol color" className="h-16 w-auto" />
            </LogoCard>
          </div>
        </div>

        {/* CLEARSPACE */}
        <div id="clearspace">
          <h2
            className="text-4xl font-bold mb-2"
            style={{ fontFamily: '"Anton", sans-serif', color: 'var(--color-text-primary)' }}
          >
            CLEARSPACE
          </h2>
          <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>
            Please do not edit, change, distort, recolor, or reconfigure the LayerProof logo.
          </p>

          {/* Outer dark card */}
          <div className="rounded-3xl p-10 flex flex-col md:flex-row items-center justify-center gap-16" style={{ background: '#1a1a1a' }}>

            {/* Full lockup clearspace diagram */}
            {/* x = symbol height (40px). Clearspace = x on all sides */}
            <div className="relative flex items-center justify-center" style={{ padding: '40px' }}>
              {/* Clearspace boundary box */}
              <div
                className="absolute inset-0"
                style={{ border: '1px solid rgba(255,255,255,0.2)' }}
              />
              {/* Logo bounding box (inner) */}
              <div
                className="absolute"
                style={{
                  inset: '40px',
                  border: '1px solid rgba(255,255,255,0.35)',
                }}
              />
              {/* x label — top left */}
              <span className="absolute text-[10px] font-mono text-white/40" style={{ top: 12, left: 4 }}>x</span>
              {/* x label — bottom left */}
              <span className="absolute text-[10px] font-mono text-white/40" style={{ bottom: 12, left: 4 }}>x</span>
              {/* x label — top right */}
              <span className="absolute text-[10px] font-mono text-white/40" style={{ top: 12, right: 4 }}>x</span>
              {/* x label — bottom right */}
              <span className="absolute text-[10px] font-mono text-white/40" style={{ bottom: 12, right: 4 }}>x</span>
              {/* The logo */}
              <FullLogo symbolFilter="brightness(0) invert(1)" textColor="#ffffff" />
            </div>

            {/* Symbol-only clearspace diagram */}
            {/* x = 1/3 of symbol size */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-white/50 self-end mr-2">1/3</span>
              <div className="relative" style={{ padding: '24px' }}>
                {/* 3×3 grid overlay */}
                {/* Vertical lines */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)',
                  backgroundSize: '33.33% 33.33%',
                }} />
                {/* Outer border */}
                <div className="absolute inset-0" style={{ border: '1px solid rgba(255,255,255,0.25)' }} />
                {/* x corner labels */}
                <span className="absolute text-[10px] font-mono text-white/40" style={{ top: 26, left: 4 }}>x</span>
                <span className="absolute text-[10px] font-mono text-white/40" style={{ top: 26, right: 4 }}>x</span>
                <span className="absolute text-[10px] font-mono text-white/40" style={{ bottom: 26, left: 4 }}>x</span>
                <span className="absolute text-[10px] font-mono text-white/40" style={{ bottom: 26, right: 4 }}>x</span>
                {/* Symbol */}
                <img
                  src={`${import.meta.env.BASE_URL}symbol.png`}
                  alt="LayerProof symbol"
                  className="h-16 w-auto relative z-10"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>

          </div>

          {/* Rules */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { title: 'Clearspace unit (x)', body: 'x equals the height of the LayerProof symbol. Maintain x of clear space on all four sides of the full logo lockup.' },
              { title: 'Symbol clearspace', body: 'When using the symbol alone, maintain 1/3 of the symbol\'s height as clear space on all sides.' },
              { title: 'Minimum size', body: 'Do not reproduce the full logo below 120px wide for digital or 1 inch for print. Symbol minimum is 24px.' },
            ].map(({ title, body }) => (
              <div key={title} className="p-5 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                <h4 className="font-semibold mb-2 text-sm" style={{ color: 'var(--color-text-primary)' }}>{title}</h4>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{body}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
