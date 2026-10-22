# Values transcribed from Figma file OKTvGTGy5kujRdbbqNlHkn (LayerProof — UI Kit),
# collections: Color, Semantic Color V2, Brand Theme, Typography, Radius, Spacing,
# plus local effect styles. Pulled 2026-10-21.

PRIMITIVES = {
  "Base/White": "#ffffff",
  "Gray/100": "#f5f5f5", "Gray/200": "#e5e5e5", "Gray/300": "#d4d4d4", "Gray/400": "#a3a3a3",
  "Gray/500": "#737373", "Gray/550": "#6b6b6b", "Gray/600": "#525252", "Gray/700": "#1c1c1c",
  "Gray/800": "#2a2a2a", "Gray/850": "#1c1c1c", "Gray/900": "#1a1a1a", "Gray/910": "#111111",
  "Gray/950": "#000000",
  "Pink/50": "#fef4f7", "Pink/100": "#fde8ef", "Pink/200": "#fbc5d8", "Pink/300": "#f598bb",
  "Pink/400": "#ef6994", "Pink/500": "#ff589b", "Pink/600": "#c43460", "Pink/700": "#9a2550",
  "Pink/800": "#6e1839", "Pink/900": "#440e23", "Pink/950": "#290b17",
  "Yellow/50": "#fef9d0", "Yellow/100": "#fffde8", "Yellow/200": "#fff8c0", "Yellow/300": "#fff094",
  "Yellow/400": "#ffe860", "Yellow/500": "#ffde42", "Yellow/600": "#e6c200", "Yellow/700": "#b89900",
  "Yellow/800": "#7a6600", "Yellow/900": "#3d3300", "Yellow/950": "#3d3000",
  "Orange/50": "#fff8f2", "Orange/100": "#fff0e5", "Orange/200": "#ffd9bf", "Orange/300": "#ffbd8f",
  "Orange/400": "#ffa866", "Orange/500": "#ff9945", "Orange/600": "#e87a2f", "Orange/700": "#c65b20",
  "Orange/800": "#9d4218", "Orange/900": "#742e12", "Orange/950": "#431709",
  "Red/50": "#fef2f2", "Red/100": "#fee2e2", "Red/200": "#fec8c8", "Red/300": "#fca5a5",
  "Red/400": "#f87171", "Red/500": "#e7000b", "Red/600": "#c9000a", "Red/700": "#a60008",
  "Red/800": "#850006", "Red/900": "#700005", "Red/950": "#4f0004",
  "Green/50": "#f0fdf4", "Green/100": "#dcfce7", "Green/200": "#b9f8cf", "Green/300": "#7bf1a8",
  "Green/400": "#05df72", "Green/500": "#00c950", "Green/600": "#00a63e", "Green/700": "#008236",
  "Green/800": "#016630", "Green/900": "#0d542b", "Green/950": "#032e15",
  "Cyan/50": "#ebfffe", "Cyan/100": "#cdffff", "Cyan/200": "#a2fcff", "Cyan/300": "#62f7fe",
  "Cyan/400": "#1be8f5", "Cyan/500": "#00cbdb", "Cyan/600": "#02aec6", "Cyan/700": "#098195",
  "Cyan/800": "#126778", "Cyan/900": "#135566", "Cyan/950": "#063946",
}

PRIMITIVE_NOTES = {
  "Base/White": "Pure white base used by semantic aliases. Do not bind directly in product UI.",
  "Pink/500": "Brand accent — LayerProof pink.",
  "Pink/50": "Pale pink extension, quieter than Pink 100. For faint accent surfaces.",
  "Pink/950": "Deep pink extension. For faint accent surfaces in dark mode.",
  "Orange/100": "Approved brand Orange anchor.", "Orange/200": "Approved brand Orange anchor.",
  "Orange/300": "Approved brand Orange anchor.", "Orange/400": "Approved brand Orange anchor.",
  "Orange/500": "Approved brand Orange anchor.",
  "Gray/700": "Same value as Gray 850 in Figma (#1c1c1c), so the scale is not strictly ordered between 700 and 800.",
  "Yellow/500": "Former brand accent. Kept as a primitive; no semantic token uses yellow any more.",
}

