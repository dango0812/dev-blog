'use client';

import { Fragment } from 'react';

import type { Editor } from '@tiptap/react';
import {
  Bold,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Link2,
  List,
  ListOrdered,
  type LucideIcon,
  Minus,
  Quote,
  Strikethrough,
} from 'lucide-react';

import { Flex, Separator } from '@/components/ui';

import { ToolbarButton } from './toolbar-button';

interface ToolbarAction {
  key: string;
  title: string;
  icon: LucideIcon;
  action: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

interface EditorToolbarProps {
  editor: Editor | null;
  onLinkClick: () => void;
}

/**
 * EditorToolbar
 *
 * 툴바 액션을 선언적 배열로 관리하여 버튼 추가/삭제
 *
 * 그룹 사이에는 세로 구분선이 자동 삽입된다.
 */
export function EditorToolbar({ editor, onLinkClick }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  const groups = createToolbarGroups(editor, onLinkClick);

  return (
    <Flex alignItems="center" className="flex-wrap gap-0.5 border-b border-input p-1.5">
      {groups.map((group, groupIndex) => (
        <Fragment key={groupIndex}>
          {groupIndex > 0 && <Separator orientation="vertical" className="mx-1 h-5" />}
          {group.map(({ key, title, icon: Icon, action, isActive, disabled }) => (
            <ToolbarButton key={key} title={title} isActive={isActive} disabled={disabled} onClick={action}>
              <Icon />
            </ToolbarButton>
          ))}
        </Fragment>
      ))}
    </Flex>
  );
}

// EditorToolbar에 렌더링할 버튼 그룹과 액션을 반환하는 함수
function createToolbarGroups(editor: Editor, onLinkClick: () => void): ToolbarAction[][] {
  return [
    /* 제목 */
    [
      {
        key: 'h1',
        title: '제목 1',
        icon: Heading1,
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        isActive: editor.isActive('heading', { level: 1 }),
      },
      {
        key: 'h2',
        title: '제목 2',
        icon: Heading2,
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        isActive: editor.isActive('heading', { level: 2 }),
      },
      {
        key: 'h3',
        title: '제목 3',
        icon: Heading3,
        action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
        isActive: editor.isActive('heading', { level: 3 }),
      },
    ],
    /* 인라인 서식 */
    [
      {
        key: 'bold',
        title: '굵게',
        icon: Bold,
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive('bold'),
      },
      {
        key: 'italic',
        title: '기울임',
        icon: Italic,
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive('italic'),
      },
      {
        key: 'strike',
        title: '취소선',
        icon: Strikethrough,
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: editor.isActive('strike'),
      },
      {
        key: 'code',
        title: '인라인 코드',
        icon: Code,
        action: () => editor.chain().focus().toggleCode().run(),
        isActive: editor.isActive('code'),
      },
      { key: 'link', title: '링크', icon: Link2, action: onLinkClick, isActive: editor.isActive('link') },
    ],
    /* 블록 */
    [
      {
        key: 'bulletList',
        title: '불릿 리스트',
        icon: List,
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive('bulletList'),
      },
      {
        key: 'orderedList',
        title: '순서 리스트',
        icon: ListOrdered,
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive('orderedList'),
      },
      {
        key: 'blockquote',
        title: '인용구',
        icon: Quote,
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: editor.isActive('blockquote'),
      },
      {
        key: 'codeBlock',
        title: '코드 블록',
        icon: Code2,
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: editor.isActive('codeBlock'),
      },
      { key: 'hr', title: '구분선', icon: Minus, action: () => editor.chain().focus().setHorizontalRule().run() },
    ],
  ];
}
