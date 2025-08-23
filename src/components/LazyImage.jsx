import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ src, alt, className, style, placeholder = '/placeholder.jpg' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={className} style={style}>
      {isInView && (
        <>
          <img
            src={error ? placeholder : src}
            alt={alt}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              ...style
            }}
          />
          {!isLoaded && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#9ca3af'
              }}
            >
              Loading...
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LazyImage;
// Let me implement several performance optimizations:

// Image preloading and caching
// Component lazy loading
// Memoization for expensive components