# (name, light, dark, description). Refs: "Family/Step" = primitive, "a/b/c" = semantic.
SEMANTIC = [
  # Background
  ("background/canvas", "Base/White", "Gray/900", "Main application canvas. Neutral background 1 of 8."),
  ("background/surface", "Gray/100", "Gray/850", "Standard cards and panels. Neutral background 2 of 8."),
  ("background/surface-raised", "Base/White", "Gray/800", "Elevated popovers, menus and dialogs. Neutral background 3 of 8."),
  ("background/subtle", "Gray/100", "Gray/800", "Quiet fills and low-emphasis grouping. Neutral background 4 of 8."),
  ("background/muted", "Gray/200", "Gray/600", "More visible neutral fill above subtle. Neutral background 5 of 8."),
  ("background/strong", "Gray/500", "Gray/850", "High-emphasis neutral fill; validate the foreground pairing. Neutral background 6 of 8."),
  ("background/disabled", "Gray/100", "Gray/850", "Inactive-control background; pair with foreground-disabled. Neutral background 7 of 8."),
  ("background/inverse", "Gray/900", "Gray/100", "Deliberately inverted region, not a substitute for switching theme. Neutral background 8 of 8."),
  # Foreground
  ("foreground/primary", "Gray/900", "Gray/100", "Primary text and monochrome icons."),
  ("foreground/secondary", "Gray/600", "Gray/400", "Supporting text and icons."),
  ("foreground/tertiary", "Gray/500", "Gray/500", "Metadata and low-emphasis content."),
  ("foreground/placeholder", "Gray/500", "Gray/500", "Input placeholder content."),
  ("foreground/disabled", "Gray/400", "Gray/600", "Disabled text and icons."),
  ("foreground/inverse", "Base/White", "Gray/900", "Content placed on inverse backgrounds."),
  ("foreground/on-image/dark", "Gray/900", "Gray/900", "Fixed dark text over light imagery. Same in both modes; validate contrast over the actual image."),
  ("foreground/on-image/dark-secondary", "Gray/600", "Gray/600", "Fixed supporting text over light imagery. Add a scrim if small text fails contrast."),
  ("foreground/on-image/light", "Base/White", "Base/White", "Fixed light text over dark imagery. Use a scrim on variable imagery."),
  # Border
  ("border/subtle", "Gray/200", "Gray/800", "Quiet dividers and subtle separation."),
  ("border/default", "Gray/300", "Gray/700", "Default control, card and input borders."),
  ("border/medium", "Gray/400", "Gray/600", "Medium-emphasis boundaries."),
  ("border/strong", "Gray/500", "Gray/500", "High-emphasis boundaries."),
  ("border/disabled", "Gray/200", "Gray/800", "Disabled control borders."),
  ("border/focus", "Pink/500", "Pink/400", "Keyboard focus boundary."),
  # Accent
  ("accent/background/default", "Pink/500", "Pink/500", "Primary brand surface; reserve for meaningful emphasis."),
  ("accent/background/hover", "Pink/600", "Pink/400", "Hovered accent surface."),
  ("accent/background/pressed", "Pink/700", "Pink/300", "Pressed accent surface."),
  ("accent/background/subtle", "Pink/100", "Pink/900", "Quiet branded surface."),
  ("accent/background/selected", "Pink/200", "Pink/800", "Selected item background."),
  ("accent/background/faint", "Pink/50", "Pink/950", "Lowest-emphasis branded background for metric cards and quiet accent regions. Not for text or icons."),
  ("accent/foreground/default", "Pink/700", "Pink/300", "Accessible links, accent text and accent icons."),
  ("accent/foreground/brand", "Pink/500", "Pink/500", "Signature brand-coloured text and icons for emphasised metrics. Validate contrast; use accent-foreground-default for general links."),
  ("accent/foreground/on-accent", "Gray/900", "Gray/900", "Text and icons placed on Pink 500."),
  ("accent/border/default", "Pink/500", "Pink/400", "Accent outline and selected boundary."),
  ("accent/focus-ring", "Pink/500", "Pink/400", "Brand focus ring."),
  # Action — primary
  ("action/primary/background/default", "accent/background/default", "accent/background/default", "Primary action default background."),
  ("action/primary/background/hover", "accent/background/hover", "accent/background/hover", "Primary action hover background."),
  ("action/primary/background/pressed", "accent/background/pressed", "accent/background/pressed", "Primary action pressed background."),
  ("action/primary/background/disabled", "background/disabled", "background/disabled", "Primary action disabled background."),
  ("action/primary/foreground", "accent/foreground/on-accent", "accent/foreground/on-accent", "Primary action label and icon."),
  ("action/primary/foreground-disabled", "foreground/disabled", "foreground/disabled", "Disabled primary action label and icon."),
  ("action/primary/focus", "accent/focus-ring", "accent/focus-ring", "Primary action focus indicator."),
  # Action — secondary
  ("action/secondary/background/default", "background/surface", "background/surface", "Secondary action default background."),
  ("action/secondary/background/hover", "background/subtle", "background/subtle", "Secondary action hover background."),
  ("action/secondary/background/selected", "background/subtle", "background/subtle", "Persistent neutral selection, such as the current sidebar destination. Distinct from transient hover."),
  ("action/secondary/foreground", "foreground/primary", "foreground/primary", "Secondary action label and icon."),
  ("action/secondary/border", "border/default", "border/default", "Secondary action border."),
  ("action/secondary/focus", "accent/focus-ring", "accent/focus-ring", "Secondary action focus indicator."),
  # Action — tertiary
  ("action/tertiary/foreground/default", "foreground/primary", "foreground/primary", "Tertiary action default label and icon."),
  ("action/tertiary/foreground/hover", "accent/foreground/default", "accent/foreground/default", "Tertiary action hover label and icon."),
  ("action/tertiary/background/hover", "background/subtle", "background/subtle", "Tertiary action hover background."),
  ("action/tertiary/focus", "accent/focus-ring", "accent/focus-ring", "Tertiary action focus indicator."),
  # Action — neutral / danger
  ("action/neutral/background/default", "Gray/900", "Base/White", "Neutral primary action default background."),
  ("action/neutral/background/hover", "Gray/700", "Gray/400", "Neutral primary action hover background."),
  ("action/neutral/background/pressed", "Gray/800", "Gray/550", "Neutral primary action pressed background."),
  ("action/danger/background/default", "Red/600", "Red/400", "Destructive action default background."),
  ("action/danger/background/hover", "Red/700", "Red/300", "Destructive action hover background."),
  ("action/danger/background/pressed", "Red/800", "Red/200", "Destructive action pressed background."),
  # Status
  ("status/danger/background", "Red/50", "Red/950", "Danger and error message background."),
  ("status/danger/background-strong", "Red/700", "Red/300", "High-emphasis danger background."),
  ("status/danger/foreground", "Red/700", "Red/300", "Danger and error text."),
  ("status/danger/border", "Red/200", "Red/800", "Danger and error boundary."),
  ("status/danger/icon", "Red/600", "Red/400", "Danger and error icon."),
  ("status/success/background", "Green/50", "Green/950", "Success message background."),
  ("status/success/background-strong", "Green/700", "Green/300", "High-emphasis success background."),
  ("status/success/foreground", "Green/700", "Green/300", "Success text."),
  ("status/success/border", "Green/200", "Green/800", "Success boundary."),
  ("status/success/icon", "Green/600", "Green/400", "Success icon."),
  ("status/warning/background", "Orange/50", "Orange/950", "Warning message background."),
  ("status/warning/background-strong", "Orange/800", "Orange/300", "High-emphasis warning background."),
  ("status/warning/foreground", "Orange/800", "Orange/300", "Warning text."),
  ("status/warning/border", "Orange/200", "Orange/700", "Warning boundary."),
  ("status/warning/icon", "Orange/600", "Orange/400", "Warning icon."),
  ("status/info/background", "Cyan/50", "Cyan/950", "Informational message background."),
  ("status/info/background-strong", "Cyan/800", "Cyan/300", "High-emphasis informational background. Pair with foreground-inverse."),
  ("status/info/foreground", "Cyan/800", "Cyan/300", "Informational text."),
  ("status/info/border", "Cyan/200", "Cyan/800", "Informational boundary."),
  ("status/info/icon", "Cyan/600", "Cyan/400", "Informational icon."),
  # Component — button
  ("button/accent/primary/foreground", "Base/White", "Base/White", "Text and icons on accent primary buttons. White by explicit brand decision (see contrast note)."),
  ("button/danger/primary/background/default", "action/danger/background/default", "action/danger/background/default", "Primary danger button default background."),
  ("button/danger/primary/background/hover", "action/danger/background/hover", "action/danger/background/hover", "Primary danger button hover and loading background."),
  ("button/danger/primary/background/disabled", "background/disabled", "background/disabled", "Primary danger button disabled background."),
  ("button/danger/primary/foreground", "foreground/inverse", "foreground/inverse", "Primary danger button text and icon."),
  ("button/danger/secondary/background/default", "status/danger/background", "status/danger/background", "Secondary danger button default background."),
  ("button/danger/secondary/background/hover", "status/danger/border", "status/danger/border", "Secondary danger button hover background."),
  ("button/danger/secondary/foreground", "status/danger/foreground", "status/danger/foreground", "Secondary danger button text and icon."),
  ("button/danger/tertiary/background/hover", "status/danger/background", "status/danger/background", "Tertiary danger button hover background."),
  ("button/danger/tertiary/foreground", "status/danger/foreground", "status/danger/foreground", "Tertiary danger button text and icon."),
  ("button/danger/outline/background/hover", "status/danger/background", "status/danger/background", "Outline danger button hover background."),
  ("button/danger/outline/foreground", "status/danger/foreground", "status/danger/foreground", "Outline danger button text and icon."),
  ("button/danger/border", "status/danger/border", "status/danger/border", "Danger button border and focus ring."),
  ("button/danger/foreground/disabled", "foreground/disabled", "foreground/disabled", "Disabled danger button text and icon."),
  ("button/danger/border/disabled", "border/disabled", "border/disabled", "Disabled danger button border."),
  # Component — tooltip card
  ("tooltip-card/background", "background/surface", "background/surface", "Tooltip Card surface."),
  ("tooltip-card/border", "border/subtle", "border/subtle", "Tooltip Card outline and tail boundary."),
  ("tooltip-card/title", "foreground/primary", "foreground/primary", "Tooltip Card title."),
  ("tooltip-card/body", "foreground/secondary", "foreground/secondary", "Tooltip Card supporting body."),
  ("tooltip-card/action/dismiss", "accent/foreground/default", "accent/foreground/default", "Tooltip Card dismiss action."),
  ("tooltip-card/action/secondary", "foreground/secondary", "foreground/secondary", "Tooltip Card secondary action."),
  ("tooltip-card/placeholder", "background/disabled", "background/disabled", "Tooltip Card placeholder media surface."),
  ("tooltip-card/progress/active", "accent/background/default", "accent/background/default", "Tooltip Card active progress indicator."),
  ("tooltip-card/progress/inactive", "foreground/disabled", "foreground/disabled", "Tooltip Card inactive progress indicator."),
  # Component — tabs
  ("tabs/background/selected", "background/surface-raised", "background/muted", "Neutral selected tab background, brighter than the rail. Persistent selection, not hover."),
]

