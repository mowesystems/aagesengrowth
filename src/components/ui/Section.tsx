import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'light' | 'navy' | 'off-white';
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'light',
  id,
}) => {
  const bg = {
    light: 'bg-bg-light',
    navy: 'bg-navy text-off-white',
    'off-white': 'bg-off-white',
  }[background];

  return (
    <section id={id} className={`${bg} ${className}`}>
      <div className="max-w-content mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
};

export default Section;
