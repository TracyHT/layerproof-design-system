"""Regenerate LayerProof design tokens from scripts/tokens/figma_data.py.

    python3 scripts/tokens/gen_tokens.py

Writes src/styles/{colors,brand-variables,shadows,typography,radius,spacing}.css
and the token sections of src/app/data/tokens.ts (between the
"Primitive sections" and "Changelog" markers), then prints a contrast report.
"""
import sys, re, json, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from figma_data import *

ROOT = sys.argv[1] if len(sys.argv) > 1 else os.path.abspath(os.path.join(HERE, "..", ".."))
STY = f"{ROOT}/src/styles"
VERSION = "2.0.0"

def prim_var(ref):  # "Gray/900" -> --gray-900
    fam, step = ref.split("/")
    return f"--{fam.lower()}-{step.lower()}"

def sem_var(ref):  # "accent/background/default" -> --accent-background-default
    return "--" + ref.replace("/", "-")

SEM_NAMES = {s[0] for s in SEMANTIC}

def ref_css(ref):
    if ref.startswith("#"): return ref
    if ref in PRIMITIVES: return f"var({prim_var(ref)})"
    if ref in SEM_NAMES: return f"var({sem_var(ref)})"
    raise KeyError(ref)

SEM = {s[0]: s for s in SEMANTIC}
def resolve(ref, mode):
    if ref.startswith("#"): return ref
    if ref in PRIMITIVES: return PRIMITIVES[ref]
    s = SEM[ref]
    return resolve(s[1] if mode == "light" else s[2], mode)

def hex_rgb(h):
    h = h.lstrip("#"); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def rem(px):
    if px == 0: return "0"
    v = px / 16
    return f"{v:g}rem"

def px(v):
    return "0" if v == 0 else f"{v:g}px"

HEADER = "/* Generated from the Figma file “LayerProof — UI Kit” (variables + styles).\n   Source of truth is Figma; regenerate rather than hand-editing values. */\n"

# ── colors.css ───────────────────────────────────────────────────────────────
fams = []
for k in PRIMITIVES:
    f = k.split("/")[0]
    if f not in fams: fams.append(f)
out = [HEADER, ":root {", "  /* Constants */", "  --color-white: #ffffff;", "  --color-black: #000000;"]
for f in fams:
    out.append(f"\n  /* {f} */")
    for k, v in PRIMITIVES.items():
        if k.startswith(f + "/"):
            note = PRIMITIVE_NOTES.get(k)
            out.append(f"  {prim_var(k)}: {v};" + (f" /* {note} */" if note else ""))
out.append("\n  /* Legacy primitives — not in Figma any more; kept so old references still resolve */")
out.append("  --gray-0: var(--base-white);")
out.append("  --gray-50: var(--gray-100);")
for step, ref in [(50,"Orange/50"),(200,"Orange/200"),(400,"Orange/400"),(600,"Orange/600"),(900,"Orange/900")]:
    out.append(f"  --amber-{step}: var({prim_var(ref)}); /* amber was replaced by orange for warnings */")
out.append("}\n")
open(f"{STY}/colors.css", "w").write("\n".join(out))

# ── brand-variables.css ──────────────────────────────────────────────────────
def themed_block(mode):
    L = []
    L.append("  /* ── Semantic Color V2 ─────────────────────────────────────── */")
    group = None
    for name, light, dark, desc in SEMANTIC:
        g = name.split("/")[0]
        if g != group:
            L.append(f"\n  /* {g} */"); group = g
        L.append(f"  {sem_var(name)}: {ref_css(light if mode=='light' else dark)};")
    L.append("\n  /* shadow colours */")
    for name, ref, a, desc in SHADOW_COLORS:
        r, g_, b = hex_rgb(PRIMITIVES[ref])
        L.append(f"  {sem_var(name)}: rgb({r} {g_} {b} / {a:g});")
    L.append("\n  /* ── Brand Theme (deprecated aliases — mirrors Figma “Brand Theme”) ── */")
    for name, light, dark in BRAND_THEME:
        L.append(f"  {name}: {ref_css(light if mode=='light' else dark)};")
    L.append("\n  /* ── Older site-level names (deprecated — use the V2 tokens above) ── */")
    for name, light, dark, desc in LEGACY_SITE:
        L.append(f"  {name}: {ref_css(light if mode=='light' else dark)};" + (f" /* {desc} */" if desc else ""))
    return "\n".join(L)