# Shadow colours: (name, primitive, alpha, description)
SHADOW_COLORS = [
  ("shadow/neutral/soft", "Gray/950", 0.04, "Gray 950 at 4%."),
  ("shadow/neutral/strong", "Gray/950", 0.09, "Gray 950 at 9%."),
  ("shadow/accent/soft", "Pink/500", 0.08, "Pink 500 at 8%."),
  ("shadow/accent/strong", "Pink/500", 0.12, "Pink 500 at 12%."),
  ("shadow/accent/glow", "Pink/500", 1.0, "Pink 500 at 100%."),
  ("shadow/danger/soft", "Red/500", 0.08, "Red 500 at 8%."),
  ("shadow/danger/strong", "Red/500", 0.12, "Red 500 at 12%."),
  ("shadow/success/soft", "Green/500", 0.08, "Green 500 at 8%."),
  ("shadow/success/strong", "Green/500", 0.12, "Green 500 at 12%."),
  ("shadow/warning/soft", "Orange/500", 0.08, "Orange 500 at 8%."),
  ("shadow/warning/strong", "Orange/500", 0.12, "Orange 500 at 12%."),
  ("shadow/highlight", "Base/White", 0.5, "Inner highlight, white at 50%."),
  ("shadow/highlight-strong", "Base/White", 0.6, "Inner highlight, white at 60%."),
]

