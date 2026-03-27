import { Link } from "react-router";
import { ArrowRight, Palette, Layout, Box, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(3rem, 8vw, 5rem)",
                textTransform: "uppercase",
                color: "var(--color-text-primary)",
                lineHeight: 1.05,
              }}
            >
              LayerProof
              <br />
              Design System
            </h1>
            <p
              className="mt-6 mb-10 text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              A comprehensive design system built on precision, authority, and
              clarity.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="brand-btn brand-btn-primary gap-2"
              >
                <Link to="/foundations">
                  Explore The System
                  <ArrowRight size={16} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.35)",
                  color: "var(--color-text-primary)",
                }}
              >
                <Link to="/resources">Download Resources</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: `radial-gradient(ellipse at 20% 60%, var(--brand-primary) 0%, transparent 50%),
                         radial-gradient(ellipse at 80% 30%, var(--brand-secondary) 0%, transparent 50%)`,
            opacity: 0.05,
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
            className="text-center mb-14"
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
              to="/foundations/color"
              style={{
                textDecoration: "none",
                gridColumn: "1",
                gridRow: "1 / 3",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl p-5 flex flex-col transition-opacity hover:opacity-80"
            >
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <Palette
                    size={16}
                    style={{ color: "var(--brand-primary)" }}
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
              to="/foundations/typography"
              style={{
                textDecoration: "none",
                gridColumn: "2",
                gridRow: "1",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl p-5 flex flex-col transition-opacity hover:opacity-80"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: 13,
                      color: "var(--color-text-inverse)",
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
              to="/foundations/logos"
              style={{
                textDecoration: "none",
                gridColumn: "3",
                gridRow: "1",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl p-5 flex flex-col transition-opacity hover:opacity-80"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <FileText
                    size={16}
                    style={{ color: "var(--color-text-inverse)" }}
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
                    src={`${import.meta.env.BASE_URL}symbol.png`}
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
              className="group rounded-2xl flex items-center justify-center transition-opacity hover:opacity-80"
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
              to="/foundations/tokens"
              style={{
                textDecoration: "none",
                gridColumn: "3",
                gridRow: "2 / 4",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl p-5 flex flex-col transition-opacity hover:opacity-80"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <Box
                    size={16}
                    style={{ color: "var(--color-text-inverse)" }}
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
              to="/components"
              style={{
                textDecoration: "none",
                gridColumn: "1 / 3",
                gridRow: "3",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl p-5 transition-opacity hover:opacity-80"
            >
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    width: 36,
                    height: 36,
                    background: "var(--color-text-primary)",
                    border: "1px solid var(--color-border)",
                  }}
                >
                  <Layout
                    size={16}
                    style={{ color: "var(--brand-secondary)" }}
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
            <Button
              asChild
              size="lg"
              className="brand-btn brand-btn-primary rounded-full gap-2"
            >
              <Link to="/get-started/designers">
                Get started <ArrowRight size={14} />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full gap-2"
            >
              <Link to="/">
                See what's new <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section
        className="py-20 px-8"
        style={{
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Design Tokens" },
              { number: "12+", label: "UI Components" },
              { number: "4", label: "Color Palettes" },
              { number: "100%", label: "Accessible" },
            ].map((stat) => (
              <div key={stat.label} className="p-6">
                <div
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "var(--text-5xl)",
                    color: "var(--brand-primary)",
                    lineHeight: 1.1,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  className="mt-2 text-sm"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Get Started — 3 roles ── */}
      <section className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <h2
            className="mb-8"
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
              to="/get-started/designers"
              style={{
                textDecoration: "none",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl overflow-hidden flex flex-col transition-opacity hover:opacity-90"
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
              <div className="p-5">
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
              </div>
            </Link>

            {/* Developers */}
            <Link
              to="/get-started/developers"
              style={{
                textDecoration: "none",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl overflow-hidden flex flex-col transition-opacity hover:opacity-90"
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
              <div className="p-5">
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
              </div>
            </Link>

            {/* Brand teams */}
            <Link
              to="/get-started/brand"
              style={{
                textDecoration: "none",
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              className="group rounded-2xl overflow-hidden flex flex-col transition-opacity hover:opacity-90"
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
                  src={`${import.meta.env.BASE_URL}symbol.png`}
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
              <div className="p-5">
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
