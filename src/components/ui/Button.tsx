import React from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'lit' | 'outline-lit';
type Size = 'md' | 'lg';

interface ButtonProps {
  variant?: Variant;
  size?: Size;
  href?: string;
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
  outline: 'btn-outline',
  lit: 'btn-lit',
  'outline-lit': 'btn-outline-lit',
};

/**
 * The one button.
 *
 * `primary` and `outline` are for paper grounds; `lit` and `outline-lit` are
 * their counterparts on ink. Renders an anchor for external links, a router
 * Link for internal ones, and a real <button> otherwise — so a submit control
 * is never a div and an in-app link never causes a full reload.
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  to,
  children,
  className = '',
  type = 'button',
  disabled,
  onClick,
  'aria-label': ariaLabel,
}) => {
  const classes = `btn ${variantClass[variant]} ${size === 'lg' ? 'btn-lg' : ''} ${className}`;

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
