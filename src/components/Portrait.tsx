import type { PhotoCrop } from '@/data/site';

export function Portrait({ src, crop, alt, className }: { src: string; crop?: PhotoCrop; alt: string; className?: string }) {
  if (!crop) return <img src={src} alt={alt} className={className} loading="lazy" />;
  return <svg role="img" aria-label={alt} className={className} viewBox={`${crop.x} ${crop.y} ${crop.width} ${crop.height}`} preserveAspectRatio="xMidYMin slice"><image href={crop.source} width={crop.sourceWidth} height={crop.sourceHeight} /></svg>;
}
