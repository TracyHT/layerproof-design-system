import { Download, ExternalLink, FileText, Package } from 'lucide-react';
import { FoundationShell } from '../components/FoundationShell';

const tocItems = [
  { id: 'overview', label: 'Overview', level: 1 },
  { id: 'downloads', label: 'Downloads', level: 1 },
  { id: 'links', label: 'External Links', level: 1 },
  { id: 'usage', label: 'Usage Guidelines', level: 1 },
  { id: 'contact', label: 'Contact', level: 1 },
];

export function ResourcesPage() {
  return (
    <FoundationShell
      tag="Resources"
      title="Resources"
      description="Download assets, access tools, and find everything you need to implement our brand guidelines."
      tocItems={tocItems}
    >
      <section id="overview" className="mb-16">
        <p className="text-lg text-[var(--color-text-secondary)]">
          Everything you need to work with the LayerProof brand — from Figma files and logo packages to code libraries and contact information.
        </p>
      </section>

      <section id="downloads" className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Downloads</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'Logo Package',
              description: 'All logo variations in SVG, PNG, and PDF formats',
              size: '2.4 MB',
              icon: Package,
            },
            {
              title: 'Brand Guidelines PDF',
              description: 'Complete brand guidelines in a single PDF document',
              size: '8.1 MB',
              icon: FileText,
            },
            {
              title: 'Design System Figma',
              description: 'Figma file with all components and styles',
              size: 'External',
              icon: ExternalLink,
            },
            {
              title: 'Icon Library',
              description: 'Custom icon set in multiple formats',
              size: '1.2 MB',
              icon: Download,
            },
          ].map((resource) => (
            <button
              key={resource.title}
              className="bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)] hover:border-[var(--brand-primary)] hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[var(--brand-primary)] bg-opacity-10 rounded-lg group-hover:bg-opacity-20 transition-all">
                  <resource.icon className="text-[var(--brand-primary)]" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{resource.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] mb-2">{resource.description}</p>
                  <span className="text-xs text-[var(--color-text-tertiary)]">{resource.size}</span>
                </div>
                <Download className="text-[var(--color-text-tertiary)] group-hover:text-[var(--brand-primary)] transition-colors" size={20} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <section id="links" className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">External Links</h2>
        <div className="space-y-4">
          {[
            { title: 'GitHub Repository', url: 'github.com/yourbrand/design-system', description: 'View source code and contribute' },
            { title: 'Figma Community', url: 'figma.com/@yourbrand', description: 'Duplicate our design files' },
            { title: 'Storybook', url: 'storybook.yourbrand.com', description: 'Interactive component documentation' },
            { title: 'NPM Package', url: 'npmjs.com/package/@yourbrand/ui', description: 'Install our component library' },
          ].map((link) => (
            <a
              key={link.title}
              href={`https://${link.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between bg-[var(--color-surface)] p-6 rounded-lg border border-[var(--color-border)] hover:border-[var(--brand-primary)] hover:shadow-lg transition-all group"
            >
              <div>
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--brand-primary)] transition-colors">{link.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)] mb-1">{link.description}</p>
                <span className="text-xs text-[var(--color-text-tertiary)] font-mono">{link.url}</span>
              </div>
              <ExternalLink className="text-[var(--color-text-tertiary)] group-hover:text-[var(--brand-primary)] transition-colors flex-shrink-0" size={20} />
            </a>
          ))}
        </div>
      </section>

      <section id="usage" className="mb-16">
        <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8">Usage Guidelines</h2>
        <div className="bg-[var(--color-surface)] p-8 rounded-lg border border-[var(--color-border)]">
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">License & Attribution</h3>
          <div className="space-y-4 text-[var(--color-text-secondary)]">
            <p>
              Our brand assets are available for use by authorized partners and team members. Please review the following guidelines:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Do not modify or alter logos without approval</li>
              <li>Maintain minimum clear space around logos</li>
              <li>Use approved color variations only</li>
              <li>Do not use outdated brand assets</li>
              <li>Contact brand@yourbrand.com for questions</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[var(--brand-primary)] text-white p-12 rounded-2xl mb-16">
        <h2 className="text-3xl font-bold mb-4">Need Something Else?</h2>
        <p className="text-lg opacity-90 mb-6">
          If you can't find what you're looking for, reach out to our brand team for assistance.
        </p>
        <a
          href="mailto:brand@yourbrand.com"
          className="inline-flex items-center gap-2 bg-white text-[var(--brand-primary)] px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Contact Brand Team
          <ExternalLink size={18} />
        </a>
      </section>
    </FoundationShell>
  );
}
