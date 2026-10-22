import { Link } from "react-router";
import { Sparkle, MagicWand, ImageSquare, VideoCamera, Palette, TextAa } from "@phosphor-icons/react";
import { LinkCard, Chip } from "../components/docs";
import { SiteFooter, FIGMA_URL } from "../layouts/RootLayout";
import { Button } from "../components/ui/button";
import { releases } from "../data/changelog";

const roles = [
  { to: "/get-started/designers", title: "For designers", text: "Use the Figma UI kit, variables and text styles in your files." },
  { to: "/get-started/developers", title: "For developers", text: "Import the tokens and build with semantic CSS variables." },
  { to: "/get-started/brand", title: "For brand teams", text: "Logo, voice and the rules that keep every post on-brand." },
];

function SwatchPreview() {
  const stops = ["--pink-500", "--pink-200", "--pink-50", "--gray-900", "--gray-500", "--gray-100"];
  return (
    <div style={{ display: "flex", height: 56, borderRadius: 10, overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
      {stops.map((s) => <div key={s} style={{ flex: s === "--pink-500" ? 2 : 1, background: `var(${s})` }} />)}
    </div>
  );
}

function TypePreview() {
  return (
    <div style={{ height: 56, display: "flex", alignItems: "baseline", gap: 14 }}>
      <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 44, lineHeight: "56px", letterSpacing: "-0.03em" }}>Aa</span>
      <span style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: 28, lineHeight: "56px", color: "var(--foreground-secondary)" }}>Aa</span>
    </div>
  );
}

function SpacingPreview() {
  return (
    <div style={{ height: 56, display: "flex", alignItems: "flex-end", gap: 6 }}>
      {[8, 14, 20, 28, 38, 50].map((h, i) => (
        <div key={h} style={{ width: 18, height: h, borderRadius: 4, background: i === 5 ? "var(--accent-background-default)" : "var(--background-muted)" }} />
      ))}
    </div>
  );
}

function ElevationPreview() {
  return (
    <div style={{ height: 56, display: "flex", alignItems: "center", gap: 14, paddingLeft: 4 }}>
      {[1, 3, 5].map((l) => (
        <div key={l} style={{ width: 44, height: 40, borderRadius: 10, background: "var(--background-surface-raised)", boxShadow: `var(--shadow-neutral-${l})` }} />
      ))}
      <div style={{ width: 44, height: 40, borderRadius: 10, background: "var(--background-surface-raised)", boxShadow: "var(--shadow-accent-5)" }} />
    </div>
  );
}

function IconPreview() {
  const icons = [Sparkle, MagicWand, ImageSquare, VideoCamera, Palette, TextAa];
  return (
    <div style={{ height: 56, display: "flex", alignItems: "center", gap: 14, color: "var(--foreground-primary)" }}>
      {icons.map((I, i) => <I key={i} size={26} weight={i === 0 ? "fill" : "regular"} color={i === 0 ? "var(--accent-foreground-brand)" : undefined} />)}
    </div>
  );
}

function TokenPreview() {
  return (
    <div style={{ height: 56, display: "flex", flexDirection: "column", justifyContent: "center", gap: 4, fontFamily: "var(--font-mono)", fontSize: 13 }}>
      <span><span style={{ color: "var(--foreground-tertiary)" }}>--</span>accent-background-default</span>
      <span><span style={{ color: "var(--foreground-tertiary)" }}>--</span>foreground-secondary</span>
    </div>
  );
}

const foundations = [
  { to: "/foundations/color", title: "Color", text: "Neutrals carry the interface; pink #FF589B is the single accent.", preview: <SwatchPreview /> },
  { to: "/foundations/typography", title: "Typography", text: "Mona Sans for headings, Montserrat for everything people read.", preview: <TypePreview /> },
  { to: "/foundations/spacing", title: "Spacing", text: "A 4px-based scale with Compact and Spacious modes.", preview: <SpacingPreview /> },
  { to: "/foundations/elevation", title: "Elevation", text: "Seven shadow levels, in neutral and tinted families.", preview: <ElevationPreview /> },
  { to: "/foundations/iconography", title: "Iconography", text: "Phosphor icons at consistent sizes and weights.", preview: <IconPreview /> },
  { to: "/foundations/tokens", title: "Tokens", text: "Every value, named by role and synced with Figma.", preview: <TokenPreview /> },
];

