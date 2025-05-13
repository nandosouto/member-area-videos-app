
import React, { useEffect } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  isWistia: boolean;
  mediaId?: string;
}

const VideoPlayer = ({ videoUrl, isWistia, mediaId }: VideoPlayerProps) => {
  useEffect(() => {
    // Load Wistia scripts when a Wistia video is rendered
    if (isWistia && mediaId) {
      const playerScript = document.createElement("script");
      playerScript.src = "https://fast.wistia.com/player.js";
      playerScript.async = true;
      document.body.appendChild(playerScript);

      const embedScript = document.createElement("script");
      embedScript.src = `https://fast.wistia.com/embed/${mediaId}.js`;
      embedScript.async = true;
      embedScript.type = "module";
      document.body.appendChild(embedScript);

      return () => {
        document.body.removeChild(playerScript);
        document.body.removeChild(embedScript);
      };
    }
  }, [isWistia, mediaId]);

  if (isWistia && mediaId) {
    return (
      <div className="video-container">
        <div dangerouslySetInnerHTML={{ 
          __html: `
          <wistia-player media-id="${mediaId}" aspect="1.7777777777777777"></wistia-player>
          `
        }} />
      </div>
    );
  }

  // For YouTube videos
  if (!isWistia && videoUrl) {
    // Convert YouTube URL to embed URL if needed
    let embedUrl = videoUrl;
    if (videoUrl.includes("youtube.com/watch")) {
      const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }

    return (
      <div className="video-container">
        <iframe
          src={embedUrl}
          title="Video Player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return <div className="p-8 text-center">O vídeo não está disponível</div>;
};

export default VideoPlayer;
