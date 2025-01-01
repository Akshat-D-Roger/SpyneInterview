import { useRef, useEffect, useState } from 'react';

interface VideoPlayerProps {
  src: string;
  captionsSrc: string;
}

export default function VideoPlayer({ src, captionsSrc }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.textTracks[0].mode = 'showing';
    }
  }, [src, captionsSrc]);

  const handleError = () => {
    setError("Error loading video. Please check the URL and try again.");
  };

  return (
    <div className="aspect-w-16 aspect-h-9">
      {error ? (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-red-500">
          {error}
        </div>
      ) : (
        <video ref={videoRef} controls className="w-full h-full" onError={handleError}>
          <source src={src} type="video/mp4" />
          <track kind="captions" src={captionsSrc} srcLang="en" label="English" default />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}

