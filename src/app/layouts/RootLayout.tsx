import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { MagnifyingGlass, Moon, Sun, List, X, GithubLogo } from "@phosphor-icons/react";
import { ThemeProvider, useTheme } from "../components/ThemeProvider";
import { TocProvider } from "../context/TocContext";
import { NavTree } from "../components/NavTree";
import { TableOfContents } from "../components/TableOfContents";

// Routes that show the design-system rail + table of contents
const DS_ROUTES = [
  "/foundations",
  "/components",
  "/layout",
  "/resources",
  "/get-started",
  "/brand",
  "/whats-new",
];

const WIDE_ROUTES = ["/foundations/iconography"];

const REPO_URL = "https://github.com/TracyHT/layerproof-design-system";
export const FIGMA_URL = "https://www.figma.com/design/OKTvGTGy5kujRdbbqNlHkn/LayerProof---UI-Kit";

function isDesignSystemRoute(pathname: string) {
  return DS_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));
}

const topNav = [
  { label: "Get started", to: "/get-started/designers", match: "/get-started" },
  { label: "Foundations", to: "/foundations", match: "/foundations" },
  { label: "Components", to: "/components", match: "/components" },
  { label: "Brand", to: "/brand", match: "/brand" },
  { label: "What's new", to: "/whats-new", match: "/whats-new" },
];

export function Logo() {
  return (
    <Link to="/" className="lp-logo" aria-label="LayerProof Design System — home">
      <img src={`${import.meta.env.BASE_URL}symbol.png`} alt="" />
      <span className="lp-logo__word">LayerProof</span>
      <span className="lp-logo__tag">Design system</span>
    </Link>
  );
}

function Header({ railOpen, onToggleRail, showRail }: { railOpen: boolean; onToggleRail: () => void; showRail: boolean }) {
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  return (
    <header className="lp-header">
      {showRail && (
        <button className="lp-pill lp-pill--icon lp-menu-btn" onClick={onToggleRail} aria-label={railOpen ? "Close navigation" : "Open navigation"} aria-expanded={railOpen}>
          {railOpen ? <X size={18} /> : <List size={18} />}
        </button>
      )}
      <Logo />
      <nav className="lp-topnav" aria-label="Main">
        {topNav.map((n) => (
          <Link key={n.to} to={n.to} aria-current={pathname === n.match || pathname.startsWith(n.match + "/") ? "page" : undefined}>
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="lp-actions">
        <button className="lp-pill" aria-label="Search">
          <MagnifyingGlass size={16} />
          <span className="lp-pill__label">Search</span>
          <kbd>⌘K</kbd>
        </button>
        <a className="lp-pill lp-pill--icon" href={REPO_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository">
          <GithubLogo size={18} />
        </a>
        <button className="lp-pill lp-pill--icon" onClick={toggleTheme} aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}>
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="lp-footer">
      <span>© 2026 LayerProof. All rights reserved.</span>
      <span style={{ display: "flex", gap: 16 }}>
        <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer">Figma UI kit</a>
        <a href={REPO_URL} target="_blank" rel="noopener noreferrer">GitHub</a>
        <Link to="/whats-new">Changelog</Link>
      </span>
    </footer>
  );
}

function LayoutInner() {
  const { pathname } = useLocation();
  const isDS = isDesignSystemRoute(pathname);
  const isWide = WIDE_ROUTES.includes(pathname);
  const [railOpen, setRailOpen] = useState(false);

  useEffect(() => {
    setRailOpen(false);
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div style={{ background: "var(--background-canvas)", minHeight: "100vh", color: "var(--foreground-primary)" }}>
      <Header railOpen={railOpen} onToggleRail={() => setRailOpen((v) => !v)} showRail={isDS} />

      {isDS ? (
        <div className="lp-body">
          <aside className="lp-rail" data-open={railOpen}>
            <NavTree />
          </aside>
          {railOpen && <div className="lp-scrim" onClick={() => setRailOpen(false)} />}
          <main className="lp-main lp-main--docs">
            <div className={`lp-content ${isWide ? "lp-content--wide" : ""}`}>
              <Outlet />
              <SiteFooter />
            </div>
          </main>
          {!isWide && (
            <aside className="lp-toc">
              <div className="lp-toc__inner">
                <TableOfContents />
              </div>
            </aside>
          )}
        </div>
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </div>
  );
}

export function RootLayout() {
  return (
    <ThemeProvider>
      <TocProvider>
        <LayoutInner />
      </TocProvider>
    </ThemeProvider>
  );
}
