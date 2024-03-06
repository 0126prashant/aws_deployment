import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Crausel from './Crausel';
import "../../Styles/popular.css"
import '@fontsource/poppins'; 



const Popular = () => {
  const [movies, setMovies] = useState([]);
  const maxMovies = 100;


  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let page = 1;
        let totalPages = 1;
        let allMovies = [];

        while (page <= totalPages && allMovies.length < maxMovies) {
          const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
              api_key: process.env.REACT_APP_API_KEY,
              page: page
            }
          });

          const popularMovies = response.data.results;
          // console.log(popularMovies,"popularMovies")
          allMovies = [...allMovies, ...popularMovies];

          totalPages = response.data.total_pages;
          page++;
        }
        allMovies = allMovies.slice(0, maxMovies);

        setMovies(allMovies);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies();
  }, []);

// console.log("here i will expecting an array of data",movies)

  return (
    <div className='main_popular'>
       <h1 style={{ fontFamily: 'Poppins, sans-serif' }}>Popular On Netflix</h1>
      <Crausel key={movies.id} movies={movies}/>
    </div>
  );
};

export default Popular;