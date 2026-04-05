import { useState, useMemo } from "react";
import type { Token, Section } from "../data/tokens";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function resolveInTheme(name: string, theme: "light" | "dark"): string {
  if (typeof document === "undefined" || !/^--[\w-]+$/.test(name)) return "";
  const wrapper = document.createElement("div");
  wrapper.setAttribute("data-theme", theme);
  wrapper.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none;";
  const probe = document.createElement("div");
  probe.style.cssText = `color:var(${name});`;
  wrapper.appendChild(probe);
  document.body.appendChild(wrapper);
  const rgb = getComputedStyle(probe).color;
  document.body.removeChild(wrapper);
  const match = rgb.match(/\d+/g);
  if (!match || match.length < 3) return "";
  return (
    "#" +
    match
      .slice(0, 3)
      .map((n) => Number(n).toString(16).padStart(2, "0"))
      .join("")
  );
}

export function liveValue(token: Token): string {
  if (typeof document !== "undefined" && /^--[\w-]+$/.test(token.name)) {
    const resolved = getComputedStyle(document.documentElement)
      .getPropertyValue(token.name)
      .trim();
    if (resolved) return resolved;
  }
  return token.value;
}

function isColor(value: string) {
  return (
    /^#[0-9a-f]{3,8}$/i.test(value) ||
    value.startsWith("rgba") ||
    value.startsWith("rgb")
  );
}

function tokenMatches(token: Token, query: string): boolean {
  const q = query.toLowerCase();
  return (
    token.name.toLowerCase().includes(q) ||
    liveValue(token).toLowerCase().includes(q) ||
    token.description.toLowerCase().includes(q)
  );
}

export function filterSections(query: string, sects: Section[]) {
  if (!query.trim()) return sects;
  return sects
    .map((s) => ({
      ...s,
      tokens: s.tokens?.filter((t) => tokenMatches(t, query)),
      subsections: s.subsections
        ?.map((sub) => ({
          ...sub,
          tokens: sub.tokens.filter((t) => tokenMatches(t, query)),
        }))
        .filter((sub) => sub.tokens.length > 0),
    }))
    .filter(
      (s) => (s.tokens?.length ?? 0) > 0 || (s.subsections?.length ?? 0) > 0,
    );
}

export function buildTocItems(sects: Section[]) {
  const items: { id: string; label: string; level: 1 | 2 }[] = [];
  for (const s of sects) {
    items.push({ id: s.id, label: s.label, level: 1 });
    if (s.subsections) {
      for (const sub of s.subsections)
        items.push({ id: sub.id, label: sub.label, level: 2 });
    }
  }
  return items;
}

// ─── Type-aware preview ────────────────────────────────────────────────────────

function tokenPreviewByName(
  token: Token,
  resolved: string,
): React.ReactNode | null {
  const name = token.name;

  // Color / brand swatches — handled by existing swatch code, skip here
  if (name.startsWith("--color-") || name.startsWith("--brand-")) return null;

  // Radius tokens
  if (name.startsWith("--radius-")) {
    return (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: resolved,
          border: "2px solid var(--color-text-secondary)",
          background: "var(--color-surface)",
          flexShrink: 0,
        }}
      />
    );
  }

  // Spacing tokens — horizontal bar whose width = the spacing value
  if (name.startsWith("--space-") || name.startsWith("--spacing-")) {
    const numericPx = parseFloat(resolved);
    const barWidth = isNaN(numericPx) ? 40 : Math.min(numericPx, 200);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: barWidth,
            height: 12,
            background: "var(--brand-primary)",
            borderRadius: 3,
            flexShrink: 0,
          }}
        />
      </div>
    );
  }

  // Font-size tokens — sample text at that size
  if (name.startsWith("--text-")) {
    const sample = "The quick brown fox";
    return (
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: resolved,
          color: "var(--color-text-primary)",
          lineHeight: 1.2,
          display: "block",
          maxWidth: 220,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {sample}
      </span>
    );
  }

  // Font-family tokens — "Ag" rendered in that family
  if (name.startsWith("--font-") && !name.startsWith("--font-size")) {
    return (
      <span
        style={{
          fontFamily: resolved,
          fontSize: "2rem",
          color: "var(--color-text-primary)",
          lineHeight: 1,
        }}
      >
        Ag
      </span>
    );
  }

  // Border-width tokens — horizontal line with that stroke width
  if (name.startsWith("--border-width") || name.startsWith("--border-size")) {
    const w = parseFloat(resolved);
    return (
      <div
        style={{
          width: 80,
          height: isNaN(w) ? 1 : Math.max(w, 1),
          background: "var(--color-text-primary)",
          borderRadius: 2,
        }}
      />
    );
  }

  // Opacity tokens — pink square with that opacity
  if (name.startsWith("--opacity-")) {
    return (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 6,
          background: "var(--pink-500, #e8336c)",
          opacity: parseFloat(resolved) || 1,
          border: "1px solid var(--color-border)",
        }}
      />
    );
  }

  // Shadow tokens — handled by existing swatch code
  if (name.startsWith("--shadow")) return null;

  // Transition / anything else — no visual preview
  return null;
}

