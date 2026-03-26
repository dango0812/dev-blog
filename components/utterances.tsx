'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/tailwind';

import { Flex } from './ui';

const UTTERANCES_ORIGIN = 'https://utteranc.es';
const UTTERANCES_SCRIPT_SRC = `${UTTERANCES_ORIGIN}/client.js`;

type UtterancesTheme = 'github-light' | 'github-dark';
type IssueTerm = 'pathname' | 'url' | 'title' | 'og:title';

interface CacheEntry {
  container: HTMLDivElement;
  ready: boolean;
}

const utterancesCache = new Map<string, CacheEntry>();

const LOADING_OVERLAY = (
  <Flex alignItems="center" justifyContent="center" className="absolute inset-0 z-10">
    <Image src="/mona-loading.gif" alt="loading" width={100} height={100} unoptimized />
  </Flex>
);

interface UtterancesProps {
  issueTerm?: IssueTerm;
}

/**
 * Utterances Github 댓글 위젯
 *
 * @example
 * <Utterances issueTerm="pathname" />
 */
export function Utterances({ issueTerm = 'pathname' }: UtterancesProps) {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(() => !utterancesCache.get(pathname)?.ready);

  const utterancesTheme: UtterancesTheme = resolvedTheme === 'dark' ? 'github-dark' : 'github-light';

  // deps에 추가하지 않고 effect 내에서 최신값 접근
  const themeRef = useRef<UtterancesTheme>(utterancesTheme);
  themeRef.current = utterancesTheme;

  // useEffect로 hydration 이후 스크립트 적용 (초기 번들 블로킹 없음)
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const cached = utterancesCache.get(pathname);

    // 기존 컨테이너로 마운트
    if (cached?.ready) {
      mount.appendChild(cached.container);
      setLoading(false);
      return () => {
        if (mount.contains(cached.container)) {
          mount.removeChild(cached.container);
        }
      };
    }

    // 새 컨테이너 생성
    const container = document.createElement('div');
    const entry: CacheEntry = { container, ready: false };
    utterancesCache.set(pathname, entry);
    mount.appendChild(container);
    setLoading(true);

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== UTTERANCES_ORIGIN) {
        return;
      }
      // iframe 로드 후 resize 메시지를 보내면 준비 완료로 처리
      if (event.data?.type === 'resize') {
        entry.ready = true;
        setLoading(false);
        window.removeEventListener('message', handleMessage);
      }
    };
    window.addEventListener('message', handleMessage);
    container.appendChild(createScript(issueTerm, themeRef.current));

    return () => {
      window.removeEventListener('message', handleMessage);
      if (mount.contains(container)) {
        mount.removeChild(container);
      }
    };
  }, [pathname, issueTerm]);

  useEffect(() => {
    syncTheme(pathname, utterancesTheme);
  }, [pathname, utterancesTheme]);

  return (
    <div className="relative mt-10 min-h-60">
      {loading && LOADING_OVERLAY}
      <div ref={mountRef} className={cn('transition-opacity duration-300', loading ? 'opacity-0' : 'opacity-100')} />
    </div>
  );
}

function createScript(issueTerm: IssueTerm, theme: UtterancesTheme): HTMLScriptElement {
  const script = document.createElement('script');
  script.src = UTTERANCES_SCRIPT_SRC;
  script.setAttribute('repo', 'dango0812/dev-blog');
  script.setAttribute('issue-term', issueTerm);
  script.setAttribute('theme', theme);
  script.setAttribute('label', '💬 comments');
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;
  return script;
}

function syncTheme(pathname: string, theme: UtterancesTheme) {
  const iframe = utterancesCache.get(pathname)?.container.querySelector<HTMLIFrameElement>('iframe.utterances-frame');
  iframe?.contentWindow?.postMessage({ type: 'set-theme', theme }, UTTERANCES_ORIGIN);
}
