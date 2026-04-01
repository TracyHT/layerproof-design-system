import { useState } from 'react';
import { ArrowRight, Download, Plus, Zap, RefreshCw } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ComponentShell } from '../../components/ComponentShell';

// ─── Shared primitives ────────────────────────────────────────────────────────

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-1" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', textTransform: 'uppercase', color: 'var(--color-text-primary)' }}>
    {children}
  </h2>
);

const SectionDesc = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
    {children}
  </p>
);

const C = ({ children }: { children: string }) => (
  <code className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)' }}>
    {children}
  </code>
);

const CodeBlock = ({ children }: { children: string }) => (
  <div className="rounded-b-xl overflow-hidden" style={{ borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
    <div className="px-4 py-2 text-xs font-mono flex items-center gap-2" style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border)' }}>
      <span>tsx</span>
    </div>
    <pre className="p-4 text-sm font-mono overflow-x-auto" style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>{children}</pre>
  </div>
);

const Example = ({
  label,
  description,
  code,
  bg = 'var(--color-background)',
  children,
}: {
  label: string;
  description?: string;
  code: string;
  bg?: string;
  children: React.ReactNode;
}) => (
  <div className="mb-10">
    {description && (
      <p className="text-sm mb-3" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{description}</p>
    )}
    <div
      className="rounded-t-xl px-8 py-10 flex flex-wrap gap-4 items-center"
      style={{ background: bg, border: '1px solid var(--color-border)', borderBottom: 'none' }}
    >
      <div className="flex flex-wrap gap-3 items-center w-full">
        <span className="text-xs uppercase tracking-widest mb-4 w-full" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>
          {label}
        </span>
        {children}
      </div>
    </div>
    <CodeBlock>{code}</CodeBlock>
  </div>
);

// ─── Playground ───────────────────────────────────────────────────────────────

type BVariant   = 'default' | 'accent' | 'neutral' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
type BSize      = 'sm' | 'default' | 'lg' | 'icon';
type IconPos    = 'none' | 'leading' | 'trailing';
type ColorMode  = 'light' | 'dark';

// Grouped by Figma Type — alwaysDark forces dark canvas regardless of colorMode
const VARIANT_GROUPS: { group: string; description: string; alwaysDark?: boolean; variants: { v: BVariant; label: string }[] }[] = [
  {
    group: 'NEUTRAL',
    description: 'Core action hierarchy — default, secondary, outline, ghost, link',
    variants: [
      { v: 'default',   label: 'Default'   },
      { v: 'secondary', label: 'Secondary' },
      { v: 'outline',   label: 'Outline'   },
      { v: 'ghost',     label: 'Ghost'     },
      { v: 'link',      label: 'Link'      },
    ],
  },
  {
    group: 'ACCENT',
    description: 'Brand yellow CTA — one per view',
    variants: [
      { v: 'accent', label: 'Accent' },
    ],
  },
  {
    group: 'DANGER',
    description: 'Destructive or irreversible actions',
    variants: [
      { v: 'destructive', label: 'Destructive' },
    ],
  },
];

function Seg<T extends string>({
  label, options, value, onChange,
}: { label: string; options: { value: T; display: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono shrink-0" style={{ color: 'var(--color-text-tertiary)' }}>{label}</span>
      <div className="inline-flex rounded-md overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
        {options.map((o, i) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className="px-3 py-1.5 text-xs font-mono transition-colors"
            style={{
              background: value === o.value ? 'var(--color-text-primary)' : 'var(--color-surface)',
              color:      value === o.value ? 'var(--color-background)'   : 'var(--color-text-secondary)',
              borderRight: i < options.length - 1 ? '1px solid var(--color-border)' : undefined,
            }}
          >{o.display}</button>
        ))}
      </div>
    </div>
  );
}

function ToggleSwitch({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none" onClick={onChange}>
      <div className="relative rounded-full transition-colors" style={{ width: 32, height: 18, background: value ? 'var(--color-text-primary)' : 'var(--color-border)' }}>
        <div className="absolute top-[3px] rounded-full transition-transform" style={{ width: 12, height: 12, background: 'var(--color-text-inverse)', transform: value ? 'translateX(17px)' : 'translateX(3px)' }} />
      </div>
      <span className="text-xs font-mono" style={{ color: 'var(--color-text-tertiary)' }}>{label}</span>
    </label>
  );
}

function ButtonPlayground() {
  const [size,      setSize]      = useState<BSize>('default');
  const [iconPos,   setIconPos]   = useState<IconPos>('none');
  const [disabled,  setDisabled]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [colorMode, setColorMode] = useState<ColorMode>('light');
  const [active,    setActive]    = useState<BVariant | null>(null);
  const isIcon = size === 'icon';

  return (
    <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
      {/* Global controls */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4" style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <Seg<BSize> label="size" value={size} onChange={setSize}
          options={[{ value:'sm',display:'sm' },{ value:'default',display:'md' },{ value:'lg',display:'lg' },{ value:'icon',display:'icon' }]} />
        {!isIcon && (
          <Seg<IconPos> label="icon" value={iconPos} onChange={setIconPos}
            options={[{ value:'none',display:'none' },{ value:'leading',display:'leading' },{ value:'trailing',display:'trailing' }]} />
        )}
        <Seg<ColorMode> label="color mode" value={colorMode} onChange={setColorMode}
          options={[{ value:'light',display:'Light' },{ value:'dark',display:'Dark' }]} />
        <ToggleSwitch label="disabled" value={disabled} onChange={() => setDisabled(d => !d)} />
        <ToggleSwitch label="loading"  value={loading}  onChange={() => setLoading(l => !l)}  />
      </div>

      {/* Separated group cards */}
      <div className="flex flex-col">
        {VARIANT_GROUPS.map(({ group, description, alwaysDark, variants }, gi) => {
          const isDark = alwaysDark || colorMode === 'dark';
          const isLast = gi === VARIANT_GROUPS.length - 1;
          return (
            <div key={group} style={{ borderBottom: isLast ? 'none' : '1px solid var(--color-border)' }}>
              {/* Group header */}
              <div
                className="flex items-baseline gap-3 px-5 py-2.5"
                style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}
              >
                <span
                  className="text-xs uppercase tracking-widest font-semibold"
                  style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}
                >
                  {group}
                </span>
                <span
                  className="text-xs"
                  style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}
                >
                  {description}
                </span>
              </div>
              {/* Preview canvas — scoped data-theme for CSS variable cascade */}
              <div
                data-theme={isDark ? 'dark' : 'light'}
                className="px-8 py-8 flex flex-wrap gap-6 items-end transition-colors"
                style={{
                  background: isDark ? '#0a0a0a' : 'var(--color-background)',
                  minHeight: 120,
                }}
              >
                {variants.map(({ v, label }) => (
                  <div key={v} className="flex flex-col items-center gap-2.5">
                    <Button
                      variant={v} size={size} disabled={disabled}
                      aria-label={isIcon ? label : undefined}
                      onClick={() => setActive(active === v ? null : v)}
                    >
                      {loading && !isIcon ? <RefreshCw size={13} className="animate-spin" /> : null}
                      {isIcon ? <Zap size={15} /> : (
                        <>
                          {iconPos === 'leading'  && !loading && <Plus size={13} />}
                          {label}
                          {iconPos === 'trailing' && !loading && <ArrowRight size={13} />}
                        </>
                      )}
                    </Button>
                    <div className="flex flex-col items-center gap-0.5 text-center">
                      <span className="text-xs font-semibold" style={{ color: isDark ? '#a3a3a3' : 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>{label}</span>
                      <code className="text-xs" style={{ color: isDark ? '#525252' : 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                        {v === 'default' ? 'default' : `"${v}"`}
                      </code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Code hint */}
      {active && (
        <div className="px-5 py-3 text-xs font-mono" style={{ background: 'var(--color-surface-hover)', borderTop: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}>
          <span style={{ color: 'var(--color-text-tertiary)' }}>{'// → '}</span>
          {`<Button${active !== 'default' ? ` variant="${active}"` : ''}${size !== 'default' ? ` size="${size}"` : ''}${disabled ? ' disabled' : ''}>${VARIANT_GROUPS.flatMap(g => g.variants).find(x => x.v === active)!.label}</Button>`}
        </div>
      )}
    </div>
  );
}

// ─── Loading spinner simulation ───────────────────────────────────────────────

function LoadingButton({ variant = 'default', label = 'Saving' }: { variant?: BVariant; label?: string }) {
  const [busy, setBusy] = useState(false);
  const start = () => { setBusy(true); setTimeout(() => setBusy(false), 2000); };
  return (
    <Button variant={variant} disabled={busy} onClick={start}>
      {busy ? <RefreshCw size={13} className="animate-spin" /> : null}
      {busy ? 'Loading…' : label}
    </Button>
  );
}

// ─── When-to-use card ─────────────────────────────────────────────────────────

const UseCaseCard = ({ swatchColor, swatchLabel, variant, title, subtitle, use, avoid }: {
  swatchColor: string; swatchLabel: string; variant: BVariant;
  title: string; subtitle: string; use: string[]; avoid: string[];
}) => (
  <div className="rounded-xl p-5 flex flex-col gap-4" style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-md shrink-0" style={{ background: swatchColor, border: '1px solid var(--color-border)' }} />
      <div>
        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-body)' }}>{title}</p>
        <p className="text-xs" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>{swatchLabel}</p>
      </div>
    </div>
    <Button variant={variant} size="sm" className="w-fit">{subtitle}</Button>
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Use for</p>
      <ul className="space-y-1">
        {use.map(item => <li key={item} className="flex gap-2 text-xs" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}><span style={{ color: 'var(--success-default)' }}>✓</span>{item}</li>)}
      </ul>
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>Avoid</p>
      <ul className="space-y-1">
        {avoid.map(item => <li key={item} className="flex gap-2 text-xs" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}><span style={{ color: 'var(--danger-default)' }}>✕</span>{item}</li>)}
      </ul>
    </div>
  </div>
);

// ─── Tab content ──────────────────────────────────────────────────────────────

function ExamplesTab() {
  return (
    <>
      {/* Playground */}
      <section className="mb-16">
        <SectionHeading>Playground</SectionHeading>
        <SectionDesc>
          Toggle size, icon position, loading, and disabled state across all variant groups. Switch between Light and Dark color mode to preview how buttons look in each context. Click any button to see its code.
        </SectionDesc>
        <ButtonPlayground />
      </section>

      {/* Appearance */}
      <section className="mb-16">
        <SectionHeading>Appearance</SectionHeading>
        <SectionDesc>
          Use <C>variant</C> to set the visual style. The variants form a hierarchy — <C>accent</C> at the top (one per page), <C>link</C> at the bottom.
        </SectionDesc>

        <Example label="Default — primary action in forms and dialogs" code={`<Button>Submit</Button>`}>
          <Button>Submit</Button>
        </Example>

        <Example
          label="Accent — primary brand CTA"
          description="16:1 contrast ratio, black text on #FFDE42 (WCAG AAA). Use at most once per view."
          code={`<Button variant="accent" size="lg">Get started</Button>`}
        >
          <Button variant="accent" size="lg">Get started</Button>
        </Example>

        <Example
          label="Secondary — supporting action"
          code={`<Button variant="secondary">Save draft</Button>`}
        >
          <Button variant="secondary">Save draft</Button>
        </Example>

        <Example
          label="Outline — bordered low emphasis"
          code={`<Button variant="outline">Cancel</Button>`}
        >
          <Button variant="outline">Cancel</Button>
        </Example>

        <Example
          label="Ghost — minimal chrome, contextual"
          code={`<Button variant="ghost">More options</Button>`}
        >
          <Button variant="ghost">More options</Button>
        </Example>

        <Example
          label="Destructive — irreversible action"
          code={`<Button variant="destructive">Delete account</Button>`}
        >
          <Button variant="destructive">Delete account</Button>
        </Example>

        <Example
          label="Link — inline text-level action"
          code={`<Button variant="link">Learn more</Button>`}
        >
          <Button variant="link">Learn more</Button>
        </Example>

      </section>

      {/* Sizing */}
      <section className="mb-16">
        <SectionHeading>Sizing</SectionHeading>
        <SectionDesc>
          Four sizes — <C>sm</C>, <C>default</C>, <C>lg</C>, and <C>icon</C>.
        </SectionDesc>

        <Example
          label="sm / default / lg"
          code={`<Button size="sm">Small</Button>\n<Button>Default</Button>\n<Button size="lg">Large</Button>`}
        >
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </Example>

        <Example
          label="Icon — square hit area, always pair with aria-label"
          code={`<Button size="icon" aria-label="Add item"><Plus /></Button>\n<Button size="icon" variant="accent" aria-label="Star"><Zap /></Button>\n<Button size="icon" variant="outline" aria-label="Next"><ArrowRight /></Button>`}
        >
          <Button size="icon" aria-label="Add item"><Plus size={16} /></Button>
          <Button size="icon" variant="accent" aria-label="Star"><Zap size={16} /></Button>
          <Button size="icon" variant="outline" aria-label="Next"><ArrowRight size={16} /></Button>
        </Example>
      </section>

      {/* With icons */}
      <section className="mb-16">
        <SectionHeading>With icons</SectionHeading>
        <SectionDesc>
          Pair icons with buttons to reinforce the action. Use a leading icon to set context and a trailing icon to indicate direction or outcome.
        </SectionDesc>

        <Example
          label="Leading icon — context before the label"
          code={`<Button><Plus size={16} /> New item</Button>\n<Button variant="accent"><Plus size={16} /> Get started</Button>`}
        >
          <Button><Plus size={16} /> New item</Button>
          <Button variant="accent"><Plus size={16} /> Get started</Button>
        </Example>

        <Example
          label="Trailing icon — direction or outcome after the label"
          code={`<Button variant="outline">Download <Download size={16} /></Button>\n<Button variant="secondary">Continue <ArrowRight size={16} /></Button>`}
        >
          <Button variant="outline">Download <Download size={16} /></Button>
          <Button variant="secondary">Continue <ArrowRight size={16} /></Button>
        </Example>
      </section>

      {/* Loading */}
      <section className="mb-16">
        <SectionHeading>Loading</SectionHeading>
        <SectionDesc>
          Show a spinner while an async action is in progress. Set <C>disabled</C> during loading to prevent duplicate submissions. Click the buttons below to see the 2-second simulation.
        </SectionDesc>

        <Example
          label="Loading state — click to trigger"
          code={`<Button disabled={isLoading}>
  {isLoading ? <RefreshCw className="animate-spin" /> : null}
  {isLoading ? 'Saving…' : 'Save'}
</Button>`}
        >
          <LoadingButton variant="default"  label="Save" />
          <LoadingButton variant="accent"   label="Get started" />
          <LoadingButton variant="outline"  label="Retry" />
        </Example>
      </section>

      {/* Disabled */}
      <section className="mb-16">
        <SectionHeading>Disabled</SectionHeading>
        <SectionDesc>
          The <C>disabled</C> prop prevents all interaction and reduces opacity to 50%.
        </SectionDesc>

        <Example
          label="Disabled — all variants"
          code={`<Button disabled>Default</Button>\n<Button disabled variant="accent">Accent</Button>\n<Button disabled variant="outline">Outline</Button>\n<Button disabled variant="destructive">Destructive</Button>`}
        >
          <Button disabled>Default</Button>
          <Button disabled variant="accent">Accent</Button>
          <Button disabled variant="outline">Outline</Button>
          <Button disabled variant="destructive">Destructive</Button>
        </Example>
      </section>
    </>
  );
}

function CodeTab() {
  return (
    <>
      <section className="mb-16">
        <SectionHeading>Import</SectionHeading>
        <div className="mt-4 rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          <div className="px-4 py-2 text-xs font-mono" style={{ background: 'var(--color-surface-hover)', color: 'var(--color-text-tertiary)', borderBottom: '1px solid var(--color-border)' }}>tsx</div>
          <pre className="p-4 text-sm font-mono" style={{ background: 'var(--color-surface)', color: 'var(--color-text-secondary)' }}>{`import { Button } from '@/components/ui/button';`}</pre>
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading>API Reference</SectionHeading>
        <div className="rounded-xl overflow-hidden mt-6" style={{ border: '1px solid var(--color-border)' }}>
          <table className="w-full text-sm" style={{ fontFamily: 'var(--font-body)' }}>
            <thead>
              <tr style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold" style={{ color: 'var(--color-text-primary)' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['variant', '"default" | "accent" | "neutral" | "secondary" | "outline" | "ghost" | "destructive" | "link"', '"default"', 'Visual style. accent = brand CTA (WCAG AAA). neutral = toolbar/filter.'],
                ['size',    '"sm" | "default" | "lg" | "icon"', '"default"', 'Button size. icon creates a square equal-padding button.'],
                ['asChild', 'boolean', 'false', 'Merges props onto child element via Radix Slot — use to render as <a> or router Link.'],
                ['disabled','boolean', 'false', 'Prevents interaction and applies 50% opacity.'],
              ].map(([prop, type, def, desc], i) => (
                <tr key={prop} style={{ borderBottom: i < 3 ? '1px solid var(--color-border)' : undefined, background: i % 2 === 0 ? 'var(--color-background)' : 'var(--color-surface)' }}>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-primary)' }}>{prop}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--brand-secondary)' }}>{type}</td>
                  <td className="px-4 py-3 font-mono text-xs" style={{ color: 'var(--color-text-tertiary)' }}>{def}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--color-text-secondary)' }}>{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function UsageTab() {
  return (
    <>
      <section className="mb-16">
        <SectionHeading>When to use</SectionHeading>
        <SectionDesc>
          The three primary variants form a visual hierarchy. Use at most one <C>accent</C> button per view.
        </SectionDesc>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <UseCaseCard
            swatchColor="var(--accent-surface-default)" swatchLabel="#FFDE42 — brand yellow"
            variant="accent" title="Accent" subtitle="Get started"
            use={['Primary brand CTAs', 'Hero section actions', 'Page-level calls-to-action']}
            avoid={['More than one per view', 'Inside forms or dialogs', 'Toolbar or grouped controls']}
          />
          <UseCaseCard
            swatchColor="var(--color-text-primary)" swatchLabel="Black / white — primary"
            variant="default" title="Default" subtitle="Submit"
            use={['Primary action in forms', '"Save", "Confirm", "Continue"', 'Dialog / modal confirm']}
            avoid={['Page-hero CTAs (use accent)', 'Low-priority inline actions', 'Multiple per form section']}
          />
          <UseCaseCard
            swatchColor="var(--neutral-surface-disable)" swatchLabel="Gray — low emphasis"
            variant="neutral" title="Neutral" subtitle="Filter"
            use={['Filter chips and tags', 'Toolbar controls', 'Inline UI actions']}
            avoid={['Primary or hero CTAs', 'Confirming destructive actions', 'Replacing outline/ghost in lists']}
          />
        </div>
        <p className="text-xs" style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>
          Outline, ghost, and link sit below this hierarchy for low-emphasis or supplemental actions.
        </p>
      </section>
    </>
  );
}

function ChangelogTab() {
  return (
    <section className="mb-16">
      <p className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
        No breaking changes.
      </p>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ButtonPage() {
  return (
    <ComponentShell
      title="Button"
      description="Triggers an action or event such as submitting a form, opening a dialog, or navigating to a new page."
      tabs={['Examples', 'Code', 'Usage', 'Changelog']}
    >
      {(activeTab: string) => {
        if (activeTab === 'Code')      return <CodeTab />;
        if (activeTab === 'Usage')     return <UsageTab />;
        if (activeTab === 'Changelog') return <ChangelogTab />;
        return <ExamplesTab />;
      }}
    </ComponentShell>
  );
}
