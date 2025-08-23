import { useEffect } from 'react';

const useImagePreloader = (imageUrls) => {
  useEffect(() => {
    if (!imageUrls || imageUrls.length === 0) return;

    const preloadImages = () => {
      imageUrls.forEach(url => {
        if (url) {
          const img = new Image();
          img.src = url;
          // Store in browser cache
          img.onload = () => {
            // Image is now cached
          };
        }
      });
    };

    // Preload images after a short delay to not block initial render
    const timer = setTimeout(preloadImages, 100);
    return () => clearTimeout(timer);
  }, [imageUrls]);
};

export default useImagePreloader;
