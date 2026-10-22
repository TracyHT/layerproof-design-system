import { FoundationShell } from '../../components/FoundationShell';
import { CheckCircle, XCircle } from '@phosphor-icons/react';

const tocItems = [
  { id: 'layerproof-in-figma',  label: 'LayerProof in Figma',     level: 1 as const },
  { id: 'token-variables',      label: 'Token variables in Figma', level: 1 as const },
  { id: 'applying-tokens',      label: 'Applying tokens',          level: 1 as const },
  { id: 'naming-conventions',   label: 'Naming conventions',       level: 1 as const },
  { id: 'handoff',              label: 'Handoff',                  level: 1 as const },
  { id: 'dos-and-donts',        label: "Do's and don'ts",          level: 1 as const },
];

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="lp-section__title" style={{ marginBottom: '0.5rem' }}>{children}</h2>
);

const Body = ({ children }: { children: React.ReactNode }) => (
  <p className="lp-prose" style={{ margin: '0 0 1rem' }}>{children}</p>
);

const StepList = ({ steps }: { steps: string[] }) => (
  <ol style={{ margin: '0 0 1rem', padding: 0, counterReset: 'steps', display: 'flex', flexDirection: 'column', gap: 8 }}>
    {steps.map((step, i) => (
      <li key={i} style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9375rem',
        color: 'var(--foreground-secondary)',
        lineHeight: 1.6,
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start',
        listStyle: 'none',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          fontWeight: 700,
          background: 'var(--accent-background-subtle)',
          color: 'var(--accent-foreground-default)',
          borderRadius: '9999px',
          padding: '0.1rem 0.5rem',
          flexShrink: 0,
          marginTop: 2,
        }}>{i + 1}</span>
        <span dangerouslySetInnerHTML={{ __html: step }} />
      </li>
    ))}
  </ol>
);

const NamingRow = ({ css, figma }: { css: string; figma: string }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    padding: '0.75rem 0',
    borderBottom: '1px solid var(--border-subtle)',
  }}>
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--foreground-primary)' }}>{css}</code>
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--foreground-secondary)' }}>{figma}</code>
  </div>
);

const DoItem = ({ children }: { children: React.ReactNode }) => (
  <li className="lp-check lp-check--do"><CheckCircle size={18} weight="fill" /><span>{children}</span></li>
);

const DontItem = ({ children }: { children: React.ReactNode }) => (
  <li className="lp-check lp-check--dont"><XCircle size={18} weight="fill" /><span>{children}</span></li>
);



