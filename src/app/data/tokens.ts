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

// ─── Token sections ───────────────────────────────────────────────────────────

export const sections: Section[] = [
  // ─── Border ───────────────────────────────────────────────────────────────
  {
    id: 'border',
    label: 'Border',
    subsections: [
      {
        id: 'border-width',
        label: 'Width',
        tokens: [
          {
            name: '--border-width',
            value: '1px',
            description: 'The default width for all standard component borders and dividers.',
            introduced: '1.0.0',
          },
          {
            name: '--border-width-md',
            value: '2px',
            description: 'The width used to indicate a selected or focused element, such as an active tab or focus ring.',
            introduced: '1.0.0',
          },
        ],
      },
    ],
  },
  {
    id: 'color',
    label: 'Color',
    subsections: [
      {
        id: 'color-text',
        label: 'Text',
        tokens: [
          {
            name: '--color-text-primary',
            value: '#0a0a0a',
            dark: '#ffffff',
            description: 'The default color for all body text and headings.',
            introduced: '1.0.0',
          },
          {
            name: '--color-text-secondary',
            value: '#444444',
            dark: '#a3a3a3',
            description: 'Supporting or secondary text — used for descriptions, metadata, and captions.',
            introduced: '1.0.0',
          },
          {
            name: '--color-text-tertiary',
            value: '#767676',
            dark: '#6b6b6b',
            description: 'Tertiary text for placeholders, labels, and de-emphasized content.',
            introduced: '1.0.0',
          },
          {
            name: '--color-text-inverse',
            value: '#ffffff',
            dark: '#000000',
            description: 'Text placed on inverted or colored surfaces where the default color would be illegible.',
            introduced: '1.1.0',
          },
        ],
      },
      {
        id: 'color-link',
        label: 'Link',
        tokens: [
          {
            name: '--brand-primary',
            value: '#000000',
            dark: '#ffffff',
            description: 'Primary UI action color — black in light mode, white in dark mode. Use for buttons, active nav states, focus rings, and interactive chrome. Not for decorative accents.',
            introduced: '1.0.0',
          },
          {
            name: '--brand-secondary',
            value: '#c43460',
            dark: '#e8336c',
            description: 'Brand pink accent. Use sparingly for brand callouts, category badges, and highlight tags. Not for interactive UI chrome.',
            introduced: '1.0.0',
          },
          {
            name: '--brand-accent',
            value: '#FFDE42',
            dark: '#FFDE42',
            description: 'Brand yellow accent. Use for logo elements, decorative highlights, category badges, and brand-driven callouts. Not for interactive UI chrome.',
            introduced: '1.0.0',
          },
        ],
      },
      {
        id: 'color-icon',
        label: 'Icon',
        tokens: [
          {
            name: '--color-text-primary',
            value: '#0a0a0a',
            dark: '#ffffff',
            description: 'Use for icons that carry primary meaning alongside primary text.',
            introduced: '1.0.0',
          },
          {
            name: '--color-text-secondary',
            value: '#444444',
            dark: '#a3a3a3',
            description: 'Use for supporting icons alongside secondary text.',
            introduced: '1.0.0',
          },
          {
            name: '--color-text-tertiary',
            value: '#767676',
            dark: '#6b6b6b',
            description: 'Use for muted or disabled icon states.',
            introduced: '1.0.0',
          },
          {
            name: '--brand-primary',
            value: '#000000',
            dark: '#ffffff',
            description: 'Use for active-state icons that indicate selection or interaction.',
            introduced: '1.0.0',
          },
        ],
      },
      {
        id: 'color-border',
        label: 'Border',
        tokens: [
          {
            name: '--color-border',
            value: '#d4d4d4',
            dark: '#2a2a2a',
            description: 'Default border color for cards, inputs, dividers, and containers.',
            introduced: '1.0.0',
          },
          {
            name: '--color-border-hover',
            value: '#b5b5b5',
            dark: '#3d3d3d',
            description: 'Border color on hover or focus interactions.',
            introduced: '1.2.0',
          },
        ],
      },
      {
        id: 'color-background',
        label: 'Background',
        tokens: [
          {
            name: '--color-background',
            value: '#f5f5f5',
            dark: '#000000',
            description: 'The outermost page background color.',
            introduced: '1.0.0',
          },
          {
            name: '--color-surface',
            value: '#ffffff',
            dark: '#111111',
            description: 'Card and panel surface color, sitting one level above the page background.',
            introduced: '1.0.0',
          },
          {
            name: '--color-surface-hover',
            value: '#ebebeb',
            dark: '#1c1c1c',
            description: 'Surface background on hover — used for list items, nav rows, and interactive tiles.',
            introduced: '1.2.0',
          },
        ],
      },
      {
        id: 'color-blanket',
        label: 'Blanket',
        tokens: [
          {
            name: '--shadow-color',
            value: 'rgba(0,0,0,0.10)',
            dark: 'rgba(0,0,0,0.50)',
            description: 'Overlay color for light modal blankets and backdrops.',
            introduced: '1.0.0',
          },
          {
            name: '--shadow-color-md',
            value: 'rgba(0,0,0,0.15)',
            dark: 'rgba(0,0,0,0.65)',
            description: 'Medium-weight overlay for drawer and sheet backdrops.',
            introduced: '1.0.0',
          },
          {
            name: '--shadow-color-lg',
            value: 'rgba(0,0,0,0.20)',
            dark: 'rgba(0,0,0,0.80)',
            description: 'Heavy blanket for full-screen dialogs and blocking overlays.',
            introduced: '1.0.0',
          },
        ],
      },
      {
        id: 'color-interaction',
        label: 'Interaction',
        tokens: [
          {
            name: '--color-surface-hover',
            value: '#ebebeb',
            dark: '#1c1c1c',
            description: 'Background applied to interactive elements in their hover state.',
            introduced: '1.2.0',
          },
          {
            name: '--color-border-hover',
            value: '#b5b5b5',
            dark: '#3d3d3d',
            description: 'Border applied to interactive elements in their hover or focus state.',
            introduced: '1.2.0',
          },
          {
            name: '--brand-accent',
            value: '#FFDE42',
            dark: '#ffffff',
            description: 'Focus ring and active-state highlight color.',
            introduced: '1.0.0',
          },
        ],
      },
      {
        id: 'color-skeleton',
        label: 'Skeleton',
        tokens: [
          {
            name: '--color-surface',
            value: '#ffffff',
            dark: '#111111',
            description: 'Base layer color for skeleton loading placeholders.',
            introduced: '1.0.0',
          },
          {
            name: '--color-surface-hover',
            value: '#ebebeb',
            dark: '#1c1c1c',
            description: 'Shimmer layer color for animated skeleton loaders.',
            introduced: '1.2.0',
          },
        ],
      },
      {
        id: 'color-chart',
        label: 'Chart',
        tokens: [
          {
            name: '--brand-accent',
            value: '#FFDE42',
            dark: '#FFDE42',
            description: 'Primary data series color for charts and data visualizations — use brand yellow for the first series.',
            introduced: '1.0.0',
          },
          {
            name: '--brand-secondary',
            value: '#c43460',
            dark: '#e8336c',
            description: 'Secondary data series color.',
            introduced: '1.0.0',
          },
          {
            name: '--color-success',
            value: '#10b981',
            dark: '#34d399',
            description: 'Positive trend or success state in charts.',
            introduced: '1.0.0',
          },
          {
            name: '--color-warning',
            value: '#f59e0b',
            dark: '#fbbf24',
            description: 'Warning or caution data in charts.',
            introduced: '1.0.0',
          },
          {
            name: '--color-error',
            value: '#ef4444',
            dark: '#f87171',
            description: 'Negative trend or error state in charts.',
            introduced: '1.0.0',
          },
          {
            name: '--color-info',
            value: '#3b82f6',
            dark: '#60a5fa',
            description: 'Neutral or informational data series.',
            introduced: '1.0.0',
          },
        ],
      },
    ],
  },
  {
    id: 'elevation',
    label: 'Elevation',
    subsections: [
      {
        id: 'elevation-surface',
        label: 'Surface',
        tokens: [
          {
            name: '--color-background',
            value: '#f5f5f5',
            dark: '#000000',
            description: 'Base layer — the outermost page surface (z=0).',
            introduced: '1.0.0',
          },
          {
            name: '--color-surface',
            value: '#ffffff',
            dark: '#111111',
            description: 'Raised surface for cards, panels, and modals (z=1).',
            introduced: '1.0.0',
          },
          {
            name: '--color-surface-hover',
            value: '#ebebeb',
            dark: '#1c1c1c',
            description: 'Elevated surface on hover or interaction.',
            introduced: '1.2.0',
          },
        ],
      },
      {
        id: 'elevation-shadow',
        label: 'Shadow',
        tokens: [
          {
            name: '--shadow-sm',
            value: '0 1px 2px 0 var(--shadow-color)',
            description: 'Subtle lift for tags, badges, and inline elements.',
            introduced: '1.0.0',
          },
          {
            name: '--shadow-md',
            value: '0 4px 6px -1px var(--shadow-color-md)',
            description: 'Standard elevation for cards and dropdown menus.',
            introduced: '1.0.0',
          },
          {
            name: '--shadow-lg',
            value: '0 10px 15px -3px var(--shadow-color-md)',
            description: 'Raised elevation for floating panels and popovers.',
            introduced: '1.0.0',
          },
          {
            name: '--shadow-xl',
            value: '0 20px 25px -5px var(--shadow-color-md)',
            description: 'Maximum elevation for modals and full-page dialogs.',
            introduced: '1.0.0',
          },
        ],
      },
    ],
  },
  {
    id: 'font',
    label: 'Font',
    subsections: [
      {
        id: 'font-heading',
        label: 'Heading',
        tokens: [
          {
            name: '--font-heading + --text-5xl',
            value: '3rem',
            description: 'Display / hero heading. Use for the largest on-page title, typically one per screen.',
            cssNote: 'Token is applied using CSS font-family + font-size. Use a bare <h1> tag — theme.css handles Anton + uppercase automatically.',
            introduced: '1.0.0',
            preview: 'Heading XXL',
            previewStyle: { fontFamily: 'var(--font-heading)', fontSize: '3rem', textTransform: 'uppercase', lineHeight: 1.1, color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-heading + --text-4xl',
            value: '2.25rem',
            description: 'h1 — primary page heading. Use for the main title of a page or view.',
            cssNote: 'Token is applied using CSS font-family + font-size. Bare <h1> tag applies this automatically via theme.css.',
            introduced: '1.0.0',
            preview: 'Heading XL',
            previewStyle: { fontFamily: 'var(--font-heading)', fontSize: '2.25rem', textTransform: 'uppercase', lineHeight: 1.15, color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-heading + --text-3xl',
            value: '1.875rem',
            description: 'h2 — section heading. Use for major sections within a page.',
            cssNote: 'Token is applied using CSS font-family + font-size. Bare <h2> tag applies this automatically via theme.css.',
            introduced: '1.0.0',
            preview: 'Heading L',
            previewStyle: { fontFamily: 'var(--font-heading)', fontSize: '1.875rem', textTransform: 'uppercase', lineHeight: 1.2, color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-heading + --text-2xl',
            value: '1.5rem',
            description: 'h3 — sub-section heading. Use for grouped content within a section.',
            cssNote: 'Token is applied using CSS font-family + font-size. Bare <h3> tag applies this automatically via theme.css.',
            introduced: '1.0.0',
            preview: 'Heading M',
            previewStyle: { fontFamily: 'var(--font-heading)', fontSize: '1.5rem', textTransform: 'uppercase', lineHeight: 1.2, color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-heading + --text-xl',
            value: '1.25rem',
            description: 'h4 — minor heading. Use for card titles and compact component headers.',
            cssNote: 'Token is applied using CSS font-family + font-size. Bare <h4> tag applies this automatically via theme.css.',
            introduced: '1.0.0',
            preview: 'Heading S',
            previewStyle: { fontFamily: 'var(--font-heading)', fontSize: '1.25rem', textTransform: 'uppercase', lineHeight: 1.3, color: 'var(--color-text-primary)' },
          },
        ],
      },
      {
        id: 'font-body',
        label: 'Body',
        tokens: [
          {
            name: '--font-body + --text-lg',
            value: '1.125rem',
            description: 'Large body text. Use for lead paragraphs directly below a heading.',
            cssNote: 'Token is applied using CSS font-family + font-size. Do not use for headings.',
            introduced: '1.0.0',
            preview: 'Large body text for lead paragraphs.',
            previewStyle: { fontFamily: 'var(--font-body)', fontSize: '1.125rem', lineHeight: 1.6, color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-body + --text-base',
            value: '1rem',
            description: 'Default body text. Use for all standard prose, descriptions, and form labels.',
            cssNote: 'This is the browser default — no font-size override needed in most cases.',
            introduced: '1.0.0',
            preview: 'Default body text for descriptions and labels.',
            previewStyle: { fontFamily: 'var(--font-body)', fontSize: '1rem', lineHeight: 1.6, color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-body + --text-sm',
            value: '0.875rem',
            description: 'Small body text. Use for supporting content, helper text, and secondary information.',
            cssNote: 'Token is applied using CSS font-family + font-size.',
            introduced: '1.0.0',
            preview: 'Small body text for supporting content.',
            previewStyle: { fontFamily: 'var(--font-body)', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-body + --text-xs',
            value: '0.75rem',
            description: 'Extra small text. Use for captions, timestamps, and metadata.',
            cssNote: 'Use sparingly — only for truly supplemental content.',
            introduced: '1.0.0',
            preview: 'Extra small text for captions and metadata.',
            previewStyle: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', lineHeight: 1.6, color: 'var(--color-text-primary)' },
          },
        ],
      },
      {
        id: 'font-metric',
        label: 'Metric',
        tokens: [
          {
            name: '--font-heading + --text-5xl',
            value: '3rem',
            description: 'Large KPI or primary metric. Use for hero stats and dashboard key numbers.',
            cssNote: 'Token is applied using CSS font-family + font-size. Pair with a small label in --font-body --text-xs.',
            introduced: '1.0.0',
            preview: '24,601',
            previewStyle: { fontFamily: 'var(--font-heading)', fontSize: '3rem', lineHeight: 1, color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-heading + --text-3xl',
            value: '1.875rem',
            description: 'Medium metric. Use for secondary stats and supporting KPIs.',
            cssNote: 'Token is applied using CSS font-family + font-size.',
            introduced: '1.0.0',
            preview: '1,337',
            previewStyle: { fontFamily: 'var(--font-heading)', fontSize: '1.875rem', lineHeight: 1, color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-heading + --text-xl',
            value: '1.25rem',
            description: 'Small metric. Use for compact stat rows and table-level metrics.',
            cssNote: 'Token is applied using CSS font-family + font-size.',
            introduced: '1.0.0',
            preview: '99.9%',
            previewStyle: { fontFamily: 'var(--font-heading)', fontSize: '1.25rem', lineHeight: 1, color: 'var(--color-text-primary)' },
          },
        ],
      },
      {
        id: 'font-code',
        label: 'Code',
        tokens: [
          {
            name: '--font-mono + --text-sm',
            value: '0.875rem',
            description: 'Code block text. Use for multi-line code samples and terminal output.',
            cssNote: 'Token is applied using CSS font-family + font-size inside <pre> or <code> elements.',
            introduced: '1.0.0',
            preview: 'const primary = var(--brand-primary);',
            previewStyle: { fontFamily: 'var(--font-mono)', fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-mono + --text-xs',
            value: '0.75rem',
            description: 'Inline code. Use for token names and prop values inline with body text.',
            cssNote: 'Token is applied using CSS font-family + font-size inside an inline <code> element.',
            introduced: '1.0.0',
            preview: '--color-text-primary',
            previewStyle: { fontFamily: 'var(--font-mono)', fontSize: '0.75rem', background: 'var(--color-surface-hover)', padding: '0.125rem 0.375rem', borderRadius: '0.25rem', display: 'inline-block', color: 'var(--color-text-primary)' },
          },
        ],
      },
      {
        id: 'font-weight',
        label: 'Weight',
        tokens: [
          {
            name: 'font-weight: 400',
            value: 'Regular',
            description: 'Default weight for body text and descriptions.',
            introduced: '1.0.0',
            preview: 'The quick brown fox jumps over the lazy dog',
            previewStyle: { fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: 400, color: 'var(--color-text-primary)' },
          },
          {
            name: 'font-weight: 500',
            value: 'Medium',
            description: 'Emphasized body text, button labels, and form elements.',
            introduced: '1.0.0',
            preview: 'The quick brown fox jumps over the lazy dog',
            previewStyle: { fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: 500, color: 'var(--color-text-primary)' },
          },
          {
            name: 'font-weight: 600',
            value: 'Semibold',
            description: 'Subheadings and label hierarchies.',
            introduced: '1.0.0',
            preview: 'The quick brown fox jumps over the lazy dog',
            previewStyle: { fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-primary)' },
          },
          {
            name: 'font-weight: 700',
            value: 'Bold',
            description: 'Headings and brand wordmarks.',
            introduced: '1.0.0',
            preview: 'The quick brown fox jumps over the lazy dog',
            previewStyle: { fontFamily: 'var(--font-body)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' },
          },
        ],
      },
      {
        id: 'font-family',
        label: 'Family',
        tokens: [
          {
            name: '--font-heading',
            value: '"Anton", Impact, sans-serif',
            description: 'Display and heading typeface. Anton is the primary brand font for all titles.',
            introduced: '1.0.0',
            preview: 'Anton — Display Heading',
            previewStyle: { fontFamily: 'var(--font-heading)', fontSize: '1.5rem', textTransform: 'uppercase', color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-body',
            value: '"Roboto", sans-serif',
            description: 'Body copy typeface. Roboto is used for all prose, labels, and UI text.',
            introduced: '1.0.0',
            preview: 'Roboto — Body copy and labels',
            previewStyle: { fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-text-primary)' },
          },
          {
            name: '--font-mono',
            value: '"Monaco", "Courier New", monospace',
            description: 'Monospace typeface for code blocks and technical strings.',
            introduced: '1.0.0',
            preview: 'Monaco — const token = true;',
            previewStyle: { fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--color-text-primary)' },
          },
        ],
      },
    ],
  },
  {
    id: 'opacity',
    label: 'Opacity',
    tokens: [
      {
        name: 'opacity: 0.08',
        value: '8%',
        description: 'Tinted fills used for badge and tag backgrounds.',
        introduced: '1.0.0',
      },
      {
        name: 'opacity: 0.26',
        value: '26%',
        description: 'Disabled state for interactive elements.',
        introduced: '1.0.0',
      },
      {
        name: 'opacity: 0.50',
        value: '50%',
        description: 'Subdued overlay for modal blankets.',
        introduced: '1.0.0',
      },
      {
        name: 'opacity: 0.70',
        value: '70%',
        description: 'Hover dimming for image overlays.',
        introduced: '1.0.0',
      },
      {
        name: 'opacity: 1.00',
        value: '100%',
        description: 'Full visibility — the default state.',
        introduced: '1.0.0',
      },
    ],
  },
  {
    id: 'radius',
    label: 'Radius',
    tokens: [
      {
        name: '--radius-sm',
        value: '0.375rem',
        description: 'Small border radius for badges and chips.',
        introduced: '1.0.0',
      },
      {
        name: '--radius-md',
        value: '0.5rem',
        description: 'Default radius for buttons and inputs.',
        introduced: '1.0.0',
      },
      {
        name: '--radius-lg',
        value: '0.75rem',
        description: 'Card and panel radius.',
        introduced: '1.0.0',
      },
      {
        name: '--radius-xl',
        value: '1rem',
        description: 'Large card and container radius.',
        introduced: '1.0.0',
      },
      {
        name: '--radius-2xl',
        value: '1.5rem',
        description: 'Extra-large radius for feature sections and hero elements.',
        introduced: '1.2.0',
      },
      {
        name: '--radius-full',
        value: '9999px',
        description: 'Fully rounded radius for pills, avatars, and circular elements.',
        introduced: '1.0.0',
      },
    ],
  },
  {
    id: 'space',
    label: 'Space',
    tokens: [
      {
        name: '--spacing-xs',
        value: '0.25rem',
        description: '4px — tight gaps between inline elements and icon padding.',
        introduced: '1.0.0',
      },
      {
        name: '--spacing-sm',
        value: '0.5rem',
        description: '8px — small gaps between compact elements.',
        introduced: '1.0.0',
      },
      {
        name: '--spacing-md',
        value: '1rem',
        description: '16px — default component padding and gaps.',
        introduced: '1.0.0',
      },
      {
        name: '--spacing-lg',
        value: '1.5rem',
        description: '24px — spacing between related sections.',
        introduced: '1.0.0',
      },
      {
        name: '--spacing-xl',
        value: '2rem',
        description: '32px — large component and layout gaps.',
        introduced: '1.0.0',
      },
      {
        name: '--spacing-2xl',
        value: '3rem',
        description: '48px — section padding and major layout breaks.',
        introduced: '1.0.0',
      },
      {
        name: '--spacing-3xl',
        value: '4rem',
        description: '64px — large section spacing for breathing room.',
        introduced: '1.1.0',
      },
      {
        name: '--spacing-4xl',
        value: '6rem',
        description: '96px — page-level vertical rhythm and hero padding.',
        introduced: '1.1.0',
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
