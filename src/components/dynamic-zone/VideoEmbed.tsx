import React from 'react';

interface VideoEmbedProps {
  url?: string;
  oembed?: {
    html?: string;
  };
  caption?: string;
}

export default function VideoEmbed({ url, oembed, caption }: VideoEmbedProps) {
  // Prefer oembed HTML if available
  if (oembed?.html) {
    return (
      <div className="my-6">
        <div 
          className="relative pb-[56.25%] h-0 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: oembed.html }} 
        />
        {caption && <p className="text-sm text-gray-600 mt-2 text-center">{caption}</p>}
      </div>
    );
  }
  
  // Fallback to manual embed
  if (url) {
    const getEmbedUrl = (videoUrl: string) => {
      try {
        if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
          const videoId = videoUrl.includes('youtube.com')
            ? new URL(videoUrl).searchParams.get('v')
            : videoUrl.split('youtu.be/')[1]?.split('?')[0];
          return `https://www.youtube.com/embed/${videoId}`;
        }
        // Add support for other video platforms here if needed
        return videoUrl;
      } catch (error) {
        console.error('Error processing video URL:', error);
        return videoUrl;
      }
    };

    const embedUrl = getEmbedUrl(url);
    
    return (
      <div className="my-6">
        <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
          <iframe
            src={embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded video"
          />
        </div>
        {caption && <p className="text-sm text-gray-600 mt-2 text-center">{caption}</p>}
      </div>
    );
  }
  
  return null;
}