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

### Steps
1. **Primitive value** — add to the relevant CSS file in `src/styles/`:
   - Colors → `colors.css`
   - Spacing → `spacing.css`
   - Radius → `radius.css`
   - Typography → `typography.css`
2. **Semantic token** — add to `src/styles/brand-variables.css` inside the `:root` block (and `[data-theme="dark"]` if applicable)
3. **TypeScript types** — add to `src/app/tokens/tokens.ts`
4. **Changelog** — add an entry to `src/app/tokens/changelog.ts`
5. **Figma sync** — update the Figma token file if applicable

### Naming convention
- Primitives: `--<category>-<scale>` e.g. `--yellow-500`, `--space-10`, `--radius-md`
- Semantics: `--<domain>-<property>[-<variant>]` e.g. `--color-background`, `--brand-primary`, `--text-muted`

### Rule
Never hardcode hex or rem values in components — always use `var(--token-name)`.

---

## 3. Adding a new foundation page

### Files to create
1. **Page:** `src/app/pages/foundations/<Name>Page.tsx`
   - Use `FoundationShell` as the wrapper (provides breadcrumb, h1, yellow accent bar, description, ToC wiring)
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
@import './colors.css';         /* primitive color scale */
@import './radius.css';         /* primitive radius scale */
@import './typography.css';     /* primitive type scale */
@import './spacing.css';        /* primitive spacing scale */
@import './brand-variables.css';/* semantic tokens (references primitives via var()) */
@import './components.css';     /* component-level styles */
@import './fonts.css';          /* @font-face declarations */
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
| CSS primitive token | `--<category>-<scale>` | `--yellow-500`, `--space-10` |
| CSS semantic token | `--<domain>-<property>` | `--color-background`, `--text-muted` |
| TypeScript token key | camelCase | `colorBackground`, `textMuted` |