// ─── Color swatch card ────────────────────────────────────────────────────────

function ColorSwatchCard({
  color,
  value,
  dark,
}: {
  color: string;
  value: string;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        borderRadius: "0.625rem",
        border: dark ? "4px solid #333" : "4px solid var(--color-border)",
        overflow: "hidden",
        background: dark ? "#1a1a1a" : "#ffffff",
        minWidth: 100,
        maxWidth: 140,
      }}
    >
      {/* Swatch bar */}
      <div style={{ height: 48, background: color }} />
      {/* Value label */}
      <div style={{ padding: "0.5rem 0.75rem" }}>
        <code
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            color: dark ? "#a3a3a3" : "#444444",
          }}
        >
          {value.length > 18 ? value.slice(0, 18) + "…" : value}
        </code>
      </div>
    </div>
  );
}

// ─── Token row ────────────────────────────────────────────────────────────────

export function TokenRow({
  token,
  isLast,
  hasPreview,
  hasDarkColor,
}: {
  token: Token;
  isLast: boolean;
  hasPreview: boolean;
  hasDarkColor?: boolean;
}) {
  const resolved = liveValue(token);
  const lightHex = resolveInTheme(token.name, "light");
  const darkHex = resolveInTheme(token.name, "dark");
  const showSwatch = isColor(lightHex);
  const showDarkSwatch = !!token.dark && isColor(darkHex);

  const cols = hasDarkColor
    ? "1fr 140px 140px"
    : hasPreview
      ? "1fr 1fr"
      : "1fr auto";

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: cols,
        gap: "0.75rem",
        alignItems: "start",
        padding: "1.25rem 0",
        borderBottom: isLast ? "none" : "1px solid var(--color-border)",
      }}
    >
      {/* Left: name + description + cssNote + introduced */}
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.8125rem",
              color: "var(--color-text-primary)",
              background: "var(--color-surface-hover)",
              border: "1px solid var(--color-border)",
              padding: "0.2rem 0.625rem",
              borderRadius: "0.375rem",
            }}
          >
            {token.name}
          </code>
          {token.deprecated && (
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.6875rem",
                color: "#a3a3a3",
                background: "#6b6b6b22",
                padding: "0.15rem 0.5rem",
                borderRadius: "9999px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Deprecated
            </span>
          )}
        </div>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.9375rem",
            color: "var(--color-text-secondary)",
            margin: "0 0 0.5rem",
            lineHeight: 1.5,
          }}
        >
          {token.description}
        </p>

        {token.cssNote && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--color-text-secondary)",
              margin: "0 0 0.375rem",
            }}
          >
            {token.cssNote}
          </p>
        )}

        {token.replacedBy && (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8125rem",
              color: "var(--color-text-tertiary)",
              margin: "0 0 0.375rem",
            }}
          >
            Use{" "}
            <code
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--brand-primary)",
                fontSize: "0.8125rem",
              }}
            >
              {token.replacedBy}
            </code>{" "}
            instead.
          </p>
        )}

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8125rem",
            color: "var(--color-text-tertiary)",
            margin: 0,
          }}
        >
          Introduced v{token.introduced}
        </p>
      </div>

      {/* Color tokens: separate light + dark swatch cards */}
      {hasDarkColor ? (
        <>
          <ColorSwatchCard
            color={showSwatch ? lightHex : "var(--color-surface)"}
            value={lightHex}
            dark={false}
          />
          {showDarkSwatch ? (
            <ColorSwatchCard color={darkHex} value={darkHex} dark={true} />
          ) : (
            <div />
          )}
        </>
      ) : /* Non-color: live preview OR type-aware preview OR value swatch */
      hasPreview && token.preview ? (
        <div style={{ paddingTop: "0.25rem" }}>
          <span style={token.previewStyle}>{token.preview}</span>
        </div>
      ) : (
        (() => {
          const typePreview = tokenPreviewByName(token, resolved);
          if (typePreview) {
            return (
              <div className="flex flex-col gap-1.5" style={{ minWidth: 80 }}>
                {typePreview}
                <code
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8125rem",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {resolved.length > 20
                    ? resolved.slice(0, 20) + "…"
                    : resolved}
                </code>
              </div>
            );
          }
          return (
            <div
              className="flex flex-col items-end gap-1.5"
              style={{ minWidth: 80 }}
            >
              <div
                style={{
                  width: 64,
                  height: 32,
                  borderRadius: "0.375rem",
                  border: "1px solid var(--color-border)",
                  background: showSwatch ? resolved : "var(--color-surface)",
                  flexShrink: 0,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                {token.name.startsWith("--shadow") &&
                  !token.name.includes("color") && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 6,
                        borderRadius: 4,
                        background: "var(--color-surface)",
                        boxShadow: `var(${token.name})`,
                      }}
                    />
                  )}
              </div>
              <code
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  textAlign: "right",
                }}
              >
                {resolved.length > 20 ? resolved.slice(0, 20) + "…" : resolved}
              </code>
            </div>
          );
        })()
      )}
    </div>
  );
}

