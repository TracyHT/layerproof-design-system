import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { useToc } from '../context/TocContext';

interface NavItem {
  label: string;
  path?: string;
  anchorId?: string; // scroll-to section ID within the page
  children?: NavItem[];
  badge?: string;
  isSection?: boolean; // non-interactive category label
}

const navItems: NavItem[] = [
  { label: "What's new", path: '/whats-new' },
  {
    label: 'Get started',
    path: '/get-started',
    children: [
      { label: 'For designers',   path: '/get-started/designers' },
      { label: 'For developers',  path: '/get-started/developers' },
      { label: 'For brand teams', path: '/get-started/brand' },
      { label: 'Cheat sheet',     path: '/get-started/cheat-sheet' },
    ],
  },
  {
    label: 'Foundations',
    path: '/foundations',
    children: [
      {
        label: 'Tokens',
        path: '/foundations/tokens',
        children: [
          { label: 'All design tokens',       path: '/foundations/tokens' },
          { label: 'Design tokens explained', path: '/foundations/tokens/explained' },
          { label: 'Use tokens in code',      path: '/foundations/tokens/code' },
          { label: 'Use tokens in design',    path: '/foundations/tokens/design' },
          { label: 'Migrate to tokens',       path: '/foundations/tokens/migrate' },
        ],
      },
      { label: 'Content',       path: '/foundations/content' },
      { label: 'Spacing',       path: '/foundations/spacing' },
      { label: 'Grid',          path: '/foundations/grid', badge: 'Beta' },
      {
        label: 'Color',
        path: '/foundations/color',
        children: [
          { label: 'Accents',               path: '/foundations/color', anchorId: 'color-accents' },
          { label: 'Color picker swatches', path: '/foundations/color', anchorId: 'color-swatches' },
          { label: 'Data Visualization',    path: '/foundations/color', anchorId: 'color-dataviz' },
          { label: 'Color palette',         path: '/foundations/color', anchorId: 'color-palette' },
        ],
      },
      {
        label: 'Typography',
        path: '/foundations/typography',
        children: [
          { label: 'Applying typography',   path: '/foundations/typography', anchorId: 'applying-typography' },
          { label: 'App typefaces and scale', path: '/foundations/typography', anchorId: 'typefaces-scale' },
        ],
      },
      { label: 'Iconography',  path: '/foundations/iconography' },
      { label: 'Illustrations',path: '/foundations/illustrations' },
      { label: 'Logos',        path: '/foundations/logos' },
      { label: 'Elevation',    path: '/foundations/elevation' },
    ],
  },
  {
    label: 'Components',
    path: '/components',
    children: [
      { label: 'Forms and input', isSection: true },
      {
        label: 'Button',
        path: '/components/button',
        children: [
          { label: 'Icon button',      path: '/components/button/icon' },
          { label: 'Link button',      path: '/components/button/link' },
          { label: 'Link icon button', path: '/components/button/link-icon' },
          { label: 'Split button',     path: '/components/button/split' },
          { label: 'Button group',     path: '/components/button/group' },
        ],
      },
    ],
  },
  {
    label: 'Layout',
    path: '/layout',
    children: [
      { label: 'Overview', path: '/layout', anchorId: 'overview' },
      { label: 'Page Structure', path: '/layout', anchorId: 'page-structure' },
      { label: 'Container Widths', path: '/layout', anchorId: 'container-widths' },
      { label: 'Responsive Breakpoints', path: '/layout', anchorId: 'breakpoints' },
      { label: 'Z-Index Scale', path: '/layout', anchorId: 'z-index' },
    ],
  },
  {
    label: 'Resources',
    path: '/resources',
    children: [
      { label: 'Downloads', path: '/resources', anchorId: 'downloads' },
      { label: 'External Links', path: '/resources', anchorId: 'links' },
      { label: 'Usage Guidelines', path: '/resources', anchorId: 'usage' },
      { label: 'Contact', path: '/resources', anchorId: 'contact' },
    ],
  },
];

function isPathActive(path: string | undefined, location: string): boolean {
  if (!path) return false;
  if (path === '/') return location === '/';
  return location.startsWith(path);
}

function isSectionActive(item: NavItem, location: string): boolean {
  if (isPathActive(item.path, location)) return true;
  if (item.children) {
    return item.children.some((child) => isSectionActive(child, location));
  }
  return false;
}

interface NavNodeProps {
  item: NavItem;
  depth?: number;
}

