import { useEffect, useRef, useState } from 'react';
import './HeroVisualVideo.css';

const VIDEO_SRC = '/Gellery/Cinematography_Smooth_cont.mp4';

export default function HeroVisualVideo() {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    const handleLoaded = () => setLoaded(true);
    const handleError = () => setFailed(true);

    video.addEventListener('loadeddata', handleLoaded, { once: true });
    video.addEventListener('error', handleError, { once: true });

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      handleLoaded();
    }

    tryPlay();
    video.addEventListener('canplay', tryPlay, { once: true });

    return () => {
      video.removeEventListener('canplay', tryPlay);
    };
  }, []);

  if (failed) {
    return <div className="hero-visual hero-visual--fallback" aria-hidden="true" />;
  }

  return (
    <div className={`hero-visual ${loaded ? 'hero-visual--loaded' : ''}`}>
      <video
        ref={videoRef}
        className="hero-visual__media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        tabIndex={-1}
        aria-hidden="true"
      >
        <source src={VIDEO_SRC} type="video/mp4" />
      </video>
    </div>
  );
}
