import { FoundationShell } from '../../components/FoundationShell';

export function GridPage() {
  return (
    <FoundationShell title="Grid" description="A 12-column responsive grid with 1rem gutters provides structure and flexibility across all breakpoints." badge="Beta" tocItems={[{ id: 'grid-cols', label: '12-Column Grid', level: 1 as const }, { id: 'breakpoints', label: 'Breakpoints', level: 1 as const }]}>
      <div id="grid-cols" className="rounded-xl p-6 mb-8" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="grid grid-cols-12 gap-2 mb-3">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded text-center py-6 text-xs" style={{ background: '#f0d04022', border: '1px solid #f0d04044', color: '#f0d040', fontFamily: '"Monaco", monospace' }}>{i + 1}</div>
          ))}
        </div>
        <p className="text-xs text-center" style={{ color: 'var(--color-text-tertiary)', fontFamily: '"Roboto", sans-serif' }}>12-column grid · 1rem gutter</p>
      </div>
      <div id="breakpoints" className="space-y-3">
        {[['sm','640px','Mobile landscape'],['md','768px','Tablet'],['lg','1024px','Desktop'],['xl','1280px','Large desktop']].map(([bp, w, label]) => (
          <div key={bp} className="flex items-center gap-4 rounded-xl px-5 py-3" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <code className="text-xs w-10" style={{ color: '#f0d040', fontFamily: '"Monaco", monospace' }}>{bp}</code>
            <span className="text-xs w-20" style={{ color: 'var(--color-text-secondary)', fontFamily: '"Roboto", sans-serif' }}>{w}</span>
            <span className="text-xs" style={{ color: 'var(--color-text-tertiary)', fontFamily: '"Roboto", sans-serif' }}>{label}</span>
          </div>
        ))}
      </div>
    </FoundationShell>
  );
}