bv = [HEADER, """/**
 * Semantic tokens. Components use these, never primitives.
 *
 * Naming follows Figma “Semantic Color V2”: the variable path with “/” → “-”
 *   background/surface          → --background-surface
 *   action/primary/background/hover → --action-primary-background-hover
 *
 * Every themed token is declared in BOTH blocks below, so a nested
 * [data-theme] region re-resolves the whole chain correctly.
 */
""", ':root,\n[data-theme="light"] {', "  color-scheme: light;", themed_block("light"), "}\n",
      '[data-theme="dark"] {', "  color-scheme: dark;", themed_block("dark"), "}\n",
      """:root {
  /* ── Shadows (legacy names — use --shadow-neutral-* from shadows.css) ── */
  --shadow-sm: var(--shadow-neutral-2);
  --shadow-md: var(--shadow-neutral-3);
  --shadow-lg: var(--shadow-neutral-5);
  --shadow-xl: var(--shadow-neutral-7);

  /* ── Transitions ── */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);

  /* ── Layout ── */
  --sidebar-width: 280px;
  --header-height: 70px;
  --container-max: 1200px;
}
"""]
open(f"{STY}/brand-variables.css", "w").write("\n".join(bv))

# ── shadows.css ──────────────────────────────────────────────────────────────
def eff_css(layers):
    parts = []
    for inset, x, y, b, s, tok in layers:
        parts.append(("inset " if inset else "") + f"{px(x)} {px(y)} {px(b)} {px(s)} var({sem_var(tok)})")
    return ",\n    ".join(parts)
sh = [HEADER, "/* Elevation — one variable per Figma effect style (Shadows/<Family>/<Level>). */", ":root {"]
fam = None
for name, layers in EFFECTS:
    f = name.split("/")[0]
    if f != fam:
        sh.append(f"\n  /* {f} */"); fam = f
    key = name.replace("/", "-")
    sh.append(f"  --shadow-{key}:\n    {eff_css(layers)};")
sh.append("}\n")
open(f"{STY}/shadows.css", "w").write("\n".join(sh))

# ── typography.css ───────────────────────────────────────────────────────────
ty = [HEADER, ":root {", "  /* Font families */"]
for n, v, d in TYPE["families"]:
    ty.append(f"  {n}: {v};")
ty.append("\n  /* Font weights */")
ty += ["  --fw-regular:  400;", "  --fw-medium:   500;", "  --fw-semibold: 600;", "  --fw-bold:     700;"]
for label, attr in [("Font sizes", "text"), ("Line heights", "lh"), ("Letter spacing", "ls")]:
    ty.append(f"\n  /* {label} */")
    for key, famv, size, lh, ls, w in TYPE["styles"]:
        val = {"text": rem(size), "lh": rem(lh), "ls": px(ls)}[attr]
        ty.append(f"  --{attr}-{key}: {val};" + (f" /* {size}px */" if attr == "text" else (f" /* {lh}px */" if attr == "lh" else "")))
ty.append("""
  /* Legacy aliases (kept so older pages keep working) */
  --text-display:   var(--text-display-m);
  --text-display-x: var(--text-display-l);
  --lh-display:     var(--lh-display-m);
  --lh-display-x:   var(--lh-display-l);
  --ls-display-x:   var(--ls-display-l);
  --ls-display:     var(--ls-display-m);
  --text-subheading: var(--text-subheading-sm);
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;
  --text-5xl:  3rem;
}

/* Text styles — one class per Figma text style */""")
for key, famv, size, lh, ls, w in TYPE["styles"]:
    ty.append(f".type-{key} {{ font-family: var(--font-{famv}); font-size: var(--text-{key}); line-height: var(--lh-{key}); letter-spacing: var(--ls-{key}); font-weight: {w}; }}")
ty.append("")
open(f"{STY}/typography.css", "w").write("\n".join(ty))

