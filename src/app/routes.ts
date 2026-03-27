import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { BrandPage } from "./pages/BrandPage";
import { FoundationsPage } from "./pages/FoundationsPage";
import { ComponentsPage } from "./pages/ComponentsPage";
import { LayoutPage } from "./pages/LayoutPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { GetStartedDesignersPage } from "./pages/GetStartedDesignersPage";
import { GetStartedDevelopersPage } from "./pages/GetStartedDevelopersPage";
import { GetStartedBrandPage } from "./pages/GetStartedBrandPage";
import { GetStartedCheatSheetPage } from "./pages/GetStartedCheatSheetPage";
// Foundation sub-pages
import { TokensPage } from "./pages/foundations/TokensPage";
import { TokensExplainedPage } from "./pages/foundations/TokensExplainedPage";
import { TokensCodePage } from "./pages/foundations/TokensCodePage";
import { TokensDesignPage } from "./pages/foundations/TokensDesignPage";
import { TokensMigratePage } from "./pages/foundations/TokensMigratePage";
import { AccessibilityPage } from "./pages/foundations/AccessibilityPage";
import { ContentPage } from "./pages/foundations/ContentPage";
import { SpacingPage } from "./pages/foundations/SpacingPage";
import { GridPage } from "./pages/foundations/GridPage";
import { ColorPage } from "./pages/foundations/ColorPage";
import { TypographyPage } from "./pages/foundations/TypographyPage";
import { IconographyPage } from "./pages/foundations/IconographyPage";
import { IllustrationsPage } from "./pages/foundations/IllustrationsPage";
import { LogosPage } from "./pages/foundations/LogosPage";
import { ElevationPage } from "./pages/foundations/ElevationPage";
// Component sub-pages
import { ButtonPage } from "./pages/components/ButtonPage";
import { ButtonIconPage } from "./pages/components/ButtonIconPage";
import { ButtonLinkPage } from "./pages/components/ButtonLinkPage";
import { ButtonLinkIconPage } from "./pages/components/ButtonLinkIconPage";
import { ButtonSplitPage } from "./pages/components/ButtonSplitPage";
import { ButtonGroupPage } from "./pages/components/ButtonGroupPage";
import { ButtonLegacyPage } from "./pages/components/ButtonLegacyPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "get-started/designers",  Component: GetStartedDesignersPage },
      { path: "get-started/developers", Component: GetStartedDevelopersPage },
      { path: "get-started/brand",        Component: GetStartedBrandPage },
      { path: "get-started/cheat-sheet", Component: GetStartedCheatSheetPage },
      { path: "brand",        Component: BrandPage },
      { path: "foundations",  Component: FoundationsPage },
      // Foundation sub-pages
      { path: "foundations/tokens",            Component: TokensPage },
      { path: "foundations/tokens/explained",  Component: TokensExplainedPage },
      { path: "foundations/tokens/code",       Component: TokensCodePage },
      { path: "foundations/tokens/design",     Component: TokensDesignPage },
      { path: "foundations/tokens/migrate",    Component: TokensMigratePage },
      { path: "foundations/accessibility",     Component: AccessibilityPage },
      { path: "foundations/content",           Component: ContentPage },
      { path: "foundations/spacing",           Component: SpacingPage },
      { path: "foundations/grid",              Component: GridPage },
      { path: "foundations/color",             Component: ColorPage },
      { path: "foundations/typography",        Component: TypographyPage },
      { path: "foundations/iconography",       Component: IconographyPage },
      { path: "foundations/illustrations",     Component: IllustrationsPage },
      { path: "foundations/logos",             Component: LogosPage },
      { path: "foundations/elevation",         Component: ElevationPage },
      { path: "components",                    Component: ComponentsPage },
      { path: "components/button",             Component: ButtonPage },
      { path: "components/button/icon",        Component: ButtonIconPage },
      { path: "components/button/link",        Component: ButtonLinkPage },
      { path: "components/button/link-icon",   Component: ButtonLinkIconPage },
      { path: "components/button/split",       Component: ButtonSplitPage },
      { path: "components/button/group",       Component: ButtonGroupPage },
      { path: "components/button/legacy",      Component: ButtonLegacyPage },
      { path: "layout",       Component: LayoutPage },
      { path: "resources",    Component: ResourcesPage },
      { path: "*",            Component: NotFoundPage },
    ],
  },
], { basename: import.meta.env.BASE_URL });