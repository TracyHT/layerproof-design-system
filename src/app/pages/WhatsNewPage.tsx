import { useEffect } from 'react';
import { releases, type ChangeCategory } from '../data/changelog';
import { PageHeader, Chip, type ChipTone } from '../components/docs';
import { useToc } from '../context/TocContext';

const categoryMeta: Record<ChangeCategory, { label: string; tone: ChipTone }> = {
  breaking:    { label: 'Breaking',   tone: 'danger' },
  tokens:      { label: 'Tokens',     tone: 'accent' },
  components:  { label: 'Component',  tone: 'info' },
  foundations: { label: 'Foundation', tone: 'neutral' },
  docs:        { label: 'Docs',       tone: 'success' },
  fix:         { label: 'Fix',        tone: 'warning' },
};

const ORDER: ChangeCategory[] = ['breaking', 'tokens', 'components', 'foundations', 'docs', 'fix'];

export function WhatsNewPage() {
  const { setItems } = useToc();
  useEffect(() => {
    setItems(releases.map((r) => ({ id: `v${r.version}`, label: `v${r.version}`, level: 1 as const })));
    return () => setItems([]);
  }, [setItems]);

  return (
    <div>
      <PageHeader
        title="What's new"
        lede="Every release of the design system — tokens, components, foundations and docs."
      />

      <ol style={{ listStyle: 'none', margin: 0, padding: 0, position: 'relative' }}>
        <span aria-hidden style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 1, background: 'var(--border-subtle)' }} />
        {releases.map((release, i) => {
          const sorted = [...release.changes].sort((a, b) => ORDER.indexOf(a.category) - ORDER.indexOf(b.category));
          return (
            <li key={release.version} id={`v${release.version}`} className="lp-section" style={{ position: 'relative', paddingLeft: 36 }}>
              <span
                aria-hidden
                style={{
                  position: 'absolute', left: 0, top: 8, width: 15, height: 15, borderRadius: '50%',
                  background: i === 0 ? 'var(--accent-background-default)' : 'var(--background-canvas)',
                  border: `2px solid ${i === 0 ? 'var(--accent-background-default)' : 'var(--border-default)'}`,
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h2 className="lp-section__title">Version {release.version}</h2>
                {i === 0 && <Chip tone="accent">Latest</Chip>}
                <span className="lp-card__meta" style={{ marginTop: 0 }}>{release.date}</span>
              </div>
              <p className="lp-section__desc" style={{ marginTop: 8 }}>{release.summary}</p>

              <div className="lp-rows lp-rows--outline" style={{ marginTop: 16 }}>
                {sorted.map((change, j) => (
                  <div key={j} className="lp-row" style={{ ['--lp-row-cols' as string]: '108px minmax(0, 1fr)', alignItems: 'start' }}>
                    <div><Chip tone={categoryMeta[change.category].tone}>{categoryMeta[change.category].label}</Chip></div>
                    <div>{change.description}</div>
                  </div>
                ))}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
