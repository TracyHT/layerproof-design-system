import { FoundationShell } from '../components/FoundationShell';
import { Section, Panel, Grid, LinkCard, CodeBlock, Prose, InlineCode, Callout } from '../components/docs';

const tocItems = [
  { id: 'gs-dev-setup',      label: 'Setup',        level: 1 as const },
  { id: 'gs-dev-tokens',     label: 'Using tokens', level: 1 as const },
  { id: 'gs-dev-dark',       label: 'Themes',       level: 1 as const },
  { id: 'gs-dev-components', label: 'Components',   level: 1 as const },
];

export function GetStartedDevelopersPage() {
  return (
    <FoundationShell
      tag="Get started"
      title="For developers"
      description="Import the token stylesheet, build with semantic CSS variables, and use the React components."
      tocItems={tocItems}
    >
      <Section id="gs-dev-setup" title="Setup" desc="The stylesheet entry point loads fonts, primitives, semantic tokens, shadows and text-style classes in the right order.">
        <CodeBlock lang="Terminal" code={`npm install\nnpm run dev`} />
        <CodeBlock lang="CSS" style={{ marginTop: 12 }} code={`/* Everything: fonts, primitives, semantics, shadows, type */\n@import './styles/index.css';`} />
      </Section>

      <Section id="gs-dev-tokens" title="Using tokens" desc="Reach for semantic tokens first. Primitives (--pink-500, --gray-900) belong in token files, not components.">
        <CodeBlock lang="CSS" code={`.heading {
  font-family: var(--font-heading);   /* Mona Sans */
  color: var(--foreground-primary);
}

.card {
  background: var(--background-surface-raised);
  border: 1px solid var(--border-subtle);
  box-shadow: var(--shadow-neutral-2);
}

.cta {
  background: var(--action-primary-background-default); /* Pink 500 */
  color: var(--action-primary-foreground);
}
.cta:hover { background: var(--action-primary-background-hover); }`} />
        <Prose style={{ marginTop: 16 }}>
          <p>For text, prefer the style classes generated from Figma — <InlineCode>.type-h3</InlineCode>, <InlineCode>.type-body-sm</InlineCode>, <InlineCode>.type-label-md</InlineCode> — which set family, size, line height, tracking and weight together.</p>
        </Prose>
      </Section>

      <Section id="gs-dev-dark" title="Themes" desc="Every colour token has a light and a dark value. Switch with one attribute; nothing else changes.">
        <CodeBlock lang="HTML" code={`<html data-theme="dark">\n<!-- or scope a region -->\n<section data-theme="light">…</section>\n<div data-density="spacious">…</div>`} />
        <div style={{ marginTop: 12 }}>
          <Callout>Light is LayerProof's primary mode. Check every new screen in dark mode before shipping.</Callout>
        </div>
      </Section>

      <Section id="gs-dev-components" title="Components" desc="Built with React, TypeScript, Radix UI primitives and Tailwind, styled entirely through tokens.">
        <Panel>
          <Grid cols={2}>
            <LinkCard to="/components" title="Browse components" text="Live examples, code and usage for each component." />
            <LinkCard to="/foundations/tokens/code" title="Use tokens in code" text="Naming, theming and the rules for adding tokens." />
          </Grid>
        </Panel>
      </Section>
    </FoundationShell>
  );
}
