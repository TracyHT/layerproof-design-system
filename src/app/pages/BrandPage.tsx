import { useEffect } from 'react';
import { LogoSection } from '../components/LogoSection';
import { VoiceSection } from '../components/VoiceSection';
import { useToc } from '../context/TocContext';

const tocItems = [
  { id: 'overview',   label: 'Overview',     level: 1 as const },
  { id: 'logo',       label: 'Logo',         level: 1 as const },
  { id: 'our-logo',   label: 'Our Logo',     level: 2 as const },
  { id: 'symbol',     label: 'Symbol',       level: 2 as const },
  { id: 'clearspace', label: 'Clearspace',   level: 2 as const },
  { id: 'values',     label: 'Brand Values', level: 1 as const },
  { id: 'voice',      label: 'Voice & Tone', level: 1 as const },
];

export function BrandPage() {
  const { setItems } = useToc();

  useEffect(() => {
    setItems(tocItems);
    return () => setItems([]);
  }, [setItems]);

  return (
    <div>
      {/* Overview */}
      <section id="overview" className="mb-20">
        <p className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-tertiary)' }}>
          Brand
        </p>
        <h1>Brand Identity</h1>
        <p className="mt-4 text-lg" style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-secondary)', maxWidth: 560 }}>
          Our brand represents clarity, authority, and precision. Every element is intentionally crafted to communicate our values and vision.
        </p>
      </section>

      {/* Logo */}
      <section id="logo" className="mb-20">
        <LogoSection />
      </section>

      {/* Brand Values */}
      <section id="values" className="mb-20">
        <h2 className="mb-8">Brand Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: 'Clarity',    description: 'We communicate with precision and purpose, making complex ideas accessible.' },
            { title: 'Authority',  description: 'We establish trust through expertise, backed by research and insight.' },
            { title: 'Innovation', description: 'We challenge conventions and push boundaries to create meaningful change.' },
          ].map(({ title, description }) => (
            <div key={title} className="rounded-xl p-6" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <h3 className="mb-3">{title}</h3>
              <p className="text-sm" style={{ fontFamily: '"Roboto", sans-serif', color: 'var(--color-text-secondary)', textTransform: 'none' }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Voice & Tone */}
      <section id="voice" className="mb-20">
        <VoiceSection />
      </section>

      {/* Mission */}
      <section id="mission" className="mb-20 rounded-2xl p-10" style={{ background: '#000000', border: '1px solid var(--color-border)' }}>
        <div className="h-1 w-12 mb-6" style={{ background: '#f0d040' }} />
        <h2 className="mb-4" style={{ color: '#ffffff' }}>Our Mission</h2>
        <p className="text-lg" style={{ fontFamily: '"Roboto", sans-serif', color: 'rgba(255,255,255,0.6)', maxWidth: 560 }}>
          To architect meaningful narratives that inspire action, build understanding, and create lasting impact through exceptional editorial craftsmanship.
        </p>
      </section>
    </div>
  );
}
