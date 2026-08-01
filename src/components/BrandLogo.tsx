import React, { useState } from 'react';
import company from '@/config/company';

interface BrandLogoProps {
  light?: boolean;
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ light = false, className = '' }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className={`inline-flex flex-col font-sans font-semibold uppercase leading-none tracking-[0.16em] ${light ? 'text-off-white' : 'text-navy'} ${className}`}>
        <span className="text-base">Aagesen</span>
        <span className="mt-1 text-[0.62rem] tracking-[0.32em] text-accent">Growth</span>
      </span>
    );
  }

  return (
    <img
      src={company.logoPath}
      alt="Aagesen Growth"
      className={`${light ? 'brightness-0 invert' : ''} object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
};

export default BrandLogo;
