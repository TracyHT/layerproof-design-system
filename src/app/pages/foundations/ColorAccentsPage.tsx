import { FoundationShell } from '../../components/FoundationShell';
import { CopyChip, PairingCard, UsageSample } from '../../components/ColorHelpers';

export function ColorAccentsPage() {
  return (
    <FoundationShell
      title="Accents"
      description="Yellow and pink are accent-only colors — never use as backgrounds for large areas or primary buttons. Accent colors always pair against black or white, never against each other."
    >
      <div className="space-y-12" style={{ color: 'var(--color-text-primary)' }}>

        {/* Yellow scale */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>Yellow</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {[
              { hex: '#fffde8', dark: true },
              { hex: '#fff8c0', dark: true },
              { hex: '#fff094', dark: true },
              { hex: '#ffe860', dark: true },
              { hex: '#ffde42', dark: true },
              { hex: '#e6c200', dark: true },
              { hex: '#b89900' },
              { hex: '#7a6600' },
              { hex: '#3d3300' },
            ].map(s => <CopyChip key={s.hex} hex={s.hex} dark={s.dark} />)}
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
            ].map(s => <CopyChip key={s.hex} hex={s.hex} dark={s.dark} />)}
          </div>
        </div>

        {/* Accent pairings */}
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>Accent Pairings</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <PairingCard num="01" bg="#000000" fg="#f0d040" label="Yellow on Black" sublabel="#f0d040 on #000" />
            <PairingCard num="02" bg="#000000" fg="#e8336c" label="Pink on Black" sublabel="#e8336c on #000" />
            <PairingCard num="03" bg="#f0d040" fg="#000000" label="Black on Yellow" sublabel="#000 on #f0d040" />
            <PairingCard num="04" bg="#e8336c" fg="#ffffff" label="White on Pink" sublabel="#fff on #e8336c" />
          </div>
        </div>

        {/* In use */}
        <div>
          <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-text-tertiary)', fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            In Use
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <UsageSample num="01" bg="#000000">
              <p style={{ fontFamily: '"Anton", sans-serif', fontSize: '1.5rem', textTransform: 'uppercase', lineHeight: 1.1 }}>
                <span style={{ color: '#ffffff' }}>From </span>
                <span style={{ color: '#f0d040' }}>Dump</span>
                <br />
                <span style={{ color: '#ffffff' }}>To </span>
                <span style={{ color: '#e8336c' }}>Done</span>
              </p>
            </UsageSample>
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

      </div>
    </FoundationShell>
  );
}
