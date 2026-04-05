import { CopyChip, PairingCard } from './ColorHelpers';

export function ColorsSection() {
  return (
    <div className="space-y-16" style={{ color: 'var(--color-text-primary)' }}>

      {/* Accents */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-1"
          style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>Color</p>
        <h3 style={{ fontFamily: '"Anton", sans-serif', textTransform: 'uppercase', fontSize: '2rem', color: 'var(--color-text-primary)', marginBottom: '1.5rem' }}>
          Accents
        </h3>

        <div className="mb-5">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>Yellow</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {[
              { hex: '#fffde8', dark: true }, { hex: '#fff8c0', dark: true },
              { hex: '#fff094', dark: true }, { hex: '#ffe860', dark: true },
              { hex: '#ffde42', dark: true }, { hex: '#e6c200', dark: true },
              { hex: '#b89900' }, { hex: '#7a6600' }, { hex: '#3d3300' },
            ].map(s => <CopyChip key={s.hex} hex={s.hex} dark={s.dark} />)}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>Pink</p>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
            {[
              { hex: '#fde8ef', dark: true }, { hex: '#fbc5d8', dark: true },
              { hex: '#f598bb', dark: true }, { hex: '#ef6994', dark: true },
              { hex: '#e8336c' }, { hex: '#c43460' },
              { hex: '#9a2550' }, { hex: '#6e1839' }, { hex: '#440e23' },
            ].map(s => <CopyChip key={s.hex} hex={s.hex} dark={s.dark} />)}
          </div>
        </div>
      </div>

      {/* Core pairings */}
      <div>
        <p className="text-xs font-semibold tracking-widest uppercase mb-4"
          style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>Core Pairings</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PairingCard num="01" bg="#000000" fg="#ffffff" label="White on Black" sublabel="#fff on #000" />
          <PairingCard num="02" bg="#ffffff" fg="#000000" label="Black on White" sublabel="#000 on #fff" />
          <PairingCard num="03" bg="#000000" fg="#f0d040" label="Yellow on Black" sublabel="#f0d040 on #000" />
          <PairingCard num="04" bg="#000000" fg="#e8336c" label="Pink on Black" sublabel="#e8336c on #000" />
        </div>
      </div>

    </div>
  );
}
