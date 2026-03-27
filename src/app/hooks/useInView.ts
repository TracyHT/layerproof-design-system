import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
  /** Animation class to add when element enters viewport. Default: 'anim-fade-up' */
  animation?: string;
  /** IntersectionObserver threshold. Default: 0.15 */
  threshold?: number;
  /** Only trigger once. Default: true */
  once?: boolean;
}

/**
 * Scroll-triggered animation hook.
 *
 * Usage:
 *   const ref = useInView<HTMLDivElement>();
 *   <div ref={ref} className="animate-on-scroll">...</div>
 *
 * Custom animation:
 *   const ref = useInView<HTMLDivElement>({ animation: 'anim-fade-right delay-300' });
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { animation = 'anim-fade-up', threshold = 0.15, once = true } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animation.split(' ').forEach((cls) => el.classList.add(cls));
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
          animation.split(' ').forEach((cls) => el.classList.remove(cls));
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, threshold, once]);

  return ref;
}
