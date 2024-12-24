import React from 'react'
import axios from "axios";
import "./VideoSection.css";
import { useState } from 'react';


const VideoSection = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = "R1af0AlmwF08QXsUgC4M6ZNGsZ6qyFnpAcLupW3lVWrMDjkKAw7muBZA";

    const fetchRandomVideos = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://api.pexels.com/videos/search?query=random", {
          headers: {
            Authorization: API_KEY,
          },
        });
        setVideos(response.data.videos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };
  

  return (
    <div className="App">
      <h1>Random Reels</h1>
      <button onClick={fetchRandomVideos} disabled={loading}>
        {loading ? "Loading..." : "Fetch Random Videos"}
      </button>
      <div className="video-container">
        {videos.map((video) => (
          <video
            key={video.id}
            src={video.video_files[0].link}
            controls
            loop
            autoPlay
            muted
          />
        ))}
      </div>
    </div>
  )
}

export default VideoSection
