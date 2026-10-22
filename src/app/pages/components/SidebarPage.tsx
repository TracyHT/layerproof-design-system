import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "../../components/ui/sidebar";
import { Button } from "../../components/ui/button";
import { ComponentShell } from "../../components/ComponentShell";
import {
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  BarChart2,
  Bell,
  Home,
  FolderOpen,
  Palette,
  Feather,
  Sparkles,
  MessageSquare,
  ChevronDown,
  Zap,
} from "lucide-react";

// TODO: import from shared primitives module when extracted

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

// ─── SidebarExample wrapper ───────────────────────────────────────────────────
// Each live example is constrained to a fixed-height bordered container to
// prevent the sidebar from taking over the doc page layout.

const SidebarExample = ({
  label,
  code,
  children,
}: {
  label: string;
  code: string;
  children: React.ReactNode;
}) => (
  <div className="mb-10">
    <div
      className="rounded-t-xl overflow-hidden"
      style={{
        height: 360,
        border: "1px solid var(--color-border)",
        borderBottom: "none",
        borderRadius: "12px 12px 0 0",
        overflow: "hidden",
        position: "relative",
        transform: "translateZ(0)",
      }}
    >
      <div
        className="text-xs uppercase tracking-widest"
        style={{
          position: "absolute",
          top: 12,
          left: 16,
          zIndex: 10,
          color: "var(--color-text-tertiary)",
          fontFamily: "var(--font-body)",
          pointerEvents: "none",
        }}
      >
        {label}
      </div>
      <div style={{ height: "100%", width: "100%" }}>{children}</div>
    </div>
    <CodeBlock>{code}</CodeBlock>
  </div>
);

