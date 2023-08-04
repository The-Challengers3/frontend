import React, { useRef, useState, useEffect } from "react";

// import components

import "./reel.css";

export default function Video({  url }) {
  const [isVideoPlaying, setisVideoPlaying] = useState(false);

  const vidRef = useRef();

  const onVideoClick = () => {
    if (isVideoPlaying) {
      vidRef.current.pause();
      setisVideoPlaying(false);
    } else {
      vidRef.current.play();
      setisVideoPlaying(true);
    }
  };

  useEffect(() => {
    const scroll = document.getElementById("video-container");

    if (scroll) {
      scroll.addEventListener("scroll", () => {
        vidRef.current.pause();
      });
    }
  }, []);

  return (
    <div className="video-cards">
    
      <video 
        onClick={onVideoClick}
        className="video-player"
        ref={vidRef}
        src={url}
        // loop
      />
    
    </div>
  );
}