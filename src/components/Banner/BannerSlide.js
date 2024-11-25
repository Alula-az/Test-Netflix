import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./slideStyle.css";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch movies
    const fetchData = async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovies(request.data.results);
        setMovie(request.data.results[0]); // Set the initial movie
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Auto-slide logic
    const interval = setInterval(() => {
      if (movies.length > 0) {
        const nextIndex = (currentIndex + 1) % movies.length;
        setCurrentIndex(nextIndex);
        setMovie(movies[nextIndex]);
      }
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [movies, currentIndex]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button play">Play</button>
          <button className="banner_button">My List</button>
        </div>
        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom" />
      <div className="banner_navigation">
        {movies.map((_, index) => (
          <span
            key={index}
            className={`navigation_dot ${
              index === currentIndex ? "active" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
