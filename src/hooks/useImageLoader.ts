"use client";

import { useEffect, useState } from "react";

interface UseImageLoaderProps {
  imageUrls: string[];
}

export function useImageLoader({ imageUrls }: UseImageLoaderProps) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const loadImage = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, url]));
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load image: ${url}`);
          loadedCount++;
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
          resolve(); // Resolve anyway to not block loading
        };
        img.src = url;
      });
    };

    // Load all images
    imageUrls.forEach(loadImage);
  }, [imageUrls]);

  return {
    isLoading,
    loadedImages,
    progress: loadedImages.size / imageUrls.length
  };
}
