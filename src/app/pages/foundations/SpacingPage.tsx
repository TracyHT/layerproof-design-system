import { FoundationShell } from '../../components/FoundationShell';

const scale = [
  { name: 'xs',  val: '0.25rem', px: '4px'  },
  { name: 'sm',  val: '0.5rem',  px: '8px'  },
  { name: 'md',  val: '1rem',    px: '16px' },
  { name: 'lg',  val: '1.5rem',  px: '24px' },
  { name: 'xl',  val: '2rem',    px: '32px' },
  { name: '2xl', val: '3rem',    px: '48px' },
  { name: '3xl', val: '4rem',    px: '64px' },
  { name: '4xl', val: '6rem',    px: '96px' },
];

export function SpacingPage() {
  return (
    <FoundationShell title="Spacing" description="Consistent spacing creates rhythm and hierarchy. Our spacing scale is based on a 4px base unit." tocItems={[{ id: 'spacing-scale', label: 'Spacing Scale', level: 1 as const }]}>
      <div id="spacing-scale" className="space-y-3">
        {scale.map(({ name, val, px }) => (
          <div key={name} className="flex items-center gap-5 rounded-xl px-5 py-4" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <code className="text-xs w-28 shrink-0" style={{ fontFamily: '"Monaco", monospace', color: '#f0d040' }}>--spacing-{name}</code>
            <span className="text-xs w-16 shrink-0" style={{ color: 'var(--color-text-tertiary)', fontFamily: '"Roboto", sans-serif' }}>{val} · {px}</span>
            <div className="flex-1"><div style={{ width: px, height: 24, background: '#f0d04040', border: '1px solid #f0d04066', borderRadius: 4 }} /></div>
          </div>
        ))}
      </div>
    </FoundationShell>
  );
}
