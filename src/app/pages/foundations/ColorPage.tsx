import { Link } from 'react-router';
import { FoundationShell } from '../../components/FoundationShell';

const sections = [
  {
    path: '/foundations/color/accents',
    label: 'Accents',
    description: 'Yellow and pink accent scales, pairings, and usage rules.',
  },
  {
    path: '/foundations/color/dataviz',
    label: 'Data Visualization',
    description: 'Categorical palette for charts, graphs, and data-dense UIs.',
  },
  {
    path: '/foundations/color/palette',
    label: 'Color Palette',
    description: 'Full primitive scale — Gray, Yellow, Pink, Red, Green, and Amber.',
  },
];

export function ColorPage() {
  return (
    <FoundationShell
      title="Color"
      description="The LayerProof color system. Black and white drive all primary UI; yellow and pink are accent-only."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {sections.map(({ path, label, description }) => (
          <Link
            key={path}
            to={path}
            style={{
              display: 'block',
              padding: '1.5rem',
              borderRadius: '0.75rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              textDecoration: 'none',
              transition: 'border-color 150ms, box-shadow 150ms',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border-hover)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--color-border)';
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
            }}
          >
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.125rem', textTransform: 'uppercase', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
              {label}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {description}
            </p>
          </Link>
        ))}
      </div>
    </FoundationShell>
  );
}
