/**
 * ─── LAYERPROOF DESIGN SYSTEM CHANGELOG ───────────────────────────────────────
 *
 * This file tracks all non-token changes to the design system: new pages,
 * component additions, docs updates, bug fixes, and breaking changes.
 *
 * Token-level changes are recorded in tokens.ts `tokenChangelog`.
 * Both are combined on the "What's new" page.
 *
 * ── HOW TO ADD A RELEASE ────────────────────────────────────────────────────
 *
 *  1. Add a new entry at the TOP of the `releases` array.
 *  2. Set `version` to match the semver in tokens.ts.
 *  3. Add a short `summary` (1–2 sentences shown as the version headline).
 *  4. Add `changes` grouped by category (see ChangeCategory below).
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type ChangeCategory =
  | 'tokens'
  | 'components'
  | 'foundations'
  | 'docs'
  | 'breaking'
  | 'fix';

export type ReleaseChange = {
  category: ChangeCategory;
  description: string;
};

export type Release = {
  version: string;
  date: string;
  summary: string;
  changes: ReleaseChange[];
};

export const releases: Release[] = [
  // ── Add new releases at the TOP ──────────────────────────────────────────
  {
    version: '2.0.0',
    date: 'October 2026',
    summary: 'Rebrand: pink #FF589B replaces yellow as the accent, Mona Sans and Montserrat replace Anton and Roboto, and tokens now mirror the Figma UI kit (Semantic Color V2).',
    changes: [
      { category: 'breaking',    description: 'Accent changed from yellow to Pink 500 (#FF589B). Yellow remains a primitive but no semantic token uses it.' },
      { category: 'breaking',    description: 'Fonts: Mona Sans (display, headings), Montserrat (body, subheadings, labels), Courier Prime (code). Headings are no longer uppercase.' },
      { category: 'breaking',    description: 'Gray primitives renamed to match Figma (Gray 100–950). Old --gray-0 / --gray-50 kept as aliases.' },
      { category: 'tokens',      description: 'New semantic layer from Figma "Semantic Color V2": --background-*, --foreground-*, --border-*, --accent-*, --action-*, --status-*, plus button, tooltip-card and tabs tokens, all with light and dark values.' },
      { category: 'tokens',      description: 'Brand Theme tokens (--neutral-*, --accent-surface-*, --secondary-*, --danger-* …) and older site names (--color-*, --brand-*) kept as deprecated aliases of the V2 tokens.' },
      { category: 'tokens',      description: 'Added Orange (warning) and Cyan (info) scales; Red and Green now have full 50–950 scales.' },
      { category: 'tokens',      description: 'Type scale rebuilt from the Figma text styles, with .type-* utility classes for each style.' },
      { category: 'tokens',      description: 'Elevation: 39 shadow styles (neutral, accent, danger, success, warning) as --shadow-<family>-<level>, built from shadow colour tokens.' },
      { category: 'tokens',      description: 'Spacing gains the Figma Spacious mode via data-density="spacious"; numbered radius scale added.' },
      { category: 'foundations', description: 'Elevation page built out; Color, Accents, Palette, Typography and Cheat Sheet pages rewritten for the new brand.' },
      { category: 'fix',         description: 'Google Fonts import moved to the top of the stylesheet so web fonts actually load in production builds.' },
    ],
  },
  {
    version: '1.2.0',
    date: 'March 2026',
    summary: 'Hover-state tokens, new radius step, and WCAG AA contrast fixes for brand colors.',
    changes: [
      { category: 'tokens',      description: 'Added --color-border-hover for interactive element hover states.' },
      { category: 'tokens',      description: 'Added --color-surface-hover for card and list item hover states.' },
      { category: 'tokens',      description: 'Updated --brand-primary light-mode value to #c9a800 (WCAG AA on white).' },
      { category: 'tokens',      description: 'Added --radius-2xl for hero and feature section card containers.' },
      { category: 'foundations', description: 'Color page restructured into 4 sections: Accents, Color picker swatches, Data Visualization, Color palette.' },
      { category: 'foundations', description: 'Typography page restructured into Applying typography and App typefaces & scale.' },
      { category: 'foundations', description: 'Data Visualization section added to Color page with an 8-color categorical palette.' },
      { category: 'docs',        description: 'Design Tokens Explained page added under Foundations → Tokens.' },
      { category: 'docs',        description: 'Cheat Sheet page added under Get Started.' },
    ],
  },
  {
    version: '1.1.0',
    date: 'January 2026',
    summary: 'Expanded spacing scale, font switch to Roboto, and inverse text token for dark surfaces.',
    changes: [
      { category: 'tokens',      description: 'Added --spacing-3xl (4rem) and --spacing-4xl (6rem) for page-level layout rhythm.' },
      { category: 'tokens',      description: 'Changed --font-body from Inter to Roboto for broader language and weight coverage.' },
      { category: 'tokens',      description: 'Added --color-text-inverse for text on dark or colored surfaces.' },
      { category: 'foundations', description: 'All tokens page now loads from a single source-of-truth data file (tokens.ts).' },
      { category: 'foundations', description: 'Tokens page supports live search, tabs (All tokens / Code / Changelog), and per-token version tracking.' },
      { category: 'foundations', description: 'Font tokens now render a live preview column in the token table.' },
      { category: 'docs',        description: 'Workflow documentation added inside tokens.ts for adding, updating, and deprecating tokens.' },
    ],
  },
  {
    version: '1.0.0',
    date: 'November 2025',
    summary: 'Initial public release of the LayerProof Design System.',
    changes: [
      { category: 'foundations', description: 'Foundations: Color, Typography, Spacing, Grid, Iconography, Illustrations, Logos, Elevation.' },
      { category: 'foundations', description: 'Design tokens established: brand, color, font, spacing, radius, elevation, opacity, utility.' },
      { category: 'components',  description: 'Button component launched with Icon, Link, Link Icon, Split, Group, and Legacy variants.' },
      { category: 'docs',        description: 'Get started guides for Designers, Developers, and Brand teams.' },
      { category: 'tokens',      description: 'Initial token set: --brand-primary, --brand-secondary, --color-background, --color-surface, --font-heading, --font-body, --font-mono, --transition-base.' },
    ],
  },
];
