import { FoundationShell } from '../../components/FoundationShell';
import { DataVizSwatch } from '../../components/ColorHelpers';

export function ColorDataVizPage() {
  return (
    <FoundationShell
      tag={['Foundations', 'Color']}
      title="Data visualization"
      description="A categorical palette for charts, graphs, and data-dense UIs. The brand slots now use Pink 500 and Yellow 500; the Figma UI kit doesn't define a data-viz palette yet, so the remaining slots are unchanged."
    >
      <div className="space-y-10" style={{ color: 'var(--foreground-primary)' }}>

        <div className="lp-grid lp-grid--4">
          {[
            { label: 'Dataviz-1', hex: '#ffde42' },
            { label: 'Dataviz-2', hex: '#ff589b' },
            { label: 'Dataviz-3', hex: '#3b82f6' },
            { label: 'Dataviz-4', hex: '#10b981' },
            { label: 'Dataviz-5', hex: '#f97316' },
            { label: 'Dataviz-6', hex: '#8b5cf6' },
            { label: 'Dataviz-7', hex: '#06b6d4' },
            { label: 'Dataviz-8', hex: '#a3a3a3' },
          ].map(s => <DataVizSwatch key={s.hex} {...s} />)}
        </div>

        {/* Example chart legend */}
        <h3 className="lp-subsection__title">Example chart</h3>
        <div className="lp-panel" style={{ marginTop: 0 }}>
          <div className="flex flex-wrap gap-4">
            {[
              { label: 'Revenue',    hex: '#ffde42' },
              { label: 'Expenses',   hex: '#ff589b' },
              { label: 'Profit',     hex: '#10b981' },
              { label: 'Forecasted', hex: '#3b82f6' },
            ].map(({ label, hex }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="rounded-sm" style={{ width: 12, height: 12, background: hex }} />
                <span className="text-sm" style={{ color: 'var(--foreground-secondary)', fontFamily: 'var(--font-body)' }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-40 rounded-lg flex items-end gap-1.5 px-2 pb-2" style={{ background: 'var(--background-surface-raised)' }}>
            {[60, 80, 45, 90, 55, 70, 35, 85].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t"
                style={{
                  height: `${h}%`,
                  background: ['#ffde42', '#ff589b', '#10b981', '#3b82f6'][i % 4],
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
