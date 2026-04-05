import { Outlet, Link, useLocation } from "react-router";
import { Search } from "lucide-react";
import { ThemeProvider, useTheme } from "../components/ThemeProvider";
import { TocProvider } from "../context/TocContext";
import { NavTree } from "../components/NavTree";
import { TableOfContents } from "../components/TableOfContents";

// Routes that show the design-system sidebar + ToC
const DS_ROUTES = [
  "/foundations",
  "/components",
  "/layout",
  "/resources",
  "/get-started",
];

function isDesignSystemRoute(pathname: string) {
  return DS_ROUTES.some((r) => pathname === r || pathname.startsWith(r + "/"));
}

function Header() {
  const { toggleTheme } = useTheme();
  const location = useLocation();
  const isDS = isDesignSystemRoute(location.pathname);

  const navLinkStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: '"Roboto", sans-serif',
    fontSize: 14,
    fontWeight: active ? 600 : 400,
    color: active ? "var(--color-text-primary)" : "var(--color-text-secondary)",
    textDecoration: "none",
    paddingBottom: 2,
    borderBottom: active
      ? "2px solid var(--color-text-primary)"
      : "2px solid transparent",
    transition: "color 150ms, border-color 150ms",
    whiteSpace: "nowrap" as const,
  });

  const iconBtn: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 12px",
    borderRadius: 6,
    background: "transparent",
    border: "1px solid var(--color-border)",
    cursor: "pointer",
    color: "var(--color-text-secondary)",
    fontSize: 13,
    fontFamily: '"Roboto", sans-serif',
    transition: "background 150ms, color 150ms",
  };

  return (
    <header
      style={{
        height: 56,
        position: "sticky",
        top: 0,
        zIndex: 50,
        boxShadow: "0 4px 24px 0 var(--header-shadow, rgba(0,0,0,0.12))",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        background: "var(--color-background)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        paddingLeft: 20,
        paddingRight: 20,
        gap: 24,
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
          flexShrink: 0,
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}symbol.png`}
          alt="LayerProof"
          style={{ height: 26, width: "auto" }}
        />
        <span
          style={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: 16,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.01em",
          }}
        >
          LayerProof Design
        </span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: "flex", alignItems: "center", gap: 28, flex: 1 }}>
        <Link
          to="/foundations"
          style={navLinkStyle(isDS)}
          onMouseEnter={(e) => {
            if (!isDS)
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-text-primary)";
          }}
          onMouseLeave={(e) => {
            if (!isDS)
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-text-secondary)";
          }}
        >
          Design system
        </Link>
        <Link
          to="/resources"
          style={navLinkStyle(false)}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color =
              "var(--color-text-primary)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color =
              "var(--color-text-secondary)")
          }
        >
          News
        </Link>
      </nav>

      {/* Actions */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}
      >
        {/* Search */}
        <button
          style={iconBtn}
          aria-label="Search"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--color-surface)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--color-text-primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--color-text-secondary)";
          }}
        >
          <Search size={14} />
          <span>Search</span>
        </button>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          style={iconBtn}
          aria-label="Toggle theme"
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "var(--color-surface)";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--color-text-primary)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "transparent";
            (e.currentTarget as HTMLButtonElement).style.color =
              "var(--color-text-secondary)";
          }}
        >
          {/* Half-circle icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle
              cx="7"
              cy="7"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="M7 1a6 6 0 0 1 0 12V1z" fill="currentColor" />
          </svg>
          <span>Theme</span>
        </button>
      </div>
      <style>
        {`
        :root {
        --header-shadow: rgba(0,0,0,0.12);
        }
        [data-theme="light"] {
        --header-shadow: 0 4px 24px 0 rgba(255,255,255,0.8);
        }
      `}
      </style>
    </header>
  );
}

function LayoutInner() {
  const location = useLocation();
  const isDS = isDesignSystemRoute(location.pathname);

  return (
    <div style={{ background: "var(--color-background)", minHeight: "100vh" }}>
      <Header />

      <div style={{ display: "flex", marginLeft: isDS ? 220 : 0 }}>
        {/* Left nav — only on design system pages */}
        {isDS && (
          <aside
            style={{
              position: "fixed",
              top: 56,
              left: 0,
              width: 220,
              height: "calc(100vh - 56px)",
              borderRight: "1px solid var(--color-border)",
              overflowY: "auto",
              background: "var(--color-background)",
              flexShrink: 0,
            }}
          >
            <NavTree />
          </aside>
        )}

        {/* Main content */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            color: "var(--color-text-primary)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: isDS ? 800 : "none",
              padding: isDS ? "48px 40px" : "0",
            }}
          >
            <Outlet />
          </div>
        </main>

        {/* Right ToC — only on design system pages */}
        {isDS && (
          <aside
            style={{ width: 200, flexShrink: 0, padding: "40px 16px 0 0" }}
          >
            <div style={{ position: "sticky", top: 72 }}>
              <TableOfContents />
            </div>
          </aside>
        )}
      </div>
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