# Effect styles: name -> list of (inset, x, y, blur, spread, colour-token)
_L = {
  1: [(0,0,0,2,0,"strong")],
  2: [(0,0,2,4,0,"strong"), (0,0,0,2,0,"soft")],
  3: [(0,0,3,8,0,"strong"), (0,0,0,4,0,"soft")],
  4: [(0,0,6,12,0,"strong"), (0,0,0,6,0,"soft")],
  5: [(0,0,8,16,0,"strong"), (0,0,0,6,0,"soft")],
  6: [(0,0,12,20,0,"strong"), (0,0,0,12,0,"soft")],
  7: [(0,0,16,32,4,"strong"), (0,0,0,16,4,"soft"), (0,0,0,60,0,"soft")],
}
EFFECTS = []
# Neutral levels differ slightly from the tinted families at levels 2-4 and 7 (exact from Figma).
_NEUTRAL = {
  1: [(0,0,0,2,0,"shadow/neutral/strong")],
  2: [(0,0,2,4,0,"shadow/neutral/soft"), (0,0,0,2,0,"shadow/neutral/strong")],
  3: [(0,0,3,8,0,"shadow/neutral/strong"), (0,0,0,2,0,"shadow/neutral/soft")],
  4: [(0,0,6,12,0,"shadow/neutral/strong"), (0,0,0,2,0,"shadow/neutral/soft")],
  5: [(0,0,8,16,0,"shadow/neutral/strong"), (0,0,0,6,0,"shadow/neutral/soft")],
  6: [(0,0,12,20,0,"shadow/neutral/strong"), (0,0,0,12,0,"shadow/neutral/soft")],
  7: [(0,0,16,32,4,"shadow/neutral/strong"), (0,0,0,16,4,"shadow/neutral/soft"), (0,0,16,60,0,"shadow/neutral/soft")],
}
for lvl, layers in _NEUTRAL.items():
  EFFECTS.append((f"neutral/{lvl}", layers))
