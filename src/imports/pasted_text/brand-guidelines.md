Create a modern, scalable Brand Guidelines website project with a well-structured folder architecture that is easy to customize, maintain, and extend.

The output should be a complete frontend project, not a single file.

Tech Stack
HTML5
CSS3 (preferably using CSS variables + modular structure or SCSS if supported)
Vanilla JavaScript (no heavy frameworks)
Optional: lightweight utility system (like custom utility classes)
Project Structure

Generate the project with the following folder structure:

brand-guidelines/
│
├── index.html
├── /assets
│   ├── /images
│   ├── /icons
│   └── /fonts
│
├── /styles
│   ├── base.css          (reset, typography, global styles)
│   ├── variables.css     (colors, spacing, typography tokens)
│   ├── layout.css        (grid, containers, spacing system)
│   ├── components.css    (buttons, cards, inputs, etc.)
│   └── sections.css      (hero, logo, color palette, etc.)
│
├── /scripts
│   ├── main.js           (entry point)
│   ├── navigation.js     (scroll spy, sidebar behavior)
│   ├── clipboard.js      (copy color codes)
│   └── animations.js     (fade-in, transitions)
│
├── /components
│   ├── header.html
│   ├── sidebar.html
│   ├── footer.html
│   └── section-template.html
│
└── README.md
Customization System (IMPORTANT)

Design the system so it’s easy to customize:

1. Design Tokens

All brand values must be controlled in one place:

Colors
Typography
Spacing
Border radius
Shadows

Use variables.css like:

:root {
  --color-primary: #000;
  --color-secondary: #666;
  --font-heading: 'Inter', sans-serif;
  --spacing-md: 16px;
}
2. Reusable Components

Build reusable UI components:

Buttons
Cards
Color swatches
Typography previews

Each component should:

Be modular
Use variables only (no hardcoded styles)
Be easily reusable across sections
3. Section-Based Architecture

Each guideline section should be clearly separated:

Hero
Logo
Colors
Typography
Components
Voice & Tone

Use consistent class naming like:

.section
.section--colors
.section--typography
4. Navigation System
Sticky sidebar navigation
Scroll spy (active section highlight)
Smooth scrolling
Mobile collapsible menu
5. Interactivity

Implement:

Copy-to-clipboard for color codes
Hover states for components
Fade-in animations on scroll
6. Documentation (README.md)

Include a README that explains:

Project structure
How to change brand colors
How to add new sections
How to modify components
How to reuse this system for other brands
Design Style
Clean, minimal, modern (inspired by design systems like Stripe / Notion)
Generous whitespace
Rounded corners (8–12px)
Subtle shadows
Clear hierarchy
Output Requirements
Provide all files with code content
Clearly label each file
Ensure code is clean and well-commented
Ensure the system is scalable and reusable for other brands
Goal

The final result should feel like a mini design system + documentation site, not just a static page — something a team can reuse to maintain consistent branding across products.