const components = [
  { to: "/components/button", title: "Button", text: "Accent, neutral and danger, in five levels of emphasis." },
  { to: "/components/button/icon", title: "Icon button", text: "Compact actions in toolbars and dense rows." },
  { to: "/components/button/group", title: "Button group", text: "Related actions joined into one control." },
  { to: "/components/input", title: "Input", text: "Text entry with label, helper and validation states." },
  { to: "/components/sidebar", title: "Sidebar", text: "The persistent app navigation rail." },
];

export function HomePage() {
  const latest = releases[0];
  return (
    <div className="lp-home">
      <section className="lp-hero">
        <Link to="/whats-new" className="lp-hero__badge">
          <Chip tone="accent">Version {latest.version} · {latest.date}</Chip>
        </Link>

        <h1 className="lp-hero__title">
          <span className="lp-hero__line">LayerProof</span>
          <span className="lp-hero__line">
            {["Design", "System"].map((w) => <span key={w} className="lp-hero__shine">{w}</span>)}
          </span>
        </h1>

        <p className="lp-hero__lede">
          The foundations, components and tokens behind every LayerProof screen — neutral by default, pink where it matters.
        </p>

        <div className="lp-hero__ctas">
          <span className="lp-halo">
            <Link to="/get-started/designers" className="lp-cta lp-cta--primary">Get started</Link>
          </span>
          <a href={FIGMA_URL} target="_blank" rel="noopener noreferrer" className="lp-cta lp-cta--outline">Open the Figma kit</a>
        </div>
      </section>

      <div
        className="lp-gradient-panel"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}brand-gradient.jpg)` }}
      >
        <div className="lp-grid lp-grid--3 lp-gradient-panel__cards">
          {roles.map((r) => <LinkCard key={r.to} {...r} />)}
        </div>
      </div>

      <section className="lp-home-section" aria-labelledby="home-foundations">
        <div className="lp-home-section__head">
          <div>
            <h2 id="home-foundations" className="lp-section__title" style={{ fontSize: "var(--text-h4)", lineHeight: "var(--lh-h4)", letterSpacing: "var(--ls-h4)" }}>Foundations</h2>
            <p className="lp-section__desc">The visual building blocks every LayerProof screen shares.</p>
          </div>
          <Button asChild variant="outline"><Link to="/foundations">All foundations</Link></Button>
        </div>
        <div className="lp-panel">
          <div className="lp-grid lp-grid--3">
            {foundations.map((f) => <LinkCard key={f.to} {...f} />)}
          </div>
        </div>
      </section>

      <section className="lp-home-section" aria-labelledby="home-components">
        <div className="lp-home-section__head">
          <div>
            <h2 id="home-components" className="lp-section__title" style={{ fontSize: "var(--text-h4)", lineHeight: "var(--lh-h4)", letterSpacing: "var(--ls-h4)" }}>Components</h2>
            <p className="lp-section__desc">Documented with live examples, code and usage guidance.</p>
          </div>
          <Button asChild variant="outline"><Link to="/components">All components</Link></Button>
        </div>
        <div className="lp-panel">
          <div className="lp-grid lp-grid--3">
            <div className="lp-card" style={{ display: "flex", flexWrap: "wrap", alignContent: "center", gap: 10 }} aria-label="Button examples">
              <Button variant="accent">Create post</Button>
              <Button variant="default">Generate video</Button>
              <Button variant="outline">Save draft</Button>
              <Button variant="accent-ghost">Preview</Button>
            </div>
            {components.map((c) => <LinkCard key={c.to} {...c} />)}
          </div>
        </div>
      </section>

      <section className="lp-home-section" aria-labelledby="home-latest">
        <div className="lp-card lp-card--accent" style={{ padding: 28, display: "flex", gap: 24, alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap" }}>
          <div style={{ maxWidth: 640 }}>
            <p className="lp-card__meta" style={{ marginTop: 0 }}>Latest release · {latest.date}</p>
            <h2 id="home-latest" className="lp-section__title" style={{ marginTop: 4 }}>Version {latest.version}</h2>
            <p className="lp-section__desc" style={{ marginTop: 8 }}>{latest.summary}</p>
          </div>
          <Button asChild variant="default"><Link to="/whats-new">Read the changelog</Link></Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