export function TokenGroup({ tokens }: { tokens: Token[] }) {
  const hasPreview = tokens.some((t) => !!t.preview);
  // Show split light/dark columns when any token is a color with a dark variant
  const hasDarkColor = tokens.some((t) => {
    const v = liveValue(t);
    return isColor(v) && !!t.dark;
  });

  const cols = hasDarkColor
    ? "1fr 140px 140px"
    : hasPreview
      ? "1fr 1fr"
      : "1fr auto";

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: cols,
          gap: "0.75rem",
          padding: "0.5rem 0",
          borderBottom: "2px solid var(--color-border)",
          marginBottom: "0.25rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "0.8125rem",
            color: "var(--color-text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Token and description
        </span>
        {hasDarkColor ? (
          <>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.8125rem",
                color: "var(--color-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Light value
            </span>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "0.8125rem",
                color: "var(--color-text-tertiary)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Dark value
            </span>
          </>
        ) : (
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "0.8125rem",
              color: "var(--color-text-tertiary)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {hasPreview ? "Preview" : "Value"}
          </span>
        )}
      </div>
      {tokens.map((t, i) => (
        <TokenRow
          key={t.name + i}
          token={t}
          isLast={i === tokens.length - 1}
          hasPreview={hasPreview}
          hasDarkColor={hasDarkColor}
        />
      ))}
    </div>
  );
}

// ─── AllTokensTab ─────────────────────────────────────────────────────────────

export function AllTokensTab({ sects }: { sects: Section[] }) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => filterSections(query, sects), [query, sects]);

  const H2: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontSize: "1.375rem",
    textTransform: "uppercase",
    color: "var(--color-text-primary)",
    marginBottom: "1.25rem",
    marginTop: 0,
  };

  const H3: React.CSSProperties = {
    fontFamily: "var(--font-heading)",
    fontSize: "1rem",
    textTransform: "uppercase",
    color: "var(--color-text-primary)",
    marginBottom: "0.75rem",
    marginTop: 0,
  };

  return (
    <>
      {/* Search */}
      <div className="relative mb-8">
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
          placeholder="Search for tokens…"
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

      {visible.length === 0 ? (
        <div
          className="rounded-xl px-6 py-12 text-center"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-tertiary)",
              fontSize: "0.9375rem",
            }}
          >
            No tokens match{" "}
            <strong style={{ color: "var(--color-text-primary)" }}>
              "{query}"
            </strong>
          </p>
        </div>
      ) : (
        <div className="space-y-14">
          {visible.map((section) => (
            <div key={section.id} id={section.id}>
              <h2 style={H2}>{section.label}</h2>

              {section.tokens && <TokenGroup tokens={section.tokens} />}

              {section.subsections && (
                <div className="space-y-10">
                  {section.subsections.map((sub) => (
                    <div key={sub.id} id={sub.id}>
                      <h3 style={H3}>{sub.label}</h3>
                      <TokenGroup tokens={sub.tokens} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
