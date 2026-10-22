import type React from 'react';

/**
 * ─── LAYERPROOF DESIGN TOKEN REGISTRY ────────────────────────────────────────
 *
 * This file is the SINGLE SOURCE OF TRUTH for all design token metadata.
 * The actual CSS values live in: src/styles/brand-variables.css
 *
 * The documentation website reads token values LIVE from the browser at runtime,
 * so updating brand-variables.css is enough for the site to reflect new values.
 * You only need to touch this file to update descriptions or add new tokens.
 *
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * WORKFLOW: How to update branding
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * Use this when you want to change the look-and-feel of the entire design system
 * — e.g. new accent color, new font, new dark mode palette.
 *
 * PREFERRED: values come from the Figma file "LayerProof — UI Kit". Update Figma,
 * re-transcribe scripts/tokens/figma_data.py and run scripts/tokens/gen_tokens.py —
 * it regenerates the CSS files below and the sections in this file.
 *
 * FILE: src/styles/brand-variables.css (semantic tokens)
 * It has two blocks — edit both if the token is theme-aware:
 *   :root { ... }                — light mode defaults
 *   [data-theme="dark"] { ... }  — dark mode overrides
 *
 * ── Step 1: Change brand accent color ────────────────────────────────────────
 *
 *  The accent (currently Pink 500, #FF589B) drives primary actions, focus
 *  rings and selection through the --accent-* and --action-primary-* tokens.
 *  Change the Pink primitives or repoint --accent-background-default.
 *
 * ── Step 2: Change brand fonts ───────────────────────────────────────────────
 *
 *  Three font variables control the entire type system:
 *    --font-heading  — Mona Sans (display and headings)
 *    --font-body     — Montserrat (body, subheadings, labels)
 *    --font-mono     — Courier Prime (code blocks, token names)
 *
 *  a. Add the new font to the <head> in index.html (Google Fonts link or @font-face)
 *  b. In brand-variables.css :root, update the variable:
 *       --font-heading: '"Your Font", fallback, sans-serif';
 *  c. Update the Google Fonts import in src/styles/fonts.css.
 *  d. Update the Family subsection descriptions in this file (tokens.ts) if needed.
 *
 * ── Step 3: Change background / surface colors ───────────────────────────────
 *
 *  These control the page and card layers:
 *    --color-background    — outermost page fill
 *    --color-surface       — card / panel fill (one level above page)
 *    --color-surface-hover — hover state for interactive surfaces
 *
 *  Update in both :root (light) and [data-theme="dark"] (dark) blocks.
 *
 * ── Step 4: Change text colors ───────────────────────────────────────────────
 *
 *  Text hierarchy (3 levels + inverse):
 *    --color-text-primary   — headings, body, default icons
 *    --color-text-secondary — descriptions, metadata, supporting copy
 *    --color-text-tertiary  — placeholders, labels, timestamps
 *    --color-text-inverse   — text on colored / dark surfaces
 *
 *  Update in both :root and [data-theme="dark"].
 *
 * ── Step 5: Change status / semantic colors ──────────────────────────────────
 *
 *  Status colors are grouped as surface / light / default / dark in the
 *  Brand Theme block at the top of brand-variables.css:
 *    --danger-*   — error states
 *    --success-*  — positive / complete states
 *    --warning-*  — caution states
 *
 *  The semantic aliases that components use:
 *    --color-error, --color-success, --color-warning, --color-info
 *  Update these too (they should point to the corresponding --*-default value).
 *
 * ── Step 6: Verify on the website ────────────────────────────────────────────
 *
 *  After editing brand-variables.css, start the dev server (npm run dev) and:
 *    1. Visit /foundations/tokens   — All Tokens tab shows live values
 *    2. Visit /foundations/color    — Accent, palette, and status swatches
 *    3. Visit /foundations/typography — Type scale preview
 *    4. Toggle dark mode (button in the top-right header) and re-check all three
 *
 * ── Step 7: Update Figma ─────────────────────────────────────────────────────
 *
 *  Code is now updated. Sync the values back to Figma:
 *  a. Open the Figma file → Plugins → "Export/Import Variables"
 *  b. Import the updated values into each collection
 *     (Brand Theme, Color, Typography, Spacing, Radius)
 *  c. Or update manually: open each variable and paste the new hex / value
 *  d. Save the last-synced export as figma-exports/variables.json so future
 *     diffs are easy (overwrite the existing file).
 *
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * WORKFLOW: How to update a single token value
 * ══════════════════════════════════════════════════════════════════════════════
 *
 *  1. Open src/styles/brand-variables.css and change the variable value.
 *     Update both :root (light) and [data-theme="dark"] blocks if themed.
 *     → The documentation website reflects the change automatically.
 *
 *  2. Optional — update this file (tokens.ts) only if:
 *       - The description / usage guidance changed
 *       - You want the dark-mode swatch in the docs to show correctly
 *         (update the `dark` field on the Token entry)
 *
 *  3. Add a changelog entry to `tokenChangelog` at the bottom of this file
 *     (type: 'changed') and to src/app/data/changelog.ts.
 *
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * WORKFLOW: How to add a new token
 * ══════════════════════════════════════════════════════════════════════════════
 *
 *  1. Add the CSS variable to src/styles/brand-variables.css
 *     (both :root and dark blocks if theme-aware).
 *  2. Add a Token entry in the correct Section/Subsection below.
 *     Set `introduced` to the current release version.
 *  3. Add a changelog entry with type: 'added'.
 *
 *
 * ══════════════════════════════════════════════════════════════════════════════
 * WORKFLOW: How to deprecate a token
 * ══════════════════════════════════════════════════════════════════════════════
 *
 *  1. Add `deprecated: true` and `replacedBy: '--new-token'` to the entry.
 *  2. Add a changelog entry with type: 'deprecated'.
 *  3. Keep the CSS variable in brand-variables.css for one major version,
 *     then remove it and add a type: 'removed' changelog entry.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Token = {
  /** CSS custom property name, e.g. --color-text-primary */
  name: string;
  /** Light-mode value (default) */
  value: string;
  /** Dark-mode override value (if different from light) */
  dark?: string;
  /** Human-readable description of what this token is for */
  description: string;
  /** Semver string of the release this token first shipped in */
  introduced: string;
  /** Set to true when the token is deprecated */
  deprecated?: boolean;
  /** The token that should be used instead when deprecated */
  replacedBy?: string;
  /** Sample text to render in the live preview column (font tokens) */
  preview?: string;
  /** CSS styles to apply to the preview text */
  previewStyle?: React.CSSProperties;
  /** Note about how this token should be applied in CSS (e.g. "use font, not font-size") */
  cssNote?: string;
};

export type Subsection = {
  id: string;
  label: string;
  tokens: Token[];
};

export type Section = {
  id: string;
  label: string;
  tokens?: Token[];
  subsections?: Subsection[];
};

// ─── Primitive sections ───────────────────────────────────────────────────────