EFFECTS.append(("neutral/elevated-button", [(0,0,3,6,0,"shadow/neutral/soft"), (0,0,0,4,0,"shadow/neutral/strong"), (0,0,2,3,0,"shadow/neutral/soft")]))
EFFECTS.append(("neutral/gradient-button", [(0,0,2,6,1,"shadow/neutral/strong"), (0,0,0,4,0,"shadow/neutral/strong"), (1,0,0,10,0,"shadow/highlight"), (0,0,1,2,0,"shadow/neutral/strong")]))
for fam in ["accent", "danger", "success", "warning"]:
  for lvl, layers in _L.items():
    if fam == "accent" and lvl == 1:
      pass
    EFFECTS.append((f"{fam}/{lvl}", [(i,x,y,b,s,f"shadow/{fam}/{t}") for (i,x,y,b,s,t) in layers]))
EFFECTS.append(("accent/gradient-button", [(0,0,2,4,0,"shadow/neutral/strong"), (0,0,2,4,0,"shadow/neutral/strong"), (0,0,0,0,2,"shadow/accent/glow")]))
EFFECTS.append(("danger/button", [(0,0,2,6,1,"shadow/danger/strong"), (0,0,0,4,0,"shadow/danger/strong"), (1,0,0,10,0,"shadow/highlight-strong"), (0,0,1,2,0,"shadow/danger/strong")]))

