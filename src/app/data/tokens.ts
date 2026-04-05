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
 * FILE: src/styles/brand-variables.css
 * This is the only file you need to edit for value changes.
 * It has three blocks — edit all three if the token is theme-aware:
 *   :root { ... }                — light mode defaults
 *   [data-theme="dark"] { ... }  — dark mode overrides
 *   @media (prefers-color-scheme: dark) { ... }  — OS-level dark fallback
 *
 * ── Step 1: Change brand accent color ────────────────────────────────────────
 *
 *  The primary accent (currently yellow) drives links, active states, focus
 *  rings, and the "Latest" badge on What's New. Two values exist:
 *    --brand-primary  — used on light backgrounds (needs WCAG AA contrast)
 *    --brand-accent   — full-brightness version used on dark/black surfaces
 *
 *  In brand-variables.css, update inside :root:
 *    --brand-primary:  #YOUR_DARK_VALUE;   ← visible on white, AA contrast
 *    --brand-accent:   #YOUR_BRIGHT_VALUE; ← vibrant, used on black/dark bg
 *
 *  In [data-theme="dark"]:
 *    --brand-primary:  #YOUR_BRIGHT_VALUE; ← flip to bright for dark bg
 *    --brand-accent:   #ffffff;            ← or keep white for max contrast
 *
 *  Secondary accent (currently pink — used for tags, secondary interactions):
 *    --brand-secondary: #YOUR_COLOR;       ← update in both :root and dark block
 *
 * ── Step 2: Change brand fonts ───────────────────────────────────────────────
 *
 *  Three font variables control the entire type system:
 *    --font-heading  — Anton (all headings, display text, metrics)
 *    --font-body     — Roboto (prose, labels, captions, UI text)
 *    --font-mono     — Monaco / Courier New (code blocks, token names)
 *
 *  a. Add the new font to the <head> in index.html (Google Fonts link or @font-face)
 *  b. In brand-variables.css :root, update the variable:
 *       --font-heading: '"Your Font", fallback, sans-serif';
 *  c. Open src/app/components/TypographySection.tsx and update the const at the
 *     top of the file to match (these are used for live previews):
 *       const anton: React.CSSProperties = { fontFamily: '"Your Font", sans-serif', ... }
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
  id: 'primitive-colors',
  label: 'Primitive Colors',
  subsections: [
    {
      id: 'primitive-base',
      label: 'Base',
      tokens: [
        { name: '--color-white', value: '#ffffff', description: 'Pure white — base for light surfaces and inverse text', introduced: '1.0.0' },
        { name: '--color-black', value: '#000000', description: 'Pure black — base for dark surfaces and primary text', introduced: '1.0.0' },
      ],
    },
    {
      id: 'primitive-yellow',
      label: 'Yellow',
      tokens: [
        { name: '--yellow-100', value: '#fffde8', description: 'Yellow 100 — lightest tint', introduced: '1.1.0' },
        { name: '--yellow-200', value: '#fff8c0', description: 'Yellow 200', introduced: '1.1.0' },
        { name: '--yellow-300', value: '#fff094', description: 'Yellow 300', introduced: '1.1.0' },
        { name: '--yellow-400', value: '#ffe860', description: 'Yellow 400', introduced: '1.1.0' },
        { name: '--yellow-500', value: '#ffde42', description: 'Yellow 500 — brand accent default', introduced: '1.1.0' },
        { name: '--yellow-600', value: '#e6c200', description: 'Yellow 600 — hover state', introduced: '1.1.0' },
        { name: '--yellow-700', value: '#b89900', description: 'Yellow 700', introduced: '1.1.0' },
        { name: '--yellow-800', value: '#7a6600', description: 'Yellow 800 — dark text on yellow', introduced: '1.1.0' },
        { name: '--yellow-900', value: '#3d3300', description: 'Yellow 900 — darkest shade', introduced: '1.1.0' },
      ],
    },
    {
      id: 'primitive-pink',
      label: 'Pink',
      tokens: [
        { name: '--pink-100', value: '#fde8ef', description: 'Pink 100 — lightest tint', introduced: '1.1.0' },
        { name: '--pink-200', value: '#fbc5d8', description: 'Pink 200', introduced: '1.1.0' },
        { name: '--pink-300', value: '#f598bb', description: 'Pink 300', introduced: '1.1.0' },
        { name: '--pink-400', value: '#ef6994', description: 'Pink 400', introduced: '1.1.0' },
        { name: '--pink-500', value: '#e8336c', description: 'Pink 500 — brand secondary default', introduced: '1.1.0' },
        { name: '--pink-600', value: '#c43460', description: 'Pink 600', introduced: '1.1.0' },
        { name: '--pink-700', value: '#9a2550', description: 'Pink 700', introduced: '1.1.0' },
        { name: '--pink-800', value: '#6e1839', description: 'Pink 800', introduced: '1.1.0' },
        { name: '--pink-900', value: '#440e23', description: 'Pink 900 — darkest shade', introduced: '1.1.0' },
      ],
    },
    {
      id: 'primitive-gray',
      label: 'Gray',
      tokens: [
        { name: '--gray-0',   value: '#ffffff', description: 'Gray 0 — pure white', introduced: '1.1.0' },
        { name: '--gray-50',  value: '#f5f5f5', description: 'Gray 50 — surface tint', introduced: '1.1.0' },
        { name: '--gray-100', value: '#e5e5e5', description: 'Gray 100', introduced: '1.1.0' },
        { name: '--gray-200', value: '#d4d4d4', description: 'Gray 200 — default border', introduced: '1.1.0' },
        { name: '--gray-300', value: '#a3a3a3', description: 'Gray 300 — hover border', introduced: '1.1.0' },
        { name: '--gray-400', value: '#737373', description: 'Gray 400 — tertiary text', introduced: '1.1.0' },
        { name: '--gray-500', value: '#525252', description: 'Gray 500 — secondary text', introduced: '1.1.0' },
        { name: '--gray-600', value: '#404040', description: 'Gray 600', introduced: '1.1.0' },
        { name: '--gray-700', value: '#262626', description: 'Gray 700', introduced: '1.1.0' },
        { name: '--gray-800', value: '#1a1a1a', description: 'Gray 800 — primary text', introduced: '1.1.0' },
        { name: '--gray-850', value: '#111111', description: 'Gray 850 — dark surface', introduced: '1.1.0' },
        { name: '--gray-900', value: '#000000', description: 'Gray 900 — pure black', introduced: '1.1.0' },
      ],
    },
    {
      id: 'primitive-red',
      label: 'Red (Danger)',
      tokens: [
        { name: '--red-50',  value: '#fef2f2', description: 'Red 50 — danger surface', introduced: '1.1.0' },
        { name: '--red-200', value: '#fec8c8', description: 'Red 200 — danger light', introduced: '1.1.0' },
        { name: '--red-400', value: '#f87171', description: 'Red 400 — dark-mode danger', introduced: '1.1.0' },
        { name: '--red-600', value: '#c9000a', description: 'Red 600 — danger default', introduced: '1.1.0' },
        { name: '--red-900', value: '#700005', description: 'Red 900 — danger dark', introduced: '1.1.0' },
      ],
    },
    {
      id: 'primitive-green',
      label: 'Green (Success)',
      tokens: [
        { name: '--green-50',  value: '#f0fdf4', description: 'Green 50 — success surface', introduced: '1.1.0' },
        { name: '--green-200', value: '#b9f8cf', description: 'Green 200 — success light', introduced: '1.1.0' },
        { name: '--green-400', value: '#34d399', description: 'Green 400 — dark-mode success', introduced: '1.1.0' },
        { name: '--green-600', value: '#00a63e', description: 'Green 600 — success default', introduced: '1.1.0' },
        { name: '--green-900', value: '#0d542b', description: 'Green 900 — success dark', introduced: '1.1.0' },
      ],
    },
    {
      id: 'primitive-amber',
      label: 'Amber (Warning)',
      tokens: [
        { name: '--amber-50',  value: '#fffae8', description: 'Amber 50 — warning surface', introduced: '1.1.0' },
        { name: '--amber-200', value: '#fee685', description: 'Amber 200 — warning light', introduced: '1.1.0' },
        { name: '--amber-400', value: '#fbbf24', description: 'Amber 400 — dark-mode warning', introduced: '1.1.0' },
        { name: '--amber-600', value: '#e17100', description: 'Amber 600 — warning default', introduced: '1.1.0' },
        { name: '--amber-900', value: '#7b3306', description: 'Amber 900 — warning dark', introduced: '1.1.0' },
      ],
    },
  ],
};

