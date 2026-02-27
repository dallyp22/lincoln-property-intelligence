import { cn } from '@/lib/utils';

type PaddingVariant = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  /** Add hover lift effect */
  hover?: boolean;
  /** Padding size */
  padding?: PaddingVariant;
  /** HTML element to render */
  as?: 'div' | 'article' | 'section';
}

const paddingMap: Record<PaddingVariant, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  className,
  hover = false,
  padding = 'md',
  as: Component = 'div',
}: CardProps) {
  return (
    <Component
      className={cn(
        'rounded-xl border border-surface-200 bg-white shadow-sm',
        paddingMap[padding],
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
        className
      )}
    >
      {children}
    </Component>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('mb-4', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({ children, className, as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component className={cn('text-lg font-semibold text-primary-900', className)}>
      {children}
    </Component>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return <div className={cn(className)}>{children}</div>;
}
