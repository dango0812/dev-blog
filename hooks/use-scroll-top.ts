import { useCallback, useEffect, useState } from 'react';

interface UseScrollTopReturn {
  isScrollTop: boolean;
  scrollTop: () => void;
}

/**
 * 스크롤 최상단인지 여부 / 최상단으로 스크롤 이동 기능 제공
 *
 * @example
 * const { isScrollTop, scrollTop } = useScrollTop();
 * console.log(isScrollTop); // true 또는 false
 * scrollTop(); // 최상단으로 부드럽게 스크롤 이동
 */
export function useScrollTop(): UseScrollTopReturn {
  const [isScrollTop, setIsScrollTop] = useState(true);

  // 스크롤 위치가 최상단인지 여부
  const handleScrollTop = useCallback(() => {
    setIsScrollTop(window.scrollY === 0);
  }, []);

  // 최상단으로 스크롤 이동
  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollTop, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, [handleScrollTop]);

  return { isScrollTop, scrollTop };
}