export const primitiveRadius: Section = {
  id: 'primitive-radius',
  label: 'Primitive Radius',
  subsections: [
    {
      id: 'primitive-radius-scale',
      label: 'Radius Scale',
      tokens: [
        { name: '--radius-none', value: '0',        description: 'No rounding — 0px', introduced: '1.1.0' },
        { name: '--radius-xsm',  value: '0.125rem', description: 'Extra-small radius — 2px', introduced: '1.1.0' },
        { name: '--radius-sm',   value: '0.25rem',  description: 'Small radius — 4px', introduced: '1.1.0' },
        { name: '--radius-md',   value: '0.375rem', description: 'Medium radius — 6px (default for interactive elements)', introduced: '1.1.0' },
        { name: '--radius-lg',   value: '0.5rem',   description: 'Large radius — 8px (cards, panels)', introduced: '1.1.0' },
        { name: '--radius-xl',   value: '0.75rem',  description: 'Extra-large radius — 12px', introduced: '1.1.0' },
        { name: '--radius-2xl',  value: '1rem',     description: '2XL radius — 16px', introduced: '1.1.0' },
        { name: '--radius-3xl',  value: '1.25rem',  description: '3XL radius — 20px', introduced: '1.1.0' },
        { name: '--radius-4xl',  value: '1.5rem',   description: '4XL radius — 24px', introduced: '1.1.0' },
        { name: '--radius-5xl',  value: '1.875rem', description: '5XL radius — 30px', introduced: '1.1.0' },
        { name: '--radius-full', value: '9999px',   description: 'Full / pill radius', introduced: '1.1.0' },
      ],
    },
  ],
};

