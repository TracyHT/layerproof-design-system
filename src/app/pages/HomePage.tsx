import { Link } from "react-router";
import { ArrowRight, Palette, Layout, Box } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useInView } from "../hooks/useInView";
import { GridPattern } from "../components/ui/grid-pattern";

export function HomePage() {
  // Bento refs
  const bentoTitleRef = useInView<HTMLHeadingElement>({
    animation: "anim-fade-up",
  });
  const colorCardRef = useInView<HTMLAnchorElement>({
    animation: "anim-scale-in",
  });
  const typoCardRef = useInView<HTMLAnchorElement>({
    animation: "anim-scale-in delay-100",
  });
  const logosCardRef = useInView<HTMLAnchorElement>({
    animation: "anim-scale-in delay-200",
  });
  const bannerCardRef = useInView<HTMLAnchorElement>({
    animation: "anim-scale-in delay-200",
  });
  const tokensCardRef = useInView<HTMLAnchorElement>({
    animation: "anim-scale-in delay-300",
  });
  const componentsCardRef = useInView<HTMLAnchorElement>({
    animation: "anim-scale-in delay-300",
  });

  // Get Started refs
  const gsTitleRef = useInView<HTMLHeadingElement>({
    animation: "anim-fade-up",
  });
  const gsCard1Ref = useInView<HTMLAnchorElement>({
    animation: "anim-fade-up delay-100",
  });
  const gsCard2Ref = useInView<HTMLAnchorElement>({
    animation: "anim-fade-up delay-200",
  });
  const gsCard3Ref = useInView<HTMLAnchorElement>({
    animation: "anim-fade-up delay-300",
  });

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `
            radial-gradient(ellipse 90% 80% at 75% 30%, color-mix(in srgb, var(--brand-secondary) 22%, transparent), transparent 65%),
            radial-gradient(ellipse 70% 60% at 85% 85%, color-mix(in srgb, var(--brand-accent) 18%, transparent), transparent 60%),
            radial-gradient(ellipse 50% 50% at 60% 60%, color-mix(in srgb, var(--brand-primary) 10%, transparent), transparent 55%),
            var(--color-background)
          `,
          minHeight: "100vh",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        {/* Grid pattern */}
        <GridPattern
          hoverable
          className="inset-x-0 inset-y-[-20%] h-[140%] skew-y-6"
          style={{
            color: "var(--color-border)",
            maskImage:
              "radial-gradient(ellipse 80% 70% at 60% 50%, white 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 70% at 60% 50%, white 30%, transparent 100%)",
            zIndex: 0,
          }}
        />

        {/* ── Left: hero text ── */}
        <div
          className="relative flex flex-col justify-center"
          style={{
            width: "100%",
            maxWidth: 580,
            padding: "100px 48px 100px 64px",
            flexShrink: 0,
            zIndex: 1,
          }}
        >
          {/* Blur mask behind text */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
              maskImage:
                "radial-gradient(ellipse 90% 80% at 40% 50%, black 60%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 90% 80% at 40% 50%, black 60%, transparent 100%)",
            }}
          />
          {/* Release note badge */}
          <Link
            to="/whats-new"
            className="inline-flex items-center justify-between gap-4 mb-10 anim-fade-down self-start"
            style={{
              background: "var(--accent-surface-disable)",
              borderRadius: 12,
              padding: "10px 16px",
              textDecoration: "none",
              minWidth: 260,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  color: "var(--accent-text-default)",
                  marginBottom: 2,
                }}
              >
                Release Note
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8rem",
                  color: "var(--accent-text-default)",
                  opacity: 0.7,
                }}
              >
                Checkout the latest release v1.2.0
              </p>
            </div>
            <ArrowRight
              size={16}
              style={{ color: "var(--accent-text-default)", flexShrink: 0 }}
            />
          </Link>

          <h1
            className="anim-fade-down delay-100"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
              lineHeight: 1.0,
              marginBottom: 24,
            }}
          >
            LayerProof
            <br />
            <span
              style={{
                background: "var(--brand-secondary)",
                color: "#ffffff",
                padding: "0 0.15em",
                display: "inline-block",
                whiteSpace: "nowrap",
              }}
            >
              Design System
            </span>
          </h1>

          <p
            className="anim-fade-up delay-200"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.125rem",
              lineHeight: 1.7,
              color: "var(--color-text-secondary)",
              marginBottom: 36,
              maxWidth: 400,
            }}
          >
            A comprehensive design system built on precision, authority, and
            clarity.
          </p>

          <div className="flex flex-wrap gap-3 anim-scale-in delay-300">
            <Button asChild size="lg" variant="accent">
              <Link to="/foundations">
                Explore The System
                <ArrowRight size={16} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/resources">Download Resources</Link>
            </Button>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 100,
            background:
              "linear-gradient(to bottom, transparent, var(--color-background))",
            zIndex: 2,
          }}
        />
      </section>

      {/* ── Bento — Discover the system ── */}
      <section
        className="py-24 px-8"
        style={{ background: "var(--color-background)" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            ref={bentoTitleRef}
            className="text-center mb-14 animate-on-scroll"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
              lineHeight: 1.1,
            }}
          >
            Discover the system
            <br />
            powering our designs
          </h2>

          {/* Bento grid — 3 cols × 3 rows */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr 1fr",
              gridTemplateRows: "auto auto auto",
              gap: 12,
            }}
          >
            {/* ── Color — col 1, rows 1-2 ── */}
            <Link
              ref={colorCardRef}
              to="/foundations/color"
              style={{
                textDecoration: "none",
                gridColumn: "1",
                gridRow: "1 / 3",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl p-5 flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg animate-on-scroll"
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--accent-surface-light)",
                  }}
                >
                  <Palette size={16} style={{ color: "var(--accent-surface-dark)" }} />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Color
                </span>
              </div>
              {/* Swatch stack */}
              <div className="flex-1 flex flex-col gap-2 justify-center">
                {[
                  [
                    "var(--yellow-900)",
                    "var(--yellow-700)",
                    "var(--yellow-500)",
                  ],
                  ["var(--pink-900)", "var(--pink-700)", "var(--pink-500)"],
                  ["#000000", "#111111", "#1c1c1c"],
                ].map((row, ri) => (
                  <div key={ri} className="flex gap-2">
                    {row.map((c) => (
                      <div
                        key={c}
                        className="flex-1 rounded-lg"
                        style={{
                          height: 36,
                          background: c,
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <span
                className="mt-5 text-xs flex items-center gap-1"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--brand-primary)",
                }}
              >
                Explore <ArrowRight size={12} />
              </span>
            </Link>

            {/* ── Typography — col 2, row 1 ── */}
            <Link
              ref={typoCardRef}
              to="/foundations/typography"
              style={{
                textDecoration: "none",
                gridColumn: "2",
                gridRow: "1",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl p-5 flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg animate-on-scroll"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--secondary-surface-light)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: 13,
                      color: "var(--secondary-surface-dark)",
                    }}
                  >
                    Tt
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Typography
                </span>
              </div>
              <div
                className="rounded-xl p-4"
                style={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.75rem",
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                    lineHeight: 1.1,
                  }}
                >
                  From{" "}
                  <span style={{ color: "var(--brand-primary)" }}>Dump</span>
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.75rem",
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                    lineHeight: 1.1,
                  }}
                >
                  To{" "}
                  <span style={{ color: "var(--brand-secondary)" }}>Done</span>
                </p>
                <p
                  className="mt-2 text-xs"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-tertiary)",
                  }}
                >
                  Anton · DM Sans · Roboto
                </p>
              </div>
            </Link>

            {/* ── Logos — col 3, row 1 ── */}
            <Link
              ref={logosCardRef}
              to="/foundations/logos"
              style={{
                textDecoration: "none",
                gridColumn: "3",
                gridRow: "1",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl p-5 flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg animate-on-scroll"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--color-text-primary)",
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}symbol.png`}
                    alt=""
                    style={{ height: 20, width: "auto", filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Logos
                </span>
              </div>
              <div
                className="flex-1 flex items-center justify-center rounded-xl"
                style={{ background: "#000", minHeight: 80 }}
              >
                <div className="flex items-center gap-2">
                  <img
                    src="/symbol.png"
                    alt=""
                    style={{ height: 28, filter: "brightness(0) invert(1)" }}
                  />
                  <span
                    style={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 700,
                      fontSize: 14,
                      color: "#fff",
                    }}
                  >
                    LayerProof
                  </span>
                </div>
              </div>
            </Link>

            {/* ── Banner — col 2, row 2 ── */}
            <Link
              ref={bannerCardRef}
              to="/foundations"
              style={{
                textDecoration: "none",
                gridColumn: "2",
                gridRow: "2",
                background: "var(--brand-primary)",
                minHeight: 120,
                position: "relative",
                overflow: "hidden",
              }}
              className="group rounded-2xl flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-lg animate-on-scroll"
            >
              {/* dot grid */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)",
                  backgroundSize: "var(--spacing-xl) var(--spacing-xl)",
                }}
              />
              <span
                style={{
                  position: "relative",
                  fontFamily: "var(--font-heading)",
                  fontSize: "1.5rem",
                  textTransform: "uppercase",
                  color: "var(--color-text-inverse)",
                  textAlign: "center",
                  lineHeight: 1.2,
                  padding: "0 var(--spacing-lg)",
                }}
              >
                LayerProof
                <br />
                Design System
              </span>
            </Link>

            {/* ── Tokens — col 3, rows 2-3 ── */}
            <Link
              ref={tokensCardRef}
              to="/foundations/tokens"
              style={{
                textDecoration: "none",
                gridColumn: "3",
                gridRow: "2 / 4",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl p-5 flex flex-col transition-all hover:-translate-y-1 hover:shadow-lg animate-on-scroll"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--accent-surface-light)",
                  }}
                >
                  <Box
                    size={16}
                    style={{ color: "var(--accent-surface-dark)" }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Tokens
                </span>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                {[
                  { name: "--brand-primary", dot: "var(--brand-primary)" },
                  { name: "--brand-secondary", dot: "var(--brand-secondary)" },
                  { name: "--font-heading", dot: "var(--color-text-tertiary)" },
                  { name: "--spacing-md", dot: "var(--color-text-tertiary)" },
                  { name: "--radius-lg", dot: "var(--color-text-tertiary)" },
                  { name: "--shadow-md", dot: "var(--color-text-tertiary)" },
                ].map(({ name, dot }) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5"
                    style={{
                      background: "var(--color-background)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <div
                      className="rounded-sm shrink-0"
                      style={{ width: 10, height: 10, background: dot }}
                    />
                    <span
                      className="text-xs font-mono truncate"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </Link>

            {/* ── Components — col 1-2, row 3 ── */}
            <Link
              ref={componentsCardRef}
              to="/components"
              style={{
                textDecoration: "none",
                gridColumn: "1 / 3",
                gridRow: "3",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl p-5 transition-all hover:-translate-y-1 hover:shadow-lg animate-on-scroll"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--secondary-surface-light)",
                  }}
                >
                  <Layout
                    size={16}
                    style={{ color: "var(--secondary-surface-dark)" }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Components
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Button",
                  "Card",
                  "Input",
                  "Badge",
                  "Dialog",
                  "Toggle",
                  "Select",
                  "Avatar",
                  "Tooltip",
                  "Accordion",
                ].map((c) => (
                  <Badge
                    key={c}
                    variant="outline"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {c}
                  </Badge>
                ))}
                <Badge
                  variant="outline"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--brand-primary)",
                    borderColor: "var(--brand-primary)",
                  }}
                >
                  50+ more →
                </Badge>
              </div>
            </Link>
          </div>

          {/* CTA row */}
          <div className="flex justify-center gap-4 mt-10">
            <Button asChild size="lg" variant="default">
              <Link to="/get-started/designers">
                Get started <ArrowRight size={14} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/">
                See what's new <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Get Started — 3 roles ── */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2
            ref={gsTitleRef}
            className="mb-8 animate-on-scroll"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-4xl)",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
            }}
          >
            Get started
          </h2>

          <div className="grid md:grid-cols-3 gap-5">
            {/* Designers */}
            <Link
              ref={gsCard1Ref}
              to="/get-started/designers"
              style={{
                textDecoration: "none",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl overflow-hidden flex flex-col transition-opacity hover:opacity-90 animate-on-scroll"
            >
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{ height: 200, background: "var(--color-background)" }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 140,
                    height: 140,
                    background: "var(--yellow-500)",
                    borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                    opacity: 0.9,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: 90,
                    height: 90,
                    background: "var(--color-background)",
                    borderRadius: "50%",
                    zIndex: 1,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 2,
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--text-4xl)",
                    color: "var(--yellow-500)",
                    textTransform: "uppercase",
                  }}
                >
                  Aa
                </span>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <p
                  className="font-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  For designers
                </p>
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Figma libraries, design tokens, and brand guidelines.
                </p>
                <Button
                  size="sm"
                  variant="accent-ghost"
                  className="self-start gap-1"
                >
                  Explore Figma libraries <ArrowRight size={12} />
                </Button>
              </div>
            </Link>

            {/* Developers */}
            <Link
              ref={gsCard2Ref}
              to="/get-started/developers"
              style={{
                textDecoration: "none",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl overflow-hidden flex flex-col transition-opacity hover:opacity-90 animate-on-scroll"
            >
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{ height: 200, background: "var(--color-background)" }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 130,
                    height: 130,
                    background: "var(--pink-500)",
                    transform: "rotate(20deg)",
                    borderRadius: 24,
                    opacity: 0.9,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: 80,
                    height: 80,
                    background: "var(--color-background)",
                    borderRadius: "50%",
                    zIndex: 1,
                  }}
                />
                <span
                  style={{
                    position: "relative",
                    zIndex: 2,
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-2xl)",
                    color: "var(--color-text-primary)",
                  }}
                >{`</>`}</span>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <p
                  className="font-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  For developers
                </p>
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Environment setup, token integration, and component guides.
                </p>
                <Button size="sm" variant="ghost" className="self-start gap-1">
                  View setup guide <ArrowRight size={12} />
                </Button>
              </div>
            </Link>

            {/* Brand teams */}
            <Link
              ref={gsCard3Ref}
              to="/get-started/brand"
              style={{
                textDecoration: "none",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl overflow-hidden flex flex-col transition-opacity hover:opacity-90 animate-on-scroll"
            >
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{ height: 200, background: "var(--color-background)" }}
              >
                <div
                  style={{
                    position: "absolute",
                    width: 120,
                    height: 120,
                    background: "var(--color-text-primary)",
                    transform: "rotate(12deg)",
                    borderRadius: 18,
                    opacity: 0.12,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    width: 120,
                    height: 120,
                    background: "var(--color-text-primary)",
                    transform: "rotate(-8deg)",
                    borderRadius: 18,
                    opacity: 0.08,
                  }}
                />
                <img
                  src="/symbol.png"
                  alt=""
                  style={{
                    position: "relative",
                    zIndex: 1,
                    height: 56,
                    width: "auto",
                    opacity: 0.85,
                  }}
                />
              </div>
              <div className="p-5 flex flex-col gap-3">
                <p
                  className="font-semibold mb-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  For brand teams
                </p>
                <p
                  className="text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Voice & tone, logo rules, and content standards.
                </p>
                <Button size="sm" variant="ghost" className="self-start gap-1">
                  Brand guidelines <ArrowRight size={12} />
                </Button>
              </div>
            </Link>
          </div>

          <div className="mt-8">
            <Link
              to="/get-started/designers"
              className="inline-flex items-center gap-1 text-sm transition-opacity hover:opacity-70"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
                textDecoration: "underline",
              }}
            >
              Explore all get started guides <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
