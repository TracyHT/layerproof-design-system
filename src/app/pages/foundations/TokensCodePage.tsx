import { FoundationShell } from '../../components/FoundationShell';
import { CheckCircle, XCircle } from '@phosphor-icons/react';
import { CodeBlock as DocCodeBlock } from '../../components/docs';

const tocItems = [
  { id: 'setup',           label: 'Setup',                  level: 1 as const },
  { id: 'css',             label: 'Using tokens in CSS',    level: 1 as const },
  { id: 'react',           label: 'Using tokens in React',  level: 1 as const },
  { id: 'dark-mode',       label: 'Dark mode',              level: 1 as const },
  { id: 'typescript',      label: 'TypeScript utilities',   level: 1 as const },
  { id: 'dos-and-donts',   label: "Do's and don'ts",        level: 1 as const },
];

const CodeBlock = ({ code }: { code: string }) => <DocCodeBlock code={code} lang="CSS" />;

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="lp-section__title" style={{ marginBottom: '0.5rem' }}>{children}</h2>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="lp-prose" style={{ margin: '0 0 1rem' }}>{children}</p>
);

const DoItem = ({ children }: { children: React.ReactNode }) => (
  <li className="lp-check lp-check--do"><CheckCircle size={18} weight="fill" /><span>{children}</span></li>
);

const DontItem = ({ children }: { children: React.ReactNode }) => (
  <li className="lp-check lp-check--dont"><XCircle size={18} weight="fill" /><span>{children}</span></li>
);



export function TokensCodePage() {
  return (
    <FoundationShell
      tag={["Foundations", "Tokens"]}
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
            <code className="lp-inline-code">main.css</code>{' '}
            or{' '}
            <code className="lp-inline-code">index.css</code>.
          </Body>
          <CodeBlock code={`/* main.css */
@import './styles/index.css';  /* fonts, primitives, semantics, shadows, type */`} />
          <Body>
            The file defines all tokens on <code className="lp-inline-code">:root</code> and provides a{' '}
            <code className="lp-inline-code">[data-theme="dark"]</code> override block for dark mode. No build step required — the file ships as plain CSS.
          </Body>
        </section>

        {/* 2. Using tokens in CSS */}
        <section id="css">
          <SectionHeading>Using tokens in CSS</SectionHeading>
          <Body>
            Reference any token with the standard <code className="lp-inline-code">var()</code> function. Token names map directly to the CSS custom property name shown in the token table.
          </Body>
          <CodeBlock code={`.card {
  background: var(--background-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: var(--space-14);
  box-shadow: var(--shadow-neutral-3);
  color: var(--foreground-primary);
}

.heading {
  font-family: var(--font-heading);
  font-size: var(--text-h4);
  line-height: var(--lh-h4);
  font-weight: var(--fw-bold);
  color: var(--foreground-primary);
}

.label {
  font-family: var(--font-body);
  font-size: var(--text-label-md);
  font-weight: var(--fw-semibold);
  color: var(--foreground-secondary);
}`} />
        </section>

        {/* 3. Using tokens in React */}
        <section id="react">
          <SectionHeading>Using tokens in React</SectionHeading>
          <Body>
            Since tokens are CSS custom properties, they work in inline styles via the standard{' '}
            <code className="lp-inline-code">style</code> prop. Pass the{' '}
            <code className="lp-inline-code">var()</code> expression as a string value.
          </Body>
          <CodeBlock code={`// Inline style object
const cardStyle: React.CSSProperties = {
  background: 'var(--background-surface)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-14)',
};

// JSX usage
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={cardStyle}>
      <p style={{ color: 'var(--foreground-secondary)', fontFamily: 'var(--font-body)' }}>
        {children}
      </p>
    </div>
  );
}`} />
          <Body>
            If you use Tailwind CSS, you can also reference tokens via{' '}
            <code className="lp-inline-code">arbitrary value</code> syntax:{' '}
            <code className="lp-inline-code">bg-[var(--background-surface)]</code>.
          </Body>
        </section>

        {/* 4. Dark mode */}
        <section id="dark-mode">
          <SectionHeading>Dark mode</SectionHeading>
          <Body>
            Dark mode is toggled by setting <code className="lp-inline-code">data-theme="dark"</code> on the{' '}
            <code className="lp-inline-code">&lt;html&gt;</code> element. Semantic tokens automatically resolve to their dark-mode values — your component code stays unchanged.
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
            <div style={{ background: 'var(--background-surface)', border: '1px solid var(--border-subtle)', borderRadius: '0.75rem', padding: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--foreground-tertiary)', margin: '0 0 0.5rem', }}>Light</p>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--foreground-secondary)' }}>--foreground-primary → #1a1a1a</code>
            </div>
            <div style={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '0.75rem', padding: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#6b6b6b', margin: '0 0 0.5rem', }}>Dark</p>
              <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#a3a3a3' }}>--foreground-primary → #f5f5f5</code>
            </div>
          </div>
        </section>

        {/* 5. TypeScript utilities */}
        <section id="typescript">
          <SectionHeading>TypeScript utilities</SectionHeading>
          <Body>
            For consuming token values in JavaScript logic (e.g. animation durations, canvas drawing), read the resolved value at runtime via{' '}
            <code className="lp-inline-code">getComputedStyle</code>, or keep a typed constant map for values you need at compile time.
          </Body>
          <CodeBlock code={`// Typed constant map for animation durations
const DURATION = {
  fast:   'var(--transition-fast)',
  normal: 'var(--transition-base)',
  slow:   'var(--transition-slow)',
} as const;

type DurationKey = keyof typeof DURATION;

// Read a live token value at runtime
function getToken(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// Usage in a JS animation
const duration = getToken('--transition-base'); // e.g. "300ms cubic-bezier(…)"
element.animate({ opacity: [0, 1] }, { duration: parseFloat(duration) });`} />
        </section>

        {/* 6. Do's and don'ts */}
        <section id="dos-and-donts">
          <SectionHeading>Do's and don'ts</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--status-success-foreground)', marginBottom: '0.5rem' }}>Do</p>
              <ul style={{ margin: 0, padding: 0 }}>
                <DoItem>Use <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>var(--foreground-primary)</code> for text colors</DoItem>
                <DoItem>Use semantic tokens (<code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>--background-surface</code>) for UI chrome</DoItem>
                <DoItem>Use <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>var(--radius-lg)</code> for consistent corner radii</DoItem>
                <DoItem>Use <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>var(--space-*)</code> for padding and margin</DoItem>
                <DoItem>Reference tokens by their CSS variable name exactly as listed in the token table</DoItem>
              </ul>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--status-danger-foreground)', marginBottom: '0.5rem' }}>Don't</p>
              <ul style={{ margin: 0, padding: 0 }}>
                <DontItem>Hardcode brand hex values like <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>#1a1a1a</code> or <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>#FF589B</code></DontItem>
                <DontItem>Use primitive tokens (e.g. <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>--gray-900</code>) for UI element colors</DontItem>
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