export const primitiveColors: Section = {
  id: "primitive-colors",
  label: "Primitive Colors",
  subsections: [
    {
      id: "primitive-base",
      label: "Base",
      tokens: [
        { name: "--color-white", value: "#ffffff", description: "Pure white constant.", introduced: "1.0.0" },
        { name: "--color-black", value: "#000000", description: "Pure black constant.", introduced: "1.0.0" },
        { name: "--base-white", value: "#ffffff", description: "Pure white base used by semantic aliases. Do not bind directly in product UI.", introduced: "2.0.0" },
      ],
    },
    {
      id: "primitive-gray",
      label: "Gray",
      tokens: [
        { name: "--gray-100", value: "#f5f5f5", description: "Gray 100", introduced: "2.0.0" },
        { name: "--gray-200", value: "#e5e5e5", description: "Gray 200", introduced: "2.0.0" },
        { name: "--gray-300", value: "#d4d4d4", description: "Gray 300", introduced: "2.0.0" },
        { name: "--gray-400", value: "#a3a3a3", description: "Gray 400", introduced: "2.0.0" },
        { name: "--gray-500", value: "#737373", description: "Gray 500", introduced: "2.0.0" },
        { name: "--gray-550", value: "#6b6b6b", description: "Gray 550", introduced: "2.0.0" },
        { name: "--gray-600", value: "#525252", description: "Gray 600", introduced: "2.0.0" },
        { name: "--gray-700", value: "#1c1c1c", description: "Gray 700 — Same value as Gray 850 in Figma (#1c1c1c), so the scale is not strictly ordered between 700 and 800.", introduced: "2.0.0" },
        { name: "--gray-800", value: "#2a2a2a", description: "Gray 800", introduced: "2.0.0" },
        { name: "--gray-850", value: "#1c1c1c", description: "Gray 850", introduced: "2.0.0" },
        { name: "--gray-900", value: "#1a1a1a", description: "Gray 900", introduced: "2.0.0" },
        { name: "--gray-910", value: "#111111", description: "Gray 910", introduced: "2.0.0" },
        { name: "--gray-950", value: "#000000", description: "Gray 950", introduced: "2.0.0" },
      ],
    },
    {
      id: "primitive-pink",
      label: "Pink (Accent)",
      tokens: [
        { name: "--pink-50", value: "#fef4f7", description: "Pink 50 — Pale pink extension, quieter than Pink 100. For faint accent surfaces.", introduced: "2.0.0" },
        { name: "--pink-100", value: "#fde8ef", description: "Pink 100", introduced: "1.1.0" },
        { name: "--pink-200", value: "#fbc5d8", description: "Pink 200", introduced: "1.1.0" },
        { name: "--pink-300", value: "#f598bb", description: "Pink 300", introduced: "1.1.0" },
        { name: "--pink-400", value: "#ef6994", description: "Pink 400", introduced: "1.1.0" },
        { name: "--pink-500", value: "#ff589b", description: "Pink 500 — Brand accent — LayerProof pink.", introduced: "1.1.0" },
        { name: "--pink-600", value: "#c43460", description: "Pink 600", introduced: "1.1.0" },
        { name: "--pink-700", value: "#9a2550", description: "Pink 700", introduced: "1.1.0" },
        { name: "--pink-800", value: "#6e1839", description: "Pink 800", introduced: "1.1.0" },
        { name: "--pink-900", value: "#440e23", description: "Pink 900", introduced: "1.1.0" },
        { name: "--pink-950", value: "#290b17", description: "Pink 950 — Deep pink extension. For faint accent surfaces in dark mode.", introduced: "2.0.0" },
      ],
    },
    {
      id: "primitive-yellow",
      label: "Yellow",
      tokens: [
        { name: "--yellow-50", value: "#fef9d0", description: "Yellow 50", introduced: "2.0.0" },
        { name: "--yellow-100", value: "#fffde8", description: "Yellow 100", introduced: "1.1.0" },
        { name: "--yellow-200", value: "#fff8c0", description: "Yellow 200", introduced: "1.1.0" },
        { name: "--yellow-300", value: "#fff094", description: "Yellow 300", introduced: "1.1.0" },
        { name: "--yellow-400", value: "#ffe860", description: "Yellow 400", introduced: "1.1.0" },
        { name: "--yellow-500", value: "#ffde42", description: "Yellow 500 — Former brand accent. Kept as a primitive; no semantic token uses yellow any more.", introduced: "1.1.0" },
        { name: "--yellow-600", value: "#e6c200", description: "Yellow 600", introduced: "1.1.0" },
        { name: "--yellow-700", value: "#b89900", description: "Yellow 700", introduced: "1.1.0" },
        { name: "--yellow-800", value: "#7a6600", description: "Yellow 800", introduced: "1.1.0" },
        { name: "--yellow-900", value: "#3d3300", description: "Yellow 900", introduced: "1.1.0" },
        { name: "--yellow-950", value: "#3d3000", description: "Yellow 950", introduced: "2.0.0" },
      ],
    },
    {
      id: "primitive-orange",
      label: "Orange (Warning)",
      tokens: [
        { name: "--orange-50", value: "#fff8f2", description: "Orange 50", introduced: "2.0.0" },
        { name: "--orange-100", value: "#fff0e5", description: "Orange 100 — Approved brand Orange anchor.", introduced: "2.0.0" },
        { name: "--orange-200", value: "#ffd9bf", description: "Orange 200 — Approved brand Orange anchor.", introduced: "2.0.0" },
        { name: "--orange-300", value: "#ffbd8f", description: "Orange 300 — Approved brand Orange anchor.", introduced: "2.0.0" },
        { name: "--orange-400", value: "#ffa866", description: "Orange 400 — Approved brand Orange anchor.", introduced: "2.0.0" },
        { name: "--orange-500", value: "#ff9945", description: "Orange 500 — Approved brand Orange anchor.", introduced: "2.0.0" },
        { name: "--orange-600", value: "#e87a2f", description: "Orange 600", introduced: "2.0.0" },
        { name: "--orange-700", value: "#c65b20", description: "Orange 700", introduced: "2.0.0" },
        { name: "--orange-800", value: "#9d4218", description: "Orange 800", introduced: "2.0.0" },
        { name: "--orange-900", value: "#742e12", description: "Orange 900", introduced: "2.0.0" },
        { name: "--orange-950", value: "#431709", description: "Orange 950", introduced: "2.0.0" },
      ],
    },
    {
      id: "primitive-red",
      label: "Red (Danger)",
      tokens: [
        { name: "--red-50", value: "#fef2f2", description: "Red 50", introduced: "1.1.0" },
        { name: "--red-100", value: "#fee2e2", description: "Red 100", introduced: "2.0.0" },
        { name: "--red-200", value: "#fec8c8", description: "Red 200", introduced: "1.1.0" },
        { name: "--red-300", value: "#fca5a5", description: "Red 300", introduced: "2.0.0" },
        { name: "--red-400", value: "#f87171", description: "Red 400", introduced: "1.1.0" },
        { name: "--red-500", value: "#e7000b", description: "Red 500", introduced: "2.0.0" },
        { name: "--red-600", value: "#c9000a", description: "Red 600", introduced: "1.1.0" },
        { name: "--red-700", value: "#a60008", description: "Red 700", introduced: "2.0.0" },
        { name: "--red-800", value: "#850006", description: "Red 800", introduced: "2.0.0" },
        { name: "--red-900", value: "#700005", description: "Red 900", introduced: "1.1.0" },
        { name: "--red-950", value: "#4f0004", description: "Red 950", introduced: "2.0.0" },
      ],
    },
    {
      id: "primitive-green",
      label: "Green (Success)",
      tokens: [
        { name: "--green-50", value: "#f0fdf4", description: "Green 50", introduced: "1.1.0" },
        { name: "--green-100", value: "#dcfce7", description: "Green 100", introduced: "2.0.0" },
        { name: "--green-200", value: "#b9f8cf", description: "Green 200", introduced: "1.1.0" },
        { name: "--green-300", value: "#7bf1a8", description: "Green 300", introduced: "2.0.0" },
        { name: "--green-400", value: "#05df72", description: "Green 400", introduced: "1.1.0" },
        { name: "--green-500", value: "#00c950", description: "Green 500", introduced: "2.0.0" },
        { name: "--green-600", value: "#00a63e", description: "Green 600", introduced: "1.1.0" },
        { name: "--green-700", value: "#008236", description: "Green 700", introduced: "2.0.0" },
        { name: "--green-800", value: "#016630", description: "Green 800", introduced: "2.0.0" },
        { name: "--green-900", value: "#0d542b", description: "Green 900", introduced: "1.1.0" },
        { name: "--green-950", value: "#032e15", description: "Green 950", introduced: "2.0.0" },
      ],
    },
    {
      id: "primitive-cyan",
      label: "Cyan (Info)",
      tokens: [
        { name: "--cyan-50", value: "#ebfffe", description: "Cyan 50", introduced: "2.0.0" },
        { name: "--cyan-100", value: "#cdffff", description: "Cyan 100", introduced: "2.0.0" },
        { name: "--cyan-200", value: "#a2fcff", description: "Cyan 200", introduced: "2.0.0" },
        { name: "--cyan-300", value: "#62f7fe", description: "Cyan 300", introduced: "2.0.0" },
        { name: "--cyan-400", value: "#1be8f5", description: "Cyan 400", introduced: "2.0.0" },
        { name: "--cyan-500", value: "#00cbdb", description: "Cyan 500", introduced: "2.0.0" },
        { name: "--cyan-600", value: "#02aec6", description: "Cyan 600", introduced: "2.0.0" },
        { name: "--cyan-700", value: "#098195", description: "Cyan 700", introduced: "2.0.0" },
        { name: "--cyan-800", value: "#126778", description: "Cyan 800", introduced: "2.0.0" },
        { name: "--cyan-900", value: "#135566", description: "Cyan 900", introduced: "2.0.0" },
        { name: "--cyan-950", value: "#063946", description: "Cyan 950", introduced: "2.0.0" },
      ],
    },
  ],
};

export const primitiveRadius: Section = {
  id: "primitive-radius",
  label: "Primitive Radius",
  subsections: [
    {
      id: "primitive-radius-scale",
      label: "Named scale",
      tokens: [
        { name: "--radius-none", value: "0", description: "0px", introduced: "1.1.0" },
        { name: "--radius-xsm", value: "0.125rem", description: "2px", introduced: "1.1.0" },
        { name: "--radius-sm", value: "0.25rem", description: "4px", introduced: "1.1.0" },
        { name: "--radius-md", value: "0.375rem", description: "6px", introduced: "1.1.0" },
        { name: "--radius-lg", value: "0.5rem", description: "8px", introduced: "1.1.0" },
        { name: "--radius-xl", value: "0.75rem", description: "12px", introduced: "1.1.0" },
        { name: "--radius-2xl", value: "1rem", description: "16px", introduced: "1.1.0" },
        { name: "--radius-3xl", value: "1.25rem", description: "20px", introduced: "1.1.0" },
        { name: "--radius-4xl", value: "1.5rem", description: "24px", introduced: "1.1.0" },
        { name: "--radius-5xl", value: "1.875rem", description: "30px", introduced: "1.1.0" },
        { name: "--radius-full", value: "1000px", description: "Full / pill radius", introduced: "1.1.0" },
      ],
    },
    {
      id: "primitive-radius-numbered",
      label: "Numbered scale",
      tokens: [
        { name: "--radius-1", value: "0", description: "Radius-1 — 0px", introduced: "2.0.0" },
        { name: "--radius-2", value: "0.125rem", description: "Radius-2 — 2px", introduced: "2.0.0" },
        { name: "--radius-3", value: "0.25rem", description: "Radius-3 — 4px", introduced: "2.0.0" },
        { name: "--radius-4", value: "0.375rem", description: "Radius-4 — 6px", introduced: "2.0.0" },
        { name: "--radius-5", value: "0.5rem", description: "Radius-5 — 8px", introduced: "2.0.0" },
        { name: "--radius-6", value: "0.625rem", description: "Radius-6 — 10px", introduced: "2.0.0" },
        { name: "--radius-7", value: "0.75rem", description: "Radius-7 — 12px", introduced: "2.0.0" },
        { name: "--radius-8", value: "1rem", description: "Radius-8 — 16px", introduced: "2.0.0" },
        { name: "--radius-9", value: "1.25rem", description: "Radius-9 — 20px", introduced: "2.0.0" },
        { name: "--radius-10", value: "1.5rem", description: "Radius-10 — 24px", introduced: "2.0.0" },
        { name: "--radius-11", value: "1.875rem", description: "Radius-11 — 30px", introduced: "2.0.0" },
      ],
    },
  ],
};