function NavNode({ item, depth = 0 }: NavNodeProps) {
  const location = useLocation();
  const { activeId } = useToc();
  const active = isSectionActive(item, location.pathname);
  const isLeaf = !item.children || item.children.length === 0;
  const [open, setOpen] = useState(active);

  useEffect(() => {
    if (active) setOpen(true);
  }, [active]);

  // A leaf is "active" if its anchorId matches the scroll-tracked section,
  // or (fallback) if it's the only item on its route with no anchorId.
  const isDirectlyActive = isLeaf
    ? item.anchorId
      ? activeId === item.anchorId && isPathActive(item.path, location.pathname)
      : isPathActive(item.path, location.pathname)
    : false;

  const scrollToAnchor = () => {
    if (!item.anchorId) return;
    const el = document.getElementById(item.anchorId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const paddingLeft = 16 + depth * 14;

  if (item.isSection) {
    return (
      <div style={{
        paddingLeft,
        paddingTop: 14,
        paddingBottom: 4,
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: 'var(--color-text-tertiary)',
        fontFamily: 'var(--font-body)',
        userSelect: 'none',
      }}>
        {item.label}
      </div>
    );
  }

  if (isLeaf) {
    return (
      <Link
        to={item.path || '/'}
        onClick={item.anchorId ? scrollToAnchor : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          paddingLeft,
          paddingRight: 12,
          paddingTop: 6,
          paddingBottom: 6,
          fontSize: depth === 0 ? 15 : 13,
          color: isDirectlyActive
            ? 'var(--color-text-primary)'
            : 'var(--color-text-secondary)',
          background: isDirectlyActive ? 'var(--color-surface)' : 'transparent',
          borderLeft: isDirectlyActive
            ? '2px solid var(--brand-primary)'
            : '2px solid transparent',
          textDecoration: 'none',
          transition: 'background 150ms, color 150ms',
          borderRadius: '0 4px 4px 0',
          fontWeight: isDirectlyActive ? 500 : 400,
        }}
        onMouseEnter={(e) => {
          if (!isDirectlyActive) {
            (e.currentTarget as HTMLAnchorElement).style.background =
              'var(--color-surface-hover)';
            (e.currentTarget as HTMLAnchorElement).style.color =
              'var(--color-text-primary)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDirectlyActive) {
            (e.currentTarget as HTMLAnchorElement).style.background =
              'transparent';
            (e.currentTarget as HTMLAnchorElement).style.color =
              'var(--color-text-secondary)';
          }
        }}
      >
        {item.label}
        {item.badge && (
          <span
            style={{
              fontSize: 10,
              padding: '1px 6px',
              borderRadius: 9999,
              background: 'var(--brand-accent)',
              color: '#000000',
              fontWeight: 600,
              marginLeft: 4,
            }}
          >
            {item.badge}
          </span>
        )}
      </Link>
    );
  }

  // Has children — collapsible section
  const sectionActive = active && location.pathname.startsWith(item.path || '##');

  const chevron = (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      style={{
        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
        transition: 'transform 200ms',
        flexShrink: 0,
        opacity: 0.6,
      }}
    >
      <path
        d="M4 2L8 6L4 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const rowStyle = {
    fontSize: depth === 0 ? 15 : 13,
    fontWeight: sectionActive ? 600 : depth === 0 ? 500 : 400,
    color: sectionActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
    transition: 'background 150ms, color 150ms',
  } as const;

  return (
    <div>
      {item.path ? (
        // Parent with path: link label + separate chevron toggle
        <div
          style={{ display: 'flex', alignItems: 'center', borderRadius: 4 }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = 'var(--color-surface-hover)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.background = 'transparent';
          }}
        >
          <Link
            to={item.path}
            style={{
              flex: 1,
              paddingLeft,
              paddingTop: 6,
              paddingBottom: 6,
              textDecoration: 'none',
              ...rowStyle,
            }}
          >
            {item.label}
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            style={{
              paddingRight: 12,
              paddingTop: 6,
              paddingBottom: 6,
              paddingLeft: 6,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: sectionActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {chevron}
          </button>
        </div>
      ) : (
        // Parent without path: full-width toggle button
        <button
          onClick={() => setOpen((v) => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingLeft,
            paddingRight: 12,
            paddingTop: 6,
            paddingBottom: 6,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            borderRadius: 4,
            borderLeft: '2px solid transparent',
            ...rowStyle,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-surface-hover)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-primary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = sectionActive
              ? 'var(--color-text-primary)'
              : 'var(--color-text-secondary)';
          }}
        >
          <span>{item.label}</span>
          {chevron}
        </button>
      )}
      {open && (
        <div>
          {item.children!.map((child) => (
            <NavNode key={child.label} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function NavTree() {
  return (
    <nav style={{ padding: '12px 0' }}>
      {navItems.map((item) => (
        <NavNode key={item.label} item={item} depth={0} />
      ))}
    </nav>
  );
}
