import { FoundationShell } from '../../components/FoundationShell';

const tocItems = [
  { id: 'setup',           label: 'Setup',                  level: 1 as const },
  { id: 'css',             label: 'Using tokens in CSS',    level: 1 as const },
  { id: 'react',           label: 'Using tokens in React',  level: 1 as const },
  { id: 'dark-mode',       label: 'Dark mode',              level: 1 as const },
  { id: 'typescript',      label: 'TypeScript utilities',   level: 1 as const },
  { id: 'dos-and-donts',   label: "Do's and don'ts",        level: 1 as const },
];

const CodeBlock = ({ code }: { code: string }) => (
  <pre style={{
    fontFamily: 'var(--font-mono)',
    fontSize: '0.875rem',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    padding: '1.25rem 1.5rem',
    overflowX: 'auto',
    color: 'var(--color-text-primary)',
    lineHeight: 1.7,
    margin: 0,
  }}>
    <code>{code}</code>
  </pre>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontFamily: 'var(--font-heading)',
    fontSize: '1.375rem',
    textTransform: 'uppercase',
    color: 'var(--color-text-primary)',
    marginBottom: '0.75rem',
    marginTop: 0,
  }}>{children}</h2>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p style={{
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.65,
    margin: '0 0 1rem',
  }}>{children}</p>
);

const DoItem = ({ children }: { children: React.ReactNode }) => (
  <li style={{
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
    padding: '0.5rem 0',
    borderBottom: '1px solid var(--color-border)',
    listStyle: 'none',
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
  }}>
    <span style={{ color: '#22c55e', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
    <span>{children}</span>
  </li>
);

const DontItem = ({ children }: { children: React.ReactNode }) => (
  <li style={{
    fontFamily: 'var(--font-body)',
    fontSize: '0.9375rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.6,
    padding: '0.5rem 0',
    borderBottom: '1px solid var(--color-border)',
    listStyle: 'none',
    display: 'flex',
    gap: 10,
    alignItems: 'flex-start',
  }}>
    <span style={{ color: 'var(--pink-500, #e8336c)', fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✕</span>
    <span>{children}</span>
  </li>
);

export function TokensCodePage() {
  return (
    <FoundationShell
      tag="Foundations / Tokens"
      title="Use tokens in code"
      description="How to consume LayerProof design tokens in CSS, React, and TypeScript."
      tocItems={tocItems}
    >
      <div className="space-y-16">

        {/* 1. Setup */}
        <section id="setup">
          <SectionHeading>Setup</SectionHeading>
          <Body>
            Tokens are distributed as a single CSS file of custom properties. Import it once at the top of your project's main CSS entry point — typically{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--color-text-primary)', background: 'var(--color-surface-hover)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>main.css</code>{' '}
            or{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--color-text-primary)', background: 'var(--color-surface-hover)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>index.css</code>.
          </Body>
          <CodeBlock code={`/* main.css */
@import '@layerproof/tokens/brand-variables.css';`} />
          <Body>
            The file defines all tokens on <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>:root</code> and provides a{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>[data-theme="dark"]</code> override block for dark mode. No build step required — the file ships as plain CSS.
          </Body>
        </section>

        {/* 2. Using tokens in CSS */}
        <section id="css">
          <SectionHeading>Using tokens in CSS</SectionHeading>
          <Body>
            Reference any token with the standard <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>var()</code> function. Token names map directly to the CSS custom property name shown in the token table.
          </Body>
          <CodeBlock code={`.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-md);
  color: var(--color-text-primary);
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-4xl);
  color: var(--color-text-primary);
}

.label {
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}`} />
        </section>

        {/* 3. Using tokens in React */}
        <section id="react">
          <SectionHeading>Using tokens in React</SectionHeading>
          <Body>
            Since tokens are CSS custom properties, they work in inline styles via the standard{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>style</code> prop. Pass the{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>var()</code> expression as a string value.
          </Body>
          <CodeBlock code={`// Inline style object
const cardStyle: React.CSSProperties = {
  background: 'var(--color-surface)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--spacing-xl)',
};

// JSX usage
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={cardStyle}>
      <p style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}>
        {children}
      </p>
    </div>
  );
}`} />
          <Body>
            If you use Tailwind CSS, you can also reference tokens via{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>arbitrary value</code> syntax:{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>bg-[var(--color-surface)]</code>.
          </Body>
        </section>

        {/* 4. Dark mode */}
        <section id="dark-mode">
          <SectionHeading>Dark mode</SectionHeading>
          <Body>
            Dark mode is toggled by setting <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>data-theme="dark"</code> on the{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>&lt;html&gt;</code> element. Semantic tokens automatically resolve to their dark-mode values — your component code stays unchanged.
          </Body>
          <CodeBlock code={`// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Reset to light mode
document.documentElement.removeAttribute('data-theme');

// React hook example
function useDarkMode() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    if (dark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }, [dark]);
  return { dark, setDark };
}`} />
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
            marginTop: '1rem',
          }}>
            <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: '0.75rem', padding: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-tertiary)', margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Light</p>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>--color-text-primary → #0a0a0a</code>
            </div>
            <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#6b6b6b', margin: '0 0 0.5rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Dark</p>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#a3a3a3' }}>--color-text-primary → #ffffff</code>
            </div>
          </div>
        </section>

        {/* 5. TypeScript utilities */}
        <section id="typescript">
          <SectionHeading>TypeScript utilities</SectionHeading>
          <Body>
            For consuming token values in JavaScript logic (e.g. animation durations, canvas drawing), read the resolved value at runtime via{' '}
            <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}>getComputedStyle</code>, or keep a typed constant map for values you need at compile time.
          </Body>
          <CodeBlock code={`// Typed constant map for animation durations
const DURATION = {
  fast:   'var(--duration-fast)',
  normal: 'var(--duration-normal)',
  slow:   'var(--duration-slow)',
} as const;

type DurationKey = keyof typeof DURATION;

// Read a live token value at runtime
function getToken(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// Usage in a JS animation
const duration = getToken('--duration-normal'); // e.g. "200ms"
element.animate({ opacity: [0, 1] }, { duration: parseFloat(duration) });`} />
        </section>

        {/* 6. Do's and don'ts */}
        <section id="dos-and-donts">
          <SectionHeading>Do's and don'ts</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#22c55e', marginBottom: '0.5rem' }}>Do</p>
              <ul style={{ margin: 0, padding: 0 }}>
                <DoItem>Use <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>var(--color-text-primary)</code> for text colors</DoItem>
                <DoItem>Use semantic tokens (<code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>--color-surface</code>) for UI chrome</DoItem>
                <DoItem>Use <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>var(--radius-lg)</code> for consistent corner radii</DoItem>
                <DoItem>Use <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>var(--spacing-*)</code> for padding and margin</DoItem>
                <DoItem>Reference tokens by their CSS variable name exactly as listed in the token table</DoItem>
              </ul>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pink-500, #e8336c)', marginBottom: '0.5rem' }}>Don't</p>
              <ul style={{ margin: 0, padding: 0 }}>
                <DontItem>Hardcode brand hex values like <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>#0a0a0a</code> or <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>#FFDE42</code></DontItem>
                <DontItem>Use primitive tokens (e.g. <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>--neutral-900</code>) for UI element colors</DontItem>
                <DontItem>Override tokens locally with raw values — update the token instead</DontItem>
                <DontItem>Use magic numbers for spacing; always reach for a spacing token</DontItem>
                <DontItem>Duplicate token values in Tailwind config — use <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>var()</code> references instead</DontItem>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </FoundationShell>
  );
}