export const primitiveTypography: Section = {
  id: "primitive-typography",
  label: "Primitive Typography",
  subsections: [
    {
      id: "primitive-font-families",
      label: "Font Families",
      tokens: [
        { name: "--font-display", value: "\"Mona Sans\", system-ui, sans-serif", description: "Display text — Mona Sans.", introduced: "2.0.0", cssNote: 'Use font-family' },
        { name: "--font-heading", value: "\"Mona Sans\", system-ui, sans-serif", description: "Headings — Mona Sans.", introduced: "1.1.0", cssNote: 'Use font-family' },
        { name: "--font-subheading", value: "\"Montserrat\", system-ui, sans-serif", description: "Subheadings — Montserrat.", introduced: "2.0.0", cssNote: 'Use font-family' },
        { name: "--font-body", value: "\"Montserrat\", system-ui, sans-serif", description: "Body copy — Montserrat.", introduced: "1.1.0", cssNote: 'Use font-family' },
        { name: "--font-label", value: "\"Montserrat\", system-ui, sans-serif", description: "Labels and UI text — Montserrat.", introduced: "2.0.0", cssNote: 'Use font-family' },
        { name: "--font-doc", value: "\"Montserrat\", system-ui, sans-serif", description: "Long-form documents — Montserrat.", introduced: "2.0.0", cssNote: 'Use font-family' },
        { name: "--font-mono", value: "\"Courier Prime\", \"Courier New\", monospace", description: "Code, token names — Courier Prime.", introduced: "1.1.0", cssNote: 'Use font-family' },
        { name: "--font-heading-alt", value: "\"Roboto\", system-ui, sans-serif", description: "Optional alternative heading face — Roboto.", introduced: "2.0.0", cssNote: 'Use font-family' },
      ],
    },
    {
      id: "primitive-font-sizes",
      label: "Font Sizes",
      tokens: [
        { name: "--text-display-l", value: "4.5rem", description: "display-l — 72px", introduced: "2.0.0" },
        { name: "--text-display-m", value: "3.5rem", description: "display-m — 56px", introduced: "2.0.0" },
        { name: "--text-h1", value: "3rem", description: "h1 — 48px", introduced: "2.0.0" },
        { name: "--text-h2", value: "2.5rem", description: "h2 — 40px", introduced: "2.0.0" },
        { name: "--text-h3", value: "2.25rem", description: "h3 — 36px", introduced: "2.0.0" },
        { name: "--text-h4", value: "2rem", description: "h4 — 32px", introduced: "2.0.0" },
        { name: "--text-h5", value: "1.75rem", description: "h5 — 28px", introduced: "2.0.0" },
        { name: "--text-h6", value: "1.5rem", description: "h6 — 24px", introduced: "2.0.0" },
        { name: "--text-subheading-lg", value: "1.25rem", description: "subheading-lg — 20px", introduced: "2.0.0" },
        { name: "--text-subheading-md", value: "1.125rem", description: "subheading-md — 18px", introduced: "2.0.0" },
        { name: "--text-subheading-sm", value: "1rem", description: "subheading-sm — 16px", introduced: "2.0.0" },
        { name: "--text-label-xl", value: "1.125rem", description: "label-xl — 18px", introduced: "2.0.0" },
        { name: "--text-label-lg", value: "1rem", description: "label-lg — 16px", introduced: "2.0.0" },
        { name: "--text-label-md", value: "0.875rem", description: "label-md — 14px", introduced: "2.0.0" },
        { name: "--text-label-sm", value: "0.75rem", description: "label-sm — 12px", introduced: "2.0.0" },
        { name: "--text-label-xs", value: "0.6875rem", description: "label-xs — 11px", introduced: "2.0.0" },
        { name: "--text-body-2xl", value: "1.5rem", description: "body-2xl — 24px", introduced: "2.0.0" },
        { name: "--text-body-xl", value: "1.25rem", description: "body-xl — 20px", introduced: "2.0.0" },
        { name: "--text-body-lg", value: "1.125rem", description: "body-lg — 18px", introduced: "2.0.0" },
        { name: "--text-body", value: "1rem", description: "body — 16px", introduced: "2.0.0" },
        { name: "--text-body-sm", value: "0.875rem", description: "body-sm — 14px", introduced: "2.0.0" },
        { name: "--text-body-xs", value: "0.75rem", description: "body-xs — 12px", introduced: "2.0.0" },
        { name: "--text-body-2xs", value: "0.6875rem", description: "body-2xs — 11px", introduced: "2.0.0" },
      ],
    },
    {
      id: "primitive-font-weights",
      label: "Font Weights",
      tokens: [
        { name: "--fw-bold", value: "700", description: "Bold — display and headings", introduced: "1.1.0" },
        { name: "--fw-semibold", value: "600", description: "Semi Bold — subheadings and labels", introduced: "1.1.0" },
        { name: "--fw-medium", value: "500", description: "Medium — body text", introduced: "1.1.0" },
        { name: "--fw-regular", value: "400", description: "Regular", introduced: "1.1.0" },
      ],
    },
    {
      id: "primitive-line-heights",
      label: "Line Heights",
      tokens: [
        { name: "--lh-display-l", value: "4.75rem", description: "Line height for display-l — 76px", introduced: "2.0.0" },
        { name: "--lh-display-m", value: "3.75rem", description: "Line height for display-m — 60px", introduced: "2.0.0" },
        { name: "--lh-h1", value: "3.5rem", description: "Line height for h1 — 56px", introduced: "2.0.0" },
        { name: "--lh-h2", value: "3rem", description: "Line height for h2 — 48px", introduced: "2.0.0" },
        { name: "--lh-h3", value: "2.75rem", description: "Line height for h3 — 44px", introduced: "2.0.0" },
        { name: "--lh-h4", value: "2.5rem", description: "Line height for h4 — 40px", introduced: "2.0.0" },
        { name: "--lh-h5", value: "2.25rem", description: "Line height for h5 — 36px", introduced: "2.0.0" },
        { name: "--lh-h6", value: "2rem", description: "Line height for h6 — 32px", introduced: "2.0.0" },
        { name: "--lh-subheading-lg", value: "1.75rem", description: "Line height for subheading-lg — 28px", introduced: "2.0.0" },
        { name: "--lh-subheading-md", value: "1.75rem", description: "Line height for subheading-md — 28px", introduced: "2.0.0" },
        { name: "--lh-subheading-sm", value: "1.5rem", description: "Line height for subheading-sm — 24px", introduced: "2.0.0" },
        { name: "--lh-label-xl", value: "1.75rem", description: "Line height for label-xl — 28px", introduced: "2.0.0" },
        { name: "--lh-label-lg", value: "1.5rem", description: "Line height for label-lg — 24px", introduced: "2.0.0" },
        { name: "--lh-label-md", value: "1.25rem", description: "Line height for label-md — 20px", introduced: "2.0.0" },
        { name: "--lh-label-sm", value: "1rem", description: "Line height for label-sm — 16px", introduced: "2.0.0" },
        { name: "--lh-label-xs", value: "0.9375rem", description: "Line height for label-xs — 15px", introduced: "2.0.0" },
        { name: "--lh-body-2xl", value: "2.25rem", description: "Line height for body-2xl — 36px", introduced: "2.0.0" },
        { name: "--lh-body-xl", value: "1.875rem", description: "Line height for body-xl — 30px", introduced: "2.0.0" },
        { name: "--lh-body-lg", value: "1.75rem", description: "Line height for body-lg — 28px", introduced: "2.0.0" },
        { name: "--lh-body", value: "1.5rem", description: "Line height for body — 24px", introduced: "2.0.0" },
        { name: "--lh-body-sm", value: "1.25rem", description: "Line height for body-sm — 20px", introduced: "2.0.0" },
        { name: "--lh-body-xs", value: "1.125rem", description: "Line height for body-xs — 18px", introduced: "2.0.0" },
        { name: "--lh-body-2xs", value: "1rem", description: "Line height for body-2xs — 16px", introduced: "2.0.0" },
      ],
    },
    {
      id: "primitive-letter-spacing",
      label: "Letter Spacing",
      tokens: [
        { name: "--ls-display-l", value: "-1px", description: "Letter spacing for display-l", introduced: "2.0.0" },
        { name: "--ls-display-m", value: "-1px", description: "Letter spacing for display-m", introduced: "2.0.0" },
        { name: "--ls-h1", value: "-0.8px", description: "Letter spacing for h1", introduced: "2.0.0" },
        { name: "--ls-h2", value: "-0.6px", description: "Letter spacing for h2", introduced: "2.0.0" },
        { name: "--ls-h3", value: "-0.5px", description: "Letter spacing for h3", introduced: "2.0.0" },
        { name: "--ls-h4", value: "-0.4px", description: "Letter spacing for h4", introduced: "2.0.0" },
        { name: "--ls-h5", value: "-0.3px", description: "Letter spacing for h5", introduced: "2.0.0" },
        { name: "--ls-h6", value: "-0.2px", description: "Letter spacing for h6", introduced: "2.0.0" },
        { name: "--ls-subheading-lg", value: "-0.1px", description: "Letter spacing for subheading-lg", introduced: "2.0.0" },
        { name: "--ls-subheading-md", value: "-0.1px", description: "Letter spacing for subheading-md", introduced: "2.0.0" },
        { name: "--ls-subheading-sm", value: "-0.1px", description: "Letter spacing for subheading-sm", introduced: "2.0.0" },
        { name: "--ls-label-xl", value: "-0.14px", description: "Letter spacing for label-xl", introduced: "2.0.0" },
        { name: "--ls-label-lg", value: "-0.14px", description: "Letter spacing for label-lg", introduced: "2.0.0" },
        { name: "--ls-label-md", value: "-0.12px", description: "Letter spacing for label-md", introduced: "2.0.0" },
        { name: "--ls-label-sm", value: "-0.14px", description: "Letter spacing for label-sm", introduced: "2.0.0" },
        { name: "--ls-label-xs", value: "-0.12px", description: "Letter spacing for label-xs", introduced: "2.0.0" },
        { name: "--ls-body-2xl", value: "-0.14px", description: "Letter spacing for body-2xl", introduced: "2.0.0" },
        { name: "--ls-body-xl", value: "-0.14px", description: "Letter spacing for body-xl", introduced: "2.0.0" },
        { name: "--ls-body-lg", value: "-0.14px", description: "Letter spacing for body-lg", introduced: "2.0.0" },
        { name: "--ls-body", value: "-0.14px", description: "Letter spacing for body", introduced: "2.0.0" },
        { name: "--ls-body-sm", value: "-0.12px", description: "Letter spacing for body-sm", introduced: "2.0.0" },
        { name: "--ls-body-xs", value: "-0.1px", description: "Letter spacing for body-xs", introduced: "2.0.0" },
        { name: "--ls-body-2xs", value: "0", description: "Letter spacing for body-2xs", introduced: "2.0.0" },
      ],
    },
  ],
};

