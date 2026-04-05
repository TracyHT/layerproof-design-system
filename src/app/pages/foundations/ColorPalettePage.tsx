import { FoundationShell } from '../../components/FoundationShell';
import { PairingCard, UsageSample, PaletteColumn } from '../../components/ColorHelpers';

export function ColorPalettePage() {
  return (
    <FoundationShell
      title="Color Palette"
      description="Black and white are the primary drivers of all LayerProof UI. Four core pairings govern all text-on-background combinations."
    >
      <div className="space-y-12" style={{ color: 'var(--color-text-primary)' }}>

        {/* Core pairings */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PairingCard num="01" bg="#000000" fg="#ffffff" label="White on Black" sublabel="#fff on #000" />
          <PairingCard num="02" bg="#ffffff" fg="#000000" label="Black on White" sublabel="#000 on #fff" />
          <PairingCard num="03" bg="#111111" fg="#ffffff" label="White on Surface" sublabel="#fff on #111" />
          <PairingCard num="04" bg="#f5f5f5" fg="#000000" label="Black on Light" sublabel="#000 on #f5f5f5" />
        </div>

        {/* In use */}
        <div>
          <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-tertiary)', fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            In Use
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UsageSample num="01" bg="#000000">
              <p style={{ fontFamily: '"Anton", sans-serif', fontSize: '2rem', color: '#ffffff', textTransform: 'uppercase', lineHeight: 1.1 }}>
                From Dump<br />To Done
              </p>
              <p className="mt-2 text-xs" style={{ fontFamily: '"Roboto", sans-serif', color: 'rgba(255,255,255,0.5)' }}>
                Connect once.
              </p>
            </UsageSample>
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

        {/* Primitive scale grid */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-6"
            style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>The palette</p>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
            <PaletteColumn name="Yellow" stops={[
              { label: 'Yellow 100', cssVar: '--yellow-100', dark: true },
              { label: 'Yellow 200', cssVar: '--yellow-200', dark: true },
              { label: 'Yellow 300', cssVar: '--yellow-300', dark: true },
              { label: 'Yellow 400', cssVar: '--yellow-400', dark: true },
              { label: 'Yellow 500', cssVar: '--yellow-500', dark: true },
              { label: 'Yellow 600', cssVar: '--yellow-600' },
              { label: 'Yellow 700', cssVar: '--yellow-700' },
              { label: 'Yellow 800', cssVar: '--yellow-800' },
              { label: 'Yellow 900', cssVar: '--yellow-900' },
            ]} />
            <PaletteColumn name="Pink" stops={[
              { label: 'Pink 100', cssVar: '--pink-100', dark: true },
              { label: 'Pink 200', cssVar: '--pink-200', dark: true },
              { label: 'Pink 300', cssVar: '--pink-300', dark: true },
              { label: 'Pink 400', cssVar: '--pink-400', dark: true },
              { label: 'Pink 500', cssVar: '--pink-500' },
              { label: 'Pink 600', cssVar: '--pink-600' },
              { label: 'Pink 700', cssVar: '--pink-700' },
              { label: 'Pink 800', cssVar: '--pink-800' },
              { label: 'Pink 900', cssVar: '--pink-900' },
            ]} />
            <PaletteColumn name="Gray" stops={[
              { label: 'Gray 0',   cssVar: '--gray-0',   dark: true },
              { label: 'Gray 50',  cssVar: '--gray-50',  dark: true },
              { label: 'Gray 100', cssVar: '--gray-100', dark: true },
              { label: 'Gray 200', cssVar: '--gray-200', dark: true },
              { label: 'Gray 300', cssVar: '--gray-300', dark: true },
              { label: 'Gray 400', cssVar: '--gray-400' },
              { label: 'Gray 500', cssVar: '--gray-500' },
              { label: 'Gray 600', cssVar: '--gray-600' },
              { label: 'Gray 700', cssVar: '--gray-700' },
              { label: 'Gray 800', cssVar: '--gray-800' },
              { label: 'Gray 850', cssVar: '--gray-850' },
              { label: 'Gray 900', cssVar: '--gray-900' },
            ]} />
            <PaletteColumn name="Red" stops={[
              { label: 'Red 50',  cssVar: '--red-50',  dark: true },
              { label: 'Red 200', cssVar: '--red-200', dark: true },
              { label: 'Red 400', cssVar: '--red-400' },
              { label: 'Red 600', cssVar: '--red-600' },
              { label: 'Red 900', cssVar: '--red-900' },
            ]} />
            <PaletteColumn name="Green" stops={[
              { label: 'Green 50',  cssVar: '--green-50',  dark: true },
              { label: 'Green 200', cssVar: '--green-200', dark: true },
              { label: 'Green 400', cssVar: '--green-400' },
              { label: 'Green 600', cssVar: '--green-600' },
              { label: 'Green 900', cssVar: '--green-900' },
            ]} />
            <PaletteColumn name="Amber" stops={[
              { label: 'Amber 50',  cssVar: '--amber-50',  dark: true },
              { label: 'Amber 200', cssVar: '--amber-200', dark: true },
              { label: 'Amber 400', cssVar: '--amber-400', dark: true },
              { label: 'Amber 600', cssVar: '--amber-600' },
              { label: 'Amber 900', cssVar: '--amber-900' },
            ]} />
          </div>
        </div>

        {/* Usage guidelines */}
        <div className="rounded-2xl p-8" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ fontFamily: '"Anton", sans-serif', textTransform: 'uppercase', fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
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
    </FoundationShell>
  );
}
