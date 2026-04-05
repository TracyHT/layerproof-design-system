import { FoundationShell } from '../../components/FoundationShell';
import { DataVizSwatch } from '../../components/ColorHelpers';

export function ColorDataVizPage() {
  return (
    <FoundationShell
      title="Data Visualization"
      description="A categorical palette optimized for charts, graphs, and data-dense UIs. Each color is distinct under dark backgrounds and maintains sufficient contrast for accessibility."
    >
      <div className="space-y-12" style={{ color: 'var(--color-text-primary)' }}>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {[
            { label: 'Dataviz-1', hex: '#f0d040' },
            { label: 'Dataviz-2', hex: '#e8336c' },
            { label: 'Dataviz-3', hex: '#3b82f6' },
            { label: 'Dataviz-4', hex: '#10b981' },
            { label: 'Dataviz-5', hex: '#f97316' },
            { label: 'Dataviz-6', hex: '#8b5cf6' },
            { label: 'Dataviz-7', hex: '#06b6d4' },
            { label: 'Dataviz-8', hex: '#a3a3a3' },
          ].map(s => <DataVizSwatch key={s.hex} {...s} />)}
        </div>

        {/* Example chart legend */}
        <div className="rounded-2xl p-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <p className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>Example — Chart Legend</p>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Revenue',    hex: '#f0d040' },
              { label: 'Expenses',   hex: '#e8336c' },
              { label: 'Profit',     hex: '#10b981' },
              { label: 'Forecasted', hex: '#3b82f6' },
            ].map(({ label, hex }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="rounded-sm" style={{ width: 12, height: 12, background: hex }} />
                <span className="text-sm" style={{ color: 'var(--color-text-secondary)', fontFamily: '"Roboto", sans-serif' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-16 rounded-lg flex items-end gap-1.5 px-2 pb-2" style={{ background: '#0a0a0a' }}>
            {[60, 80, 45, 90, 55, 70, 35, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: `${h}%`,
                  background: ['#f0d040', '#e8336c', '#10b981', '#3b82f6'][i % 4],
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        </div>

      </div>
    </FoundationShell>
  );
}
