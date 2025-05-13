
import React, { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface OptimizedImageProps {
  src: string;
  alt: string;
  aspectRatio?: number;
  className?: string;
  width?: number;
  height?: number;
}

const OptimizedImage = ({
  src,
  alt,
  aspectRatio = 16 / 9,
  className = "",
  width,
  height
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  return (
    <div className="relative w-full overflow-hidden">
      <AspectRatio ratio={aspectRatio} className="bg-muted">
        {!isLoaded && !error && (
          <Skeleton className="absolute inset-0 w-full h-full" />
        )}
        
        {!error ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            width={width}
            height={height}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            } ${className}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-sm text-muted-foreground">Imagem indisponível</span>
          </div>
        )}
      </AspectRatio>
    </div>
  );
};

export default OptimizedImage;