export const primitiveTypography: Section = {
  id: 'primitive-typography',
  label: 'Primitive Typography',
  subsections: [
    {
      id: 'primitive-font-families',
      label: 'Font Families',
      tokens: [
        { name: '--font-heading', value: '"Anton", Impact, sans-serif', description: 'Heading font — Anton (all display and heading text)', introduced: '1.1.0', cssNote: 'Use font-family' },
        { name: '--font-body',    value: '"Roboto", sans-serif',        description: 'Body font — Roboto (prose, labels, UI text)', introduced: '1.1.0', cssNote: 'Use font-family' },
        { name: '--font-mono',    value: '"Monaco", "Courier New", monospace', description: 'Monospace font — Monaco (code blocks, token names)', introduced: '1.1.0', cssNote: 'Use font-family' },
      ],
    },
    {
      id: 'primitive-font-sizes',
      label: 'Font Sizes',
      tokens: [
        { name: '--text-display',   value: '5rem',     description: 'Display — 80px', introduced: '1.1.0' },
        { name: '--text-display-x', value: '6rem',     description: 'Display X — 96px', introduced: '1.1.0' },
        { name: '--text-h1',        value: '3.875rem', description: 'H1 — 62px', introduced: '1.1.0' },
        { name: '--text-h2',        value: '3.5rem',   description: 'H2 — 56px', introduced: '1.1.0' },
        { name: '--text-h3',        value: '3rem',     description: 'H3 — 48px', introduced: '1.1.0' },
        { name: '--text-h4',        value: '2.5rem',   description: 'H4 — 40px', introduced: '1.1.0' },
        { name: '--text-h5',        value: '2rem',     description: 'H5 — 32px', introduced: '1.1.0' },
        { name: '--text-h6',        value: '1.75rem',  description: 'H6 — 28px', introduced: '1.1.0' },
        { name: '--text-body-2xl',  value: '1.5rem',   description: 'Body 2XL — 24px', introduced: '1.1.0' },
        { name: '--text-body-xl',   value: '1.25rem',  description: 'Body XL — 20px', introduced: '1.1.0' },
        { name: '--text-body-lg',   value: '1.125rem', description: 'Body LG — 18px', introduced: '1.1.0' },
        { name: '--text-body',      value: '1rem',     description: 'Body — 16px (default)', introduced: '1.1.0' },
        { name: '--text-body-sm',   value: '0.875rem', description: 'Body SM — 14px', introduced: '1.1.0' },
        { name: '--text-body-xs',   value: '0.75rem',  description: 'Body XS — 12px', introduced: '1.1.0' },
        { name: '--text-body-2xs',  value: '0.6875rem',description: 'Body 2XS — 11px', introduced: '1.1.0' },
      ],
    },
    {
      id: 'primitive-subheading-sizes',
      label: 'Subheading Sizes',
      tokens: [
        { name: '--text-subheading-2xl', value: '1.5rem',    description: 'Subheading 2XL — 24px', introduced: '1.1.0' },
        { name: '--text-subheading-xl',  value: '1.25rem',   description: 'Subheading XL — 20px',  introduced: '1.1.0' },
        { name: '--text-subheading-lg',  value: '1.125rem',  description: 'Subheading LG — 18px',  introduced: '1.1.0' },
        { name: '--text-subheading',     value: '1rem',      description: 'Subheading — 16px',     introduced: '1.1.0' },
        { name: '--text-subheading-sm',  value: '0.875rem',  description: 'Subheading SM — 14px',  introduced: '1.1.0' },
        { name: '--text-subheading-xs',  value: '0.75rem',   description: 'Subheading XS — 12px',  introduced: '1.1.0' },
      ],
    },
    {
      id: 'primitive-font-weights',
      label: 'Font Weights',
      tokens: [
        { name: '--fw-bold',     value: '700', description: 'Bold weight', introduced: '1.1.0' },
        { name: '--fw-semibold', value: '600', description: 'Semi-bold weight', introduced: '1.1.0' },
        { name: '--fw-medium',   value: '500', description: 'Medium weight', introduced: '1.1.0' },
        { name: '--fw-regular',  value: '400', description: 'Regular weight', introduced: '1.1.0' },
      ],
    },
    {
      id: 'primitive-line-heights',
      label: 'Line Heights',
      tokens: [
        { name: '--lh-display',   value: '6rem',    description: 'Line height for Display — 96px', introduced: '1.1.0' },
        { name: '--lh-display-x', value: '7rem',    description: 'Line height for Display X — 112px', introduced: '1.1.0' },
        { name: '--lh-h1',        value: '4.75rem', description: 'Line height for H1 — 76px', introduced: '1.1.0' },
        { name: '--lh-h2',        value: '4.125rem',description: 'Line height for H2 — 66px', introduced: '1.1.0' },
        { name: '--lh-h3',        value: '3.625rem',description: 'Line height for H3 — 58px', introduced: '1.1.0' },
        { name: '--lh-h4',        value: '3rem',    description: 'Line height for H4 — 48px', introduced: '1.1.0' },
        { name: '--lh-h5',        value: '2.5rem',  description: 'Line height for H5 — 40px', introduced: '1.1.0' },
        { name: '--lh-h6',        value: '2rem',    description: 'Line height for H6 — 32px', introduced: '1.1.0' },
      ],
    },
    {
      id: 'primitive-letter-spacing',
      label: 'Letter Spacing',
      tokens: [
        { name: '--ls-display', value: '-0.0125em', description: 'Letter spacing for Display', introduced: '1.1.0' },
        { name: '--ls-h1',      value: '-0.013em',  description: 'Letter spacing for H1', introduced: '1.1.0' },
        { name: '--ls-h2',      value: '-0.011em',  description: 'Letter spacing for H2', introduced: '1.1.0' },
        { name: '--ls-h3',      value: '-0.0104em', description: 'Letter spacing for H3', introduced: '1.1.0' },
        { name: '--ls-h4',      value: '-0.01em',   description: 'Letter spacing for H4', introduced: '1.1.0' },
        { name: '--ls-h5',      value: '-0.0094em', description: 'Letter spacing for H5', introduced: '1.1.0' },
        { name: '--ls-h6',      value: '-0.0071em', description: 'Letter spacing for H6', introduced: '1.1.0' },
      ],
    },
  ],
};

