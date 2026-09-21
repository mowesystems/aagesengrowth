import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';

/**
 * The line that follows the reader.
 *
 * A hairline in the left gutter of the homepage, from the first section after
 * the hero to the last before the close. It fills in cobalt as the page is
 * read, with the signal at its tip — the same signal that entered the engine
 * in the hero, still travelling. Desktop only: on a phone the gutter is
 * needed for content.
 */
const Spine: React.FC = () => {
  const ref = useScrollProgress<HTMLDivElement>();
  return <div ref={ref} aria-hidden="true" className="spine left-6 hidden lg:block 2xl:left-9" />;
};

export default Spine;
