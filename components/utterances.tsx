'use client';

import { useEffect, useRef } from 'react';

import { useTheme } from 'next-themes';

const UTTERANCES_ORIGIN = 'https://utteranc.es';
const UTTERANCES_SCRIPT_SRC = `${UTTERANCES_ORIGIN}/client.js`;

type UtterancesTheme = 'github-light' | 'github-dark';
type IssueTerm = 'pathname' | 'url' | 'title' | 'og:title';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  const utterancesTheme: UtterancesTheme = resolvedTheme === 'dark' ? 'github-dark' : 'github-light';

  // deps에 추가하지 않고 effect 내에서 최신값 접근
  const themeRef = useRef<UtterancesTheme>(utterancesTheme);
  themeRef.current = utterancesTheme;

  // useEffect로 hydration 이후 스크립트 적용 (초기 번들 블로킹 없음)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    // 이미 삽입된 스크립트가 있으면 중복 주입 방지
    if (container.querySelector(`script[src="${UTTERANCES_SCRIPT_SRC}"]`)) {
      return;
    }

    const script = document.createElement('script');
    script.src = UTTERANCES_SCRIPT_SRC;
    script.setAttribute('repo', 'dango0812/dev-blog');
    script.setAttribute('issue-term', issueTerm);
    script.setAttribute('theme', themeRef.current);
    script.setAttribute('label', '💬 comments');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    container.appendChild(script);

    return () => {
      container.innerHTML = '';
    };
  }, [issueTerm]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.utterances-frame');
    if (!iframe?.contentWindow) {
      return;
    }

    // 테마 변경 → postMessage로 반영, iframe 리로드 없음
    // utterancesTheme은 렌더 중 파생된 값, state/effect 동기화 불필요
    iframe.contentWindow.postMessage({ type: 'set-theme', theme: utterancesTheme }, UTTERANCES_ORIGIN);
  }, [utterancesTheme]);

  return <div ref={containerRef} className="mt-10" />;
}
