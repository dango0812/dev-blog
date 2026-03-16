'use client';

import { memo, useEffect, useRef } from 'react';

import lottie, { type AnimationItem } from 'lottie-web';

import { cn } from '@/lib/tailwind';

interface LottieProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  controller?: React.MutableRefObject<AnimationItem | null>;
  className?: string;
}

function LottieComponent({ src, loop = true, autoplay = true, controller, className }: LottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop,
      autoplay,
      path: src,
    });

    if (controller) {
      controller.current = animation;
    }

    return () => {
      animation.destroy();
    };
  }, [src, loop, autoplay]);

  return <div ref={containerRef} className={cn('h-full w-full', className)} />;
}

export const Lottie = memo(LottieComponent);
