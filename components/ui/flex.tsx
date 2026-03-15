import { cn } from '@/lib/tailwind';

type FlexElement = 'div' | 'section' | 'nav' | 'header' | 'footer' | 'article' | 'aside' | 'form' | 'ul' | 'li' | 'ol';

interface FlexProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  as?: FlexElement;
}

const directionMap = {
  row: 'flex-row',
  column: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'column-reverse': 'flex-col-reverse',
} as const;

const justifyMap = {
  'flex-start': 'justify-start',
  'flex-end': 'justify-end',
  center: 'justify-center',
  'space-between': 'justify-between',
  'space-around': 'justify-around',
  'space-evenly': 'justify-evenly',
} as const;

const alignMap = {
  'flex-start': 'items-start',
  'flex-end': 'items-end',
  center: 'items-center',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

export function Flex({
  as: Component = 'div',
  children,
  direction,
  justifyContent,
  alignItems,
  className,
  ...props
}: FlexProps) {
  const directionClass = direction ? directionMap[direction] : undefined;
  const justifyClass = justifyContent ? justifyMap[justifyContent] : undefined;
  const alignClass = alignItems ? alignMap[alignItems] : undefined;
  return (
    <Component className={cn('flex', directionClass, justifyClass, alignClass, className)} {...props}>
      {children}
    </Component>
  );
}
