'use client';

import type { ReactNode } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/lib/tailwind';

interface ToolbarButtonProps {
  title: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}

/** 에디터 툴바 내 개별 아이콘 버튼 */
export function ToolbarButton({ title, isActive, disabled, onClick, children }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      title={title}
      disabled={disabled}
      className={cn(isActive && 'bg-muted text-foreground')}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
