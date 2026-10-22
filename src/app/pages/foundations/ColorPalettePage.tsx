import { FoundationShell } from '../../components/FoundationShell';
import { PairingCard, UsageSample, PaletteColumn } from '../../components/ColorHelpers';
import { DoDont } from '../../components/docs';

/** Primitive scales from Figma › Color. `true` = use dark label text on that step. */
const palette: { name: string; note?: string; stops: [string, boolean][] }[] = [
  { name: 'Gray', stops: [['100', true], ['200', true], ['300', true], ['400', true], ['500', false], ['550', false], ['600', false], ['700', false], ['800', false], ['850', false], ['900', false], ['910', false], ['950', false]] },
  { name: 'Pink', note: 'Accent', stops: [['50', true], ['100', true], ['200', true], ['300', true], ['400', true], ['500', true], ['600', false], ['700', false], ['800', false], ['900', false], ['950', false]] },
  { name: 'Red', note: 'Danger', stops: [['50', true], ['100', true], ['200', true], ['300', true], ['400', true], ['500', false], ['600', false], ['700', false], ['800', false], ['900', false], ['950', false]] },
  { name: 'Green', note: 'Success', stops: [['50', true], ['100', true], ['200', true], ['300', true], ['400', true], ['500', true], ['600', true], ['700', false], ['800', false], ['900', false], ['950', false]] },
  { name: 'Orange', note: 'Warning', stops: [['50', true], ['100', true], ['200', true], ['300', true], ['400', true], ['500', true], ['600', true], ['700', true], ['800', false], ['900', false], ['950', false]] },
  { name: 'Cyan', note: 'Info', stops: [['50', true], ['100', true], ['200', true], ['300', true], ['400', true], ['500', true], ['600', true], ['700', false], ['800', false], ['900', false], ['950', false]] },
  { name: 'Yellow', note: 'Primitive only', stops: [['50', true], ['100', true], ['200', true], ['300', true], ['400', true], ['500', true], ['600', true], ['700', true], ['800', false], ['900', false], ['950', false]] },
];


export function ColorPalettePage() {
  return (
    <FoundationShell
      tag={['Foundations', 'Color']}
      title="Color palette"
      description="Neutrals carry almost all LayerProof UI. Pink is the single brand accent; red, green, orange and cyan are reserved for status. Use the semantic tokens in product code — these primitives are what they resolve to."
    >
      <div className="space-y-14" style={{ color: 'var(--foreground-primary)' }}>

        {/* Core neutral pairings */}
        <div className="lp-grid lp-grid--4">
          <PairingCard num="01" bg="#ffffff" fg="#1a1a1a" label="Primary on canvas" sublabel="Gray 900 on White · 17.4:1" />
          <PairingCard num="02" bg="#f5f5f5" fg="#525252" label="Secondary on surface" sublabel="Gray 600 on Gray 100 · 7.2:1" />
          <PairingCard num="03" bg="#1a1a1a" fg="#f5f5f5" label="Primary on dark canvas" sublabel="Gray 100 on Gray 900 · 16.0:1" />
          <PairingCard num="04" bg="#1c1c1c" fg="#a3a3a3" label="Secondary on dark surface" sublabel="Gray 400 on Gray 850 · 6.8:1" />
        </div>

        {/* In use */}
        <div>
          <h3 className="lp-subsection__title">In use</h3>
          <div className="lp-grid lp-grid--3">
            <UsageSample num="01" bg="#1a1a1a">
              <p className="type-h4" style={{ color: '#f5f5f5' }}>
                From dump<br />to done
              </p>
              <p className="mt-2 type-body-xs" style={{ color: '#a3a3a3' }}>
                Connect once.
              </p>
            </UsageSample>
            <UsageSample num="02" bg="#ffffff">
              <div className="flex flex-col gap-3 mt-4">
                <button className="rounded-lg px-5 py-2 type-label-md"
                  style={{ background: 'var(--gray-900)', color: 'var(--base-white)' }}>
                  Start now
                </button>
                <button className="rounded-lg px-5 py-2 type-label-md"
                  style={{ background: 'var(--gray-100)', color: 'var(--gray-900)', border: '1px solid var(--gray-300)' }}>
                  Learn more
                </button>
              </div>
            </UsageSample>
            <UsageSample num="03" bg="#f5f5f5">
              <div className="rounded-xl p-4" style={{ background: '#ffffff', boxShadow: 'var(--shadow-neutral-3)' }}>
                <p className="type-subheading-md" style={{ color: '#1a1a1a' }}>LayerProof</p>
                <p className="type-body-xs mt-1" style={{ color: '#525252' }}>Raised surface on canvas</p>
              </div>
            </UsageSample>
          </div>
        </div>

        {/* Primitive scale grid */}
        <div>
          <h3 className="lp-subsection__title">The palette</h3>
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))' }}>
            {palette.map(({ name, note, stops }) => (
              <PaletteColumn
                key={name}
                name={note ? `${name} · ${note}` : name}
                stops={stops.map(([step, dark]) => ({ label: `${name} ${step}`, cssVar: `--${name.toLowerCase()}-${step}`, dark }))}
              />
            ))}
          </div>
          <p className="type-body-xs mt-4" style={{ color: 'var(--foreground-tertiary)' }}>
            Gray 700 and Gray 850 share the same value (#1c1c1c) in Figma. Yellow is no longer used by any semantic token.
          </p>
        </div>

        {/* Usage guidelines */}
        <div>
          <h3 className="lp-subsection__title">Usage guidelines</h3>
          <DoDont
            dos={[
              <>Build UI from semantic tokens (<code>--background-*</code>, <code>--foreground-*</code>, <code>--border-*</code>)</>,
              'Reserve pink for meaningful emphasis — primary actions, focus, selection',
              'Use each status family only for its meaning: red danger, green success, orange warning, cyan info',
              'Check contrast in both light and dark mode',
            ]}
            donts={[
              'Bind primitives directly in product UI',
              'Use status colours for branding or decoration',
              'Use pink as a large background fill',
              "Bring back yellow as an accent — it's a retired primitive",
            ]}
          />
        </div>

      </div>
    </FoundationShell>
  );
}
