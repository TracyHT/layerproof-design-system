import React from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ComponentShell } from "../../components/ComponentShell";

// ─── Shared primitives ────────────────────────────────────────────────────────

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="mb-1"
    style={{
      fontFamily: "var(--font-heading)",
      fontSize: "var(--text-2xl)",
      textTransform: "uppercase",
      color: "var(--color-text-primary)",
    }}
  >
    {children}
  </h2>
);

const SectionDesc = ({ children }: { children: React.ReactNode }) => (
  <p
    className="text-sm mb-8"
    style={{
      color: "var(--color-text-secondary)",
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
      background: "var(--color-surface)",
      border: "1px solid var(--color-border)",
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
      borderLeft: "1px solid var(--color-border)",
      borderRight: "1px solid var(--color-border)",
      borderBottom: "1px solid var(--color-border)",
    }}
  >
    <div
      className="px-4 py-2 text-xs font-mono flex items-center gap-2"
      style={{
        background: "var(--color-surface-hover)",
        color: "var(--color-text-tertiary)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <span>tsx</span>
    </div>
    <pre
      className="p-4 text-sm font-mono overflow-x-auto"
      style={{
        background: "var(--color-surface)",
        color: "var(--color-text-secondary)",
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
  bg = "var(--color-background)",
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
          color: "var(--color-text-secondary)",
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
        border: "1px solid var(--color-border)",
        borderBottom: "none",
      }}
    >
      <div className="flex flex-wrap gap-3 items-center w-full">
        <span
          className="text-xs uppercase tracking-widest mb-4 w-full"
          style={{
            color: "var(--color-text-tertiary)",
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export function InputPage() {
  return (
    <ComponentShell
      title="Input"
      description="A single-line text field for collecting user input. Supports all native HTML input types with consistent focus, disabled, and error states."
      tabs={["Examples", "Code", "Usage"]}
    >
      {(activeTab: string) => {
        if (activeTab === "Code")
          return (
            <section className="mb-16">
              <CodeBlock>{`import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@example.com" />`}</CodeBlock>
            </section>
          );

        if (activeTab === "Usage")
          return (
            <section className="mb-16">
              <div className="space-y-3">
                {[
                  {
                    rule: "Always pair with a <Label> for accessibility",
                    desc: "Screen readers rely on the label association. Use htmlFor on the Label and a matching id on the Input.",
                  },
                  {
                    rule: "Use aria-invalid=\"true\" to trigger error styling",
                    desc: "The component uses aria-invalid to apply a red ring — not a className prop. This also communicates the error state to assistive technologies.",
                  },
                  {
                    rule: "Use disabled, not readOnly, when the user cannot interact",
                    desc: "disabled prevents both interaction and form submission. readOnly allows the value to be submitted — use it only when the field value should be preserved but not edited.",
                  },
                  {
                    rule: "Set an id on Input and matching htmlFor on Label",
                    desc: "Without this pairing, clicking the label won't focus the input and screen readers won't announce the label text.",
                  },
                  {
                    rule: "Prefer semantic type values over plain text",
                    desc: "Using type=\"email\", type=\"tel\", or type=\"url\" triggers the correct mobile keyboard and enables browser-native validation.",
                  },
                ].map(({ rule, desc }) => (
                  <div
                    key={rule}
                    className="flex gap-4 rounded-xl p-4"
                    style={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    <span
                      className="text-sm font-semibold shrink-0 mt-0.5"
                      style={{ color: "var(--brand-primary)" }}
                    >
                      →
                    </span>
                    <div>
                      <p
                        className="text-sm font-semibold mb-1"
                        style={{
                          color: "var(--color-text-primary)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {rule}
                      </p>
                      <p
                        className="text-sm"
                        style={{
                          color: "var(--color-text-secondary)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );

        // Examples tab
        return (
          <>
            <section className="mb-16">
              <SectionHeading>Default</SectionHeading>
              <SectionDesc>
                A plain text input with a placeholder. Width inherits from the
                container — wrap in a constrained element to control sizing.
              </SectionDesc>
              <Example
                label="Default"
                code={`import { Input } from '@/components/ui/input';

<Input placeholder="Enter text…" />`}
              >
                <div className="w-72">
                  <Input placeholder="Enter text…" />
                </div>
              </Example>
            </section>

            <section className="mb-16">
              <SectionHeading>Input types</SectionHeading>
              <SectionDesc>
                Pass a native <C>type</C> prop to get the appropriate keyboard
                and browser validation behaviour.
              </SectionDesc>
              <Example
                label="Types"
                code={`<Input type="text"     placeholder="Plain text" />
<Input type="email"    placeholder="you@example.com" />
<Input type="password" placeholder="Password" />
<Input type="number"   placeholder="0" />
<Input type="search"   placeholder="Search…" />
<Input type="url"      placeholder="https://example.com" />`}
              >
                <div className="grid grid-cols-1 gap-3 w-72">
                  <Input type="text" placeholder="Plain text" />
                  <Input type="email" placeholder="you@example.com" />
                  <Input type="password" placeholder="Password" />
                  <Input type="number" placeholder="0" />
                  <Input type="search" placeholder="Search…" />
                  <Input type="url" placeholder="https://example.com" />
                </div>
              </Example>
            </section>

            <section className="mb-16">
              <SectionHeading>With label</SectionHeading>
              <SectionDesc>
                Always pair an <C>Input</C> with a <C>Label</C> using{" "}
                <C>htmlFor</C> / <C>id</C> for accessibility.
              </SectionDesc>
              <Example
                label="Label + Input"
                code={`import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

<div className="grid gap-2">
  <Label htmlFor="email">Email address</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`}
              >
                <div className="grid gap-2 w-72">
                  <Label htmlFor="demo-email">Email address</Label>
                  <Input
                    id="demo-email"
                    type="email"
                    placeholder="you@example.com"
                  />
                </div>
              </Example>
            </section>

            <section className="mb-16">
              <SectionHeading>Disabled</SectionHeading>
              <SectionDesc>
                Use the <C>disabled</C> prop when the user should not be able
                to interact with the field at all.
              </SectionDesc>
              <Example
                label="Disabled"
                code={`<Input disabled placeholder="Cannot edit" />`}
              >
                <div className="w-72">
                  <Input disabled placeholder="Cannot edit" />
                </div>
              </Example>
            </section>

            <section className="mb-16">
              <SectionHeading>Error / invalid state</SectionHeading>
              <SectionDesc>
                Set <C>aria-invalid="true"</C> to apply the red ring error
                style. This also communicates the invalid state to screen
                readers.
              </SectionDesc>
              <Example
                label="Error"
                code={`<div className="grid gap-2">
  <Label htmlFor="email-error">Email address</Label>
  <Input
    id="email-error"
    type="email"
    aria-invalid="true"
    defaultValue="not-an-email"
  />
  <p className="text-sm" style={{ color: 'var(--color-error)' }}>
    Enter a valid email address.
  </p>
</div>`}
              >
                <div className="grid gap-2 w-72">
                  <Label htmlFor="demo-email-error">Email address</Label>
                  <Input
                    id="demo-email-error"
                    type="email"
                    aria-invalid="true"
                    defaultValue="not-an-email"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-error, #ef4444)" }}
                  >
                    Enter a valid email address.
                  </p>
                </div>
              </Example>
            </section>

            <section className="mb-16">
              <SectionHeading>Read-only</SectionHeading>
              <SectionDesc>
                Use <C>readOnly</C> when the value should be visible and
                copyable but not editable. The field remains focusable and its
                value is submitted with the form.
              </SectionDesc>
              <Example
                label="Read-only"
                code={`<Input readOnly value="ACC-20240409-001" />`}
              >
                <div className="w-72">
                  <Input readOnly value="ACC-20240409-001" />
                </div>
              </Example>
            </section>

            <section className="mb-16">
              <SectionHeading>File input</SectionHeading>
              <SectionDesc>
                Pass <C>type="file"</C> for file selection. The file button and
                text inherit the design system's base styles.
              </SectionDesc>
              <Example
                label="File"
                code={`<div className="grid gap-2">
  <Label htmlFor="file-upload">Attachment</Label>
  <Input id="file-upload" type="file" />
</div>`}
              >
                <div className="grid gap-2 w-72">
                  <Label htmlFor="demo-file">Attachment</Label>
                  <Input id="demo-file" type="file" />
                </div>
              </Example>
            </section>
          </>
        );
      }}
    </ComponentShell>
  );
}
