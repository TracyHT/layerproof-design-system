import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { CaretRight } from '@phosphor-icons/react';
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
  { label: 'Brand', path: '/brand' },
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
          { label: 'Semantic tokens',         path: '/foundations/tokens' },
          { label: 'Primitives',              path: '/foundations/primitives' },
          { label: 'Design tokens explained', path: '/foundations/tokens/explained' },
          { label: 'Use tokens in code',      path: '/foundations/tokens/code' },
          { label: 'Use tokens in design',    path: '/foundations/tokens/design' },
        ],
      },
      { label: 'Content',       path: '/foundations/content' },
      { label: 'Spacing',       path: '/foundations/spacing' },
      { label: 'Grid',          path: '/foundations/grid', badge: 'Beta' },
      {
        label: 'Color',
        path: '/foundations/color',
        children: [
          { label: 'Accents',            path: '/foundations/color/accents' },
          { label: 'Data visualization', path: '/foundations/color/dataviz' },
          { label: 'Color palette',      path: '/foundations/color/palette' },
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
          { label: 'Icon button',     path: '/components/button/icon' },
          { label: 'Link button',      path: '/components/button/link' },
          { label: 'Split button',     path: '/components/button/split' },
          { label: 'Button group',     path: '/components/button/group' },
        ],
      },
      {
        label: 'Input',
        path: '/components/input',
      },
      { label: 'Navigation', isSection: true },
      {
        label: 'Sidebar',
        path: '/components/sidebar',
      },
    ],
  },
  {
    label: 'Layout',
    path: '/layout',
    children: [
      { label: 'Page structure', path: '/layout', anchorId: 'page-structure' },
      { label: 'Container widths', path: '/layout', anchorId: 'container-widths' },
      { label: 'Breakpoints', path: '/layout', anchorId: 'breakpoints' },
      { label: 'Z-index scale', path: '/layout', anchorId: 'z-index' },
    ],
  },
  {
    label: 'Resources',
    path: '/resources',
    children: [
      { label: 'Files', path: '/resources', anchorId: 'downloads' },
      { label: 'Links', path: '/resources', anchorId: 'links' },
      { label: 'Usage rules', path: '/resources', anchorId: 'usage' },
    ],
  },
];

function samePath(path: string | undefined, location: string): boolean {
  if (!path) return false;
  return location === path || location === path + '/';
}

function containsPath(item: NavItem, location: string): boolean {
  if (samePath(item.path, location)) return true;
  return !!item.children?.some((c) => containsPath(c, location));
}

function scrollToAnchor(anchorId?: string) {
  if (!anchorId) return;
  const el = document.getElementById(anchorId);
  if (el) {
    const top = el.getBoundingClientRect().top + window.pageYOffset - 88;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

/** A clickable row: page link or in-page anchor. */
function NavLeaf({ item }: { item: NavItem }) {
  const location = useLocation();
  const { activeId } = useToc();
  const onPage = samePath(item.path, location.pathname);
  const current = item.anchorId ? onPage && activeId === item.anchorId : onPage;
  return (
    <Link
      to={item.path || '/'}
      className="lp-nav-item"
      aria-current={current ? 'page' : undefined}
      onClick={item.anchorId && onPage ? (e) => { e.preventDefault(); scrollToAnchor(item.anchorId); } : undefined}
    >
      <span>{item.label}</span>
      {item.badge && <span className="lp-badge">{item.badge}</span>}
    </Link>
  );
}

/** A row with nested pages (Tokens, Color, Button…): link + caret, children indented on a guide line. */
function NavBranch({ item }: { item: NavItem }) {
  const location = useLocation();
  const inside = containsPath(item, location.pathname);
  const [open, setOpen] = useState(inside);
  useEffect(() => { if (inside) setOpen(true); }, [inside]);

  const childHasOwnPath = item.children!.some((c) => c.path === item.path && !c.anchorId);
  const current = samePath(item.path, location.pathname) && !childHasOwnPath && !item.children!.some((c) => c.anchorId);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link
          to={item.path || '/'}
          className={`lp-nav-item ${inside && !current ? 'lp-nav-item--parent-active' : ''}`}
          aria-current={current ? 'page' : undefined}
          onClick={() => setOpen(true)}
          style={{ flex: 1 }}
        >
          {item.label}
          {item.badge && <span className="lp-badge">{item.badge}</span>}
        </Link>
        <button
          className="lp-nav-item"
          data-open={open}
          aria-expanded={open}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${item.label}`}
          onClick={() => setOpen((v) => !v)}
          style={{ width: 36, minWidth: 36, padding: 0, justifyContent: 'center' }}
        >
          <CaretRight size={14} className="lp-caret" style={{ marginLeft: 0 }} />
        </button>
      </div>
      {open && (
        <div className="lp-nav-children">
          {item.children!.map((c) => <NavNode key={c.label + (c.anchorId ?? '')} item={c} />)}
        </div>
      )}
    </div>
  );
}

function NavNode({ item }: { item: NavItem }) {
  if (item.isSection) return <span className="lp-nav-label lp-nav-label--sub">{item.label}</span>;
  if (item.children && item.children.length) return <NavBranch item={item} />;
  return <NavLeaf item={item} />;
}

/** Top-level group: an uppercase label (as in the app sidebar) with its pages below. */
function NavGroup({ item }: { item: NavItem }) {
  const hasOverview = item.path && item.path !== '/get-started' && !item.children!.some((c) => c.path === item.path);
  return (
    <div className="lp-nav-group">
      <span className="lp-nav-label">{item.label}</span>
      {hasOverview && <NavLeaf item={{ label: 'Overview', path: item.path }} />}
      {item.children!.map((c) => <NavNode key={c.label + (c.anchorId ?? '')} item={c} />)}
    </div>
  );
}

export function NavTree() {
  const leaves = navItems.filter((i) => !i.children);
  const groups = navItems.filter((i) => i.children);
  return (
    <nav aria-label="Design system">
      <div className="lp-nav-group">
        {leaves.map((i) => <NavLeaf key={i.label} item={i} />)}
      </div>
      {groups.map((g) => <NavGroup key={g.label} item={g} />)}
    </nav>
  );
}
