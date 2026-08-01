import React from 'react';
import { Link } from 'react-router-dom';
import company from '@/config/company';

type Variant = 'primary' | 'light' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  booking?: boolean;
  to?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-navy text-off-white hover:bg-navy-2 border border-navy hover:border-navy-2',
  light: 'bg-off-white text-navy hover:bg-white border border-off-white',
  outline: 'bg-transparent text-current border border-current/20 hover:border-current/50',
  ghost: 'bg-transparent text-current border border-transparent hover:bg-current/5',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-9 py-4 text-base',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  booking,
  to,
  children,
  className = '',
  onClick,
}) => {
  const base =
    'inline-flex min-h-11 items-center justify-center font-sans font-medium tracking-wide transition-all duration-200 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (booking) {
    const target = company.bookingUrl || '/book-moede';
    const isExternal = Boolean(company.bookingUrl);
    return (
      <a
        href={target}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={classes}
      >
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
