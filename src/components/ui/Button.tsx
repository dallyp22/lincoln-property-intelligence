import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const variantStyles = {
  primary:
    'bg-accent-500 text-white shadow-sm hover:bg-accent-600 hover:shadow-md focus-visible:outline-accent-500',
  secondary:
    'border-2 border-primary-500 text-primary-500 bg-transparent hover:bg-primary-500 hover:text-white focus-visible:outline-primary-500',
  ghost:
    'text-primary-700 bg-transparent hover:bg-surface-100 hover:text-primary-900 focus-visible:outline-primary-500',
} as const;

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-7 py-3 text-base rounded-lg',
} as const;

type ButtonVariant = keyof typeof variantStyles;
type ButtonSize = keyof typeof sizeStyles;

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  asChild?: false;
  href?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  asChild: true;
  href: string;
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target'];
  rel?: string;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(
    { variant = 'primary', size = 'md', className, children, ...rest },
    ref
  ) {
    const classes = cn(
      'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if ('asChild' in rest && rest.asChild && 'href' in rest && rest.href) {
      const { asChild: _, href, target, rel, ...linkRest } = rest as ButtonAsLinkProps;
      return (
        <Link
          href={href}
          className={classes}
          ref={ref as React.Ref<HTMLAnchorElement>}
          target={target}
          rel={rel}
          {...linkRest}
        >
          {children}
        </Link>
      );
    }

    // Remove link-only props before spreading onto <button>
    const { asChild: _, href: _h, ...buttonRest } = rest as ButtonAsButtonProps;
    return (
      <button
        className={classes}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...buttonRest}
      >
        {children}
      </button>
    );
  }
);
