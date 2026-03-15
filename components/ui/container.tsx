import { cn } from '@/lib/tailwind';

interface ContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
}

const maxWidthMap = {
  sm: 'max-w-2xl', // 672px
  md: 'max-w-4xl', // 896px
  lg: 'max-w-5xl', // 1024px
  xl: 'max-w-6xl', // 1280px
  full: 'max-w-full',
  none: 'max-w-none',
} as const;

export function Container({ children, maxWidth, className, ...props }: ContainerProps) {
  const maxWidthClass = maxWidth ? maxWidthMap[maxWidth] : undefined;

  return (
    <div className={cn('mx-auto w-full', maxWidthClass, className)} {...props}>
      {children}
    </div>
  );
}
