import { Link } from 'react-router';
import { FoundationShell } from '../../components/FoundationShell';

const tocItems = [
  { id: 'what-are-tokens',   label: 'What are design tokens?', level: 1 as const },
  { id: 'what-are-themes',   label: 'What are themes?',        level: 1 as const },
  { id: 'why-tokens',        label: 'Why use design tokens?',  level: 1 as const },
  { id: 'how-to-read',       label: 'How to read token names', level: 1 as const },
  { id: 'best-practices',    label: 'Best practices',          level: 1 as const },
  { id: 'examples',          label: 'Token examples',          level: 1 as const },
  { id: 'example-color',     label: 'Color tokens',            level: 2 as const },
  { id: 'example-elevation', label: 'Elevation tokens',        level: 2 as const },
  { id: 'example-opacity',   label: 'Opacity tokens',          level: 2 as const },
  { id: 'example-space',     label: 'Space tokens',            level: 2 as const },
  { id: 'example-typography','label': 'Typography tokens',     level: 2 as const },
];

const H2: React.CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: '1.375rem',
  textTransform: 'uppercase',
  color: 'var(--color-text-primary)',
  marginBottom: '0.75rem',
  marginTop: 0,
};

const P: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.9375rem',
  color: 'var(--color-text-secondary)',
  lineHeight: 1.7,
  margin: 0,
};

const CALLOUT: React.CSSProperties = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderLeft: '3px solid var(--brand-primary)',
  borderRadius: '0 0.75rem 0.75rem 0',
  padding: '1rem 1.25rem',
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-12">
      <h2 style={H2}>{title}</h2>
      {children}
    </section>
  );
}

function TokenNamePart({ label, description, color }: { label: string; description: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center" style={{ flex: '1 1 0', minWidth: 100 }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', fontWeight: 700, color, background: `${color}18`, padding: '0.3rem 0.75rem', borderRadius: '0.5rem', border: `1px solid ${color}44` }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
        {description}
      </span>
    </div>
  );
}