export const primitiveSpacing: Section = {
  id: 'primitive-spacing',
  label: 'Primitive Spacing',
  subsections: [
    {
      id: 'primitive-spacing-named',
      label: 'Named scale',
      tokens: [
        { name: '--spacing-xs',  value: '0.25rem', description: 'Extra small — 4px',  introduced: '1.0.0' },
        { name: '--spacing-sm',  value: '0.5rem',  description: 'Small — 8px',         introduced: '1.0.0' },
        { name: '--spacing-md',  value: '1rem',    description: 'Medium — 16px',       introduced: '1.0.0' },
        { name: '--spacing-lg',  value: '1.5rem',  description: 'Large — 24px',        introduced: '1.0.0' },
        { name: '--spacing-xl',  value: '2rem',    description: 'Extra large — 32px',  introduced: '1.0.0' },
        { name: '--spacing-2xl', value: '3rem',    description: '2× extra large — 48px', introduced: '1.0.0' },
        { name: '--spacing-3xl', value: '4rem',    description: '3× extra large — 64px', introduced: '1.0.0' },
        { name: '--spacing-4xl', value: '6rem',    description: '4× extra large — 96px', introduced: '1.0.0' },
      ],
    },
    {
      id: 'primitive-spacing-numeric',
      label: 'Numeric scale (4px grid)',
      tokens: [
        { name: '--space-1',  value: '0',          description: '0px',   introduced: '1.1.0' },
        { name: '--space-2',  value: '0.0625rem',  description: '1px',   introduced: '1.1.0' },
        { name: '--space-3',  value: '0.125rem',   description: '2px',   introduced: '1.1.0' },
        { name: '--space-4',  value: '0.25rem',    description: '4px',   introduced: '1.1.0' },
        { name: '--space-5',  value: '0.375rem',   description: '6px',   introduced: '1.1.0' },
        { name: '--space-6',  value: '0.5rem',     description: '8px',   introduced: '1.1.0' },
        { name: '--space-7',  value: '0.625rem',   description: '10px',  introduced: '1.1.0' },
        { name: '--space-8',  value: '0.75rem',    description: '12px',  introduced: '1.1.0' },
        { name: '--space-9',  value: '0.875rem',   description: '14px',  introduced: '1.1.0' },
        { name: '--space-10', value: '1rem',        description: '16px',  introduced: '1.1.0' },
        { name: '--space-11', value: '1.25rem',    description: '20px',  introduced: '1.1.0' },
        { name: '--space-12', value: '1.5rem',     description: '24px',  introduced: '1.1.0' },
        { name: '--space-13', value: '1.75rem',    description: '28px',  introduced: '1.1.0' },
        { name: '--space-14', value: '2rem',       description: '32px',  introduced: '1.1.0' },
        { name: '--space-15', value: '2.25rem',    description: '36px',  introduced: '1.1.0' },
        { name: '--space-16', value: '2.5rem',     description: '40px',  introduced: '1.1.0' },
        { name: '--space-17', value: '3rem',       description: '48px',  introduced: '1.1.0' },
        { name: '--space-18', value: '3.5rem',     description: '56px',  introduced: '1.1.0' },
        { name: '--space-19', value: '4rem',       description: '64px',  introduced: '1.1.0' },
        { name: '--space-20', value: '4.5rem',     description: '72px',  introduced: '1.1.0' },
        { name: '--space-21', value: '5rem',       description: '80px',  introduced: '1.1.0' },
        { name: '--space-22', value: '5.5rem',     description: '88px',  introduced: '1.1.0' },
        { name: '--space-23', value: '6rem',       description: '96px',  introduced: '1.1.0' },
        { name: '--space-24', value: '6.5rem',     description: '104px', introduced: '1.1.0' },
        { name: '--space-25', value: '7rem',       description: '112px', introduced: '1.1.0' },
        { name: '--space-26', value: '8rem',       description: '128px', introduced: '1.1.0' },
        { name: '--space-27', value: '9rem',       description: '144px', introduced: '1.1.0' },
        { name: '--space-28', value: '10rem',      description: '160px', introduced: '1.1.0' },
        { name: '--space-29', value: '11rem',      description: '176px', introduced: '1.1.0' },
        { name: '--space-30', value: '12rem',      description: '192px', introduced: '1.1.0' },
        { name: '--space-31', value: '13rem',      description: '208px', introduced: '1.1.0' },
        { name: '--space-32', value: '15rem',      description: '240px', introduced: '1.1.0' },
        { name: '--space-33', value: '18rem',      description: '288px', introduced: '1.1.0' },
        { name: '--space-34', value: '20rem',      description: '320px', introduced: '1.1.0' },
        { name: '--space-35', value: '24rem',      description: '384px', introduced: '1.1.0' },
      ],
    },
  ],
};

