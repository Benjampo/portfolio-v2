import Image, { type StaticImageData } from 'next/image';

type ScreenshotFrameProps = {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
  src: StaticImageData;
  trimBottom?: number;
  uniform?: boolean;
};

export default function ScreenshotFrame({
  alt,
  className = '',
  priority = false,
  sizes,
  src,
  trimBottom = 0,
  uniform = false,
}: ScreenshotFrameProps) {
  const visibleHeight = src.height - trimBottom;
  const aspectRatio = uniform ? '16 / 9' : `${src.width} / ${visibleHeight}`;

  return (
    <div
      className={`screenshot-frame ${trimBottom > 0 ? 'screenshot-frame--trim-bottom' : ''} ${className}`}
      style={{ aspectRatio }}
    >
      <div className='screenshot-frame__bar' aria-hidden='true'>
        <span />
        <span />
        <span />
      </div>
      <div className='screenshot-frame__viewport'>
        <Image
          alt={alt}
          className={
            trimBottom > 0 ? 'object-cover object-top' : 'object-contain'
          }
          fill
          placeholder='blur'
          priority={priority}
          sizes={sizes}
          src={src}
        />
      </div>
    </div>
  );
}
