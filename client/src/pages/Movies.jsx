import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Styles/movie.css";
import YouTube from "react-youtube";
import { Navbar } from "../components/Navbar";

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              language: "en-US",
              sort_by: "popularity.desc",
              include_adult: false,
              include_video: false,
              page: currentPage,
            },
          }
        );
        setMovies(response.data.results);
        // console.log(response.data.results)
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, [currentPage]);

  // ------------You Tube===========>
  const fetchMovieVideo = async (id) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
          },
        }
      );
      return {
        ...response.data,
        video: response.data.results[0],
      };
    } catch (error) {
      console.error("Error fetching movie video:", error);
      return null;
    }
  };
  const handlePlayButton = async (movie) => {
    try {
      const movieVideo = await fetchMovieVideo(movie.id);
      // console.log(movieVideo, "movieVideo");
      if (movieVideo && movieVideo.video && movieVideo.video.key) {
        setYoutubeVideoId(movieVideo.video.key);
      } else {
        console.error("No video found for the movie");
      }
    } catch (error) {
      console.error("Error fetching movie video:", error);
    }
  };

  const handleCloseTrailer = () => {
    setYoutubeVideoId(null);
  };
  // ------------You Tube===========>

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const addtoList = (movie) => {};

  return (
    <>
        <Navbar/>
      <div className="movie-main">
        {/* <h1>Movies</h1> */}
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <p>{movie.title}</p>
            <button
              className="buttonMovie"
              onClick={() => handlePlayButton(movie)}
            >
              Play Trailer
            </button>
            <button className="buttonMovie" onClick={() => addtoList(movie)}>
              Add to List
            </button>
          </div>
        ))}
        <div className="btn-btn">
          <button onClick={handlePrevPage}>Prev</button>
          <button onClick={handleNextPage}>Next</button>
        </div>

        {youtubeVideoId && (
          <div className="youtube-player">
            <YouTube
              videoId={youtubeVideoId}
              opts={{ width: "100%", height: "500vh" }}
            />
            <button className="buttonMovie" onClick={handleCloseTrailer}>
              Close Trailer
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Movies;
