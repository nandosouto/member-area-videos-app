
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoPlayerProps {
  videoUrl: string;
  isWistia: boolean;
  mediaId?: string;
}

const VideoPlayer = ({ videoUrl, isWistia, mediaId }: VideoPlayerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Reset state when video changes
    setIsLoading(true);
    setHasError(false);
    
    // Load Wistia scripts when a Wistia video is rendered
    if (isWistia && mediaId) {
      const loadWistiaPlayer = () => {
        try {
          const playerScript = document.createElement("script");
          playerScript.src = "https://fast.wistia.com/player.js";
          playerScript.async = true;
          
          const embedScript = document.createElement("script");
          embedScript.src = `https://fast.wistia.com/embed/${mediaId}.js`;
          embedScript.async = true;
          embedScript.type = "module";
          
          // Clean up previously added scripts if any
          const existingScripts = document.querySelectorAll('script[src*="wistia.com"]');
          existingScripts.forEach(script => {
            if (script.parentNode) {
              script.parentNode.removeChild(script);
            }
          });
          
          document.body.appendChild(playerScript);
          document.body.appendChild(embedScript);
          
          // Set loading to false after a short delay to give scripts time to initialize
          setTimeout(() => setIsLoading(false), 1000);
          
          return () => {
            if (document.body.contains(playerScript)) document.body.removeChild(playerScript);
            if (document.body.contains(embedScript)) document.body.removeChild(embedScript);
          };
        } catch (error) {
          console.error("Error loading Wistia player:", error);
          setHasError(true);
          setIsLoading(false);
        }
      };
      
      loadWistiaPlayer();
    } else {
      // For YouTube videos, allow a small loading delay for better UX
      setTimeout(() => setIsLoading(false), 500);
    }
  }, [isWistia, mediaId, videoUrl]);

  if (hasError) {
    return (
      <div className="video-container bg-muted rounded-md p-8 text-center">
        <p className="text-red-500">Ocorreu um erro ao carregar o vídeo. Por favor, tente novamente.</p>
      </div>
    );
  }
  
  if (isLoading) {
    return (
      <div className="video-container bg-muted rounded-md">
        <div className="aspect-video flex items-center justify-center">
          <div className="text-center">
            <Skeleton className="h-[200px] w-[350px] mx-auto mb-4" />
            <Skeleton className="h-4 w-20 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // For Wistia videos
  if (isWistia && mediaId) {
    return (
      <div className="video-container rounded-md overflow-hidden">
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
      <div className="video-container rounded-md overflow-hidden">
        <iframe
          src={embedUrl}
          title="Video Player"
          className="aspect-video w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  }

  return <div className="p-8 text-center">O vídeo não está disponível</div>;
};

export default VideoPlayer;
