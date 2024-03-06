import React, { useState, useEffect } from 'react';
import "../../Styles/netflix.css"
import { Add, Dislike, Like, Play } from '../../utils/icons';
import { movies } from '../../Api/movies';




const Crausel = () => {
  const [genres, setGenres] = useState({});

// The model options for closing and opening -------------------------->

  return (
    <>
    <h1>Only on Netflix</h1>
    <div className="carousel_netflix">
      {movies.map(movie => (
        <div key={movie.id} className="carousel-cell_netflix card">
          <img
            src={`${movie.img}`}
            alt={movie.title}
            className='movie-poster'
          />
          <div className='hidden_netflix'>
          <div className='icons'>
          <Play className='icn brdr'/>
          <Add className='icn brdr'/>
          <Like className='icn brdr'/>
          <Dislike className='icn brdr'/>
          </div>
          <h2>{movie.title}</h2>
          <span className='green'>{`${movie.match}`}</span>
          <div className='gener'>
          <span>{`${movie.gener}`}</span>
          </div>
          </div>
        </div>
      ))}

    </div>
    </>
    
  );
};

export default Crausel;
