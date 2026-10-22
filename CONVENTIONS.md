# LayerProof Design System — Conventions

Contributor guide for the three most common tasks: adding components, tokens, and foundation pages.

---

## 1. Adding a new component

### Files to create
1. **Page:** `src/app/pages/components/<Name>Page.tsx`
   - Use `ComponentShell` as the page wrapper
   - For sub-variant pages (e.g. icon button), use `ComponentShell` with the variant name as the title
2. **Route:** add to `src/app/routes.ts`
3. **NavTree:** add entry to `src/app/components/NavTree.tsx` under the Components section

### Route convention
```
/components/<component-name>            ← main page
/components/<component-name>/<variant>  ← variant sub-pages
```

### NavTree entry shape
```ts
{
  label: 'Button',
  path: '/components/button',
  children: [
    { label: 'Icon button', path: '/components/button/icon' },
  ],
}
```

### After adding
- Add the component to `memory/component-registry.md` with status: **draft**
- Add all routes to `memory/page-tracker.md` with status: **stub** or **draft**

---

## 2. Adding a new design token

Figma ("LayerProof — UI Kit") is the source of truth. Token CSS and the token
registry are **generated** — don't hand-edit values in the generated files.

### Steps
1. **Add or change the variable in Figma.**
2. **Mirror it in `scripts/tokens/figma_data.py`** (primitives, `SEMANTIC`, shadows, type, radius or spacing).
3. **Regenerate:** `python3 scripts/tokens/gen_tokens.py` — rewrites
   `colors.css`, `brand-variables.css`, `shadows.css`, `typography.css`, `radius.css`,
   `spacing.css` and the sections of `src/app/data/tokens.ts`, and prints a contrast report.
4. **Changelog** — add entries to `tokenChangelog` in `src/app/data/tokens.ts` and to `src/app/data/changelog.ts`.

### Naming convention
- Primitives: `--<family>-<step>` e.g. `--pink-500`, `--gray-900`, `--space-10`, `--radius-md`
- Semantics: the Figma "Semantic Color V2" path with `/` → `-`, e.g.
  `background/surface` → `--background-surface`, `action/primary/background/hover` → `--action-primary-background-hover`
- Shadows: `--shadow-<family>-<level>` e.g. `--shadow-neutral-3`, `--shadow-accent-5`
- Text styles: `.type-<style>` classes e.g. `.type-h3`, `.type-body-sm`, `.type-label-md`
- Deprecated (still work, don't use in new code): `--color-*`, `--brand-*`, `--neutral-*`, `--accent-surface-*`, `--secondary-*`

### Rules
- Never hardcode hex or rem values in components — always use `var(--token-name)`.
- Use semantic tokens in UI; primitives are for the token files and documentation swatches.
- Every themed token is defined in both `:root, [data-theme="light"]` and `[data-theme="dark"]`.
- Spacing has two modes: Compact (default) and Spacious (`data-density="spacious"` on any element).

---

## 3. Adding a new foundation page

### Files to create
1. **Page:** `src/app/pages/foundations/<Name>Page.tsx`
   - Use `FoundationShell` as the wrapper (provides breadcrumb, h1, pink accent bar, description, ToC wiring)
2. **Route:** add to `src/app/routes.ts`
3. **NavTree:** add entry to `src/app/components/NavTree.tsx` under Foundations

### FoundationShell usage
```tsx
<FoundationShell
  title="Section Title"
  description="One or two sentences describing this section."
  breadcrumb="Foundations"
>
  {/* page content */}
</FoundationShell>
```

### After adding
- Update `memory/page-tracker.md` with the new route and status

---

## 4. CSS file import order

Order in `src/styles/index.css` — do not change without understanding the cascade:

```css
@import './fonts.css';          /* Google Fonts @import — must stay first */
@import './colors.css';         /* primitive color scale */
@import './radius.css';         /* primitive radius scale */
@import './typography.css';     /* primitive type scale */
@import './spacing.css';        /* primitive spacing scale */
@import './brand-variables.css';/* semantic tokens (references primitives via var()) */
@import './shadows.css';        /* elevation — Figma effect styles */
@import './components.css';     /* component-level styles */
@import 'tailwindcss';          /* Tailwind (reads custom properties) */
@import './theme.css';          /* theme overrides */
@import './animations.css';     /* keyframes and transition utilities */
```

**Rule:** Primitives must be imported before `brand-variables.css` because semantic tokens reference them via `var()`.

---

## 5. Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Page component | PascalCase + `Page` suffix | `ButtonIconPage` |
| Page file | matches component name | `ButtonIconPage.tsx` |
| Route segment | kebab-case | `/components/button/icon` |
| CSS primitive token | `--<family>-<step>` | `--pink-500`, `--space-10` |
| CSS semantic token | Figma V2 path, `/` → `-` | `--background-surface`, `--foreground-secondary` |
| TypeScript token key | camelCase | `colorBackground`, `textMuted` |

---

## 6. Docs-site UI

The site chrome and page building blocks follow the LayerProof app and the Figma style guide.

- **Styles:** `src/styles/site.css` (`lp-*` classes, tokens only). Radius hierarchy: panel 20 · card 12 · control 8–10 · chip full.
- **Blocks:** `src/app/components/docs.tsx` — `PageHeader`, `Section`, `Sub`, `Panel`, `Grid`, `Card`, `LinkCard`, `Stat`, `Chip`, `Tabs`, `Segmented`, `CodeBlock`, `DoDont`, `Callout`, `Rows`, `Stage`.
- **Pattern:** a section title + one-line description, then a gray `Panel` holding white `Card`s (or an outlined `Rows` list for tabular content).
- **Pink:** only for selection (nav, ToC), links, focus and primary actions. Headings are sentence case; no uppercase labels except the nav group labels, which mirror the app sidebar.
- **Icons:** Phosphor (`@phosphor-icons/react`).

