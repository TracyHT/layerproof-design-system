import { Link } from 'react-router';
import { FoundationShell } from '../components/FoundationShell';
import { Section, Panel, Grid, Chip, Stat, DoDont } from '../components/docs';
import { FIGMA_URL } from '../layouts/RootLayout';

type Entry = { name: string; desc: string; to?: string };

/** Mirrors the Figma "Components · Directory" frame. Entries with `to` are documented on this site. */
const groups: { name: string; entries: Entry[] }[] = [
  {
    name: 'Actions & inputs',
    entries: [
      { name: 'Button', desc: 'Accent, neutral and danger actions in five levels.', to: '/components/button' },
      { name: 'Input', desc: 'Text entry with label, helper and validation.', to: '/components/input' },
      { name: 'Checkbox', desc: 'Binary and indeterminate selection.' },
      { name: 'Ratio', desc: 'Single-choice selection controls.' },
      { name: 'Rating', desc: 'Star and numeric rating.' },
      { name: 'Selection menu', desc: 'Structured option lists and menu actions.' },
      { name: 'Dropdown', desc: 'Compact choice from a list.' },
    ],
  },
  {
    name: 'Navigation',
    entries: [
      { name: 'Sidebar', desc: 'The persistent app navigation rail.', to: '/components/sidebar' },
      { name: 'Header', desc: 'Section and page-level heading structure.' },
      { name: 'Navbar', desc: 'Global web and mobile navigation.' },
      { name: 'Tab bar', desc: 'Peer-view switching and active state.' },
      { name: 'Pagination', desc: 'Moving through long lists.' },
      { name: 'Scrollbar', desc: 'Horizontal and vertical scroll affordances.' },
    ],
  },
  {
    name: 'Content',
    entries: [
      { name: 'Badge', desc: 'Short status, category and count indicators.' },
      { name: 'Chip', desc: 'Compact filters, tags and attributes.' },
      { name: 'Card', desc: 'Grouped content and action containers.' },
      { name: 'Divider', desc: 'Visual separation and labelled breaks.' },
      { name: 'Tooltip', desc: 'Concise contextual labels.' },
      { name: 'Tooltip card', desc: 'Expanded guidance and product tours.' },
    ],
  },
  {
    name: 'Feedback',
    entries: [
      { name: 'Modal', desc: 'Focused overlays for decisions.' },
      { name: 'Toast', desc: 'Transient confirmation and progress.' },
      { name: 'Progress bar', desc: 'Task, upload and multi-step status.' },
      { name: 'Password strength', desc: 'Password quality and requirements.' },
    ],
  },
  {
    name: 'LayerProof patterns',
    entries: [
      { name: 'Input prompt box', desc: 'Prompt entry with supporting actions.' },
      { name: 'Custom cards', desc: 'Product-specific card arrangements.' },
      { name: 'Toggle section', desc: 'Expandable or switchable content sections.' },
      { name: 'Editor', desc: 'Editor-specific controls and tools.' },
    ],
  },
];

const documented = groups.flatMap((g) => g.entries).filter((e) => e.to).length;
const total = groups.flatMap((g) => g.entries).length;

const tocItems = [
  { id: 'status', label: 'Status', level: 1 as const },
  ...groups.map((g) => ({ id: `group-${g.name.toLowerCase().replace(/[^a-z]+/g, '-')}`, label: g.name, level: 1 as const })),
  { id: 'guidelines', label: 'Guidelines', level: 1 as const },
];

function Row({ e }: { e: Entry }) {
  const body = (
    <>
      <div style={{ minWidth: 0 }}>
        <span className="lp-card__title" style={{ display: 'block', textDecoration: e.to ? 'underline' : 'none', textUnderlineOffset: 3, textDecorationThickness: 1 }}>{e.name}</span>
        <span className="lp-card__text" style={{ display: 'block', marginTop: 2 }}>{e.desc}</span>
      </div>
      {e.to ? <Chip tone="accent">Documented</Chip> : <Chip>In Figma</Chip>}
    </>
  );
  const style = { display: 'flex', gap: 16, alignItems: 'flex-start', justifyContent: 'space-between', padding: '14px 16px', textDecoration: 'none', color: 'inherit' } as const;
  return e.to ? <Link to={e.to} style={style}>{body}</Link> : <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" style={style}>{body}</a>;
}

export function ComponentsPage() {
  return (
    <FoundationShell
      tag={[]}
      title="Components"
      description="Every component in the LayerProof UI kit, grouped by job. Documented components have live examples, code and usage; the rest link to their Figma page."
      tocItems={tocItems}
    >
      <Section id="status" title="Status">
        <Panel>
          <Grid cols={3}>
            <Stat value={documented} label="Documented here" text="Examples, code, usage" accent />
            <Stat value={total} label="In the UI kit" text="Including LayerProof patterns" />
            <Stat value={groups.length} label="Groups" text="Grouped by what they do" />
          </Grid>
        </Panel>
      </Section>

      {groups.map((g) => (
        <Section key={g.name} id={`group-${g.name.toLowerCase().replace(/[^a-z]+/g, '-')}`} title={g.name}>
          <div className="lp-rows lp-rows--outline">
            {g.entries.map((e, i) => (
              <div key={e.name} style={{ borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}><Row e={e} /></div>
            ))}
          </div>
        </Section>
      ))}

      <Section id="guidelines" title="Guidelines" desc="Every component, documented or not, must meet these.">
        <DoDont
          dos={[
            'Hit targets of at least 44 × 44px on touch',
            'Text contrast of 4.5:1, UI graphics 3:1, in light and dark',
            'Keyboard reachable, with a visible pink focus ring',
            'Style only through semantic and component tokens',
          ]}
          donts={[
            'Bind primitives (--pink-500) directly in a component',
            'Use pink for anything other than emphasis, focus or selection',
            'Hide focus outlines',
            'Rely on colour alone to show state',
          ]}
        />
      </Section>
    </FoundationShell>
  );
}
