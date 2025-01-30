import React, { FC, forwardRef } from 'react';
import { cn } from '~/utils/';

interface Props {
  svg: () => JSX.Element;
  text: string;
  clickHandler?: React.MouseEventHandler<HTMLButtonElement>; // Optional for button-style navigation
  href?: string; // For Link or <a> navigation
  asLink?: boolean; // If true, wraps content with a Link
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode; // Support rendering custom children
}

const NavLink: FC<Props> = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { svg, text, clickHandler, href, asLink, disabled, className = '', children } = props;

  const buttonProps: React.ButtonHTMLAttributes<HTMLButtonElement> = {
    className: cn(
      'w-full flex gap-2 rounded p-2.5 text-sm cursor-pointer group items-center transition-colors duration-200 text-text-primary',
      className,
      {
        'opacity-50 pointer-events-none': disabled,
      },
    ),
    onClick: clickHandler,
    disabled,
  };

  // Render custom children (e.g., Link)
  if (children) {
    return (
      <div className={cn('w-full flex items-center gap-2', className)}>
        {children}
      </div>
    );
  }

  // Render a Link (if asLink is true) or an anchor tag (href)
  if (asLink || href) {
    return (
      <a
        href={href}
        className={buttonProps.className} // Reuse the styles
        onClick={(e) => {
          if (disabled) {
            e.preventDefault();
          }
        }}
      >
        {svg()}
        {text}
      </a>
    );
  }

  // Default button-based NavLink
  return (
    <button {...buttonProps} ref={ref}>
      {svg()}
      {text}
    </button>
  );
});

export default NavLink;
