import { useState, useMemo } from "react";
import * as PhosphorIcons from "@phosphor-icons/react";
import type { Icon as PhosphorIconType } from "@phosphor-icons/react";
import { FoundationShell } from "../../components/FoundationShell";
import { Button } from "@/app/components/ui/button";

// ─── Icon registry — built once at module level ────────────────────────────

type IconEntry = { name: string; component: PhosphorIconType };

const ALL_ICONS: IconEntry[] = (
  Object.entries(PhosphorIcons) as [string, PhosphorIconType][]
)
  .filter(
    ([name]) =>
      /^[A-Z]/.test(name) &&
      !name.endsWith("Icon") &&
      name !== "IconContext" &&
      name !== "IconBase" &&
      name !== "SSR",
  )
  .map(([name, component]) => ({ name, component }))
  .sort((a, b) => a.name.localeCompare(b.name));

type Weight = "regular" | "fill";
const WEIGHTS: Weight[] = ["regular", "fill"];

// ─── Shared snippet styles ─────────────────────────────────────────────────

const codeBlockStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "0.75rem",
  color: "var(--color-text-secondary)",
  background: "var(--color-surface-hover)",
  border: "1px solid var(--color-border)",
  borderRadius: "0.5rem",
  padding: "0.625rem 0.75rem",
  whiteSpace: "pre-wrap",
  wordBreak: "break-all",
  lineHeight: 1.6,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.75rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--color-text-tertiary)",
  margin: "0 0 0.375rem",
};

// ─── ExploreTab ────────────────────────────────────────────────────────────

function ExploreTab() {
  const [query, setQuery] = useState("");
  const [weight, setWeight] = useState<Weight>("regular");
  const [selected, setSelected] = useState<IconEntry | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return ALL_ICONS;
    return ALL_ICONS.filter((icon) => icon.name.toLowerCase().includes(q));
  }, [query]);

  function handleIconClick(icon: IconEntry) {
    setSelected((prev) => (prev?.name === icon.name ? null : icon));
  }

  const SelectedIcon = selected?.component ?? null;

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
      {/* ── Left column ── */}
      <div style={{ flex: "1 1 0", minWidth: 0 }}>
        {/* Search */}
        <div style={{ position: "relative", marginBottom: "1.25rem" }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--color-text-tertiary)",
              pointerEvents: "none",
            }}
          >
            <circle
              cx="6.5"
              cy="6.5"
              r="4.5"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M10.5 10.5L14 14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search icons…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              paddingLeft: "2.5rem",
              paddingRight: query ? "2.5rem" : "1rem",
              paddingTop: "0.625rem",
              paddingBottom: "0.625rem",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.75rem",
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--color-text-primary)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-text-tertiary)",
                fontSize: 18,
                lineHeight: 1,
                padding: 2,
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Weight selector */}
        <div
          style={{
            display: "flex",
            gap: "0.375rem",
            flexWrap: "wrap",
            marginBottom: "1.5rem",
          }}
        >
          {WEIGHTS.map((w) => (
            <Button
              key={w}
              variant={weight === w ? "default" : "outline"}
              size="sm"
              onClick={() => setWeight(w)}
              style={{
                textTransform: "capitalize",
                fontWeight: weight === w ? 600 : 400,
              }}
            >
              {w}
            </Button>
          ))}
        </div>

        {/* Category label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Phosphor
          </span>
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-text-tertiary)",
              background: "var(--color-surface-hover)",
              border: "1px solid var(--color-border)",
              padding: "0.1rem 0.5rem",
              borderRadius: "0.375rem",
            }}
          >
            @phosphor-icons/react
          </code>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              color: "var(--color-text-tertiary)",
              marginLeft: "auto",
            }}
          >
            {filtered.length} icon{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Icon grid */}
        {filtered.length === 0 ? (
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "0.75rem",
              padding: "3rem 1.5rem",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-tertiary)",
                fontSize: "0.9375rem",
                margin: 0,
              }}
            >
              No icons match{" "}
              <strong style={{ color: "var(--color-text-primary)" }}>
                "{query}"
              </strong>
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(88px, 1fr))",
              gap: "0.5rem",
            }}
          >
            {filtered.map((icon) => {
              const IconComp = icon.component;
              const isSelected = selected?.name === icon.name;
              return (
                <button
                  key={icon.name}
                  onClick={() => handleIconClick(icon)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.375rem",
                    padding: "0.75rem 0.5rem",
                    borderRadius: "0.625rem",
                    border: `1px solid ${isSelected ? "var(--brand-primary)" : "var(--color-border)"}`,
                    background: isSelected
                      ? "color-mix(in srgb, var(--brand-primary) 12%, transparent)"
                      : "var(--color-surface)",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    color: isSelected
                      ? "var(--brand-primary)"
                      : "var(--color-text-primary)",
                  }}
                  title={icon.name}
                >
                  <IconComp size={24} weight={weight} />
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.625rem",
                      color: isSelected
                        ? "var(--brand-primary)"
                        : "var(--color-text-tertiary)",
                      textAlign: "center",
                      lineHeight: 1.3,
                      wordBreak: "break-word",
                      maxWidth: "100%",
                    }}
                  >
                    {icon.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Right column — detail panel ── */}
      <div
        style={{
          width: 300,
          flexShrink: 0,
          position: "sticky",
          top: "6rem",
          borderRadius: "0.875rem",
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
          padding: "1.5rem",
        }}
      >
        {!selected || !SelectedIcon ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
              minHeight: 180,
              color: "var(--color-text-tertiary)",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              style={{ opacity: 0.35 }}
            >
              <rect
                x="4"
                y="4"
                width="32"
                height="32"
                rx="6"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              <path
                d="M15 20h10M20 15v10"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.875rem",
                color: "var(--color-text-tertiary)",
                margin: 0,
                textAlign: "center",
              }}
            >
              Select an icon for details
            </p>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Icon preview */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.625rem",
              }}
            >
              <div
                style={{
                  padding: "1.25rem",
                  borderRadius: "0.75rem",
                  background: "var(--color-surface-hover)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                }}
              >
                <SelectedIcon size={48} weight={weight} />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  margin: 0,
                  textAlign: "center",
                }}
              >
                {selected.name}
              </p>
            </div>

            {/* Weight row */}
            <div>
              <p style={labelStyle}>Weight</p>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  margin: 0,
                  textTransform: "capitalize",
                }}
              >
                {weight}
              </p>
            </div>

            {/* Import snippet */}
            <div>
              <p style={labelStyle}>Import</p>
              <code style={codeBlockStyle}>
                {`import { ${selected.name} } from '@phosphor-icons/react'`}
              </code>
            </div>

            {/* Usage snippet */}
            <div>
              <p style={labelStyle}>Usage</p>
              <code style={codeBlockStyle}>
                {`<${selected.name}\n  size={24}\n  weight="${weight}"\n/>`}
              </code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── UsageTab ──────────────────────────────────────────────────────────────

