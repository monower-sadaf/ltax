import React from "react"; 
import YouTube from "react-youtube";

const VideoPlayer = ({ hash, title }) => {

  // Set up event handlers
  const onReady = (event) => {
    // Access the player instance
    const player = event.target;

    // For example, you can automatically play the video
    player.playVideo();
  };

  const onError = (error) => {
    console.error('YouTube Player Error:', error);
  };

  return (
    <>
      {/* <iframe
        className="w-full h-auto lg:h-[22em]"
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${hash}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe> */}
      
      <YouTube
            videoId={hash}
            onReady={onReady}
            onError={onError}
          />
    </>
  );
};

export default VideoPlayer;
