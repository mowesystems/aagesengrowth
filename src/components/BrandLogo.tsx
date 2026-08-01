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
      <span className={`brand-logo-fallback ${light ? 'text-off-white' : 'text-navy'} ${className}`}>
        <span>Aagesen</span>
        <span>Growth ApS</span>
      </span>
    );
  }

  return (
    <img
      src={company.logoPath}
      alt="Aagesen Growth ApS"
      className={`${light ? 'brightness-0 invert' : ''} object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
};

export default BrandLogo;
