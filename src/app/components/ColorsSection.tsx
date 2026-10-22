import { CopyChip, PairingCard } from './ColorHelpers';


export function ColorsSection() {
  return (
    <div className="space-y-16" style={{ color: 'var(--foreground-primary)' }}>

      {/* Accent */}
      <div>
        <h3 className="lp-subsection__title">Color</h3>
        <h3 className="type-h4" style={{ marginBottom: '1.5rem' }}>Accent</h3>

        <div>
          <h3 className="lp-subsection__title">Pink · brand accent</h3>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-11 gap-2">
            {[
              { hex: '#fef4f7', dark: true }, { hex: '#fde8ef', dark: true }, { hex: '#fbc5d8', dark: true },
              { hex: '#f598bb', dark: true }, { hex: '#ef6994', dark: true }, { hex: '#ff589b', dark: true },
              { hex: '#c43460' }, { hex: '#9a2550' }, { hex: '#6e1839' }, { hex: '#440e23' }, { hex: '#290b17' },
            ].map(s => <CopyChip key={s.hex} hex={s.hex} dark={s.dark} />)}
          </div>
        </div>
      </div>

      {/* Core pairings */}
      <div>
        <h3 className="lp-subsection__title">Core pairings</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <PairingCard num="01" bg="#ffffff" fg="#1a1a1a" label="Primary on canvas" sublabel="Gray 900 on White" />
          <PairingCard num="02" bg="#1a1a1a" fg="#f5f5f5" label="Primary on dark canvas" sublabel="Gray 100 on Gray 900" />
          <PairingCard num="03" bg="#ff589b" fg="#1a1a1a" label="On-accent on Pink" sublabel="Gray 900 on Pink 500" />
          <PairingCard num="04" bg="#ffffff" fg="#9a2550" label="Accent text on white" sublabel="Pink 700 on White" />
        </div>
      </div>

    </div>
  );
}
