# Brand Guidelines Website

A modern, scalable Brand Guidelines website built with React, TypeScript, and Tailwind CSS. This project provides a complete design system documentation site that's easy to customize, maintain, and extend.

## 🛠️ Tech Stack

- **React 18.3** - Modern React with hooks
- **TypeScript 5.8** - Type-safe JavaScript
- **Vite 6.3** - Lightning-fast build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **Lucide React** - Beautiful icon library

## 🎨 Features

- **Multi-Page Architecture**: Separate pages for Brand, Foundations, Components, Layout, and Resources
- **Dark/Light Mode**: Full theme support with automatic persistence
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smart Navigation**: Horizontal tabs with scroll spy on content pages
- **Interactive Elements**: Copy-to-clipboard for color codes, smooth scrolling, hover effects
- **Customizable Design Tokens**: All colors, typography, and spacing controlled via CSS variables
- **Modern Components**: Pre-built UI components following best practices
- **Clean Architecture**: Well-organized component structure for easy maintenance

## 📁 Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Main app with router
│   ├── routes.ts                  # Route configuration
│   ├── layouts/
│   │   └── RootLayout.tsx         # Main layout with sidebar & footer
│   ├── pages/
│   │   ├── HomePage.tsx           # Landing page with overview
│   │   ├── BrandAssetsPage.tsx    # Brand identity guidelines
│   │   ├── ComponentsPage.tsx     # UI components library
│   │   └── NotFoundPage.tsx       # 404 error page
│   └── components/
│       ├── SidebarNavigation.tsx  # Page navigation sidebar
│       ├── HeroSection.tsx        # Hero/overview section
│       ├── LogoSection.tsx        # Logo guidelines
│       ├── ColorsSection.tsx      # Color palette with copy feature
│       ├── TypographySection.tsx  # Typography scale and examples
│       ├── ComponentsSection.tsx  # UI component showcase
│       └── VoiceSection.tsx       # Voice & tone guidelines
└── styles/
    ├── brand-variables.css        # Design tokens (CUSTOMIZE HERE!)
    ├── index.css                  # Main stylesheet
    └── theme.css                  # Tailwind theme configuration
```

## 🎯 Quick Customization Guide

### 1. Change Brand Colors

Edit `/src/styles/brand-variables.css`:

```css
:root {
  --brand-primary: #6366f1;        /* Your primary color */
  --brand-secondary: #8b5cf6;      /* Your secondary color */
  --brand-accent: #ec4899;         /* Your accent color */
  /* ... more colors ... */
}
```

### 2. Update Typography

Change fonts in `/src/styles/brand-variables.css`:

```css
:root {
  --font-heading: 'Your Font', sans-serif;
  --font-body: 'Your Font', sans-serif;
}
```

Don't forget to import your fonts in `/src/styles/fonts.css`.

### 3. Modify Spacing & Borders

Adjust spacing, border radius, and shadows in `/src/styles/brand-variables.css`:

```css
:root {
  --spacing-md: 1rem;
  --radius-md: 0.5rem;
  --shadow-md: 0 4px 6px rgb(0 0 0 / 0.1);
}
```

### 4. Add New Pages

To add a new page to the site:

1. Create a new page in `/src/app/pages/YourPage.tsx`
2. Add the route in `/src/app/routes.ts`
3. Update the navigation in `/src/app/components/SidebarNavigation.tsx`

Example:
```tsx
// In routes.ts
{ path: "your-page", Component: YourPage },

// In SidebarNavigation.tsx
const pages = [
  // ... existing pages
  { path: '/your-page', label: 'Your Page', icon: YourIcon },
];
```

### 5. Add New Sections Within Pages

To add sections to Brand Assets or Components pages:

1. Create a new component in `/src/app/components/YourSection.tsx`
2. Import and add it to the relevant page (BrandAssetsPage or ComponentsPage)
3. Update the scroll spy sections array if needed

### 6. Customize Color Palette

Edit the colors array in `/src/app/components/ColorsSection.tsx`:

```tsx
const colors = [
  {
    name: 'Your Color',
    hex: '#000000',
    rgb: 'rgb(0, 0, 0)',
    usage: 'Description of when to use this color'
  },
  // ... more colors
];
```

### 7. Update Logo Examples

Modify `/src/app/components/LogoSection.tsx` to show your actual logo:

```tsx
// Replace the placeholder logo with your own
<img src="/path/to/your/logo.svg" alt="Your Logo" />
```

## 🚀 Getting Started

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd brand-guidelines
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5173`

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

### Customization

1. **Customize the design tokens** in `/src/styles/brand-variables.css`

2. **Update content** in each section component

3. **Add your logo and assets** to the appropriate sections

4. **Test responsive behavior** on different screen sizes

## 🎨 Design System Components

### Available CSS Classes

- `.brand-btn` - Base button styles
- `.brand-btn-primary` - Primary button variant
- `.brand-card` - Card container with hover effects
- `.color-swatch` - Color display with copy functionality
- `.heading-display`, `.heading-1`, `.heading-2` - Typography styles
- `.fade-in-up`, `.fade-in` - Animation classes

### Component Library

All reusable components are showcased in the Components section:
- Buttons (Primary, Secondary, Text)
- Input Fields (with icons and states)
- Cards
- Badges
- And more...

## 📱 Responsive Behavior

- **Desktop (1024px+)**: Sidebar is always visible on the left
- **Tablet/Mobile (<1024px)**: Hamburger menu toggles sidebar
- **All screens**: Content is fluid and adapts to viewport width

## ✨ Interactive Features

- **Copy to Clipboard**: Click any color swatch to copy its HEX code
- **Smooth Scrolling**: Navigation smoothly scrolls to sections
- **Scroll Spy**: Sidebar highlights the currently visible section
- **Hover Effects**: Components respond to user interaction

## 🔧 Advanced Customization

### Changing Animations

Animations are defined in `/src/styles/brand-variables.css`:

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);

@keyframes fadeInUp { /* ... */ }
```

### Adding New Component Variants

Create new variants by combining existing CSS variables:

```css
.brand-btn-danger {
  background-color: var(--color-error);
  color: white;
}
```

### Customizing the Sidebar

Edit `/src/app/components/Sidebar.tsx` to change:
- Width (currently 280px)
- Mobile breakpoint (currently lg:1024px)
- Section list and labels

## 📖 Documentation

Each section component is self-documenting with clear examples:
- **Logo Section**: Guidelines for logo usage
- **Colors Section**: Full palette with usage notes
- **Typography Section**: Complete type scale
- **Components Section**: Interactive component showcase
- **Voice & Tone Section**: Writing guidelines and examples

## 🎓 Best Practices

1. **Always use CSS variables** instead of hardcoded values
2. **Keep components modular** and reusable
3. **Maintain accessibility** (proper contrast, keyboard navigation)
4. **Test on multiple devices** before deploying
5. **Update the Last Updated date** in the sidebar when making changes

## 🌟 Reusing for Other Brands

This system is designed to be reusable:

1. **Fork or duplicate** the project
2. **Update all design tokens** in `brand-variables.css`
3. **Replace content** in each section component
4. **Add/remove sections** as needed for your brand
5. **Customize the footer** and navigation labels

## 📄 License

This brand guidelines template is provided as-is for use in your projects.

---

**Need Help?** Check the inline comments in each component file for detailed guidance.