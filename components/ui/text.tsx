import { cn } from '@/lib/tailwind';

type TextElement = 'p' | 'span' | 'label' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong' | 'em';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: TextElement;
  htmlFor?: string;
}

export function Text({ children, as = 'p', className, ...props }: TextProps) {
  const Component = as;

  return (
    <Component className={cn(className)} {...props}>
      {children}
    </Component>
  );
}