export const primitiveSections: Section[] = [primitiveColors, primitiveRadius, primitiveTypography, primitiveSpacing];

// ─── Token sections ───────────────────────────────────────────────────────────

export const sections: Section[] = [
  {
    id: 'brand-theme',
    label: 'Brand Theme',
    subsections: [
      // ── Neutral ──────────────────────────────────────────────────────────
      {
        id: 'neutral-surface',
        label: 'Neutral / Surface',
        tokens: [
          { name: '--neutral-surface-disable',  value: '#e5e5e5', dark: '#2a2a2a',  description: 'Disabled neutral surface.', introduced: '1.1.0' },
          { name: '--neutral-surface-surface',  value: '#f4f4f4', dark: '#000000',  description: 'Default neutral page/card surface.', introduced: '1.1.0' },
          { name: '--neutral-surface-lighter',  value: '#d4d4d4', dark: '#111111',  description: 'Lighter neutral surface for elevated cards.', introduced: '1.1.0' },
          { name: '--neutral-surface-light',    value: '#737373', dark: '#1c1c1c',  description: 'Light neutral surface — medium emphasis.', introduced: '1.1.0' },
          { name: '--neutral-surface-default',  value: '#1a1a1a', dark: '#ffffff',  description: 'Default neutral fill (e.g. dark buttons on light bg).', introduced: '1.1.0' },
          { name: '--neutral-surface-dark',     value: '#404040', dark: '#a3a3a3',  description: 'Dark neutral surface.', introduced: '1.1.0' },
          { name: '--neutral-surface-darker',   value: '#404040', dark: '#6b6b6b',  description: 'Darker neutral surface for deep contrast.', introduced: '1.1.0' },
        ],
      },
      {
        id: 'neutral-text',
        label: 'Neutral / Text-Icon',
        tokens: [
          { name: '--neutral-text-on-color',  value: '#ffffff', dark: '#000000',  description: 'Text/icon on a filled neutral surface.', introduced: '1.1.0' },
          { name: '--neutral-text-disable',   value: '#a3a3a3', dark: '#404040',  description: 'Disabled neutral text.', introduced: '1.1.0' },
          { name: '--neutral-text-tertiary',  value: '#737373', dark: '#6b6b6b',  description: 'Tertiary neutral text — placeholders and timestamps.', introduced: '1.1.0' },
          { name: '--neutral-text-secondary', value: '#525252', dark: '#a3a3a3',  description: 'Secondary neutral text — descriptions and captions.', introduced: '1.1.0' },
          { name: '--neutral-text-primary',   value: '#1a1a1a', dark: '#ffffff',  description: 'Primary neutral text — headings and body.', introduced: '1.1.0' },
        ],
      },
      {
        id: 'neutral-divider',
        label: 'Neutral / Divider',
        tokens: [
          { name: '--neutral-divider-light',   value: '#e5e5e5', dark: '#1c1c1c', description: 'Light neutral divider line.', introduced: '1.1.0' },
          { name: '--neutral-divider-default', value: '#d4d4d4', dark: '#2a2a2a', description: 'Default neutral divider line.', introduced: '1.1.0' },
        ],
      },
      // ── Accent (Yellow) ──────────────────────────────────────────────────
      {
        id: 'accent-surface',
        label: 'Accent / Surface',
        tokens: [
          { name: '--accent-surface-disable',   value: '#fffde8', dark: '#3d3300', description: 'Disabled accent surface.', introduced: '1.1.0' },
          { name: '--accent-surface-surface',   value: '#fff8c0', dark: '#7a6600', description: 'Subtle accent fill for highlighted areas.', introduced: '1.1.0' },
          { name: '--accent-surface-light',     value: '#fff094', dark: '#b89900', description: 'Light accent surface.', introduced: '1.1.0' },
          { name: '--accent-surface-default',   value: '#ffde42', dark: '#ffde42', description: 'Default accent fill — brand yellow.', introduced: '1.1.0' },
          { name: '--accent-surface-dark',      value: '#7a6600', dark: '#fff8c0', description: 'Dark accent surface — inverted for dark mode.', introduced: '1.1.0' },
          { name: '--accent-surface-darker',    value: '#3d3300', dark: '#fffde8', description: 'Darkest accent surface.', introduced: '1.1.0' },
          { name: '--accent-surface-btn-hover', value: '#e6c200', dark: '#e6c200', description: 'Accent button hover state.', introduced: '1.1.0' },
        ],
      },
      {
        id: 'accent-text',
        label: 'Accent / Text-Icon',
        tokens: [
          { name: '--accent-text-disable',  value: '#fff094', dark: '#b89900', description: 'Disabled accent text.', introduced: '1.1.0' },
          { name: '--accent-text-default',  value: '#7a6600', dark: '#ffde42', description: 'Default accent text color.', introduced: '1.1.0' },
          { name: '--accent-text-on-color', value: '#000000', dark: '#000000', description: 'Text on a filled yellow accent surface — always black.', introduced: '1.1.0' },
        ],
      },
      {
        id: 'accent-divider',
        label: 'Accent / Divider',
        tokens: [
          { name: '--accent-divider-disable',  value: '#fff094', dark: '#b89900', description: 'Disabled accent divider.', introduced: '1.1.0' },
          { name: '--accent-divider-light',    value: '#fff8c0', dark: '#e6c200', description: 'Light accent divider.', introduced: '1.1.0' },
          { name: '--accent-divider-default',  value: '#ffde42', dark: '#ffde42', description: 'Default accent divider.', introduced: '1.1.0' },
          { name: '--accent-divider-on-color', value: '#000000', dark: '#000000', description: 'Divider on filled accent surface — always black.', introduced: '1.1.0' },
        ],
      },
      // ── Secondary (Pink) ─────────────────────────────────────────────────
      {
        id: 'secondary-surface',
        label: 'Secondary / Surface',
        tokens: [
          { name: '--secondary-surface-disable',  value: '#fde8ef', dark: '#440e23', description: 'Disabled secondary surface.', introduced: '1.1.0' },
          { name: '--secondary-surface-surface',  value: '#fbc5d8', dark: '#6e1839', description: 'Subtle secondary fill.', introduced: '1.1.0' },
          { name: '--secondary-surface-light',    value: '#f598bb', dark: '#9a2550', description: 'Light secondary surface.', introduced: '1.1.0' },
          { name: '--secondary-surface-default',  value: '#c43460', dark: '#e8336c', description: 'Default secondary fill — brand pink.', introduced: '1.1.0' },
          { name: '--secondary-surface-dark',     value: '#6e1839', dark: '#fbc5d8', description: 'Dark secondary surface.', introduced: '1.1.0' },
          { name: '--secondary-surface-darker',   value: '#440e23', dark: '#fde8ef', description: 'Darkest secondary surface.', introduced: '1.1.0' },
        ],
      },
      {
        id: 'secondary-text',
        label: 'Secondary / Text-Icon',
        tokens: [
          { name: '--secondary-text-on-color', value: '#ffffff', dark: '#ffffff', description: 'Text on a filled pink secondary surface — always white.', introduced: '1.1.0' },
          { name: '--secondary-text-disable',  value: '#f598bb', dark: '#9a2550', description: 'Disabled secondary text.', introduced: '1.1.0' },
          { name: '--secondary-text-default',  value: '#c43460', dark: '#e8336c', description: 'Default secondary text color.', introduced: '1.1.0' },
        ],
      },
      {
        id: 'secondary-divider',
        label: 'Secondary / Divider',
        tokens: [
          { name: '--secondary-divider-disable',  value: '#f598bb', dark: '#9a2550', description: 'Disabled secondary divider.', introduced: '1.1.0' },
          { name: '--secondary-divider-light',    value: '#fbc5d8', dark: '#6e1839', description: 'Light secondary divider.', introduced: '1.1.0' },
          { name: '--secondary-divider-default',  value: '#c43460', dark: '#e8336c', description: 'Default secondary divider.', introduced: '1.1.0' },
          { name: '--secondary-divider-on-color', value: '#ffffff', dark: '#ffffff', description: 'Divider on filled secondary surface — always white.', introduced: '1.1.0' },
        ],
      },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    subsections: [
      {
        id: 'status-danger',
        label: 'Danger',
        tokens: [
          { name: '--danger-surface', value: '#fef2f2', dark: 'rgba(199,0,10,0.12)', description: 'Danger background tint.', introduced: '1.1.0' },
          { name: '--danger-light',   value: '#fec8c8', dark: '#f87171',              description: 'Danger light fill or border.', introduced: '1.1.0' },
          { name: '--danger-default', value: '#c9000a', dark: '#f87171',              description: 'Danger default — error icons, borders, and text.', introduced: '1.1.0' },
          { name: '--danger-dark',    value: '#700005', dark: '#fca5a5',              description: 'Danger dark — for high-contrast danger text.', introduced: '1.1.0' },
        ],
      },
      {
        id: 'status-success',
        label: 'Success',
        tokens: [
          { name: '--success-surface', value: '#f0fdf4', dark: 'rgba(0,166,62,0.12)', description: 'Success background tint.', introduced: '1.1.0' },
          { name: '--success-light',   value: '#b9f8cf', dark: '#34d399',              description: 'Success light fill or border.', introduced: '1.1.0' },
          { name: '--success-default', value: '#00a63e', dark: '#34d399',              description: 'Success default — positive icons, borders, and text.', introduced: '1.1.0' },
          { name: '--success-dark',    value: '#0d542b', dark: '#6ee7b7',              description: 'Success dark — for high-contrast success text.', introduced: '1.1.0' },
        ],
      },
      {
        id: 'status-warning',
        label: 'Warning',
        tokens: [
          { name: '--warning-surface', value: '#fffae8', dark: 'rgba(225,113,0,0.12)', description: 'Warning background tint.', introduced: '1.1.0' },
          { name: '--warning-light',   value: '#fee685', dark: '#fbbf24',               description: 'Warning light fill or border.', introduced: '1.1.0' },
          { name: '--warning-default', value: '#e17100', dark: '#fbbf24',               description: 'Warning default — caution icons, borders, and text.', introduced: '1.1.0' },
          { name: '--warning-dark',    value: '#7b3306', dark: '#fde68a',               description: 'Warning dark — for high-contrast warning text.', introduced: '1.1.0' },
        ],
      },
      {
        id: 'status-aliases',
        label: 'Aliases',
        tokens: [
          { name: '--color-success', value: 'var(--green-600)', dark: 'var(--green-400)', description: 'Semantic success alias — maps to --success-default.', introduced: '1.0.0' },
          { name: '--color-warning', value: 'var(--amber-600)', dark: 'var(--amber-400)', description: 'Semantic warning alias — maps to --warning-default.', introduced: '1.0.0' },
          { name: '--color-error',   value: 'var(--red-600)', dark: 'var(--red-400)', description: 'Semantic error alias — maps to --danger-default.', introduced: '1.0.0' },
          { name: '--color-info',    value: '#0d52ff', dark: '#60a5fa', description: 'Semantic info alias — informational states and links.', introduced: '1.0.0' },
        ],
      },
    ],
  },
  {
    id: 'utility',
    label: 'Utility',
    tokens: [
      {
        name: '--transition-fast',
        value: '150ms cubic-bezier(0.4,0,0.2,1)',
        description: 'Quick transition for hover and focus state changes.',
        introduced: '1.0.0',
      },
      {
        name: '--transition-base',
        value: '300ms cubic-bezier(0.4,0,0.2,1)',
        description: 'Standard transition for most UI animations.',
        introduced: '1.0.0',
      },
      {
        name: '--transition-slow',
        value: '500ms cubic-bezier(0.4,0,0.2,1)',
        description: 'Deliberate, slower animation for emphasis.',
        introduced: '1.0.0',
      },
      {
        name: '--sidebar-width',
        value: '280px',
        description: 'Fixed width of the navigation sidebar.',
        introduced: '1.0.0',
      },
      {
        name: '--header-height',
        value: '70px',
        description: 'Fixed height of the top navigation header.',
        introduced: '1.0.0',
      },
      {
        name: '--container-max',
        value: '1200px',
        description: 'Maximum width of the main content container.',
        introduced: '1.0.0',
      },
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
