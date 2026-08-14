import React from 'react';
import { Link } from 'react-router-dom';
import company from '@/config/company';

type Variant = 'primary' | 'invert' | 'outline' | 'outline-invert';
type Size = 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
  /**
   * Points at the configured booking calendar. When none is configured it falls
   * back to the contact page rather than to an empty booking page — otherwise
   * every booking CTA on the site is a dead end until the calendar is set up.
   */
  booking?: boolean;
  to?: string;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
}

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  invert: 'btn-invert',
  outline: 'btn-outline',
  'outline-invert': 'btn-outline-invert',
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
  'aria-label': ariaLabel,
}) => {
  const classes = `btn ${variantClass[variant]} ${size === 'lg' ? 'btn-lg' : ''} ${className}`;

  if (booking) {
    if (company.bookingUrl) {
      return (
        <a
          href={company.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link to="/kontakt" className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} aria-label={ariaLabel}>
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
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
