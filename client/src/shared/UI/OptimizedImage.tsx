import { FC, useState, memo, useEffect } from 'react';
import { preloadImage } from '../../utils/preloadImage';

// Кэшируем результат проверки поддержки WebP
let webpSupportCache: boolean | null = null;

const checkWebpSupport = async (): Promise<boolean> => {
  if (webpSupportCache !== null) {
    return webpSupportCache;
  }

  try {
    const webP = new Image();
    webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
    
    const result = await new Promise<boolean>((resolve) => {
      webP.onload = () => resolve(true);
      webP.onerror = () => resolve(false);
    });

    webpSupportCache = result;
    return result;
  } catch (error) {
    console.error('Error checking WebP support:', error);
    webpSupportCache = false;
    return false;
  }
};

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
  itemProp,
}) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        if (priority) {
          await preloadImage(src);
        }

        if (webpSrc) {
          const isWebpSupported = await checkWebpSupport();
          const imageToUse = isWebpSupported ? webpSrc : src;
          
          if (priority) {
            await preloadImage(imageToUse);
          }
          
          setCurrentSrc(imageToUse);
        } else {
          setCurrentSrc(src);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading image:', error);
        setCurrentSrc(src); // Fallback to original image
        setError(true);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [src, webpSrc, priority]);

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <span className="text-gray-500">Ошибка загрузки</span>
      </div>
    );
  }

  return (
    <>
      {isLoading && (
        <div 
          className={`animate-pulse bg-gray-200 ${className}`}
          style={{ width, height }}
          role="presentation"
        />
      )}
      {currentSrc && (
        <img
          src={currentSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'hidden' : ''}`}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          itemProp={itemProp}
          onError={() => {
            setError(true);
            if (currentSrc !== src) {
              setCurrentSrc(src); // Fallback to original image
            }
          }}
        />
      )}
    </>
  );
};

export const MemoizedOptimizedImage = memo(OptimizedImage);
export default MemoizedOptimizedImage;
