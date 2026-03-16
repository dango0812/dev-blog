import { type ComponentProps } from 'react';

import { type StaticImageData } from 'next/image';

type IconProps = Omit<ComponentProps<'img'>, 'src'> & {
  src: StaticImageData; // 로더가 리턴한 {src, width, height} 객체
};

const EMPTY_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E`;

export default function SvgIcon({ src, width, height, style, className, ...props }: IconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    <img
      width={width ?? src.width}
      height={height ?? src.height}
      src={EMPTY_SVG} // 실제 이미지는 mask로 띄우므로 src는 비워둠
      className={className}
      style={{
        ...style,
        backgroundColor: 'currentcolor', // 부모의 글자색을 아이콘 색으로 사용
        mask: `url("${src.src}") no-repeat center / contain`,
        WebkitMask: `url("${src.src}") no-repeat center / contain`,
      }}
      {...props}
    />
  );
}