const SIZES: { px: number; useCase: string }[] = [
  { px: 16, useCase: "Dense UI, inline with small text, table actions" },
  { px: 20, useCase: "Default inline, form inputs, button labels" },
  { px: 24, useCase: "Standard standalone, navigation items" },
  { px: 32, useCase: "Feature callouts, empty states" },
  { px: 48, useCase: "Hero icons, illustration-weight accents" },
];

type DoDontRule = {
  doTitle: string;
  doDesc: string;
  dontTitle: string;
  dontDesc: string;
};

const DO_DONT_RULES: DoDontRule[] = [
  {
    doTitle: "Pair icons with text labels",
    doDesc:
      "Always include a visible label or accessible tooltip so the icon's meaning is unambiguous.",
    dontTitle: "Use icons as the sole indicator",
    dontDesc:
      "Relying on icons alone forces users to memorize meanings and breaks accessibility.",
  },
  {
    doTitle: "Use consistent weight within a surface",
    doDesc:
      "Pick either Regular or Fill for a given UI surface and apply it uniformly.",
    dontTitle: "Mix Regular and Fill at random",
    dontDesc:
      "Inconsistent weights feel unpolished and undermine visual hierarchy.",
  },
  {
    doTitle: "Use the nearest standard size",
    doDesc:
      "Stick to 16 / 20 / 24 / 32 / 48 px — these sizes align to the spacing scale.",
    dontTitle: "Scale to arbitrary pixel values",
    dontDesc:
      "Values like 18 px or 22 px break the grid and look misaligned next to type.",
  },
  {
    doTitle: "Maintain 4–8 px gap between icon and label",
    doDesc:
      "A consistent gap creates a clear visual unit between the icon and its text.",
    dontTitle: "Collapse or over-expand the gap",
    dontDesc:
      "Zero gap reads as a single glyph; gaps over 12 px visually separate the pair.",
  },
];