export function TokensDesignPage() {
  return (
    <FoundationShell
      tag={["Foundations", "Tokens"]}
      title="Use tokens in design"
      description="How to use LayerProof design tokens in Figma — variables, modes, and designer–developer handoff."
      tocItems={tocItems}
    >
      <div className="space-y-16">

        {/* 1. LayerProof in Figma */}
        <section id="layerproof-in-figma">
          <SectionHeading>LayerProof in Figma</SectionHeading>
          <Body>
            The LayerProof component library and variable collection are published to the Figma organization library. To enable it in your file:
          </Body>
          <StepList steps={[
            'Open your Figma file.',
            'Click the <strong>Assets</strong> panel (grid icon in the left toolbar).',
            'Click <strong>Team library</strong> (book icon at the top of the Assets panel).',
            'Toggle on <strong>LayerProof — UI Kit</strong>.',
            'All tokens and components are now available in your file.',
          ]} />
          <Body>
            Once enabled, the component library and variable collection update automatically whenever the design team publishes a new version.
          </Body>
        </section>

        {/* 2. Token variables in Figma */}
        <section id="token-variables">
          <SectionHeading>Token variables in Figma</SectionHeading>
          <Body>
            LayerProof tokens are stored as <strong>Figma Variables</strong> in three types: <strong>Color</strong>, <strong>Number</strong>, and <strong>String</strong>. Colour tokens in Semantic Color V2 have two modes — <em>Light</em> and <em>Dark</em> — mirroring the CSS{' '}
            <code className="lp-inline-code">:root</code> / <code className="lp-inline-code">[data-theme="dark"]</code> structure.
          </Body>
          <Body>
            To switch between light and dark mode in a frame:
          </Body>
          <StepList steps={[
            'Select the top-level frame.',
            'Open the <strong>Design</strong> panel on the right.',
            'Under <strong>Variables</strong>, click the mode dropdown and select <strong>Light</strong> or <strong>Dark</strong>.',
            'All token-bound fills, strokes, and effects in the frame update instantly.',
          ]} />
        </section>

        {/* 3. Applying tokens */}
        <section id="applying-tokens">
          <SectionHeading>Applying tokens</SectionHeading>
          <Body>
            Apply a token to any layer property — fill, stroke, effect, corner radius, padding, or gap.
          </Body>
          <StepList steps={[
            'Select the layer you want to style.',
            'In the <strong>Design</strong> panel, click the fill, stroke, or effect swatch.',
            'Click the <strong>library icon</strong> (four dots) in the colour picker header to switch to Variables mode.',
            'Browse or search for the token by name (e.g. <code style="font-family:monospace">background/surface</code>).',
            'Click the token to apply it. The layer is now bound to that token.',
          ]} />
          <Body>
            For spacing and sizing, select the layer and click the number field (width, height, padding, gap). The same library icon appears — click it to bind a Number token.
          </Body>
        </section>

        {/* 4. Naming conventions */}
        <section id="naming-conventions">
          <SectionHeading>Naming conventions</SectionHeading>
          <Body>
            CSS variable names and Figma variable paths follow the same semantic structure, separated by slashes in Figma instead of hyphens.
          </Body>
          <div className="lp-rows lp-rows--outline" style={{ padding: '0 1.25rem 0.75rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '0.75rem 0', borderBottom: '2px solid var(--border-subtle)' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--foreground-tertiary)' }}>CSS variable</span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--foreground-tertiary)' }}>Figma variable path</span>
            </div>
            <NamingRow css="--foreground-primary"   figma="Semantic Color V2 › foreground/primary" />
            <NamingRow css="--background-surface"   figma="Semantic Color V2 › background/surface" />
            <NamingRow css="--border-subtle"        figma="Semantic Color V2 › border/subtle" />
            <NamingRow css="--radius-lg"            figma="Spacing › Radius/Radius-lg" />
            <NamingRow css="--space-14"             figma="Spacing › Spacing/space-14" />
            <NamingRow css="--shadow-neutral-3"     figma="Effect style › Shadows/Neutral/Level 3" />
          </div>
        </section>

        {/* 5. Handoff */}
        <section id="handoff">
          <SectionHeading>Handoff</SectionHeading>
          <Body>
            When a developer inspects a layer in the Figma <strong>Inspect</strong> panel, Figma displays both the token name and the resolved raw value. For example:
          </Body>
          <div style={{
            background: 'var(--background-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '0.75rem',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--foreground-secondary)' }}>Fill</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 16, height: 16, borderRadius: 3, background: '#1a1a1a', border: '1px solid var(--border-subtle)' }} />
                <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--foreground-primary)' }}>foreground/primary</code>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--foreground-tertiary)' }}>#1a1a1a</span>
              </div>
            </div>
          </div>
          <Body>
            The developer picks up the token name and translates it directly to the CSS variable:{' '}
            <code className="lp-inline-code">var(--foreground-primary)</code>. No guesswork, no colour-picker sampling.
          </Body>
        </section>

        {/* 6. Do's and don'ts */}
        <section id="dos-and-donts">
          <SectionHeading>Do's and don'ts</SectionHeading>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--status-success-foreground)', marginBottom: '0.5rem' }}>Do</p>
              <ul style={{ margin: 0, padding: 0 }}>
                <DoItem>Use semantic tokens for all UI element colors (text, surfaces, borders)</DoItem>
                <DoItem>Bind fills and strokes to token variables so frames respond to mode switching</DoItem>
                <DoItem>Use Number tokens for spacing, corner radius, and sizing fields</DoItem>
                <DoItem>Name new components using the token-aligned naming pattern</DoItem>
                <DoItem>Keep the library enabled so you receive token updates automatically</DoItem>
              </ul>
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.8125rem', color: 'var(--status-danger-foreground)', marginBottom: '0.5rem' }}>Don't</p>
              <ul style={{ margin: 0, padding: 0 }}>
                <DontItem>Use primitive tokens (e.g. <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>Gray/900</code>) for UI element fills — use semantic tokens instead</DontItem>
                <DontItem>Detach or overwrite token bindings with raw hex values in component variants</DontItem>
                <DontItem>Hardcode mode-specific colours — let the variable modes handle light/dark</DontItem>
                <DontItem>Create one-off local styles when a token already covers the use case</DontItem>
                <DontItem>Use primitives for anything that isn't a new brand-scale definition</DontItem>
              </ul>
            </div>
          </div>
        </section>

      </div>
    </FoundationShell>
  );
}