# ── radius.css ───────────────────────────────────────────────────────────────
ra = [HEADER, ":root {", "  /* Named scale (Figma: Spacing › Radius) */"]
for n, v in RADIUS_NAMED:
    ra.append(f"  --radius-{n}: {('1000px' if n=='full' else rem(v))};" + ("" if n == "full" else f" /* {v}px */"))
ra.append("\n  /* Numbered scale (Figma: Radius collection) */")
for n, v in RADIUS_NUM:
    ra.append(f"  --radius-{n}: {rem(v)}; /* {v}px */")
ra.append("}\n")
open(f"{STY}/radius.css", "w").write("\n".join(ra))

# ── spacing.css ──────────────────────────────────────────────────────────────
sp = [HEADER, "/* Figma “Spacing” has two modes. Compact is the default;",
      "   put data-density=\"spacious\" on any element to switch a region. */", "", ":root {",
      "  /* Named scale (site-level shorthands) */",
      "  --spacing-xs:  0.25rem;  /*  4px */", "  --spacing-sm:  0.5rem;   /*  8px */",
      "  --spacing-md:  1rem;     /* 16px */", "  --spacing-lg:  1.5rem;   /* 24px */",
      "  --spacing-xl:  2rem;     /* 32px */", "  --spacing-2xl: 3rem;     /* 48px */",
      "  --spacing-3xl: 4rem;     /* 64px */", "  --spacing-4xl: 6rem;     /* 96px */", "",
      "  /* Numeric scale — Compact mode */"]
for n, (c, s) in SPACING.items():
    sp.append(f"  --space-{n}: {rem(c)}; /* {c}px */")
sp.append("}\n\n[data-density=\"spacious\"] {\n  /* Numeric scale — Spacious mode */")
for n, (c, s) in SPACING.items():
    sp.append(f"  --space-{n}: {rem(s)}; /* {s}px */")
sp.append("}\n\n[data-density=\"compact\"] {")
for n, (c, s) in SPACING.items():
    sp.append(f"  --space-{n}: {rem(c)};")
sp.append("}\n")
open(f"{STY}/spacing.css", "w").write("\n".join(sp))

# ── tokens.ts sections ───────────────────────────────────────────────────────
def q(s): return json.dumps(s, ensure_ascii=False)
_prev = open(f"{ROOT}/src/app/data/tokens.ts").read()
INTRODUCED = {m.group(1): m.group(2) for m in re.finditer(r"name: ['\"](--[\w-]+)['\"][^}]*?introduced: ['\"]([\d.]+)['\"]", _prev)}
def tok(name, value, desc, dark=None, introduced=VERSION, extra=""):
    introduced = INTRODUCED.get(name, introduced)
    d = f", dark: {q(dark)}" if dark and dark != value else ""
    return f"        {{ name: {q(name)}, value: {q(value)}{d}, description: {q(desc)}, introduced: {q(introduced)}{extra} }},"

def ts_section(const, sid, label, subs, export_type="Section"):
    L = [f"export const {const}: Section = {{", f"  id: {q(sid)},", f"  label: {q(label)},", "  subsections: ["]
    for subid, sublabel, toks in subs:
        L += ["    {", f"      id: {q(subid)},", f"      label: {q(sublabel)},", "      tokens: ["] + toks + ["      ],", "    },"]
    L += ["  ],", "};", ""]
    return "\n".join(L)

TS = ["// ─── Primitive sections ───────────────────────────────────────────────────────", ""]
subs = [("primitive-base", "Base", [
    tok("--color-white", "#ffffff", "Pure white constant.", introduced="1.0.0"),
    tok("--color-black", "#000000", "Pure black constant.", introduced="1.0.0"),
    tok("--base-white", "#ffffff", PRIMITIVE_NOTES["Base/White"]),
])]
for f in fams:
    if f == "Base": continue
    toks = []
    for k, v in PRIMITIVES.items():
        if k.startswith(f + "/"):
            step = k.split("/")[1]
            toks.append(tok(prim_var(k), v, f"{f} {step}" + (f" — {PRIMITIVE_NOTES[k]}" if k in PRIMITIVE_NOTES else "")))
    label = {"Red": "Red (Danger)", "Green": "Green (Success)", "Orange": "Orange (Warning)", "Cyan": "Cyan (Info)", "Pink": "Pink (Accent)"}.get(f, f)
    subs.append((f"primitive-{f.lower()}", label, toks))