function UsageTab() {
  // Use a stable icon for examples
  const { Star, StarFill, Check, X, MagnifyingGlass, Bell } =
    PhosphorIcons as unknown as Record<string, PhosphorIconType>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
      {/* ── 1. Sizing scale ── */}
      <section>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: "0 0 0.375rem",
          }}
        >
          Sizing scale
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            color: "var(--color-text-secondary)",
            margin: "0 0 1.25rem",
            lineHeight: 1.6,
          }}
        >
          Use only the five approved sizes. Each maps to a specific use case in
          the UI.
        </p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {SIZES.map(({ px, useCase }) => (
            <div
              key={px}
              style={{
                flex: "1 1 140px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "0.5rem",
                padding: "1rem",
                borderRadius: "0.75rem",
                border: "1px solid var(--color-border)",
                background: "var(--color-surface)",
              }}
            >
              <div style={{ color: "var(--color-text-primary)" }}>
                <Star size={px} weight="regular" />
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  fontWeight: 700,
                  color: "var(--brand-primary)",
                }}
              >
                {px}px
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.8125rem",
                  color: "var(--color-text-tertiary)",
                  lineHeight: 1.5,
                }}
              >
                {useCase}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 2. Do & Don't ── */}
      <section>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: "0 0 0.375rem",
          }}
        >
          Do &amp; Don't
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            color: "var(--color-text-secondary)",
            margin: "0 0 1.25rem",
            lineHeight: 1.6,
          }}
        >
          Follow these guidelines to keep icons purposeful and accessible.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1rem",
          }}
        >
          {DO_DONT_RULES.map((rule, i) => (
            <div key={i} style={{ display: "contents" }}>
              {/* Do card */}
              <div
                style={{
                  borderRadius: "0.75rem",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  overflow: "hidden",
                }}
              >
                <div style={{ height: 4, background: "#22c55e" }} />
                <div style={{ padding: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Check
                      size={16}
                      weight="bold"
                      style={{ color: "#22c55e", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.9375rem",
                        fontWeight: 700,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      Do: {rule.doTitle}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {rule.doDesc}
                  </p>
                </div>
              </div>
              {/* Don't card */}
              <div
                style={{
                  borderRadius: "0.75rem",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-surface)",
                  overflow: "hidden",
                }}
              >
                <div style={{ height: 4, background: "#ef4444" }} />
                <div style={{ padding: "1rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <X
                      size={16}
                      weight="bold"
                      style={{ color: "#ef4444", flexShrink: 0 }}
                    />
                    <span
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "0.9375rem",
                        fontWeight: 700,
                        color: "var(--color-text-primary)",
                      }}
                    >
                      Don't: {rule.dontTitle}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--color-text-secondary)",
                      margin: 0,
                      lineHeight: 1.6,
                    }}
                  >
                    {rule.dontDesc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Spacing rule ── */}
      <section>
        <h2
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.125rem",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            margin: "0 0 0.375rem",
          }}
        >
          Icon–label spacing
        </h2>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            color: "var(--color-text-secondary)",
            margin: "0 0 1.25rem",
            lineHeight: 1.6,
          }}
        >
          Always use a spacing token between an icon and its adjacent label.
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "1.5rem 2rem",
            borderRadius: "0.875rem",
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            gap: 0,
            position: "relative",
            marginTop: "1.5rem",
          }}
        >
          <Bell
            size={24}
            weight="regular"
            style={{ color: "var(--color-text-primary)", flexShrink: 0 }}
          />

          {/* Gap annotation */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: 8,
              position: "relative",
              margin: "0 2px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                borderTop: "1px dashed var(--brand-primary)",
                transform: "translateY(-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: 1,
                height: 16,
                background: "var(--brand-primary)",
                transform: "translateY(-50%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: 0,
                width: 1,
                height: 16,
                background: "var(--brand-primary)",
                transform: "translateY(-50%)",
              }}
            />
          </div>

          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--color-text-primary)",
              paddingLeft: 8,
            }}
          >
            Notifications
          </span>

          {/* Token label */}
          <div
            style={{
              position: "absolute",
              top: -12,
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--color-text-primary)",
              color: "var(--color-background)",
              fontFamily: "var(--font-mono)",
              fontSize: "0.6875rem",
              fontWeight: 700,
              padding: "0.1rem 0.5rem",
              borderRadius: "0.375rem",
              whiteSpace: "nowrap",
            }}
          >
            gap = 8px · var(--spacing-sm)
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--color-text-tertiary)",
            marginTop: "0.75rem",
            marginBottom: 0,
          }}
        >
          Use{" "}
          <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem" }}>
            var(--spacing-sm)
          </code>{" "}
          (8 px). Never use raw pixel values for spacing.
        </p>
      </section>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────

type Tab = "explore" | "usage";
const TABS: { id: Tab; label: string }[] = [
  { id: "explore", label: "Explore" },
  { id: "usage", label: "Usage" },
];

export function IconographyPage() {
  const [tab, setTab] = useState<Tab>("explore");

  return (
    <FoundationShell
      title="Iconography"
      description="Icons from the Phosphor icon set — search the full library, explore weights, and review usage guidelines."
    >
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--color-border)",
          marginBottom: "2rem",
        }}
      >
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontWeight: tab === id ? 600 : 400,
              fontSize: "0.9375rem",
              color:
                tab === id
                  ? "var(--brand-primary)"
                  : "var(--color-text-tertiary)",
              padding: "0.5rem 0",
              marginRight: "1.5rem",
              borderBottom:
                tab === id
                  ? "2px solid var(--brand-primary)"
                  : "2px solid transparent",
              marginBottom: -1,
              transition: "color 150ms, border-color 150ms",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "explore" ? <ExploreTab /> : <UsageTab />}
    </FoundationShell>
  );
}