export const primitiveSpacing: Section = {
  id: "primitive-spacing",
  label: "Primitive Spacing",
  subsections: [
    {
      id: "primitive-spacing-named",
      label: "Named scale",
      tokens: [
        { name: "--spacing-xs", value: "0.25rem", description: "4px", introduced: "1.0.0" },
        { name: "--spacing-sm", value: "0.5rem", description: "8px", introduced: "1.0.0" },
        { name: "--spacing-md", value: "1rem", description: "16px", introduced: "1.0.0" },
        { name: "--spacing-lg", value: "1.5rem", description: "24px", introduced: "1.0.0" },
        { name: "--spacing-xl", value: "2rem", description: "32px", introduced: "1.0.0" },
        { name: "--spacing-2xl", value: "3rem", description: "48px", introduced: "1.0.0" },
        { name: "--spacing-3xl", value: "4rem", description: "64px", introduced: "1.0.0" },
        { name: "--spacing-4xl", value: "6rem", description: "96px", introduced: "1.0.0" },
      ],
    },
    {
      id: "primitive-spacing-numeric",
      label: "Numeric scale (Compact · Spacious)",
      tokens: [
        { name: "--space-1", value: "0", description: "0px compact · 0px spacious", introduced: "1.1.0" },
        { name: "--space-2", value: "0.0625rem", description: "1px compact · 2px spacious", introduced: "1.1.0" },
        { name: "--space-3", value: "0.125rem", description: "2px compact · 4px spacious", introduced: "1.1.0" },
        { name: "--space-4", value: "0.25rem", description: "4px compact · 6px spacious", introduced: "1.1.0" },
        { name: "--space-5", value: "0.375rem", description: "6px compact · 8px spacious", introduced: "1.1.0" },
        { name: "--space-6", value: "0.5rem", description: "8px compact · 10px spacious", introduced: "1.1.0" },
        { name: "--space-7", value: "0.625rem", description: "10px compact · 12px spacious", introduced: "1.1.0" },
        { name: "--space-8", value: "0.75rem", description: "12px compact · 16px spacious", introduced: "1.1.0" },
        { name: "--space-9", value: "0.875rem", description: "14px compact · 18px spacious", introduced: "1.1.0" },
        { name: "--space-10", value: "1rem", description: "16px compact · 20px spacious", introduced: "1.1.0" },
        { name: "--space-11", value: "1.25rem", description: "20px compact · 24px spacious", introduced: "1.1.0" },
        { name: "--space-12", value: "1.5rem", description: "24px compact · 28px spacious", introduced: "1.1.0" },
        { name: "--space-13", value: "1.75rem", description: "28px compact · 32px spacious", introduced: "1.1.0" },
        { name: "--space-14", value: "2rem", description: "32px compact · 36px spacious", introduced: "1.1.0" },
        { name: "--space-15", value: "2.25rem", description: "36px compact · 40px spacious", introduced: "1.1.0" },
        { name: "--space-16", value: "2.5rem", description: "40px compact · 48px spacious", introduced: "1.1.0" },
        { name: "--space-17", value: "3rem", description: "48px compact · 56px spacious", introduced: "1.1.0" },
        { name: "--space-18", value: "3.5rem", description: "56px compact · 64px spacious", introduced: "1.1.0" },
        { name: "--space-19", value: "4rem", description: "64px compact · 72px spacious", introduced: "1.1.0" },
        { name: "--space-20", value: "4.5rem", description: "72px compact · 80px spacious", introduced: "1.1.0" },
        { name: "--space-21", value: "5rem", description: "80px compact · 88px spacious", introduced: "1.1.0" },
        { name: "--space-22", value: "5.5rem", description: "88px compact · 96px spacious", introduced: "1.1.0" },
        { name: "--space-23", value: "6rem", description: "96px compact · 104px spacious", introduced: "1.1.0" },
        { name: "--space-24", value: "6.5rem", description: "104px compact · 112px spacious", introduced: "1.1.0" },
        { name: "--space-25", value: "7rem", description: "112px compact · 128px spacious", introduced: "1.1.0" },
        { name: "--space-26", value: "8rem", description: "128px compact · 144px spacious", introduced: "1.1.0" },
        { name: "--space-27", value: "9rem", description: "144px compact · 160px spacious", introduced: "1.1.0" },
        { name: "--space-28", value: "10rem", description: "160px compact · 176px spacious", introduced: "1.1.0" },
        { name: "--space-29", value: "11rem", description: "176px compact · 192px spacious", introduced: "1.1.0" },
        { name: "--space-30", value: "12rem", description: "192px compact · 208px spacious", introduced: "1.1.0" },
        { name: "--space-31", value: "13rem", description: "208px compact · 240px spacious", introduced: "1.1.0" },
        { name: "--space-32", value: "15rem", description: "240px compact · 288px spacious", introduced: "1.1.0" },
        { name: "--space-33", value: "18rem", description: "288px compact · 320px spacious", introduced: "1.1.0" },
        { name: "--space-34", value: "20rem", description: "320px compact · 384px spacious", introduced: "1.1.0" },
        { name: "--space-35", value: "24rem", description: "384px compact · 420px spacious", introduced: "1.1.0" },
      ],
    },
  ],
};

export const primitiveSections: Section[] = [primitiveColors, primitiveRadius, primitiveTypography, primitiveSpacing];

// ─── Token sections ───────────────────────────────────────────────────────────

