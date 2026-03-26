import { type ComponentProps, type CSSProperties } from 'react';

import { type StaticImageData } from 'next/image';

export type IconProps = Omit<ComponentProps<'img'>, 'src'> & {
  src: StaticImageData;
  nofill?: boolean;
};

const EMPTY_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E`;

export default function Icon({
  src,
  nofill = false,
  width = src.width,
  height = src.height,
  alt = 'icon',
  style,
  ...props
}: IconProps) {
  const mainSrc = nofill ? src.src : EMPTY_SVG;

  const appliedStyle: CSSProperties = nofill
    ? { ...style }
    : {
        ...style,
        backgroundColor: 'currentColor',
        mask: `url("${src.src}") no-repeat center / contain`,
        WebkitMask: `url("${src.src}") no-repeat center / contain`,
      };

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={mainSrc} width={width} height={height} alt={alt} style={appliedStyle} {...props} />;
}
