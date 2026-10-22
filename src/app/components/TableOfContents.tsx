import { useEffect, useRef } from 'react';
import { useToc } from '../context/TocContext';

export function TableOfContents() {
  const { items, activeId, setActiveId } = useToc();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: 0 },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observerRef.current!.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [items, setActiveId]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 88;
      window.scrollTo({ top, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  if (items.length === 0) return null;

  return (
    <nav aria-label="On this page">
      <p className="lp-toc__title">On this page</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <button
              data-level={item.level ?? 1}
              aria-current={activeId === item.id ? 'true' : undefined}
              onClick={() => scrollToSection(item.id)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