export const sections: Section[] = [
  {
    id: "color",
    label: "Color",
    subsections: [
      {
        id: "background",
        label: "Background",
        tokens: [
          { name: "--background-canvas", value: "#ffffff", dark: "#1a1a1a", description: "Main application canvas. Neutral background 1 of 8.", introduced: "2.0.0" },
          { name: "--background-surface", value: "#f5f5f5", dark: "#1c1c1c", description: "Standard cards and panels. Neutral background 2 of 8.", introduced: "2.0.0" },
          { name: "--background-surface-raised", value: "#ffffff", dark: "#2a2a2a", description: "Elevated popovers, menus and dialogs. Neutral background 3 of 8.", introduced: "2.0.0" },
          { name: "--background-subtle", value: "#f5f5f5", dark: "#2a2a2a", description: "Quiet fills and low-emphasis grouping. Neutral background 4 of 8.", introduced: "2.0.0" },
          { name: "--background-muted", value: "#e5e5e5", dark: "#525252", description: "More visible neutral fill above subtle. Neutral background 5 of 8.", introduced: "2.0.0" },
          { name: "--background-strong", value: "#737373", dark: "#1c1c1c", description: "High-emphasis neutral fill; validate the foreground pairing. Neutral background 6 of 8.", introduced: "2.0.0" },
          { name: "--background-disabled", value: "#f5f5f5", dark: "#1c1c1c", description: "Inactive-control background; pair with foreground-disabled. Neutral background 7 of 8.", introduced: "2.0.0" },
          { name: "--background-inverse", value: "#1a1a1a", dark: "#f5f5f5", description: "Deliberately inverted region, not a substitute for switching theme. Neutral background 8 of 8.", introduced: "2.0.0" },
        ],
      },
      {
        id: "foreground",
        label: "Foreground",
        tokens: [
          { name: "--foreground-primary", value: "#1a1a1a", dark: "#f5f5f5", description: "Primary text and monochrome icons.", introduced: "2.0.0" },
          { name: "--foreground-secondary", value: "#525252", dark: "#a3a3a3", description: "Supporting text and icons.", introduced: "2.0.0" },
          { name: "--foreground-tertiary", value: "#737373", description: "Metadata and low-emphasis content.", introduced: "2.0.0" },
          { name: "--foreground-placeholder", value: "#737373", description: "Input placeholder content.", introduced: "2.0.0" },
          { name: "--foreground-disabled", value: "#a3a3a3", dark: "#525252", description: "Disabled text and icons.", introduced: "2.0.0" },
          { name: "--foreground-inverse", value: "#ffffff", dark: "#1a1a1a", description: "Content placed on inverse backgrounds.", introduced: "2.0.0" },
        ],
      },
      {
        id: "foreground-on-image",
        label: "Foreground / On Image",
        tokens: [
          { name: "--foreground-on-image-dark", value: "#1a1a1a", description: "Fixed dark text over light imagery. Same in both modes; validate contrast over the actual image.", introduced: "2.0.0" },
          { name: "--foreground-on-image-dark-secondary", value: "#525252", description: "Fixed supporting text over light imagery. Add a scrim if small text fails contrast.", introduced: "2.0.0" },
          { name: "--foreground-on-image-light", value: "#ffffff", description: "Fixed light text over dark imagery. Use a scrim on variable imagery.", introduced: "2.0.0" },
        ],
      },
      {
        id: "border",
        label: "Border",
        tokens: [
          { name: "--border-subtle", value: "#e5e5e5", dark: "#2a2a2a", description: "Quiet dividers and subtle separation.", introduced: "2.0.0" },
          { name: "--border-default", value: "#d4d4d4", dark: "#1c1c1c", description: "Default control, card and input borders.", introduced: "2.0.0" },
          { name: "--border-medium", value: "#a3a3a3", dark: "#525252", description: "Medium-emphasis boundaries.", introduced: "2.0.0" },
          { name: "--border-strong", value: "#737373", description: "High-emphasis boundaries.", introduced: "2.0.0" },
          { name: "--border-disabled", value: "#e5e5e5", dark: "#2a2a2a", description: "Disabled control borders.", introduced: "2.0.0" },
          { name: "--border-focus", value: "#ff589b", dark: "#ef6994", description: "Keyboard focus boundary.", introduced: "2.0.0" },
        ],
      },
      {
        id: "accent-background",
        label: "Accent / Background",
        tokens: [
          { name: "--accent-background-default", value: "#ff589b", description: "Primary brand surface; reserve for meaningful emphasis.", introduced: "2.0.0" },
          { name: "--accent-background-hover", value: "#c43460", dark: "#ef6994", description: "Hovered accent surface.", introduced: "2.0.0" },
          { name: "--accent-background-pressed", value: "#9a2550", dark: "#f598bb", description: "Pressed accent surface.", introduced: "2.0.0" },
          { name: "--accent-background-subtle", value: "#fde8ef", dark: "#440e23", description: "Quiet branded surface.", introduced: "2.0.0" },
          { name: "--accent-background-selected", value: "#fbc5d8", dark: "#6e1839", description: "Selected item background.", introduced: "2.0.0" },
          { name: "--accent-background-faint", value: "#fef4f7", dark: "#290b17", description: "Lowest-emphasis branded background for metric cards and quiet accent regions. Not for text or icons.", introduced: "2.0.0" },
        ],
      },
      {
        id: "accent-foreground",
        label: "Accent / Foreground",
        tokens: [
          { name: "--accent-foreground-default", value: "#9a2550", dark: "#f598bb", description: "Accessible links, accent text and accent icons.", introduced: "2.0.0" },
          { name: "--accent-foreground-brand", value: "#ff589b", description: "Signature brand-coloured text and icons for emphasised metrics. Validate contrast; use accent-foreground-default for general links.", introduced: "2.0.0" },
          { name: "--accent-foreground-on-accent", value: "#1a1a1a", description: "Text and icons placed on Pink 500.", introduced: "2.0.0" },
        ],
      },
      {
        id: "accent-border",
        label: "Accent / Border",
        tokens: [
          { name: "--accent-border-default", value: "#ff589b", dark: "#ef6994", description: "Accent outline and selected boundary.", introduced: "2.0.0" },
        ],
      },
      {
        id: "accent",
        label: "Accent",
        tokens: [
          { name: "--accent-focus-ring", value: "#ff589b", dark: "#ef6994", description: "Brand focus ring.", introduced: "2.0.0" },
        ],
      },
    ],
  },
  {
    id: "action",
    label: "Action",
    subsections: [
      {
        id: "action-primary",
        label: "Action / Primary",
        tokens: [
          { name: "--action-primary-background-default", value: "#ff589b", description: "Primary action default background.", introduced: "2.0.0" },
          { name: "--action-primary-background-hover", value: "#c43460", dark: "#ef6994", description: "Primary action hover background.", introduced: "2.0.0" },
          { name: "--action-primary-background-pressed", value: "#9a2550", dark: "#f598bb", description: "Primary action pressed background.", introduced: "2.0.0" },
          { name: "--action-primary-background-disabled", value: "#f5f5f5", dark: "#1c1c1c", description: "Primary action disabled background.", introduced: "2.0.0" },
          { name: "--action-primary-foreground", value: "#1a1a1a", description: "Primary action label and icon.", introduced: "2.0.0" },
          { name: "--action-primary-foreground-disabled", value: "#a3a3a3", dark: "#525252", description: "Disabled primary action label and icon.", introduced: "2.0.0" },
          { name: "--action-primary-focus", value: "#ff589b", dark: "#ef6994", description: "Primary action focus indicator.", introduced: "2.0.0" },
        ],
      },
      {
        id: "action-secondary",
        label: "Action / Secondary",
        tokens: [
          { name: "--action-secondary-background-default", value: "#f5f5f5", dark: "#1c1c1c", description: "Secondary action default background.", introduced: "2.0.0" },
          { name: "--action-secondary-background-hover", value: "#f5f5f5", dark: "#2a2a2a", description: "Secondary action hover background.", introduced: "2.0.0" },
          { name: "--action-secondary-background-selected", value: "#f5f5f5", dark: "#2a2a2a", description: "Persistent neutral selection, such as the current sidebar destination. Distinct from transient hover.", introduced: "2.0.0" },
          { name: "--action-secondary-foreground", value: "#1a1a1a", dark: "#f5f5f5", description: "Secondary action label and icon.", introduced: "2.0.0" },
          { name: "--action-secondary-border", value: "#d4d4d4", dark: "#1c1c1c", description: "Secondary action border.", introduced: "2.0.0" },
          { name: "--action-secondary-focus", value: "#ff589b", dark: "#ef6994", description: "Secondary action focus indicator.", introduced: "2.0.0" },
        ],
      },
      {
        id: "action-tertiary",
        label: "Action / Tertiary",
        tokens: [
          { name: "--action-tertiary-foreground-default", value: "#1a1a1a", dark: "#f5f5f5", description: "Tertiary action default label and icon.", introduced: "2.0.0" },
          { name: "--action-tertiary-foreground-hover", value: "#9a2550", dark: "#f598bb", description: "Tertiary action hover label and icon.", introduced: "2.0.0" },
          { name: "--action-tertiary-background-hover", value: "#f5f5f5", dark: "#2a2a2a", description: "Tertiary action hover background.", introduced: "2.0.0" },
          { name: "--action-tertiary-focus", value: "#ff589b", dark: "#ef6994", description: "Tertiary action focus indicator.", introduced: "2.0.0" },
        ],
      },
      {
        id: "action-neutral",
        label: "Action / Neutral",
        tokens: [
          { name: "--action-neutral-background-default", value: "#1a1a1a", dark: "#ffffff", description: "Neutral primary action default background.", introduced: "2.0.0" },
          { name: "--action-neutral-background-hover", value: "#1c1c1c", dark: "#a3a3a3", description: "Neutral primary action hover background.", introduced: "2.0.0" },
          { name: "--action-neutral-background-pressed", value: "#2a2a2a", dark: "#6b6b6b", description: "Neutral primary action pressed background.", introduced: "2.0.0" },
        ],
      },
      {
        id: "action-danger",
        label: "Action / Danger",
        tokens: [
          { name: "--action-danger-background-default", value: "#c9000a", dark: "#f87171", description: "Destructive action default background.", introduced: "2.0.0" },
          { name: "--action-danger-background-hover", value: "#a60008", dark: "#fca5a5", description: "Destructive action hover background.", introduced: "2.0.0" },
          { name: "--action-danger-background-pressed", value: "#850006", dark: "#fec8c8", description: "Destructive action pressed background.", introduced: "2.0.0" },
        ],
      },
    ],
  },
  {
    id: "status",
    label: "Status",
    subsections: [
      {
        id: "status-danger",
        label: "Status / Danger",
        tokens: [
          { name: "--status-danger-background", value: "#fef2f2", dark: "#4f0004", description: "Danger and error message background.", introduced: "2.0.0" },
          { name: "--status-danger-background-strong", value: "#a60008", dark: "#fca5a5", description: "High-emphasis danger background.", introduced: "2.0.0" },
          { name: "--status-danger-foreground", value: "#a60008", dark: "#fca5a5", description: "Danger and error text.", introduced: "2.0.0" },
          { name: "--status-danger-border", value: "#fec8c8", dark: "#850006", description: "Danger and error boundary.", introduced: "2.0.0" },
          { name: "--status-danger-icon", value: "#c9000a", dark: "#f87171", description: "Danger and error icon.", introduced: "2.0.0" },
        ],
      },
      {
        id: "status-success",
        label: "Status / Success",
        tokens: [
          { name: "--status-success-background", value: "#f0fdf4", dark: "#032e15", description: "Success message background.", introduced: "2.0.0" },
          { name: "--status-success-background-strong", value: "#008236", dark: "#7bf1a8", description: "High-emphasis success background.", introduced: "2.0.0" },
          { name: "--status-success-foreground", value: "#008236", dark: "#7bf1a8", description: "Success text.", introduced: "2.0.0" },
          { name: "--status-success-border", value: "#b9f8cf", dark: "#016630", description: "Success boundary.", introduced: "2.0.0" },
          { name: "--status-success-icon", value: "#00a63e", dark: "#05df72", description: "Success icon.", introduced: "2.0.0" },
        ],
      },
      {
        id: "status-warning",
        label: "Status / Warning",
        tokens: [
          { name: "--status-warning-background", value: "#fff8f2", dark: "#431709", description: "Warning message background.", introduced: "2.0.0" },
          { name: "--status-warning-background-strong", value: "#9d4218", dark: "#ffbd8f", description: "High-emphasis warning background.", introduced: "2.0.0" },
          { name: "--status-warning-foreground", value: "#9d4218", dark: "#ffbd8f", description: "Warning text.", introduced: "2.0.0" },
          { name: "--status-warning-border", value: "#ffd9bf", dark: "#c65b20", description: "Warning boundary.", introduced: "2.0.0" },
          { name: "--status-warning-icon", value: "#e87a2f", dark: "#ffa866", description: "Warning icon.", introduced: "2.0.0" },
        ],
      },
      {
        id: "status-info",
        label: "Status / Info",
        tokens: [
          { name: "--status-info-background", value: "#ebfffe", dark: "#063946", description: "Informational message background.", introduced: "2.0.0" },
          { name: "--status-info-background-strong", value: "#126778", dark: "#62f7fe", description: "High-emphasis informational background. Pair with foreground-inverse.", introduced: "2.0.0" },
          { name: "--status-info-foreground", value: "#126778", dark: "#62f7fe", description: "Informational text.", introduced: "2.0.0" },
          { name: "--status-info-border", value: "#a2fcff", dark: "#126778", description: "Informational boundary.", introduced: "2.0.0" },
          { name: "--status-info-icon", value: "#02aec6", dark: "#1be8f5", description: "Informational icon.", introduced: "2.0.0" },
        ],
      },
    ],
  },
  {
    id: "component",
    label: "Component",
    subsections: [
      {
        id: "button",
        label: "Button",
        tokens: [
          { name: "--button-accent-primary-foreground", value: "#ffffff", description: "Text and icons on accent primary buttons. White by explicit brand decision (see contrast note).", introduced: "2.0.0" },
          { name: "--button-danger-primary-background-default", value: "#c9000a", dark: "#f87171", description: "Primary danger button default background.", introduced: "2.0.0" },
          { name: "--button-danger-primary-background-hover", value: "#a60008", dark: "#fca5a5", description: "Primary danger button hover and loading background.", introduced: "2.0.0" },
          { name: "--button-danger-primary-background-disabled", value: "#f5f5f5", dark: "#1c1c1c", description: "Primary danger button disabled background.", introduced: "2.0.0" },
          { name: "--button-danger-primary-foreground", value: "#ffffff", dark: "#1a1a1a", description: "Primary danger button text and icon.", introduced: "2.0.0" },
          { name: "--button-danger-secondary-background-default", value: "#fef2f2", dark: "#4f0004", description: "Secondary danger button default background.", introduced: "2.0.0" },
          { name: "--button-danger-secondary-background-hover", value: "#fec8c8", dark: "#850006", description: "Secondary danger button hover background.", introduced: "2.0.0" },
          { name: "--button-danger-secondary-foreground", value: "#a60008", dark: "#fca5a5", description: "Secondary danger button text and icon.", introduced: "2.0.0" },
          { name: "--button-danger-tertiary-background-hover", value: "#fef2f2", dark: "#4f0004", description: "Tertiary danger button hover background.", introduced: "2.0.0" },
          { name: "--button-danger-tertiary-foreground", value: "#a60008", dark: "#fca5a5", description: "Tertiary danger button text and icon.", introduced: "2.0.0" },
          { name: "--button-danger-outline-background-hover", value: "#fef2f2", dark: "#4f0004", description: "Outline danger button hover background.", introduced: "2.0.0" },
          { name: "--button-danger-outline-foreground", value: "#a60008", dark: "#fca5a5", description: "Outline danger button text and icon.", introduced: "2.0.0" },
          { name: "--button-danger-border", value: "#fec8c8", dark: "#850006", description: "Danger button border and focus ring.", introduced: "2.0.0" },
          { name: "--button-danger-foreground-disabled", value: "#a3a3a3", dark: "#525252", description: "Disabled danger button text and icon.", introduced: "2.0.0" },
          { name: "--button-danger-border-disabled", value: "#e5e5e5", dark: "#2a2a2a", description: "Disabled danger button border.", introduced: "2.0.0" },
        ],
      },
      {
        id: "tooltip-card",
        label: "Tooltip Card",
        tokens: [
          { name: "--tooltip-card-background", value: "#f5f5f5", dark: "#1c1c1c", description: "Tooltip Card surface.", introduced: "2.0.0" },
          { name: "--tooltip-card-border", value: "#e5e5e5", dark: "#2a2a2a", description: "Tooltip Card outline and tail boundary.", introduced: "2.0.0" },
          { name: "--tooltip-card-title", value: "#1a1a1a", dark: "#f5f5f5", description: "Tooltip Card title.", introduced: "2.0.0" },
          { name: "--tooltip-card-body", value: "#525252", dark: "#a3a3a3", description: "Tooltip Card supporting body.", introduced: "2.0.0" },
          { name: "--tooltip-card-action-dismiss", value: "#9a2550", dark: "#f598bb", description: "Tooltip Card dismiss action.", introduced: "2.0.0" },
          { name: "--tooltip-card-action-secondary", value: "#525252", dark: "#a3a3a3", description: "Tooltip Card secondary action.", introduced: "2.0.0" },
          { name: "--tooltip-card-placeholder", value: "#f5f5f5", dark: "#1c1c1c", description: "Tooltip Card placeholder media surface.", introduced: "2.0.0" },
          { name: "--tooltip-card-progress-active", value: "#ff589b", description: "Tooltip Card active progress indicator.", introduced: "2.0.0" },
          { name: "--tooltip-card-progress-inactive", value: "#a3a3a3", dark: "#525252", description: "Tooltip Card inactive progress indicator.", introduced: "2.0.0" },
        ],
      },
      {
        id: "tabs",
        label: "Tabs",
        tokens: [
          { name: "--tabs-background-selected", value: "#ffffff", dark: "#525252", description: "Neutral selected tab background, brighter than the rail. Persistent selection, not hover.", introduced: "2.0.0" },
        ],
      },
    ],
  },
  {
    id: "elevation",
    label: "Elevation",
    subsections: [
      {
        id: "shadow-colors",
        label: "Shadow colours",
        tokens: [
          { name: "--shadow-neutral-soft", value: "rgb(0 0 0 / 0.04)", description: "Gray 950 at 4%.", introduced: "2.0.0" },
          { name: "--shadow-neutral-strong", value: "rgb(0 0 0 / 0.09)", description: "Gray 950 at 9%.", introduced: "2.0.0" },
          { name: "--shadow-accent-soft", value: "rgb(255 88 155 / 0.08)", description: "Pink 500 at 8%.", introduced: "2.0.0" },
          { name: "--shadow-accent-strong", value: "rgb(255 88 155 / 0.12)", description: "Pink 500 at 12%.", introduced: "2.0.0" },
          { name: "--shadow-accent-glow", value: "rgb(255 88 155 / 1)", description: "Pink 500 at 100%.", introduced: "2.0.0" },
          { name: "--shadow-danger-soft", value: "rgb(231 0 11 / 0.08)", description: "Red 500 at 8%.", introduced: "2.0.0" },
          { name: "--shadow-danger-strong", value: "rgb(231 0 11 / 0.12)", description: "Red 500 at 12%.", introduced: "2.0.0" },
          { name: "--shadow-success-soft", value: "rgb(0 201 80 / 0.08)", description: "Green 500 at 8%.", introduced: "2.0.0" },
          { name: "--shadow-success-strong", value: "rgb(0 201 80 / 0.12)", description: "Green 500 at 12%.", introduced: "2.0.0" },
          { name: "--shadow-warning-soft", value: "rgb(255 153 69 / 0.08)", description: "Orange 500 at 8%.", introduced: "2.0.0" },
          { name: "--shadow-warning-strong", value: "rgb(255 153 69 / 0.12)", description: "Orange 500 at 12%.", introduced: "2.0.0" },
          { name: "--shadow-highlight", value: "rgb(255 255 255 / 0.5)", description: "Inner highlight, white at 50%.", introduced: "2.0.0" },
          { name: "--shadow-highlight-strong", value: "rgb(255 255 255 / 0.6)", description: "Inner highlight, white at 60%.", introduced: "2.0.0" },
        ],
      },
      {
        id: "shadow-styles",
        label: "Shadow styles",
        tokens: [
          { name: "--shadow-neutral-1", value: "box-shadow", description: "Figma effect style Shadows/Neutral/Level 1.", introduced: "2.0.0" },
          { name: "--shadow-neutral-2", value: "box-shadow", description: "Figma effect style Shadows/Neutral/Level 2.", introduced: "2.0.0" },
          { name: "--shadow-neutral-3", value: "box-shadow", description: "Figma effect style Shadows/Neutral/Level 3.", introduced: "2.0.0" },
          { name: "--shadow-neutral-4", value: "box-shadow", description: "Figma effect style Shadows/Neutral/Level 4.", introduced: "2.0.0" },
          { name: "--shadow-neutral-5", value: "box-shadow", description: "Figma effect style Shadows/Neutral/Level 5.", introduced: "2.0.0" },
          { name: "--shadow-neutral-6", value: "box-shadow", description: "Figma effect style Shadows/Neutral/Level 6.", introduced: "2.0.0" },
          { name: "--shadow-neutral-7", value: "box-shadow", description: "Figma effect style Shadows/Neutral/Level 7.", introduced: "2.0.0" },
          { name: "--shadow-neutral-elevated-button", value: "box-shadow", description: "Figma effect style Shadows/Neutral/Elevated Button.", introduced: "2.0.0" },
          { name: "--shadow-neutral-gradient-button", value: "box-shadow", description: "Figma effect style Shadows/Neutral/Gradient Button.", introduced: "2.0.0" },
          { name: "--shadow-accent-1", value: "box-shadow", description: "Figma effect style Shadows/Accent/Level 1.", introduced: "2.0.0" },
          { name: "--shadow-accent-2", value: "box-shadow", description: "Figma effect style Shadows/Accent/Level 2.", introduced: "2.0.0" },
          { name: "--shadow-accent-3", value: "box-shadow", description: "Figma effect style Shadows/Accent/Level 3.", introduced: "2.0.0" },
          { name: "--shadow-accent-4", value: "box-shadow", description: "Figma effect style Shadows/Accent/Level 4.", introduced: "2.0.0" },
          { name: "--shadow-accent-5", value: "box-shadow", description: "Figma effect style Shadows/Accent/Level 5.", introduced: "2.0.0" },
          { name: "--shadow-accent-6", value: "box-shadow", description: "Figma effect style Shadows/Accent/Level 6.", introduced: "2.0.0" },
          { name: "--shadow-accent-7", value: "box-shadow", description: "Figma effect style Shadows/Accent/Level 7.", introduced: "2.0.0" },
          { name: "--shadow-danger-1", value: "box-shadow", description: "Figma effect style Shadows/Danger/Level 1.", introduced: "2.0.0" },
          { name: "--shadow-danger-2", value: "box-shadow", description: "Figma effect style Shadows/Danger/Level 2.", introduced: "2.0.0" },
          { name: "--shadow-danger-3", value: "box-shadow", description: "Figma effect style Shadows/Danger/Level 3.", introduced: "2.0.0" },
          { name: "--shadow-danger-4", value: "box-shadow", description: "Figma effect style Shadows/Danger/Level 4.", introduced: "2.0.0" },
          { name: "--shadow-danger-5", value: "box-shadow", description: "Figma effect style Shadows/Danger/Level 5.", introduced: "2.0.0" },
          { name: "--shadow-danger-6", value: "box-shadow", description: "Figma effect style Shadows/Danger/Level 6.", introduced: "2.0.0" },
          { name: "--shadow-danger-7", value: "box-shadow", description: "Figma effect style Shadows/Danger/Level 7.", introduced: "2.0.0" },
          { name: "--shadow-success-1", value: "box-shadow", description: "Figma effect style Shadows/Success/Level 1.", introduced: "2.0.0" },
          { name: "--shadow-success-2", value: "box-shadow", description: "Figma effect style Shadows/Success/Level 2.", introduced: "2.0.0" },
          { name: "--shadow-success-3", value: "box-shadow", description: "Figma effect style Shadows/Success/Level 3.", introduced: "2.0.0" },
          { name: "--shadow-success-4", value: "box-shadow", description: "Figma effect style Shadows/Success/Level 4.", introduced: "2.0.0" },
          { name: "--shadow-success-5", value: "box-shadow", description: "Figma effect style Shadows/Success/Level 5.", introduced: "2.0.0" },
          { name: "--shadow-success-6", value: "box-shadow", description: "Figma effect style Shadows/Success/Level 6.", introduced: "2.0.0" },
          { name: "--shadow-success-7", value: "box-shadow", description: "Figma effect style Shadows/Success/Level 7.", introduced: "2.0.0" },
          { name: "--shadow-warning-1", value: "box-shadow", description: "Figma effect style Shadows/Warning/Level 1.", introduced: "2.0.0" },
          { name: "--shadow-warning-2", value: "box-shadow", description: "Figma effect style Shadows/Warning/Level 2.", introduced: "2.0.0" },
          { name: "--shadow-warning-3", value: "box-shadow", description: "Figma effect style Shadows/Warning/Level 3.", introduced: "2.0.0" },
          { name: "--shadow-warning-4", value: "box-shadow", description: "Figma effect style Shadows/Warning/Level 4.", introduced: "2.0.0" },
          { name: "--shadow-warning-5", value: "box-shadow", description: "Figma effect style Shadows/Warning/Level 5.", introduced: "2.0.0" },
          { name: "--shadow-warning-6", value: "box-shadow", description: "Figma effect style Shadows/Warning/Level 6.", introduced: "2.0.0" },
          { name: "--shadow-warning-7", value: "box-shadow", description: "Figma effect style Shadows/Warning/Level 7.", introduced: "2.0.0" },
          { name: "--shadow-accent-gradient-button", value: "box-shadow", description: "Figma effect style Shadows/Accent/Gradient Button.", introduced: "2.0.0" },
          { name: "--shadow-danger-button", value: "box-shadow", description: "Figma effect style Shadows/Danger/Button.", introduced: "2.0.0" },
        ],
      },
    ],
  },
  {
    id: "deprecated",
    label: "Deprecated aliases",
    subsections: [
      {
        id: "brand-theme",
        label: "Brand Theme (Figma)",
        tokens: [
          { name: "--neutral-surface-disable", value: "#f5f5f5", dark: "#1c1c1c", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--background-disabled" },
          { name: "--neutral-surface-surface", value: "#f5f5f5", dark: "#2a2a2a", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--background-subtle" },
          { name: "--neutral-surface-lighter", value: "#e5e5e5", dark: "#2a2a2a", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--neutral-surface-light", value: "#737373", dark: "#1c1c1c", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--neutral-surface-default", value: "#1a1a1a", dark: "#ffffff", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--neutral-surface-dark", value: "#1c1c1c", dark: "#a3a3a3", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--neutral-surface-darker", value: "#1c1c1c", dark: "#6b6b6b", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--neutral-text-on-color", value: "#ffffff", dark: "#1a1a1a", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--foreground-inverse" },
          { name: "--neutral-text-disable", value: "#a3a3a3", dark: "#525252", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--foreground-disabled" },
          { name: "--neutral-text-tertiary", value: "#737373", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--foreground-tertiary" },
          { name: "--neutral-text-secondary", value: "#525252", dark: "#a3a3a3", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--foreground-secondary" },
          { name: "--neutral-text-primary", value: "#1a1a1a", dark: "#f5f5f5", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--foreground-primary" },
          { name: "--neutral-text-button", value: "#1a1a1a", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--action-primary-foreground" },
          { name: "--neutral-divider-light", value: "#e5e5e5", dark: "#2a2a2a", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--border-subtle" },
          { name: "--neutral-divider-default", value: "#d4d4d4", dark: "#1c1c1c", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--border-default" },
          { name: "--accent-surface-disable", value: "#f5f5f5", dark: "#1c1c1c", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--background-disabled" },
          { name: "--accent-surface-surface", value: "#fde8ef", dark: "#440e23", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-background-subtle" },
          { name: "--accent-surface-light", value: "#fbc5d8", dark: "#6e1839", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-background-selected" },
          { name: "--accent-surface-default", value: "#ff589b", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-background-default" },
          { name: "--accent-surface-dark", value: "#c43460", dark: "#ef6994", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-background-hover" },
          { name: "--accent-surface-darker", value: "#9a2550", dark: "#f598bb", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-background-pressed" },
          { name: "--accent-surface-btn-hover", value: "#c43460", dark: "#ef6994", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--action-primary-background-hover" },
          { name: "--accent-text-disable", value: "#a3a3a3", dark: "#525252", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--foreground-disabled" },
          { name: "--accent-text-default", value: "#9a2550", dark: "#f598bb", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-foreground-default" },
          { name: "--accent-text-on-color", value: "#1a1a1a", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-foreground-on-accent" },
          { name: "--accent-divider-disable", value: "#e5e5e5", dark: "#2a2a2a", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--border-disabled" },
          { name: "--accent-divider-light", value: "#ff589b", dark: "#ef6994", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-border-default" },
          { name: "--accent-divider-default", value: "#ff589b", dark: "#ef6994", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-border-default" },
          { name: "--accent-divider-on-color", value: "#ff589b", dark: "#ef6994", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-border-default" },
          { name: "--secondary-surface-disable", value: "#f5f5f5", dark: "#1c1c1c", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--background-disabled" },
          { name: "--secondary-surface-surface", value: "#fde8ef", dark: "#440e23", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-background-subtle" },
          { name: "--secondary-surface-light", value: "#fbc5d8", dark: "#6e1839", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-background-selected" },
          { name: "--secondary-surface-default", value: "#ff589b", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-background-default" },
          { name: "--secondary-surface-dark", value: "#c43460", dark: "#ef6994", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-background-hover" },
          { name: "--secondary-surface-darker", value: "#9a2550", dark: "#f598bb", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-background-pressed" },
          { name: "--secondary-text-default", value: "#9a2550", dark: "#f598bb", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-foreground-default" },
          { name: "--secondary-text-on-color", value: "#1a1a1a", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-foreground-on-accent" },
          { name: "--secondary-text-disable", value: "#a3a3a3", dark: "#525252", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--foreground-disabled" },
          { name: "--secondary-divider-default", value: "#ff589b", dark: "#ef6994", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-border-default" },
          { name: "--secondary-divider-light", value: "#ff589b", dark: "#ef6994", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-border-default" },
          { name: "--secondary-divider-disable", value: "#e5e5e5", dark: "#2a2a2a", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--border-disabled" },
          { name: "--secondary-divider-on-color", value: "#ff589b", dark: "#ef6994", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--accent-border-default" },
          { name: "--danger-surface", value: "#fef2f2", dark: "#4f0004", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--status-danger-background" },
          { name: "--danger-light", value: "#fec8c8", dark: "#f87171", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--danger-default", value: "#e7000b", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--danger-dark", value: "#700005", dark: "#fca5a5", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--success-surface", value: "#f0fdf4", dark: "#032e15", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--status-success-background" },
          { name: "--success-light", value: "#b9f8cf", dark: "#34d399", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--success-default", value: "#00a63e", dark: "#34d399", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--success-dark", value: "#0d542b", dark: "#6ee7b7", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true },
          { name: "--warning-surface", value: "#fff8f2", dark: "#431709", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--status-warning-background" },
          { name: "--warning-light", value: "#ffd9bf", dark: "#c65b20", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--status-warning-border" },
          { name: "--warning-default", value: "#e87a2f", dark: "#ffa866", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--status-warning-icon" },
          { name: "--warning-dark", value: "#9d4218", dark: "#ffbd8f", description: "Brand Theme alias kept for compatibility.", introduced: "1.1.0", deprecated: true, replacedBy: "--status-warning-foreground" },
        ],
      },
      {
        id: "site-legacy",
        label: "Older site names",
        tokens: [
          { name: "--brand-primary", value: "#1a1a1a", dark: "#ffffff", description: "Neutral primary (black on light, white on dark). Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--action-neutral-background-default" },
          { name: "--brand-secondary", value: "#ff589b", description: "Brand pink. Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--accent-background-default" },
          { name: "--brand-accent", value: "#ff589b", description: "Was yellow; the accent is now pink. Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--accent-background-default" },
          { name: "--color-background", value: "#ffffff", dark: "#1a1a1a", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--background-canvas" },
          { name: "--color-surface", value: "#f5f5f5", dark: "#1c1c1c", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--background-surface" },
          { name: "--color-surface-hover", value: "#e5e5e5", dark: "#2a2a2a", description: "Older site-level name.", introduced: "1.0.0", deprecated: true },
          { name: "--color-border", value: "#e5e5e5", dark: "#2a2a2a", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--border-subtle" },
          { name: "--color-border-hover", value: "#d4d4d4", dark: "#1c1c1c", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--border-default" },
          { name: "--color-text-primary", value: "#1a1a1a", dark: "#f5f5f5", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--foreground-primary" },
          { name: "--color-text-secondary", value: "#525252", dark: "#a3a3a3", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--foreground-secondary" },
          { name: "--color-text-tertiary", value: "#737373", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--foreground-tertiary" },
          { name: "--color-text-inverse", value: "#ffffff", dark: "#1a1a1a", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--foreground-inverse" },
          { name: "--color-success", value: "#00a63e", dark: "#05df72", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--status-success-icon" },
          { name: "--color-warning", value: "#e87a2f", dark: "#ffa866", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--status-warning-icon" },
          { name: "--color-error", value: "#c9000a", dark: "#f87171", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--status-danger-icon" },
          { name: "--color-info", value: "#02aec6", dark: "#1be8f5", description: "Older site-level name.", introduced: "1.0.0", deprecated: true, replacedBy: "--status-info-icon" },
        ],
      },
    ],
  },
  {
    id: 'utility',
    label: 'Utility',
    tokens: [
      { name: '--transition-fast', value: '150ms cubic-bezier(0.4,0,0.2,1)', description: 'Quick transition for hover and focus state changes.', introduced: '1.0.0' },
      { name: '--transition-base', value: '300ms cubic-bezier(0.4,0,0.2,1)', description: 'Standard transition for most UI animations.', introduced: '1.0.0' },
      { name: '--transition-slow', value: '500ms cubic-bezier(0.4,0,0.2,1)', description: 'Deliberate, slower animation for emphasis.', introduced: '1.0.0' },
      { name: '--sidebar-width', value: '280px', description: 'Fixed width of the navigation sidebar.', introduced: '1.0.0' },
      { name: '--header-height', value: '70px', description: 'Fixed height of the top navigation header.', introduced: '1.0.0' },
      { name: '--container-max', value: '1200px', description: 'Maximum width of the main content container.', introduced: '1.0.0' },
    ],
  },
];

// ─── Changelog ────────────────────────────────────────────────────────────────
//
// Add a new entry at the TOP when releasing a new version.
// Each entry records what changed, why, and in which version.
//
// Types:
//   added      — a brand new token
//   changed    — an existing token's value or description was updated
//   deprecated — token still works but will be removed in a future version
//   removed    — token has been deleted (keep for one major version as a record)
//
// ─────────────────────────────────────────────────────────────────────────────

export type ChangeType = 'added' | 'changed' | 'deprecated' | 'removed';

export type ChangelogChange = {
  type: ChangeType;
  token: string;
  note: string;
};

export type ChangelogEntry = {
  version: string;
  date: string;
  changes: ChangelogChange[];
};

export const tokenChangelog: ChangelogEntry[] = [
  {
    version: '2.0.0',
    date: 'October 2026',
    changes: [
      { type: 'changed',    token: '--pink-500', note: 'Now #FF589B — the brand accent. Was #E8336C.' },
      { type: 'added',      token: '--background-* / --foreground-* / --border-*', note: 'Neutral semantic tokens from Figma Semantic Color V2.' },
      { type: 'added',      token: '--accent-* / --action-*', note: 'Accent and action tokens; primary actions use Pink 500.' },
      { type: 'added',      token: '--status-*', note: 'Danger, success, warning (orange) and info (cyan) tokens, each with background, foreground, border and icon.' },
      { type: 'added',      token: '--shadow-<family>-<level>', note: 'All Figma effect styles plus shadow colour tokens.' },
      { type: 'added',      token: '--orange-* / --cyan-*', note: 'New primitive scales for warning and info.' },
      { type: 'changed',    token: '--gray-*', note: 'Renamed to the Figma scale (100–950); values shift by one step versus 1.x.' },
      { type: 'changed',    token: '--font-heading / --font-body / --font-mono', note: 'Mona Sans / Montserrat / Courier Prime.' },
      { type: 'changed',    token: '--text-* / --lh-* / --ls-*', note: 'Rebuilt from Figma text styles (Display L/M, H1–H6, Subheading, Body, Label).' },
      { type: 'deprecated', token: '--neutral-* / --accent-surface-* / --secondary-* / --danger-* / --success-* / --warning-*', note: 'Brand Theme aliases — use the V2 tokens.' },
      { type: 'deprecated', token: '--color-* / --brand-*', note: 'Older site names — use the V2 tokens.' },
      { type: 'removed',    token: '--amber-*', note: 'Replaced by orange for warnings (old names alias orange for now).' },
    ],
  },
  {
    version: '1.2.0',
    date: 'March 2026',
    changes: [
      { type: 'added',   token: '--color-border-hover',  note: 'Added hover-state border color for interactive elements.' },
      { type: 'added',   token: '--color-surface-hover', note: 'Added hover-state surface for cards and list items.' },
      { type: 'changed', token: '--brand-primary',       note: 'Light-mode value updated from #f0d040 to #c9a800 for WCAG AA contrast on white backgrounds.' },
      { type: 'added',   token: '--radius-2xl',          note: 'New extra-large radius step for hero and feature sections.' },
      { type: 'changed', token: '--brand-accent / --yellow-*', note: 'Updated accent yellow scale. Default (yellow-500) is now #FFDE42 — brighter and more vibrant. All semantic accent tokens updated in both light and dark modes.' },
    ],
  },
  {
    version: '1.1.0',
    date: 'January 2026',
    changes: [
      { type: 'added',   token: '--spacing-3xl',        note: 'Added 4rem spacing step to support larger layout gaps.' },
      { type: 'added',   token: '--spacing-4xl',        note: 'Added 6rem spacing step for page-level vertical rhythm.' },
      { type: 'changed', token: '--font-body',          note: 'Switched from Inter to Roboto for improved language and weight coverage.' },
      { type: 'added',   token: '--color-text-inverse', note: 'Added inverse text token for use on dark or colored surfaces.' },
    ],
  },
  {
    version: '1.0.0',
    date: 'November 2025',
    changes: [
      { type: 'added', token: '--brand-primary',    note: 'Initial brand yellow token.' },
      { type: 'added', token: '--brand-secondary',  note: 'Initial brand pink token.' },
      { type: 'added', token: '--color-background', note: 'Base page background token.' },
      { type: 'added', token: '--color-surface',    note: 'Card and panel surface token.' },
      { type: 'added', token: '--font-heading',     note: 'Anton display font token.' },
      { type: 'added', token: '--font-body',        note: 'Roboto body font token.' },
      { type: 'added', token: '--font-mono',        note: 'Monaco monospace / code font token.' },
      { type: 'added', token: '--transition-base',  note: 'Standard 300ms easing token.' },
    ],
  },
];
