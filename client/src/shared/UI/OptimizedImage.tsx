import { FC, useState, memo, useEffect } from 'react';
import { preloadImage } from '../../utils/preloadImage';

interface OptimizedImageProps {
  src: string;
  webpSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  itemProp?: string;
}

const OptimizedImage: FC<OptimizedImageProps> = ({
  src,
  webpSrc,
  alt,
  className = '',
  width,
  height,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);

  useEffect(() => {
    const supportsWebp = async () => {
      if (!webpSrc) return false;
      
      const webP = new Image();
      webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
      
      return new Promise<boolean>((resolve) => {
        webP.onload = () => resolve(true);
        webP.onerror = () => resolve(false);
      });
    };

    const loadImage = async () => {
      try {
        if (priority) {
          console.log('Loading priority image:', { src, webpSrc });
          await preloadImage(src);
          if (webpSrc) {
            const isWebpSupported = await supportsWebp();
            console.log('WebP support check:', { isWebpSupported });
            setCurrentSrc(isWebpSupported ? webpSrc : src);
          } else {
            setCurrentSrc(src);
          }
          setIsLoading(false);
        } else {
          if (webpSrc) {
            const isWebpSupported = await supportsWebp();
            console.log('WebP support check:', { isWebpSupported, webpSrc });
            setCurrentSrc(isWebpSupported ? webpSrc : src);
          } else {
            setCurrentSrc(src);
          }
        }
      } catch (error) {
        console.error('Failed to load image:', { error, src, webpSrc });
        setCurrentSrc(src); // Fallback to original format
        setIsLoading(false);
      }
    };

    loadImage();
  }, [src, webpSrc, priority]);

  return (
    <>
      {isLoading && (
        <div 
          className={`animate-pulse bg-base-300 ${className}`}
          style={{ width, height }}
          aria-hidden="true"
        />
      )}
      {currentSrc && (
        <picture>
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            src={currentSrc}
            alt={alt}
            className={`${className} ${isLoading ? 'hidden' : ''}`}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={() => setIsLoading(false)}
            width={width}
            height={height}
            decoding="async"
          />
        </picture>
      )}
    </>
  );
};

export const MemoizedOptimizedImage = memo(OptimizedImage);
export default MemoizedOptimizedImage;