# Deprecated Brand Theme aliases, exactly as Figma maps them (repo token name -> light, dark).
BRAND_THEME = [
  ("--neutral-surface-disable", "background/disabled", "background/disabled"),
  ("--neutral-surface-surface", "background/subtle", "background/subtle"),
  ("--neutral-surface-lighter", "Gray/200", "Gray/800"),
  ("--neutral-surface-light", "Gray/500", "Gray/850"),
  ("--neutral-surface-default", "Gray/900", "Base/White"),
  ("--neutral-surface-dark", "Gray/700", "Gray/400"),
  ("--neutral-surface-darker", "Gray/700", "Gray/550"),
  ("--neutral-text-on-color", "foreground/inverse", "foreground/inverse"),
  ("--neutral-text-disable", "foreground/disabled", "foreground/disabled"),
  ("--neutral-text-tertiary", "foreground/tertiary", "foreground/tertiary"),
  ("--neutral-text-secondary", "foreground/secondary", "foreground/secondary"),
  ("--neutral-text-primary", "foreground/primary", "foreground/primary"),
  ("--neutral-text-button", "action/primary/foreground", "action/primary/foreground"),
  ("--neutral-divider-light", "border/subtle", "border/subtle"),
  ("--neutral-divider-default", "border/default", "border/default"),
  ("--accent-surface-disable", "background/disabled", "background/disabled"),
  ("--accent-surface-surface", "accent/background/subtle", "accent/background/subtle"),
  ("--accent-surface-light", "accent/background/selected", "accent/background/selected"),
  ("--accent-surface-default", "accent/background/default", "accent/background/default"),
  ("--accent-surface-dark", "accent/background/hover", "accent/background/hover"),
  ("--accent-surface-darker", "accent/background/pressed", "accent/background/pressed"),
  ("--accent-surface-btn-hover", "action/primary/background/hover", "action/primary/background/hover"),
  ("--accent-text-disable", "foreground/disabled", "foreground/disabled"),
  ("--accent-text-default", "accent/foreground/default", "accent/foreground/default"),
  ("--accent-text-on-color", "accent/foreground/on-accent", "accent/foreground/on-accent"),
  ("--accent-divider-disable", "border/disabled", "border/disabled"),
  ("--accent-divider-light", "accent/border/default", "accent/border/default"),
  ("--accent-divider-default", "accent/border/default", "accent/border/default"),
  ("--accent-divider-on-color", "accent/border/default", "accent/border/default"),
  ("--secondary-surface-disable", "background/disabled", "background/disabled"),
  ("--secondary-surface-surface", "accent/background/subtle", "accent/background/subtle"),
  ("--secondary-surface-light", "accent/background/selected", "accent/background/selected"),
  ("--secondary-surface-default", "accent/background/default", "accent/background/default"),
  ("--secondary-surface-dark", "accent/background/hover", "accent/background/hover"),
  ("--secondary-surface-darker", "accent/background/pressed", "accent/background/pressed"),
  ("--secondary-text-default", "accent/foreground/default", "accent/foreground/default"),
  ("--secondary-text-on-color", "accent/foreground/on-accent", "accent/foreground/on-accent"),
  ("--secondary-text-disable", "foreground/disabled", "foreground/disabled"),
  ("--secondary-divider-default", "accent/border/default", "accent/border/default"),
  ("--secondary-divider-light", "accent/border/default", "accent/border/default"),
  ("--secondary-divider-disable", "border/disabled", "border/disabled"),
  ("--secondary-divider-on-color", "accent/border/default", "accent/border/default"),
  ("--danger-surface", "status/danger/background", "status/danger/background"),
  ("--danger-light", "Red/200", "Red/400"),
  ("--danger-default", "Red/500", "Red/500"),
  ("--danger-dark", "Red/900", "Red/300"),
  ("--success-surface", "status/success/background", "status/success/background"),
  ("--success-light", "Green/200", "#34d399"),
  ("--success-default", "Green/600", "#34d399"),
  ("--success-dark", "Green/900", "#6ee7b7"),
  ("--warning-surface", "status/warning/background", "status/warning/background"),
  ("--warning-light", "status/warning/border", "status/warning/border"),
  ("--warning-default", "status/warning/icon", "status/warning/icon"),
  ("--warning-dark", "status/warning/foreground", "status/warning/foreground"),
]

# Older site-level names (not in Figma) kept working, pointed at the new semantics.
LEGACY_SITE = [
  ("--brand-primary", "action/neutral/background/default", "action/neutral/background/default", "Neutral primary (black on light, white on dark)."),
  ("--brand-secondary", "accent/background/default", "accent/background/default", "Brand pink."),
  ("--brand-accent", "accent/background/default", "accent/background/default", "Was yellow; the accent is now pink."),
  ("--color-background", "background/canvas", "background/canvas", ""),
  ("--color-surface", "background/surface", "background/surface", ""),
  ("--color-surface-hover", "background/muted", "background/surface-raised", ""),
  ("--color-border", "border/subtle", "border/subtle", ""),
  ("--color-border-hover", "border/default", "border/default", ""),
  ("--color-text-primary", "foreground/primary", "foreground/primary", ""),
  ("--color-text-secondary", "foreground/secondary", "foreground/secondary", ""),
  ("--color-text-tertiary", "foreground/tertiary", "foreground/tertiary", ""),
  ("--color-text-inverse", "foreground/inverse", "foreground/inverse", ""),
  ("--color-success", "status/success/icon", "status/success/icon", ""),
  ("--color-warning", "status/warning/icon", "status/warning/icon", ""),
  ("--color-error", "status/danger/icon", "status/danger/icon", ""),
  ("--color-info", "status/info/icon", "status/info/icon", ""),
]

