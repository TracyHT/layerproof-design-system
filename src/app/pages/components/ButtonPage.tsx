import React, { useState } from "react";
import { ArrowRight, Download, Plus, Zap, RefreshCw } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ComponentShell } from "../../components/ComponentShell";

// ─── Shared primitives ────────────────────────────────────────────────────────

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="mb-1"
    style={{
      fontFamily: "var(--font-heading)",
      fontSize: "var(--text-h6)",
      letterSpacing: "var(--ls-h6)",
      fontWeight: 700,
      color: "var(--foreground-primary)",
    }}
  >
    {children}
  </h2>
);

const SectionDesc = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-sm mb-8"
    style={{
      color: "var(--foreground-secondary)",
      fontFamily: "var(--font-body)",
    }}
  >
    {children}
  </p>
);

const C = ({ children }: { children: string }) => (
  <code
    className="text-xs px-1.5 py-0.5 rounded"
    style={{
      background: "var(--background-surface)",
      border: "1px solid var(--border-subtle)",
      fontFamily: "var(--font-mono)",
    }}
  >
    {children}
  </code>
);

const CodeBlock = ({ children }: { children: string }) => (
  <div
    className="rounded-b-xl overflow-hidden"
    style={{
      borderLeft: "1px solid var(--border-subtle)",
      borderRight: "1px solid var(--border-subtle)",
      borderBottom: "1px solid var(--border-subtle)",
    }}
  >
    <div
      className="px-4 py-2 text-xs font-mono flex items-center gap-2"
      style={{
        background: "var(--background-muted)",
        color: "var(--foreground-tertiary)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <span>tsx</span>
    </div>
    <pre
      className="p-4 text-sm font-mono overflow-x-auto"
      style={{
        background: "var(--background-surface)",
        color: "var(--foreground-secondary)",
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </pre>
  </div>
);

const Example = ({
  label,
  description,
  code,
  bg = "var(--background-canvas)",
  children,
}: {
  label: string;
  description?: string;
  code: string;
  bg?: string;
  children: React.ReactNode;
}) => (
  <div className="mb-10">
    {description && (
      <p
        className="text-sm mb-3"
        style={{
          color: "var(--foreground-secondary)",
          fontFamily: "var(--font-body)",
        }}
      >
        {description}
      </p>
    )}
    <div
      className="rounded-t-xl px-8 py-10 flex flex-wrap gap-4 items-center"
      style={{
        background: bg,
        border: "1px solid var(--border-subtle)",
        borderBottom: "none",
      }}
    >
      <div className="flex flex-wrap gap-3 items-center w-full">
        <span
          className="type-label-sm mb-4 w-full"
          style={{
            color: "var(--foreground-tertiary)",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </span>
        {children}
      </div>
    </div>
    <CodeBlock>{code}</CodeBlock>
  </div>
);

// ─── Playground ───────────────────────────────────────────────────────────────

type BVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "link"
  | "accent"
  | "accent-secondary"
  | "accent-ghost"
  | "accent-outline"
  | "accent-link"
  | "destructive"
  | "destructive-secondary"
  | "destructive-ghost"
  | "destructive-outline"
  | "destructive-link"
  | "neutral";
type BSize = "sm" | "default" | "lg" | "icon";
type IconPos = "none" | "leading" | "trailing";
type ColorMode = "light" | "dark";

// Matrix: columns = types, rows = hierarchy levels
const TYPES = [
  { key: "accent", label: "Accent" },
  { key: "neutral", label: "Neutral" },
  { key: "danger", label: "Danger" },
] as const;
type BType = (typeof TYPES)[number]["key"];

const HIERARCHIES = [
  { key: "primary", label: "Primary" },
  { key: "secondary", label: "Secondary" },
  { key: "outline", label: "Outline" },
  { key: "ghost", label: "Ghost" },
  { key: "link", label: "Link" },
] as const;
type BHierarchy = (typeof HIERARCHIES)[number]["key"];

const VARIANT_MAP: Record<BType, Record<BHierarchy, BVariant | null>> = {
  accent: {
    primary: "accent",
    secondary: "accent-secondary",
    outline: "accent-outline",
    ghost: "accent-ghost",
    link: "accent-link",
  },
  neutral: {
    primary: "default",
    secondary: "secondary",
    outline: "outline",
    ghost: "ghost",
    link: "link",
  },
  danger: {
    primary: "destructive",
    secondary: "destructive-secondary",
    outline: "destructive-outline",
    ghost: "destructive-ghost",
    link: "destructive-link",
  },
};

function Seg<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; display: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="text-xs font-mono shrink-0"
        style={{ color: "var(--foreground-tertiary)" }}
      >
        {label}
      </span>
      <div
        className="inline-flex rounded-md overflow-hidden"
        style={{ border: "1px solid var(--border-subtle)" }}
      >
        {options.map((o, i) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className="px-3 py-1.5 text-xs font-mono transition-colors"
            style={{
              background:
                value === o.value
                  ? "var(--foreground-primary)"
                  : "var(--background-surface)",
              color:
                value === o.value
                  ? "var(--background-canvas)"
                  : "var(--foreground-secondary)",
              borderRight:
                i < options.length - 1
                  ? "1px solid var(--border-subtle)"
                  : undefined,
            }}
          >
            {o.display}
          </button>
        ))}
      </div>
    </div>
  );
}

function ToggleSwitch({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className="flex items-center gap-2 cursor-pointer select-none"
      onClick={onChange}
    >
      <div
        className="relative rounded-full transition-colors"
        style={{
          width: 32,
          height: 18,
          background: value
            ? "var(--foreground-primary)"
            : "var(--border-subtle)",
        }}
      >
        <div
          className="absolute top-[3px] rounded-full transition-transform"
          style={{
            width: 12,
            height: 12,
            background: "var(--foreground-inverse)",
            transform: value ? "translateX(17px)" : "translateX(3px)",
          }}
        />
      </div>
      <span
        className="text-xs font-mono"
        style={{ color: "var(--foreground-tertiary)" }}
      >
        {label}
      </span>
    </label>
  );
}

function ButtonPlayground() {
  const [size, setSize] = useState<BSize>("default");
  const [iconPos, setIconPos] = useState<IconPos>("none");
  const [disabled, setDisabled] = useState(false);
  const [colorMode, setColorMode] = useState<ColorMode>("light");
  const [hovered, setHovered] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const isIcon = size === "icon";
  const isDark = colorMode === "dark";

  function handleCellClick(cellKey: string) {
    if (disabled) return;
    setLoading(cellKey);
    setTimeout(() => setLoading(null), 1500);
  }

  const textMuted = isDark ? "#525252" : "var(--foreground-tertiary)";
  const textLabel = isDark ? "#a3a3a3" : "var(--foreground-secondary)";
  const borderClr = isDark ? "#1f1f1f" : "var(--border-subtle)";

  function renderCell(type: BType, hierarchy: BHierarchy) {
    const variant = VARIANT_MAP[type][hierarchy];
    const cellKey = `${type}-${hierarchy}`;
    if (!variant) {
      return (
        <div
          key={cellKey}
          className="flex items-center justify-center"
          style={{ minHeight: 56 }}
        >
          <span
            style={{
              color: borderClr,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
            }}
          >
            —
          </span>
        </div>
      );
    }
    const isLoading = loading === cellKey;
    return (
      <div
        key={cellKey}
        className="flex items-center justify-center"
        style={{ minHeight: 56 }}
        onMouseEnter={() => setHovered(cellKey)}
        onMouseLeave={() => setHovered(null)}
      >
        <Button
          variant={variant}
          size={size}
          disabled={disabled || isLoading}
          aria-label={isIcon ? `${type} ${hierarchy}` : undefined}
          style={{ pointerEvents: "auto" }}
          onClick={() => handleCellClick(cellKey)}
        >
          {isLoading ? (
            <>
              <RefreshCw size={13} className="animate-spin" />
              {!isIcon && " Loading…"}
            </>
          ) : isIcon ? (
            <Zap size={15} />
          ) : (
            <>
              {iconPos === "leading" && <Plus size={13} />}
              Button
              {iconPos === "trailing" && <ArrowRight size={13} />}
            </>
          )}
        </Button>
      </div>
    );
  }

  // Build flat grid cells: [corner, ...typeHeaders, ...rows(label + cells)]
  const cells: React.ReactNode[] = [];

  // Header row
  cells.push(<div key="corner" />);
  TYPES.forEach((type) => {
    cells.push(
      <div
        key={`th-${type.key}`}
        className="flex items-end justify-center pb-3"
      >
        <span
          className="type-label-sm"
          style={{ color: textMuted, fontFamily: "var(--font-body)" }}
        >
          {type.label}
        </span>
      </div>,
    );
  });

  // Data rows
  HIERARCHIES.forEach((hierarchy) => {
    // Row label
    cells.push(
      <div
        key={`rh-${hierarchy.key}`}
        className="flex items-center pr-6"
        style={{ minHeight: 56 }}
      >
        <span
          className="text-xs"
          style={{ color: textLabel, fontFamily: "var(--font-body)" }}
        >
          {hierarchy.label}
        </span>
      </div>,
    );
    // Type cells
    TYPES.forEach((type) => {
      cells.push(renderCell(type.key, hierarchy.key));
    });
  });

  // Which variant is hovered (for code hint)
  const hoveredVariant = hovered
    ? VARIANT_MAP[hovered.split("-")[0] as BType]?.[
        hovered.split("-")[1] as BHierarchy
      ]
    : null;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ border: "1px solid var(--border-subtle)" }}
    >
      {/* Controls */}
      <div
        className="flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-4"
        style={{
          background: "var(--background-surface)",
          borderBottom: "1px solid var(--border-subtle)",
        }}
      >
        <Seg<ColorMode>
          label="mode"
          value={colorMode}
          onChange={setColorMode}
          options={[
            { value: "light", display: "Light" },
            { value: "dark", display: "Dark" },
          ]}
        />
        <Seg<BSize>
          label="size"
          value={size}
          onChange={setSize}
          options={[
            { value: "sm", display: "sm" },
            { value: "default", display: "md" },
            { value: "lg", display: "lg" },
            { value: "icon", display: "icon" },
          ]}
        />
        {!isIcon && (
          <Seg<IconPos>
            label="icon"
            value={iconPos}
            onChange={setIconPos}
            options={[
              { value: "none", display: "none" },
              { value: "leading", display: "leading" },
              { value: "trailing", display: "trailing" },
            ]}
          />
        )}
        <ToggleSwitch
          label="disabled"
          value={disabled}
          onChange={() => setDisabled((d) => !d)}
        />
      </div>

      {/* Matrix canvas */}
      <div
        data-theme={isDark ? "dark" : "light"}
        className="px-8 py-8 transition-colors"
        style={{
          background: isDark
            ? "var(--background-canvas)"
            : "var(--background-surface)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "88px repeat(3, 1fr)",
            rowGap: 0,
            columnGap: 8,
          }}
        >
          {cells}
        </div>
      </div>

      {/* Code hint on hover / loading hint at rest */}
      <div
        className="px-5 py-3 text-xs font-mono"
        style={{
          background: "var(--background-muted)",
          borderTop: "1px solid var(--border-subtle)",
          color: "var(--foreground-secondary)",
          minHeight: 38,
        }}
      >
        {hoveredVariant ? (
          <>
            <span style={{ color: "var(--foreground-tertiary)" }}>
              {"// → "}
            </span>
            {`<Button${hoveredVariant !== "default" ? ` variant="${hoveredVariant}"` : ""}${size !== "default" ? ` size="${size}"` : ""}${disabled ? " disabled" : ""}>Button</Button>`}
          </>
        ) : (
          <span style={{ color: "var(--foreground-tertiary)" }}>
            Hover a button to see its code · Click any button to trigger a
            loading state
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Loading spinner simulation ───────────────────────────────────────────────

function LoadingButton({
  variant = "default",
  label = "Saving",
}: {
  variant?: BVariant;
  label?: string;
}) {
  const [busy, setBusy] = useState(false);
  const start = () => {
    setBusy(true);
    setTimeout(() => setBusy(false), 2000);
  };
  return (
    <Button variant={variant} disabled={busy} onClick={start}>
      {busy ? <RefreshCw size={13} className="animate-spin" /> : null}
      {busy ? "Loading…" : label}
    </Button>
  );
}

// ─── When-to-use card ─────────────────────────────────────────────────────────

const UseCaseCard = ({
  swatchColor,
  swatchLabel,
  variant,
  title,
  subtitle,
  use,
  avoid,
}: {
  swatchColor: string;
  swatchLabel: string;
  variant: BVariant;
  title: string;
  subtitle: string;
  use: string[];
  avoid: string[];
}) => (
  <div
    className="rounded-xl flex flex-col overflow-hidden"
    style={{
      border: "1px solid var(--border-subtle)",
      background: "var(--background-surface)",
    }}
  >
    {/* Colored accent strip */}
    <div style={{ height: 4, background: swatchColor, flexShrink: 0 }} />

    {/* Header */}
    <div
      className="px-4 pt-4 pb-3 flex items-center gap-2"
      style={{ borderBottom: "1px solid var(--border-subtle)" }}
    >
      <div
        className="rounded-full shrink-0"
        style={{
          width: 10,
          height: 10,
          background: swatchColor,
          border: "1px solid var(--border-subtle)",
          opacity: 0.9,
        }}
      />
      <div>
        <p
          className="text-sm font-semibold leading-tight"
          style={{
            color: "var(--foreground-primary)",
            fontFamily: "var(--font-body)",
          }}
        >
          {title}
        </p>
        <p
          className="text-xs leading-tight mt-0.5"
          style={{
            color: "var(--foreground-tertiary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {swatchLabel}
        </p>
      </div>
    </div>

    {/* Button preview */}
    <div
      className="px-4 py-4 flex items-center"
      style={{
        background: "var(--background-canvas)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <Button variant={variant} size="sm">
        {subtitle}
      </Button>
    </div>

    {/* Use / Avoid */}
    <div className="px-4 pt-3 pb-4 flex flex-row gap-6">
      <div className="flex-1 min-w-0">
        <p
          className="type-label-sm mb-1.5"
          style={{
            color: "var(--foreground-tertiary)",
            fontFamily: "var(--font-body)",
          }}
        >
          Use for
        </p>
        <ul className="space-y-1">
          {use.map((item) => (
            <li
              key={item}
              className="flex gap-1.5 text-xs"
              style={{
                color: "var(--foreground-secondary)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span
                className="shrink-0 mt-px"
                style={{ color: "var(--success-default)" }}
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div
        className="flex-1 min-w-0"
        style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: 16 }}
      >
        <p
          className="type-label-sm mb-1.5"
          style={{
            color: "var(--foreground-tertiary)",
            fontFamily: "var(--font-body)",
          }}
        >
          Avoid
        </p>
        <ul className="space-y-1">
          {avoid.map((item) => (
            <li
              key={item}
              className="flex gap-1.5 text-xs"
              style={{
                color: "var(--foreground-secondary)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span
                className="shrink-0 mt-px"
                style={{ color: "var(--danger-default)" }}
              >
                ✕
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// ─── Tab content ──────────────────────────────────────────────────────────────

function ExamplesTab() {
  return (
    <>
      {/* Playground */}
      <section className="mb-16">
        <SectionHeading>Playground</SectionHeading>
        <SectionDesc>
          Columns are button types (Accent, Neutral, Danger) and rows are
          hierarchy levels (Primary → Link). Toggle color mode, size, icon
          position, and disabled state. Hover any button to see its code.
        </SectionDesc>
        <ButtonPlayground />
      </section>

      {/* Sizing */}
      <section className="mb-16">
        <SectionHeading>Sizing</SectionHeading>
        <SectionDesc>
          Four sizes — <C>sm</C>, <C>default</C>, <C>lg</C>, and <C>icon</C>.
        </SectionDesc>

        <Example
          label="sm / default / lg"
          code={`<Button size="sm">Small</Button>\n<Button>Default</Button>\n<Button size="lg">Large</Button>`}
        >
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </Example>

        <Example
          label="Icon — square hit area, always pair with aria-label"
          code={`<Button size="icon" aria-label="Add item"><Plus /></Button>\n<Button size="icon" variant="accent" aria-label="Star"><Zap /></Button>\n<Button size="icon" variant="outline" aria-label="Next"><ArrowRight /></Button>`}
        >
          <Button size="icon" aria-label="Add item">
            <Plus size={16} />
          </Button>
          <Button size="icon" variant="accent" aria-label="Star">
            <Zap size={16} />
          </Button>
          <Button size="icon" variant="outline" aria-label="Next">
            <ArrowRight size={16} />
          </Button>
        </Example>
      </section>

      {/* With icons */}
      <section className="mb-16">
        <SectionHeading>With icons</SectionHeading>
        <SectionDesc>
          Pair icons with buttons to reinforce the action. Use a leading icon to
          set context and a trailing icon to indicate direction or outcome.
        </SectionDesc>

        <Example
          label="Leading icon — context before the label"
          code={`<Button><Plus size={16} /> New item</Button>\n<Button variant="accent"><Plus size={16} /> Get started</Button>`}
        >
          <Button>
            <Plus size={16} /> New item
          </Button>
          <Button variant="accent">
            <Plus size={16} /> Get started
          </Button>
        </Example>

        <Example
          label="Trailing icon — direction or outcome after the label"
          code={`<Button variant="outline">Download <Download size={16} /></Button>\n<Button variant="secondary">Continue <ArrowRight size={16} /></Button>`}
        >
          <Button variant="outline">
            Download <Download size={16} />
          </Button>
          <Button variant="secondary">
            Continue <ArrowRight size={16} />
          </Button>
        </Example>
      </section>

      {/* Loading */}
      <section className="mb-16">
        <SectionHeading>Loading</SectionHeading>
        <SectionDesc>
          Show a spinner while an async action is in progress. Set{" "}
          <C>disabled</C> during loading to prevent duplicate submissions. Click
          the buttons below to see the 2-second simulation.
        </SectionDesc>

        <Example
          label="Loading state — click to trigger"
          code={`<Button disabled={isLoading}>
  {isLoading ? <RefreshCw className="animate-spin" /> : null}
  {isLoading ? 'Saving…' : 'Save'}
</Button>`}
        >
          <LoadingButton variant="default" label="Save" />
          <LoadingButton variant="accent" label="Get started" />
          <LoadingButton variant="destructive" label="Delete" />
        </Example>
      </section>

      {/* Disabled */}
      <section className="mb-16">
        <SectionHeading>Disabled</SectionHeading>
        <SectionDesc>
          The <C>disabled</C> prop prevents all interaction and reduces opacity
          to 50%.
        </SectionDesc>

        <Example
          label="Disabled — all variants"
          code={`<Button disabled>Default</Button>\n<Button disabled variant="accent">Accent</Button>\n<Button disabled variant="outline">Outline</Button>\n<Button disabled variant="destructive">Destructive</Button>\n<Button disabled variant="destructive-outline">Danger outline</Button>`}
        >
          <Button disabled>Default</Button>
          <Button disabled variant="accent">
            Accent
          </Button>
          <Button disabled variant="outline">
            Outline
          </Button>
          <Button disabled variant="destructive">
            Destructive
          </Button>
          <Button disabled variant="destructive-outline">
            Danger outline
          </Button>
        </Example>
      </section>
    </>
  );
}

function CodeTab() {
  return (
    <>
      <section className="mb-16">
        <SectionHeading>Import</SectionHeading>
        <div
          className="mt-4 rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border-subtle)" }}
        >
          <div
            className="px-4 py-2 text-xs font-mono"
            style={{
              background: "var(--background-muted)",
              color: "var(--foreground-tertiary)",
              borderBottom: "1px solid var(--border-subtle)",
            }}
          >
            tsx
          </div>
          <pre
            className="p-4 text-sm font-mono"
            style={{
              background: "var(--background-surface)",
              color: "var(--foreground-secondary)",
            }}
          >{`import { Button } from '@/components/ui/button';`}</pre>
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading>Variant Summary</SectionHeading>
        <div
          className="rounded-xl overflow-hidden mt-6"
          style={{ border: "1px solid var(--border-subtle)" }}
        >
          <table
            className="w-full text-sm"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <thead>
              <tr
                style={{
                  background: "var(--background-surface)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                {["Hierarchy", "Neutral", "Accent", "Danger"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 font-semibold text-xs"
                    style={{
                      color: "var(--foreground-primary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Primary", "default", "accent", "destructive"],
                [
                  "Secondary",
                  "secondary",
                  "accent-secondary",
                  "destructive-secondary",
                ],
                ["Outline", "outline", "accent-outline", "destructive-outline"],
                ["Ghost", "ghost", "accent-ghost", "destructive-ghost"],
                ["Link", "link", "accent-link", "destructive-link"],
              ].map(([hierarchy, neutral, accent, danger], i) => (
                <tr
                  key={hierarchy}
                  style={{
                    borderBottom:
                      i < 4 ? "1px solid var(--border-subtle)" : undefined,
                    background:
                      i % 2 === 0
                        ? "var(--background-canvas)"
                        : "var(--background-surface)",
                  }}
                >
                  <td
                    className="px-4 py-3 text-xs font-semibold"
                    style={{
                      color: "var(--foreground-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {hierarchy}
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{ color: "var(--foreground-primary)" }}
                  >
                    {neutral}
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{ color: "var(--accent-background-default)" }}
                  >
                    {accent}
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{ color: "var(--danger-default)" }}
                  >
                    {danger}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16">
        <SectionHeading>API Reference</SectionHeading>
        <div
          className="rounded-xl overflow-hidden mt-6"
          style={{ border: "1px solid var(--border-subtle)" }}
        >
          <table
            className="w-full text-sm"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <thead>
              <tr
                style={{
                  background: "var(--background-surface)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 font-semibold"
                    style={{ color: "var(--foreground-primary)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "variant",
                  '"default" | "secondary" | "outline" | "ghost" | "link" | "accent" | "accent-secondary" | "accent-ghost" | "accent-outline" | "accent-link" | "destructive" | "destructive-secondary" | "destructive-ghost" | "destructive-outline" | "destructive-link"',
                  '"default"',
                  "Visual style. accent = brand CTA. destructive = irreversible actions.",
                ],
                [
                  "size",
                  '"sm" | "default" | "lg" | "icon"',
                  '"default"',
                  "Button size. icon creates a square equal-padding button.",
                ],
                [
                  "asChild",
                  "boolean",
                  "false",
                  "Merges props onto child element via Radix Slot — use to render as <a> or router Link.",
                ],
                [
                  "disabled",
                  "boolean",
                  "false",
                  "Prevents interaction and applies 50% opacity.",
                ],
              ].map(([prop, type, def, desc], i) => (
                <tr
                  key={prop}
                  style={{
                    borderBottom:
                      i < 3 ? "1px solid var(--border-subtle)" : undefined,
                    background:
                      i % 2 === 0
                        ? "var(--background-canvas)"
                        : "var(--background-surface)",
                  }}
                >
                  <td
                    className="px-4 py-3 font-mono text-xs"
                    style={{ color: "var(--foreground-primary)" }}
                  >
                    {prop}
                  </td>
                  <td
                    className="px-4 py-3 font-mono text-xs"
                    style={{ color: "var(--accent-background-default)" }}
                  >
                    {type}
                  </td>
                  <td
                    className="px-4 py-3 font-mono text-xs"
                    style={{ color: "var(--foreground-tertiary)" }}
                  >
                    {def}
                  </td>
                  <td
                    className="px-4 py-3 text-xs"
                    style={{ color: "var(--foreground-secondary)" }}
                  >
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function UsageTab() {
  return (
    <>
      <section className="mb-16">
        <SectionHeading>When to use</SectionHeading>
        <SectionDesc>
          The three primary variants form a visual hierarchy. Use at most one{" "}
          <C>accent</C> button per view.
        </SectionDesc>
        <div className="grid grid-cols-1 gap-4 mb-4">
          <UseCaseCard
            swatchColor="var(--accent-surface-default)"
            swatchLabel="#FF589B — brand pink"
            variant="accent"
            title="Accent"
            subtitle="Get started"
            use={[
              "Primary brand CTAs",
              "Hero section actions",
              "Page-level calls-to-action",
            ]}
            avoid={[
              "More than one per view",
              "Inside forms or dialogs",
              "Toolbar or grouped controls",
            ]}
          />
          <UseCaseCard
            swatchColor="var(--foreground-primary)"
            swatchLabel="Black / white — primary"
            variant="default"
            title="Default"
            subtitle="Submit"
            use={[
              "Primary action in forms",
              '"Save", "Confirm", "Continue"',
              "Dialog / modal confirm",
            ]}
            avoid={[
              "Page-hero CTAs (use accent)",
              "Low-priority inline actions",
              "Multiple per form section",
            ]}
          />
          <UseCaseCard
            swatchColor="var(--neutral-surface-disable)"
            swatchLabel="Gray — low emphasis"
            variant="neutral"
            title="Neutral"
            subtitle="Filter"
            use={[
              "Filter chips and tags",
              "Toolbar controls",
              "Inline UI actions",
            ]}
            avoid={[
              "Primary or hero CTAs",
              "Confirming destructive actions",
              "Replacing outline/ghost in lists",
            ]}
          />
          <UseCaseCard
            swatchColor="var(--danger-default)"
            swatchLabel="#c9000a — danger red"
            variant="destructive"
            title="Destructive"
            subtitle="Delete account"
            use={[
              "Irreversible actions",
              "Data deletion",
              "Account termination",
            ]}
            avoid={[
              "Reversible actions",
              "Form cancellation (use outline)",
              "More than one per dialog",
            ]}
          />
        </div>
        <p
          className="text-xs"
          style={{
            color: "var(--foreground-tertiary)",
            fontFamily: "var(--font-body)",
          }}
        >
          Outline, ghost, and link sit below each hierarchy for low-emphasis or
          supplemental actions. Danger hierarchy (destructive) is reserved for
          irreversible operations.
        </p>
      </section>
    </>
  );
}

function ChangelogTab() {
  return (
    <section className="mb-16">
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--border-subtle)" }}
      >
        <div
          className="type-label-sm px-5 py-3"
          style={{
            background: "var(--background-surface)",
            borderBottom: "1px solid var(--border-subtle)",
            color: "var(--foreground-tertiary)",
            fontFamily: "var(--font-body)",
          }}
        >
          v1.1
        </div>
        <div
          className="px-5 py-4 text-sm"
          style={{
            background: "var(--background-canvas)",
            color: "var(--foreground-secondary)",
            fontFamily: "var(--font-body)",
          }}
        >
          <p
            className="mb-3 font-semibold"
            style={{ color: "var(--foreground-primary)" }}
          >
            Added full variant hierarchy
          </p>
          <ul className="space-y-2">
            <li>
              <span
                className="font-mono text-xs px-1.5 py-0.5 rounded mr-2"
                style={{
                  background: "var(--background-surface)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                Accent
              </span>
              accent-secondary, accent-outline, accent-ghost, accent-link
            </li>
            <li>
              <span
                className="font-mono text-xs px-1.5 py-0.5 rounded mr-2"
                style={{
                  background: "var(--background-surface)",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                Danger
              </span>
              destructive-secondary, destructive-outline, destructive-ghost,
              destructive-link
            </li>
            <li style={{ color: "var(--foreground-tertiary)" }}>
              All variants use CSS custom properties — data-theme aware, no
              Tailwind dark: prefixes
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function ButtonPage() {
  return (
    <ComponentShell
      title="Button"
      description="Triggers an action or event such as submitting a form, opening a dialog, or navigating to a new page."
      tabs={["Examples", "Code", "Usage", "Changelog"]}
    >
      {(activeTab: string) => {
        if (activeTab === "Code") return <CodeTab />;
        if (activeTab === "Usage") return <UsageTab />;
        if (activeTab === "Changelog") return <ChangelogTab />;
        return <ExamplesTab />;
      }}
    </ComponentShell>
  );
}