TS.append(ts_section("primitiveColors", "primitive-colors", "Primitive Colors", subs))

subs = [("primitive-radius-scale", "Named scale", [tok(f"--radius-{n}", "1000px" if n=="full" else rem(v), "Full / pill radius" if n=="full" else f"{v}px") for n, v in RADIUS_NAMED]),
        ("primitive-radius-numbered", "Numbered scale", [tok(f"--radius-{n}", rem(v), f"Radius-{n} — {v}px") for n, v in RADIUS_NUM])]
TS.append(ts_section("primitiveRadius", "primitive-radius", "Primitive Radius", subs))

fam_toks = [tok(n, v, d, extra=", cssNote: 'Use font-family'") for n, v, d in TYPE["families"]]
size_toks, lh_toks, ls_toks = [], [], []
pretty = lambda k: k.replace("-", " ").replace("lg", "Large").replace("md", "Medium").replace("sm", "Small").replace("xs", "X Small").replace("xl", "X Large").title().replace("H1","H1")
for key, famv, size, lh, ls, w in TYPE["styles"]:
    size_toks.append(tok(f"--text-{key}", rem(size), f"{key} — {size}px"))
    lh_toks.append(tok(f"--lh-{key}", rem(lh), f"Line height for {key} — {lh}px"))
    ls_toks.append(tok(f"--ls-{key}", px(ls), f"Letter spacing for {key}"))
weight_toks = [tok("--fw-bold", "700", "Bold — display and headings", introduced="1.1.0"), tok("--fw-semibold", "600", "Semi Bold — subheadings and labels", introduced="1.1.0"),
               tok("--fw-medium", "500", "Medium — body text", introduced="1.1.0"), tok("--fw-regular", "400", "Regular", introduced="1.1.0")]
TS.append(ts_section("primitiveTypography", "primitive-typography", "Primitive Typography", [
    ("primitive-font-families", "Font Families", fam_toks), ("primitive-font-sizes", "Font Sizes", size_toks),
    ("primitive-font-weights", "Font Weights", weight_toks), ("primitive-line-heights", "Line Heights", lh_toks),
    ("primitive-letter-spacing", "Letter Spacing", ls_toks)]))

named = [("xs","0.25rem","4px"),("sm","0.5rem","8px"),("md","1rem","16px"),("lg","1.5rem","24px"),("xl","2rem","32px"),("2xl","3rem","48px"),("3xl","4rem","64px"),("4xl","6rem","96px")]
TS.append(ts_section("primitiveSpacing", "primitive-spacing", "Primitive Spacing", [
    ("primitive-spacing-named", "Named scale", [tok(f"--spacing-{n}", v, d, introduced="1.0.0") for n, v, d in named]),
    ("primitive-spacing-numeric", "Numeric scale (Compact · Spacious)", [tok(f"--space-{n}", rem(c), f"{c}px compact · {s}px spacious") for n, (c, s) in SPACING.items()]),
]))
TS.append("export const primitiveSections: Section[] = [primitiveColors, primitiveRadius, primitiveTypography, primitiveSpacing];\n")

TS.append("// ─── Token sections ───────────────────────────────────────────────────────────\n")
TS.append("export const sections: Section[] = [")
groups = {}
order = []
for name, light, dark, desc in SEMANTIC:
    parts = name.split("/")
    g = parts[0]
    sub = "/".join(parts[:2]) if g in ("accent", "action", "status", "button", "foreground") and len(parts) > 2 else g
    if g in ("button", "tooltip-card", "tabs"): sub = g
    groups.setdefault(sub, []).append((name, light, dark, desc))
    if sub not in order: order.append(sub)
def sec(sid, label, subs):
    L = ["  {", f"    id: {q(sid)},", f"    label: {q(label)},", "    subsections: ["]
    for subid, sublabel, toks in subs:
        L += ["      {", f"        id: {q(subid)},", f"        label: {q(sublabel)},", "        tokens: ["] + ["  " + t for t in toks] + ["        ],", "      },"]
    L += ["    ],", "  },"]
    return "\n".join(L)