TYPE = {
  "families": [
    ("--font-display", '"Mona Sans", system-ui, sans-serif', "Display text — Mona Sans."),
    ("--font-heading", '"Mona Sans", system-ui, sans-serif', "Headings — Mona Sans."),
    ("--font-subheading", '"Montserrat", system-ui, sans-serif', "Subheadings — Montserrat."),
    ("--font-body", '"Montserrat", system-ui, sans-serif', "Body copy — Montserrat."),
    ("--font-label", '"Montserrat", system-ui, sans-serif', "Labels and UI text — Montserrat."),
    ("--font-doc", '"Montserrat", system-ui, sans-serif', "Long-form documents — Montserrat."),
    ("--font-mono", '"Courier Prime", "Courier New", monospace', "Code, token names — Courier Prime."),
    ("--font-heading-alt", '"Roboto", system-ui, sans-serif', "Optional alternative heading face — Roboto."),
  ],
  # (style key, family var, size px, line px, letter px, weight)
  "styles": [
    ("display-l", "display", 72, 76, -1, 700), ("display-m", "display", 56, 60, -1, 700),
    ("h1", "heading", 48, 56, -0.8, 700), ("h2", "heading", 40, 48, -0.6, 700),
    ("h3", "heading", 36, 44, -0.5, 700), ("h4", "heading", 32, 40, -0.4, 700),
    ("h5", "heading", 28, 36, -0.3, 700), ("h6", "heading", 24, 32, -0.2, 700),
    ("subheading-lg", "subheading", 20, 28, -0.1, 600), ("subheading-md", "subheading", 18, 28, -0.1, 600),
    ("subheading-sm", "subheading", 16, 24, -0.1, 600),
    ("label-xl", "label", 18, 28, -0.14, 600), ("label-lg", "label", 16, 24, -0.14, 600),
    ("label-md", "label", 14, 20, -0.12, 600), ("label-sm", "label", 12, 16, -0.14, 600),
    ("label-xs", "label", 11, 15, -0.12, 600),
    ("body-2xl", "body", 24, 36, -0.14, 500), ("body-xl", "body", 20, 30, -0.14, 500),
    ("body-lg", "body", 18, 28, -0.14, 500), ("body", "body", 16, 24, -0.14, 500),
    ("body-sm", "body", 14, 20, -0.12, 500), ("body-xs", "body", 12, 18, -0.1, 500),
    ("body-2xs", "body", 11, 16, 0, 500),
  ],
}

# Named radius (Spacing > Radius) and numbered radius (Radius collection)
RADIUS_NAMED = [("none",0),("xsm",2),("sm",4),("md",6),("lg",8),("xl",12),("2xl",16),("3xl",20),("4xl",24),("5xl",30),("full",1000)]
RADIUS_NUM = [(1,0),(2,2),(3,4),(4,6),(5,8),(6,10),(7,12),(8,16),(9,20),(10,24),(11,30)]

# space-N: (compact, spacious)
SPACING = {1:(0,0),2:(1,2),3:(2,4),4:(4,6),5:(6,8),6:(8,10),7:(10,12),8:(12,16),9:(14,18),10:(16,20),
  11:(20,24),12:(24,28),13:(28,32),14:(32,36),15:(36,40),16:(40,48),17:(48,56),18:(56,64),19:(64,72),
  20:(72,80),21:(80,88),22:(88,96),23:(96,104),24:(104,112),25:(112,128),26:(128,144),27:(144,160),
  28:(160,176),29:(176,192),30:(192,208),31:(208,240),32:(240,288),33:(288,320),34:(320,384),35:(384,420)}
