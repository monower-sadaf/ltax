import { useState } from "react";
import Image from "next/image";
import { relative_image_path } from "../../halpers/helper";
import YouTube from "react-youtube";

export default function EmbedYouTube(options) {
  const [imageClicked, setImageClicked] = useState(false);

  const onThumbnailClick = () => {
    setImageClicked(true);
  };

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
    <div>
      {!imageClicked ? (
        <>
          <Image
            src={relative_image_path(`${options?.data?.image}`)}
            style={{ objectFit: "cover" }}
            alt="yt thumbnail"
            loading="lazy"
            onClick={onThumbnailClick}
            width={options?.data?.width}
            height={options?.data?.height}
          />
        </>
      ) : (
        <>
          {/* <iframe
            width={options?.data?.width}
            height={options?.data?.height}
            src={`https://www.youtube.com/embed/${options?.data?.video}?rel=0&showinfo=0&autoplay=1`}
            title={options?.data?.title}
            frameBorder="0"
            allow="
              accelerometer; 
              autoplay; 
              clipboard-write; 
              encrypted-media; 
              gyroscope; 
              picture-in-picture"
            allowFullScreen
          ></iframe> */}
          <YouTube
            videoId={options?.data?.video}
            onReady={onReady}
            onError={onError}
          />
        </>
      )}
    </div>
  );
}