// ─── Seg control ──────────────────────────────────────────────────────────────

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
        style={{ color: "var(--color-text-tertiary)" }}
      >
        {label}
      </span>
      <div
        className="inline-flex rounded-md overflow-hidden"
        style={{ border: "1px solid var(--color-border)" }}
      >
        {options.map((o, i) => (
          <button
            key={o.value}
            onClick={() => onChange(o.value)}
            className="px-3 py-1.5 text-xs font-mono transition-colors"
            style={{
              background:
                value === o.value
                  ? "var(--color-text-primary)"
                  : "var(--color-surface)",
              color:
                value === o.value
                  ? "var(--color-background)"
                  : "var(--color-text-secondary)",
              borderRight:
                i < options.length - 1
                  ? "1px solid var(--color-border)"
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

// ─── Nav items ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home, label: "Home", active: true },
  { icon: FolderOpen, label: "All workspaces" },
  { icon: Palette, label: "Theme" },
  { icon: Feather, label: "Tones" },
  { icon: Sparkles, label: "Library" },
  { icon: Settings, label: "Settings" },
  { icon: MessageSquare, label: "Feedback" },
];

// ─── Basic sidebar playground ─────────────────────────────────────────────────

function LayerProofSidebarPlayground() {
  const [colorMode, setColorMode] = useState<"dark" | "light">("dark");
  const isDark = colorMode === "dark";

  return (
    <div className="mb-10">
      <div
        style={{
          border: "1px solid var(--color-border)",
          borderRadius: "12px 12px 0 0",
        }}
      >
        {/* Controls bar */}
        <div
          style={{
            background: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
            padding: "8px 16px",
            borderRadius: "12px 12px 0 0",
          }}
        >
          <Seg
            label="mode"
            value={colorMode}
            onChange={setColorMode}
            options={[
              { value: "light", display: "Light" },
              { value: "dark", display: "Dark" },
            ]}
          />
        </div>
        {/* Preview */}
        <div
          data-theme={colorMode}
          style={
            {
              height: 580,
              overflow: "hidden",
              transform: "translateZ(0)",
              position: "relative",
              background: isDark ? "#0a0a0a" : "var(--color-surface)",
              "--sidebar": isDark ? "#111111" : "#ffffff",
              "--sidebar-foreground": isDark ? "#e5e5e5" : "#111111",
              "--sidebar-border": isDark ? "#2a2a2a" : "#e5e5e5",
              "--sidebar-accent": isDark ? "#1f1f1f" : "#f0f0f0",
              "--sidebar-accent-foreground": isDark ? "#ffffff" : "#111111",
              "--sidebar-primary": isDark ? "#ffffff" : "#111111",
              "--sidebar-primary-foreground": isDark ? "#111111" : "#ffffff",
            } as React.CSSProperties
          }
        >
          <SidebarProvider defaultOpen style={{ height: "100%", minHeight: 0 }}>
            <Sidebar collapsible="none">
              {/* Header */}
              <SidebarHeader style={{ padding: "16px 12px 8px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <img
                    src="/symbol.png"
                    alt="LayerProof"
                    style={{ width: 28, height: 28, objectFit: "contain" }}
                  />
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: isDark ? "#e5e5e5" : "#111111",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    LayerProof
                  </span>
                </div>
                <div
                  style={{
                    height: 1,
                    background: isDark ? "#2a2a2a" : "#e5e5e5",
                    marginBottom: 12,
                  }}
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full justify-between"
                >
                  Create new design <ChevronDown size={14} />
                </Button>
              </SidebarHeader>

              {/* Nav items */}
              <SidebarContent style={{ padding: "8px 8px" }}>
                <SidebarMenu>
                  {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        isActive={active}
                        style={
                          active
                            ? {
                                background: isDark ? "#1f1f1f" : "#f0f0f0",
                                color: isDark ? "#ffffff" : "#111111",
                                borderRadius: 8,
                              }
                            : {
                                color: isDark ? "#a0a0a0" : "#666666",
                                borderRadius: 8,
                              }
                        }
                      >
                        <Icon size={16} />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>

              {/* Footer */}
              <SidebarFooter style={{ padding: "8px 12px 12px" }}>
                {/* Free plan card */}
                <div
                  style={{
                    background: isDark ? "#1a1a1a" : "var(--color-surface)",
                    border: `1px solid ${isDark ? "#2a2a2a" : "var(--color-border)"}`,
                    borderRadius: 10,
                    padding: "10px 12px",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 12,
                        color: isDark
                          ? "#a0a0a0"
                          : "var(--color-text-secondary)",
                      }}
                    >
                      Free Plan
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color: isDark ? "#666" : "var(--color-text-tertiary)",
                      }}
                    >
                      100%
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div
                    style={{
                      height: 4,
                      background: isDark ? "#2a2a2a" : "var(--color-border)",
                      borderRadius: 2,
                      marginBottom: 6,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: "100%",
                        background: "#e53e3e",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: isDark ? "#666" : "var(--color-text-tertiary)",
                      marginBottom: 8,
                    }}
                  >
                    608/610 credits used
                  </div>
                  <button
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      padding: "5px 10px",
                      borderRadius: 6,
                      background: "transparent",
                      border: `1px solid ${isDark ? "#3a3a3a" : "var(--color-border)"}`,
                      color: isDark ? "#e5e5e5" : "var(--color-text-primary)",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    <Zap size={12} />
                    Upgrade to Pro
                  </button>
                </div>
                {/* User row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: isDark
                        ? "#3a3a3a"
                        : "var(--color-surface-hover)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: 11,
                      color: isDark ? "#e5e5e5" : "var(--color-text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    TH
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 12,
                        color: isDark ? "#e5e5e5" : "var(--color-text-primary)",
                        fontWeight: 500,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Thuy Huynh
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: isDark ? "#666" : "var(--color-text-tertiary)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      thuy.huynh@c0x12...
                    </div>
                  </div>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <Bell
                      size={16}
                      color={isDark ? "#888" : "var(--color-text-secondary)"}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: -2,
                        right: -2,
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#e53e3e",
                        border: `1px solid ${isDark ? "#111111" : "#ffffff"}`,
                      }}
                    />
                  </div>
                </div>
              </SidebarFooter>
            </Sidebar>

            {/* Main content — skeleton */}
            <SidebarInset
              style={{
                padding: "20px 24px",
                background: isDark ? "#0a0a0a" : "var(--color-surface)",
              }}
            >
              <div
                style={{
                  height: 20,
                  width: "40%",
                  borderRadius: 4,
                  background: isDark ? "#2a2a2a" : "var(--color-border)",
                  marginBottom: 16,
                }}
              />
              {[80, 60, 70].map((w, i) => (
                <div
                  key={i}
                  style={{
                    height: 12,
                    width: `${w}%`,
                    borderRadius: 3,
                    background: isDark ? "#2a2a2a" : "var(--color-border)",
                    marginBottom: 10,
                  }}
                />
              ))}
              <div
                style={{
                  marginTop: 20,
                  height: 100,
                  borderRadius: 8,
                  background: isDark ? "#1a1a1a" : "var(--color-surface-hover)",
                }}
              />
            </SidebarInset>
          </SidebarProvider>
        </div>
      </div>
      <CodeBlock>{`<SidebarProvider defaultOpen style={{ height: "100%" }}>
  <Sidebar collapsible="none">
    <SidebarHeader>
      <img src="/symbol.png" alt="LayerProof" style={{ width: 28, height: 28 }} />
      <span>LayerProof</span>
      <Button variant="secondary" size="sm" className="w-full justify-between">
        Create new design <ChevronDown size={14} />
      </Button>
    </SidebarHeader>
    <SidebarContent>
      <SidebarMenu>
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <SidebarMenuItem key={label}>
            <SidebarMenuButton isActive={active}>
              <Icon size={16} /><span>{label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
    <SidebarFooter>{/* plan card + user row */}</SidebarFooter>
  </Sidebar>
  <SidebarInset style={{ padding: "20px 24px" }}>
    {/* skeleton main content */}
  </SidebarInset>
</SidebarProvider>`}</CodeBlock>
    </div>
  );
}

// ─── Tab: Examples ────────────────────────────────────────────────────────────

function ExamplesTab() {
  return (
    <>
      {/* 1. Basic sidebar */}
      <section className="mb-16">
        <SectionHeading>Basic sidebar</SectionHeading>
        <SectionDesc>
          Wrap your layout in <C>SidebarProvider</C> then place a <C>Sidebar</C>{" "}
          and a <C>SidebarInset</C> as siblings. Use <C>SidebarTrigger</C>{" "}
          inside the sidebar header to toggle open/closed.
        </SectionDesc>
        <LayerProofSidebarPlayground />
      </section>

      {/* 2. Menu groups */}
      <section className="mb-16">
        <SectionHeading>Menu groups</SectionHeading>
        <SectionDesc>
          Use <C>SidebarGroup</C> + <C>SidebarGroupLabel</C> to create labelled
          sections within the sidebar. Each group can hold a <C>SidebarMenu</C>{" "}
          with Lucide icons alongside text labels.
        </SectionDesc>
        <SidebarExample
          label="Menu groups with icons"
          code={`import { LayoutDashboard, Settings, Users } from 'lucide-react';

<SidebarProvider defaultOpen>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarTrigger />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard">
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Users">
              <Users />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <div className="p-6">Main content area</div>
  </SidebarInset>
</SidebarProvider>`}
        >
          <SidebarProvider defaultOpen>
            <Sidebar collapsible="offcanvas">
              <SidebarHeader>
                <SidebarTrigger />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Users">
                        <Users />
                        <span>Users</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
                <SidebarGroup>
                  <SidebarGroupLabel>Account</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Settings">
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div
                className="p-6 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Main content area
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SidebarExample>
      </section>

      {/* 3. Icon-collapse mode */}
      <section className="mb-16">
        <SectionHeading>Icon-collapse mode</SectionHeading>
        <SectionDesc>
          Set <C>collapsible="icon"</C> to collapse the sidebar to an icon-only
          strip. Pass a <C>tooltip</C> string to <C>SidebarMenuButton</C> so
          labels remain accessible when collapsed.
        </SectionDesc>
        <SidebarExample
          label="collapsible=icon"
          code={`<SidebarProvider defaultOpen={false}>
  <Sidebar collapsible="icon">
    <SidebarHeader>
      <SidebarTrigger />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard">
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Analytics">
              <BarChart2 />
              <span>Analytics</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarRail />
  </Sidebar>
  <SidebarInset>
    <div className="p-6">Hover icons to see tooltips</div>
  </SidebarInset>
</SidebarProvider>`}
        >
          <SidebarProvider defaultOpen={false}>
            <Sidebar collapsible="icon">
              <SidebarHeader>
                <SidebarTrigger />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Analytics">
                        <BarChart2 />
                        <span>Analytics</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Settings">
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
              <SidebarRail />
            </Sidebar>
            <SidebarInset>
              <div
                className="p-6 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Sidebar is collapsed to icon strip. Click the trigger or hover
                icons to see tooltips.
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SidebarExample>
      </section>

      {/* 4. Floating variant */}
      <section className="mb-16">
        <SectionHeading>Floating variant</SectionHeading>
        <SectionDesc>
          Use <C>variant="floating"</C> to render the sidebar as an elevated
          card with a shadow. Suited to dashboards where the sidebar should
          visually float above the content.
        </SectionDesc>
        <SidebarExample
          label="variant=floating"
          code={`<SidebarProvider defaultOpen>
  <Sidebar variant="floating" collapsible="offcanvas">
    <SidebarHeader>
      <SidebarTrigger />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Home">
              <Home />
              <span>Home</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Reports">
              <FileText />
              <span>Reports</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <div className="p-6">Main content area</div>
  </SidebarInset>
</SidebarProvider>`}
        >
          <SidebarProvider defaultOpen>
            <Sidebar variant="floating" collapsible="offcanvas">
              <SidebarHeader>
                <SidebarTrigger />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Home">
                        <Home />
                        <span>Home</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Reports">
                        <FileText />
                        <span>Reports</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Settings">
                        <Settings />
                        <span>Settings</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div
                className="p-6 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Main content area
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SidebarExample>
      </section>

      {/* 5. Inset variant */}
      <section className="mb-16">
        <SectionHeading>Inset variant</SectionHeading>
        <SectionDesc>
          Use <C>variant="inset"</C> together with <C>SidebarInset</C> to give
          the main content area rounded card-style inset styling on desktop.
        </SectionDesc>
        <SidebarExample
          label="variant=inset"
          code={`<SidebarProvider defaultOpen>
  <Sidebar variant="inset" collapsible="offcanvas">
    <SidebarHeader>
      <SidebarTrigger />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard">
              <LayoutDashboard />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Users">
              <Users />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <div className="p-6">Inset main content area</div>
  </SidebarInset>
</SidebarProvider>`}
        >
          <SidebarProvider defaultOpen>
            <Sidebar variant="inset" collapsible="offcanvas">
              <SidebarHeader>
                <SidebarTrigger />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Dashboard">
                        <LayoutDashboard />
                        <span>Dashboard</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Users">
                        <Users />
                        <span>Users</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div
                className="p-6 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Inset main content area
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SidebarExample>
      </section>

      {/* 6. Sub-menus */}
      <section className="mb-16">
        <SectionHeading>Sub-menus</SectionHeading>
        <SectionDesc>
          Use <C>SidebarMenuSub</C> + <C>SidebarMenuSubItem</C> +{" "}
          <C>SidebarMenuSubButton</C> for nested navigation under a parent menu
          item. Sub-menus are automatically hidden in icon-collapsed mode.
        </SectionDesc>
        <SidebarExample
          label="Nested sub-menus"
          code={`<SidebarProvider defaultOpen>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarTrigger />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Reports">
              <FileText />
              <span>Reports</span>
            </SidebarMenuButton>
            <SidebarMenuSub>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton href="#">Monthly</SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton href="#">Quarterly</SidebarMenuSubButton>
              </SidebarMenuSubItem>
              <SidebarMenuSubItem>
                <SidebarMenuSubButton href="#" isActive>
                  Annual
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <div className="p-6">Main content area</div>
  </SidebarInset>
</SidebarProvider>`}
        >
          <SidebarProvider defaultOpen>
            <Sidebar collapsible="offcanvas">
              <SidebarHeader>
                <SidebarTrigger />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Platform</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Reports">
                        <FileText />
                        <span>Reports</span>
                      </SidebarMenuButton>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#">
                            Monthly
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#">
                            Quarterly
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton href="#" isActive>
                            Annual
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div
                className="p-6 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Main content area
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SidebarExample>
      </section>

      {/* 7. Menu badges */}
      <section className="mb-16">
        <SectionHeading>Menu badges</SectionHeading>
        <SectionDesc>
          Place a <C>SidebarMenuBadge</C> inside a <C>SidebarMenuItem</C> (after
          the <C>SidebarMenuButton</C>) to show counts or indicators. Badges are
          hidden automatically in icon-collapsed mode.
        </SectionDesc>
        <SidebarExample
          label="Menu badges"
          code={`<SidebarProvider defaultOpen>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarTrigger />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Inbox</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Notifications">
              <Bell />
              <span>Notifications</span>
            </SidebarMenuButton>
            <SidebarMenuBadge>12</SidebarMenuBadge>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Messages">
              <FileText />
              <span>Messages</span>
            </SidebarMenuButton>
            <SidebarMenuBadge>3</SidebarMenuBadge>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <div className="p-6">Main content area</div>
  </SidebarInset>
</SidebarProvider>`}
        >
          <SidebarProvider defaultOpen>
            <Sidebar collapsible="offcanvas">
              <SidebarHeader>
                <SidebarTrigger />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Inbox</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Notifications">
                        <Bell />
                        <span>Notifications</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>12</SidebarMenuBadge>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton tooltip="Messages">
                        <FileText />
                        <span>Messages</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>3</SidebarMenuBadge>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div
                className="p-6 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Main content area
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SidebarExample>
      </section>

      {/* 8. Loading skeleton */}
      <section className="mb-16">
        <SectionHeading>Loading skeleton</SectionHeading>
        <SectionDesc>
          Use <C>SidebarMenuSkeleton</C> during data loading to prevent layout
          shift. Pass <C>showIcon</C> when the loaded item will include an icon.
        </SectionDesc>
        <SidebarExample
          label="SidebarMenuSkeleton"
          code={`<SidebarProvider defaultOpen>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarTrigger />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Loading…</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuSkeleton />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    <div className="p-6">Loading content…</div>
  </SidebarInset>
</SidebarProvider>`}
        >
          <SidebarProvider defaultOpen>
            <Sidebar collapsible="offcanvas">
              <SidebarHeader>
                <SidebarTrigger />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Loading…</SidebarGroupLabel>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuSkeleton showIcon />
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuSkeleton />
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
            <SidebarInset>
              <div
                className="p-6 text-sm"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Loading content…
              </div>
            </SidebarInset>
          </SidebarProvider>
        </SidebarExample>
      </section>
    </>
  );
}

// ─── Tab: Code ────────────────────────────────────────────────────────────────

function CodeTab() {
  return (
    <section className="mb-16">
      <CodeBlock>{`import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
} from '@/components/ui/sidebar';

<SidebarProvider>
  <Sidebar collapsible="offcanvas">
    <SidebarHeader>
      <SidebarTrigger />
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>Dashboard</SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    {/* main content */}
  </SidebarInset>
</SidebarProvider>`}</CodeBlock>

      {/* Component summary table */}
      <div className="mt-10 mb-6">
        <h3
          className="mb-4 text-sm font-semibold uppercase tracking-widest"
          style={{
            color: "var(--color-text-tertiary)",
            fontFamily: "var(--font-body)",
          }}
        >
          Component summary
        </h3>
        <div
          className="rounded-xl overflow-hidden text-sm"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--color-surface-hover)" }}>
                <th
                  className="px-4 py-3 text-left font-semibold"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Component
                </th>
                <th
                  className="px-4 py-3 text-left font-semibold"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Element
                </th>
                <th
                  className="px-4 py-3 text-left font-semibold"
                  style={{
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Purpose
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                [
                  "SidebarProvider",
                  "div",
                  "Context provider — wraps the entire sidebar layout",
                ],
                [
                  "Sidebar",
                  "div",
                  "The sidebar panel itself; accepts variant and collapsible props",
                ],
                [
                  "SidebarTrigger",
                  "button",
                  "Toggle button for expanding/collapsing the sidebar",
                ],
                [
                  "SidebarRail",
                  "button",
                  "Drag handle for resizing / collapse on the sidebar edge",
                ],
                [
                  "SidebarHeader",
                  "div",
                  "Top slot inside the sidebar (logo, trigger, search)",
                ],
                [
                  "SidebarFooter",
                  "div",
                  "Bottom slot inside the sidebar (user profile, logout)",
                ],
                [
                  "SidebarContent",
                  "div",
                  "Scrollable middle area that holds groups and menus",
                ],
                [
                  "SidebarGroup",
                  "div",
                  "A logical grouping with optional label and action",
                ],
                ["SidebarGroupLabel", "div", "Section heading inside a group"],
                ["SidebarMenu", "ul", "Ordered list container for menu items"],
                ["SidebarMenuItem", "li", "Individual menu entry wrapper"],
                [
                  "SidebarMenuButton",
                  "button",
                  "Interactive menu item; supports icons, tooltip, isActive",
                ],
                [
                  "SidebarMenuBadge",
                  "div",
                  "Count/indicator badge on a menu item",
                ],
                [
                  "SidebarMenuSkeleton",
                  "div",
                  "Placeholder skeleton for loading states",
                ],
                [
                  "SidebarMenuSub",
                  "ul",
                  "Nested sub-menu list under a parent item",
                ],
                ["SidebarMenuSubItem", "li", "Sub-menu entry wrapper"],
                [
                  "SidebarMenuSubButton",
                  "a",
                  "Interactive sub-menu link; supports isActive",
                ],
                [
                  "SidebarInset",
                  "main",
                  "Main content area; gets inset styling when variant=inset",
                ],
                [
                  "SidebarSeparator",
                  "hr",
                  "Visual divider between sidebar sections",
                ],
                [
                  "SidebarInput",
                  "input",
                  "Search input styled for the sidebar context",
                ],
              ].map(([component, element, purpose], i) => (
                <tr
                  key={component}
                  style={{
                    background:
                      i % 2 === 0 ? "var(--color-surface)" : "transparent",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <td className="px-4 py-3">
                    <C>{component}</C>
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                    }}
                  >
                    {element}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {purpose}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Reference — SidebarProvider */}
      <div className="mt-10 mb-6">
        <h3
          className="mb-4 text-sm font-semibold uppercase tracking-widest"
          style={{
            color: "var(--color-text-tertiary)",
            fontFamily: "var(--font-body)",
          }}
        >
          API Reference — SidebarProvider
        </h3>
        <div
          className="rounded-xl overflow-hidden text-sm"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--color-surface-hover)" }}>
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold"
                    style={{
                      color: "var(--color-text-primary)",
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
                [
                  "defaultOpen",
                  "boolean",
                  "true",
                  "Initial open state (uncontrolled)",
                ],
                ["open", "boolean", "—", "Controlled open state"],
                [
                  "onOpenChange",
                  "(open: boolean) => void",
                  "—",
                  "Callback when open state changes",
                ],
              ].map(([prop, type, def, desc], i) => (
                <tr
                  key={prop}
                  style={{
                    background:
                      i % 2 === 0 ? "var(--color-surface)" : "transparent",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <td className="px-4 py-3">
                    <C>{prop}</C>
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                    }}
                  >
                    {type}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                    }}
                  >
                    {def}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Reference — Sidebar */}
      <div className="mt-10 mb-6">
        <h3
          className="mb-4 text-sm font-semibold uppercase tracking-widest"
          style={{
            color: "var(--color-text-tertiary)",
            fontFamily: "var(--font-body)",
          }}
        >
          API Reference — Sidebar
        </h3>
        <div
          className="rounded-xl overflow-hidden text-sm"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--color-surface-hover)" }}>
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold"
                    style={{
                      color: "var(--color-text-primary)",
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
                [
                  "side",
                  '"left" | "right"',
                  '"left"',
                  "Which side of the viewport the sidebar appears on",
                ],
                [
                  "variant",
                  '"sidebar" | "floating" | "inset"',
                  '"sidebar"',
                  "Visual treatment of the sidebar panel",
                ],
                [
                  "collapsible",
                  '"offcanvas" | "icon" | "none"',
                  '"offcanvas"',
                  "How the sidebar collapses on desktop",
                ],
              ].map(([prop, type, def, desc], i) => (
                <tr
                  key={prop}
                  style={{
                    background:
                      i % 2 === 0 ? "var(--color-surface)" : "transparent",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <td className="px-4 py-3">
                    <C>{prop}</C>
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                    }}
                  >
                    {type}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                    }}
                  >
                    {def}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* API Reference — SidebarMenuButton */}
      <div className="mt-10">
        <h3
          className="mb-4 text-sm font-semibold uppercase tracking-widest"
          style={{
            color: "var(--color-text-tertiary)",
            fontFamily: "var(--font-body)",
          }}
        >
          API Reference — SidebarMenuButton
        </h3>
        <div
          className="rounded-xl overflow-hidden text-sm"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <table className="w-full">
            <thead>
              <tr style={{ background: "var(--color-surface-hover)" }}>
                {["Prop", "Type", "Default", "Description"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left font-semibold"
                    style={{
                      color: "var(--color-text-primary)",
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
                [
                  "asChild",
                  "boolean",
                  "false",
                  "Render as the child element using Radix Slot",
                ],
                [
                  "isActive",
                  "boolean",
                  "false",
                  "Marks the button as the currently active route",
                ],
                [
                  "variant",
                  '"default" | "outline"',
                  '"default"',
                  "Visual style of the menu button",
                ],
                [
                  "size",
                  '"default" | "sm" | "lg"',
                  '"default"',
                  "Height and text size of the menu button",
                ],
                [
                  "tooltip",
                  "string | TooltipContentProps",
                  "—",
                  "Tooltip shown when sidebar is icon-collapsed",
                ],
              ].map(([prop, type, def, desc], i) => (
                <tr
                  key={prop}
                  style={{
                    background:
                      i % 2 === 0 ? "var(--color-surface)" : "transparent",
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <td className="px-4 py-3">
                    <C>{prop}</C>
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                    }}
                  >
                    {type}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-tertiary)",
                      fontFamily: "var(--font-mono)",
                      fontSize: 12,
                    }}
                  >
                    {def}
                  </td>
                  <td
                    className="px-4 py-3"
                    style={{
                      color: "var(--color-text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {desc}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Tab: Usage ───────────────────────────────────────────────────────────────

function UsageTab() {
  return (
    <section className="mb-16">
      <div className="space-y-3">
        {[
          {
            rule: "Wrap the entire layout in SidebarProvider",
            desc: "All sidebar state lives in context. Components like SidebarTrigger and SidebarMenuButton rely on useSidebar() internally — they will throw if rendered outside a SidebarProvider.",
          },
          {
            rule: 'Use collapsible="icon" when horizontal space is at a premium',
            desc: 'Icon mode collapses to a narrow strip (3rem) while keeping icons visible. Use collapsible="offcanvas" when full hide/show behaviour is more appropriate, such as on mobile-first layouts.',
          },
          {
            rule: "Always pass tooltip to SidebarMenuButton in icon mode",
            desc: "When the sidebar is icon-collapsed the text label is hidden. A tooltip prop ensures the label remains accessible via hover and is announced to screen readers through the TooltipContent.",
          },
          {
            rule: 'Use variant="floating" for elevated dashboards, variant="inset" for card-style main areas',
            desc: "Floating renders the sidebar as a raised card with shadow, suited to tools where the sidebar should feel separate from the content. Inset gives SidebarInset rounded card-style styling on desktop.",
          },
          {
            rule: "Use SidebarMenuSkeleton during data loading",
            desc: "Render SidebarMenuSkeleton items in place of real SidebarMenuButton items while async data is loading. Pass showIcon when the loaded items will include an icon so the skeleton width and layout match.",
          },
          {
            rule: 'Don\'t render SidebarRail alongside collapsible="none"',
            desc: 'SidebarRail is a visual drag-to-collapse handle. When collapsible is "none" the sidebar cannot be collapsed so SidebarRail provides no function and adds visual noise.',
          },
          {
            rule: "Mobile handling is automatic — no extra code needed",
            desc: "SidebarProvider detects mobile viewports via the useIsMobile hook and automatically switches the sidebar to a Sheet overlay. Call toggleSidebar() (from useSidebar) or use SidebarTrigger to open it.",
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
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function SidebarPage() {
  return (
    <ComponentShell
      title="Sidebar"
      description="A collapsible navigation panel that supports menus, groups, sub-items, badges, and responsive mobile behaviour. Built as a compound component system controlled by SidebarProvider."
      tabs={["Examples", "Code", "Usage"]}
    >
      {(activeTab: string) => {
        if (activeTab === "Code") return <CodeTab />;
        if (activeTab === "Usage") return <UsageTab />;
        return <ExamplesTab />;
      }}
    </ComponentShell>
  );
}
