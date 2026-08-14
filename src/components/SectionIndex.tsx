import React from 'react';

export interface SectionLink {
  id: string;
  label: string;
}

interface SectionIndexProps {
  links: SectionLink[];
  'aria-label': string;
}

/**
 * A sticky in-page index.
 *
 * Sits directly under the fixed header and tracks which section is in view, so
 * a long page always says where you are and what else is on it. It scrolls
 * horizontally on narrow screens rather than wrapping to two rows, which would
 * change the page's offset as the labels reflow.
 */
const SectionIndex: React.FC<SectionIndexProps> = ({ links, 'aria-label': ariaLabel }) => {
  const [active, setActive] = React.useState<string>(links[0]?.id ?? '');

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const targets = links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The topmost section currently crossing the reading line wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [links]);

  return (
    <nav
      aria-label={ariaLabel}
      className="sticky top-[4.4rem] z-30 border-b border-paper/10 bg-ink/90 backdrop-blur-xl lg:top-[5.25rem]"
    >
      <div className="frame">
        <ul className="-mx-1 flex items-center gap-1 overflow-x-auto py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.id} className="shrink-0">
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative inline-flex min-h-11 items-center px-3.5 font-mono text-[0.64rem] uppercase tracking-[0.16em] transition-colors ${
                    isActive ? 'text-paper' : 'text-muted hover:text-paper'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className={`iris-rule absolute bottom-1.5 left-3.5 h-px transition-[width] duration-300 ${
                      isActive ? 'w-[calc(100%-1.75rem)]' : 'w-0'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default SectionIndex;