title = lambda s: " / ".join(w.replace("-", " ").title() for w in s.split("/"))
core = [o for o in order if o.split("/")[0] in ("background", "foreground", "border", "accent")]
act = [o for o in order if o.startswith("action")]
stat = [o for o in order if o.startswith("status")]
comp = [o for o in order if o.split("/")[0] in ("button", "tooltip-card", "tabs")]
def subs_for(keys):
    res = []
    for k in keys:
        toks = [tok(sem_var(n), resolve(l, "light"), d, dark=resolve(dk, "dark")) for n, l, dk, d in groups[k]]
        res.append((k.replace("/", "-"), title(k), toks))
    return res
TS.append(sec("color", "Color", subs_for(core)))
TS.append(sec("action", "Action", subs_for(act)))
TS.append(sec("status", "Status", subs_for(stat)))
TS.append(sec("component", "Component", subs_for(comp)))
sc = []
for name, ref, a, desc in SHADOW_COLORS:
    r, g_, b = hex_rgb(PRIMITIVES[ref])
    sc.append(tok(sem_var(name), f"rgb({r} {g_} {b} / {a:g})", desc))
eff = [tok(f"--shadow-{n.replace('/', '-')}", "box-shadow", f"Figma effect style Shadows/{n.split('/')[0].title()}/{n.split('/')[1].replace('-', ' ').title() if not n.split('/')[1].isdigit() else 'Level ' + n.split('/')[1]}.") for n, _ in EFFECTS]
TS.append(sec("elevation", "Elevation", [("shadow-colors", "Shadow colours", sc), ("shadow-styles", "Shadow styles", eff)]))
bt = []
for name, l, dk in BRAND_THEME:
    target = l if (l == dk and not l.startswith("#") and l not in PRIMITIVES) else None
    rb = f", deprecated: true, replacedBy: {q(sem_var(target))}" if target else ", deprecated: true"
    bt.append(tok(name, resolve(l, "light"), "Brand Theme alias kept for compatibility.", dark=resolve(dk, "dark"), introduced="1.1.0", extra=rb))
ls_ = []
for name, l, dk, d in LEGACY_SITE:
    rb = f", deprecated: true, replacedBy: {q(sem_var(l))}" if l == dk else ", deprecated: true"
    ls_.append(tok(name, resolve(l, "light"), (d + " " if d else "") + "Older site-level name.", dark=resolve(dk, "dark"), introduced="1.0.0", extra=rb))
TS.append(sec("deprecated", "Deprecated aliases", [("brand-theme", "Brand Theme (Figma)", bt), ("site-legacy", "Older site names", ls_)]))
TS.append("""  {
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
""")
gen = "\n".join(TS)

p = f"{ROOT}/src/app/data/tokens.ts"
src = open(p).read()
a = src.index("// ─── Primitive sections")
b = src.index("// ─── Changelog")
src = src[:a] + gen + "\n" + src[b:]
open(p, "w").write(src)

# contrast report
def lum(h):
    def c(x):
        x /= 255
        return x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4
    r, g, b = hex_rgb(h); return 0.2126 * c(r) + 0.7152 * c(g) + 0.0722 * c(b)
def cr(a, b):
    la, lb = sorted([lum(a), lum(b)], reverse=True); return (la + 0.05) / (lb + 0.05)
pairs = [("foreground/primary", "background/canvas"), ("foreground/secondary", "background/canvas"), ("foreground/tertiary", "background/canvas"),
         ("foreground/secondary", "background/surface"), ("foreground/tertiary", "background/surface"),
         ("accent/foreground/default", "background/canvas"), ("accent/foreground/brand", "background/canvas"),
         ("accent/foreground/on-accent", "accent/background/default"), ("button/accent/primary/foreground", "accent/background/default"),
         ("foreground/inverse", "action/danger/background/default"), ("status/danger/foreground", "status/danger/background"),
         ("status/warning/foreground", "status/warning/background"), ("status/success/foreground", "status/success/background"),
         ("status/info/foreground", "status/info/background"), ("foreground/inverse", "action/neutral/background/default"),
         ("border/focus", "background/canvas")]
rep = []
for fg, bg in pairs:
    for m in ("light", "dark"):
        rep.append(f"{fg:40s} on {bg:34s} {m:5s} {cr(resolve(fg, m), resolve(bg, m)):5.2f}")
print("\n".join(rep))
