import React from 'react';
import { Link } from 'react-router-dom';
import company from '@/config/company';

type Variant = 'primary' | 'light' | 'outline' | 'outline-light';
type Size = 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  /**
   * Points at the configured booking calendar. When none is configured it
   * falls back to the contact page rather than to an empty booking page —
   * previously this sent every primary CTA on the site to a dead end.
   */
  booking?: boolean;
  to?: string;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
}

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  light: 'btn-invert',
  outline: 'btn-outline',
  'outline-light': 'btn-outline-invert',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  booking,
  to,
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
}) => {
  const classes = `btn ${variantClass[variant]} ${size === 'lg' ? 'btn-lg' : ''} ${className}`;

  if (booking) {
    const external = Boolean(company.bookingUrl);
    if (external) {
      return (
        <a
          href={company.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to="/kontakt" className={classes} onClick={onClick}>
        {children}
      </Link>
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
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
