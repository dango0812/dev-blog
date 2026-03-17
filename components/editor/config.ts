import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import ImageExtension from '@tiptap/extension-image';
import LinkExtension from '@tiptap/extension-link';
import { Table as TableExtension } from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import Typography from '@tiptap/extension-typography';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';

import { IframeExtension } from '@/components/editor/iframe-extension';

const lowlight = createLowlight(common);

export const STATIC_EXTENSIONS = [
  StarterKit.configure({ codeBlock: false }),
  CodeBlockLowlight.configure({ lowlight }),
  ImageExtension,
  IframeExtension,
  LinkExtension.configure({ openOnClick: false }),
  Typography,
  TableExtension.configure({ resizable: false }),
  TableRow,
  TableHeader,
  TableCell,
];