function DoCard({ do: isDo, children }: { do: boolean; children: React.ReactNode }) {
  const accent = isDo ? '#10b981' : '#ef4444';
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${accent}44` }}>
      <div className="px-4 py-2 flex items-center gap-2" style={{ background: `${accent}18`, borderBottom: `1px solid ${accent}33` }}>
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: accent }}>
          {isDo ? '✓ Do' : '✕ Don\'t'}
        </span>
      </div>
      <div className="p-4" style={{ background: 'var(--color-surface)' }}>
        {children}
      </div>
    </div>
  );
}

function TokenExampleRow({ token, value, use }: { token: string; value: string; use: string }) {
  const isColorVal = /^#[0-9a-f]{3,8}$/i.test(value);
  return (
    <div className="flex items-center gap-4 px-4 py-2.5" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--brand-primary)', minWidth: 260, flexShrink: 0 }}>
        {token}
      </code>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)', flex: 1 }}>
        {use}
      </span>
      <div className="flex items-center gap-2 shrink-0">
        {isColorVal && (
          <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: 3, background: value, border: '1px solid var(--color-border)', flexShrink: 0 }} />
        )}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
          {value}
        </code>
      </div>
    </div>
  );
}

export function TokensExplainedPage() {
  return (
    <FoundationShell
      tag="Foundations / Tokens"
      title="Design tokens explained"
      description="Design tokens are the single source of truth to name and store design decisions for LayerProof app experiences."
      tocItems={tocItems}
    >

      {/* Intro */}
      <p style={{ ...P, fontSize: '1rem', marginBottom: '3rem' }}>
        Design tokens are the new way to apply visual foundations in LayerProof. We use tokens to standardize colors, elevations, spacing, and other styles across all surfaces and themes.
      </p>

      {/* What are design tokens */}
      <Section id="what-are-tokens" title="What are design tokens?">
        <p style={P}>
          Design tokens are name and value pairings that represent small, repeatable design decisions. A token can be a color, font style, unit of white space, or even a motion animation designed for a specific need.
        </p>
        <div style={{ ...CALLOUT, marginTop: '1.25rem' }}>
          <p style={{ ...P, fontSize: '0.9rem' }}>
            For example, instead of choosing one of many shades of yellow for an icon, we apply a design token that is consistent with all similar usages across our interfaces:{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--brand-primary)' }}>--brand-primary</code>.
            This token always resolves to the correct value for the active theme — no more hunting for the right hex code.
          </p>
        </div>

        {/* Token anatomy diagram */}
        <div className="rounded-xl mt-6 p-5" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p style={{ ...P, fontSize: '0.8125rem', marginBottom: '1rem', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>
            Token anatomy
          </p>
          <div className="rounded-lg px-5 py-4 mb-5 flex items-center justify-center" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', letterSpacing: '0.02em' }}>
              <span style={{ color: '#f0d040' }}>color</span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>.</span>
              <span style={{ color: '#60a5fa' }}>text</span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>.</span>
              <span style={{ color: '#34d399' }}>secondary</span>
            </code>
          </div>
          <div className="flex gap-4 flex-wrap">
            <TokenNamePart label="color"     description="Foundation — the type of visual attribute" color="#f0d040" />
            <TokenNamePart label="text"      description="Property — the UI element it applies to"   color="#60a5fa" />
            <TokenNamePart label="secondary" description="Modifier — emphasis, role, or state"        color="#34d399" />
          </div>
        </div>
      </Section>

      {/* What are themes */}
      <Section id="what-are-themes" title="What are themes?">
        <p style={P}>
          A theme is a collection of token values designed to achieve a certain look or style. Themes are how we switch color schemes and styles everywhere using a single set of tokens.
        </p>
        <p style={{ ...P, marginTop: '0.875rem' }}>
          Light mode, dark mode, and high-contrast mode are all examples of theming. Non-color themes are also possible — think cozy/comfortable/compact views, reduced motion, or custom typography styles.
        </p>

        <div className="grid gap-3 mt-5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
          {[
            { label: 'Light mode',  bg: '#f5f5f5', surface: '#ffffff', text: '#0a0a0a', border: '#d4d4d4' },
            { label: 'Dark mode',   bg: '#000000', surface: '#111111', text: '#ffffff',  border: '#2a2a2a' },
          ].map(({ label, bg, surface, text, border }) => (
            <div key={label} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
              <div className="px-4 py-3" style={{ background: bg }}>
                <div className="rounded-lg px-3 py-3 mb-2" style={{ background: surface, border: `1px solid ${border}` }}>
                  <div className="rounded mb-2" style={{ height: 8, width: '70%', background: text, opacity: 0.8 }} />
                  <div className="rounded" style={{ height: 6, width: '50%', background: text, opacity: 0.3 }} />
                </div>
                <div className="rounded" style={{ height: 6, width: '40%', background: text, opacity: 0.15 }} />
              </div>
              <div className="px-3 py-2" style={{ background: surface, borderTop: `1px solid ${border}` }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: text }}>{label}</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Why use tokens */}
      <Section id="why-tokens" title="Why use design tokens?">
        <div className="space-y-3">
          {[
            { icon: '◑', title: 'Global theming',        body: 'Features like dark mode, high contrast, and user customization are only possible with tokens. Swap an entire theme by changing token values — no code changes needed.' },
            { icon: '⇄', title: 'Streamlined handover',  body: 'Tokens simplify design-to-development handover by creating a shared vocabulary. Designers and developers reference the same token name rather than specific hex or pixel values.' },
            { icon: '∞', title: 'Scale without breakage',body: 'As the visual language evolves, changes can be made once at the token level and propagate everywhere. No more find-and-replace of hard-coded values across the codebase.' },
            { icon: '⚡', title: 'Automated tooling',    body: 'Tooling can lint for hard-coded values, auto-complete token names, and flag misuse — making it faster and safer to build consistently.' },
            { icon: '▣', title: 'Visual consistency',    body: 'Tokens are the mechanism that will deliver consistent visual foundations across all LayerProof surfaces, now and as the system grows.' },
          ].map(({ icon, title, body }) => (
            <div key={title} className="flex gap-4 rounded-xl px-5 py-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <span style={{ fontSize: '1.125rem', flexShrink: 0, marginTop: 1, color: 'var(--brand-primary)' }}>{icon}</span>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-text-primary)', margin: '0 0 0.25rem' }}>{title}</p>
                <p style={{ ...P, fontSize: '0.875rem' }}>{body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How to read token names */}
      <Section id="how-to-read" title="How to read token names">
        <p style={P}>
          Knowing how to read token names will help you find the right token faster when working in designs and in code. A token's name describes how it should be used — each segment communicates one piece of its usage.
        </p>

        <div className="rounded-xl mt-5 overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
          {[
            { part: 'Foundation',  example: 'color',      description: 'The type of visual design attribute or foundational style — such as color, elevation, space, or font.' },
            { part: 'Property',    example: 'text',       description: 'The UI element the token is being applied to — such as a border, background, shadow, icon, or text.' },
            { part: 'Modifier',    example: 'secondary',  description: 'Additional detail about the token\'s purpose: its role, emphasis, or interaction state. Not every token has a modifier. For example, --color-text is the default text color with no modifier.' },
          ].map(({ part, example, description }, i, arr) => (
            <div key={part} className="flex items-start gap-5 px-5 py-4" style={{ background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-background)', borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--brand-primary)', minWidth: 100, flexShrink: 0 }}>
                {example}
              </code>
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-primary)', margin: '0 0 0.25rem' }}>{part}</p>
                <p style={{ ...P, fontSize: '0.875rem' }}>{description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...CALLOUT, marginTop: '1.25rem' }}>
          <p style={{ ...P, fontSize: '0.875rem' }}>
            Token names may appear in different formats in different environments —{' '}
            <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>--color-text-secondary</code> in CSS,{' '}
            <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>color.text.secondary</code> in Figma variables, or{' '}
            <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)' }}>colorTextSecondary</code> in JavaScript. The underlying token is the same.
          </p>
        </div>
      </Section>

      {/* Best practices */}
      <Section id="best-practices" title="Best practices">
        <p style={{ ...P, marginBottom: '1.25rem' }}>
          Choose tokens based on meaning — not specific values. A token name tells you <em>why</em> it exists, which is more durable than matching a color by eye.
        </p>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          <DoCard do={true}>
            <p style={{ ...P, fontSize: '0.875rem' }}>
              Use tokens with names and descriptions that match your specific situation.
            </p>
            <div className="mt-3 rounded-lg px-4 py-3" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#10b981' }}>
                color: var(--color-text-secondary)
              </code>
            </div>
          </DoCard>
          <DoCard do={false}>
            <p style={{ ...P, fontSize: '0.875rem' }}>
              Don't use a token just because the colors appear to match. This can break the experience in other themes.
            </p>
            <div className="mt-3 rounded-lg px-4 py-3" style={{ background: 'var(--color-background)', border: '1px solid var(--color-border)' }}>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#ef4444' }}>
                color: var(--color-text-tertiary) {/* wrong role */}
              </code>
            </div>
          </DoCard>
        </div>
        <p style={{ ...P, marginTop: '1.25rem', fontSize: '0.875rem' }}>
          Check the <Link to="/foundations/color" style={{ color: 'var(--brand-primary)' }}>color</Link>,{' '}
          <Link to="/foundations/elevation" style={{ color: 'var(--brand-primary)' }}>elevation</Link>, and{' '}
          <Link to="/foundations/spacing" style={{ color: 'var(--brand-primary)' }}>spacing</Link> foundations for additional usage guidance.
        </p>
      </Section>

      {/* Examples */}
      <Section id="examples" title="Design token examples">
        <p style={{ ...P, marginBottom: '2rem' }}>
          Use these examples to get a better understanding of how different tokens work in practice.
        </p>

        {/* Color */}
        <div id="example-color" className="mb-10">
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Color tokens</h3>
          <p style={{ ...P, fontSize: '0.875rem', marginBottom: '1rem' }}>
            There are dedicated color tokens for text, links, icons, backgrounds, borders, blankets, charts, and skeleton loaders.
          </p>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            <TokenExampleRow token="--color-text-primary"   value="#0a0a0a"  use="Default body text color" />
            <TokenExampleRow token="--color-text-secondary" value="#444444"  use="Supporting / secondary text" />
            <TokenExampleRow token="--color-background"     value="#f5f5f5"  use="Page background" />
            <TokenExampleRow token="--color-surface"        value="#ffffff"  use="Card and panel surface" />
            <TokenExampleRow token="--brand-primary"        value="#c9a800"  use="Primary brand — links, active states" />
            <div style={{ padding: '0.5rem 1rem', background: 'var(--color-surface)' }}>
              <Link to="/foundations/color" style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--brand-primary)' }}>
                See all color tokens →
              </Link>
            </div>
          </div>
        </div>

        {/* Elevation */}
        <div id="example-elevation" className="mb-10">
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Elevation tokens</h3>
          <p style={{ ...P, fontSize: '0.875rem', marginBottom: '1rem' }}>
            Elevation tokens apply to the perceived surface level and shadow of an element.
          </p>
          <div className="flex gap-4 flex-wrap">
            {[
              { token: '--shadow-sm', label: 'sm', shadow: '0 1px 2px 0 rgba(0,0,0,0.15)' },
              { token: '--shadow-md', label: 'md', shadow: '0 4px 6px -1px rgba(0,0,0,0.2)' },
              { token: '--shadow-lg', label: 'lg', shadow: '0 10px 15px -3px rgba(0,0,0,0.2)' },
              { token: '--shadow-xl', label: 'xl', shadow: '0 20px 25px -5px rgba(0,0,0,0.2)' },
            ].map(({ token, label, shadow }) => (
              <div key={token} className="flex flex-col items-center gap-3 flex-1 p-5 rounded-xl" style={{ background: 'var(--color-background)', minWidth: 100 }}>
                <div style={{ width: 44, height: 44, background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', boxShadow: shadow }} />
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--brand-primary)', textAlign: 'center' }}>{token}</code>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opacity */}
        <div id="example-opacity" className="mb-10">
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Opacity tokens</h3>
          <p style={{ ...P, fontSize: '0.875rem', marginBottom: '1rem' }}>
            Opacity tokens apply transparency to elements. Use <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)', fontSize: '0.8125rem' }}>opacity: 0.26</code> for disabled interactive elements, and <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--brand-primary)', fontSize: '0.8125rem' }}>opacity: 0.50</code> for content beneath a loading spinner.
          </p>
          <div className="flex gap-3 flex-wrap">
            {[0.08, 0.26, 0.50, 0.70, 1.00].map((opacity) => (
              <div key={opacity} className="flex flex-col items-center gap-2">
                <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-md)', background: 'var(--brand-primary)', opacity }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>{opacity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Space */}
        <div id="example-space" className="mb-10">
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Space tokens</h3>
          <p style={{ ...P, fontSize: '0.875rem', marginBottom: '1rem' }}>
            Space tokens reduce decision-making and allow for consistent spacing between elements. They are designed for both horizontal and vertical spacing in a variety of layout contexts.
          </p>
          <div className="rounded-xl p-5 space-y-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            {[
              { token: '--spacing-xs', value: '0.25rem', px: 4 },
              { token: '--spacing-sm', value: '0.5rem',  px: 8 },
              { token: '--spacing-md', value: '1rem',    px: 16 },
              { token: '--spacing-lg', value: '1.5rem',  px: 24 },
              { token: '--spacing-xl', value: '2rem',    px: 32 },
            ].map(({ token, value, px }) => (
              <div key={token} className="flex items-center gap-4">
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--brand-primary)', minWidth: 160, flexShrink: 0 }}>{token}</code>
                <div style={{ height: 20, width: px * 2, background: 'var(--brand-primary)', borderRadius: 3, opacity: 0.7, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--color-text-tertiary)' }}>{value} — {px}px</span>
              </div>
            ))}
          </div>
          <p style={{ ...P, fontSize: '0.875rem', marginTop: '0.875rem' }}>
            For more on our spacing system, see the{' '}
            <Link to="/foundations/spacing" style={{ color: 'var(--brand-primary)' }}>spacing foundation</Link>.
          </p>
        </div>

        {/* Typography */}
        <div id="example-typography">
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', marginTop: 0 }}>Typography tokens</h3>
          <p style={{ ...P, fontSize: '0.875rem', marginBottom: '1rem' }}>
            Typography tokens include font family, font size, font weight, and line height for all text styles — ensuring visual alignment across every surface.
          </p>
          <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
            {[
              { token: '--font-heading', sample: 'Display Heading', font: 'var(--font-heading)', size: '1.5rem', upper: true },
              { token: '--font-body',    sample: 'Body copy text',  font: 'var(--font-body)',    size: '1rem',   upper: false },
              { token: '--font-mono',    sample: 'Code snippet',    font: 'var(--font-mono)',    size: '0.875rem', upper: false },
            ].map(({ token, sample, font, size, upper }, i) => (
              <div key={token} className="flex items-center gap-5 px-5 py-4" style={{ background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-background)', borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none' }}>
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--brand-primary)', minWidth: 160, flexShrink: 0 }}>{token}</code>
                <span style={{ fontFamily: font, fontSize: size, textTransform: upper ? 'uppercase' : 'none', color: 'var(--color-text-primary)', flex: 1 }}>{sample}</span>
              </div>
            ))}
          </div>
          <p style={{ ...P, fontSize: '0.875rem', marginTop: '0.875rem' }}>
            For more, see the{' '}
            <Link to="/foundations/typography" style={{ color: 'var(--brand-primary)' }}>typography foundation</Link>.
          </p>
        </div>
      </Section>

    </FoundationShell>
  );
}
