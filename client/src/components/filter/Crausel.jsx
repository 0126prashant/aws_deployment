import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../Styles/crausel.css"
import Modal from 'react-modal';
import { Add, Close, Dislike, Down, Like, Play } from '../../utils/icons';
import { submitFormData } from '../../redux/list/listAction';
import { useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import YouTube from 'react-youtube'; 

const Crausel = ({movies}) => {
  const toast = useToast();
  const [genres, setGenres] = useState({});
  const [selectedMovie, setSelectedMovie] = useState(null);
  const dispatch = useDispatch()
  const [youtubeVideoId, setYoutubeVideoId] = useState(null);

// Rendering ----------Gener---------------------------------------> 
useEffect(() => {
  const fetchGenres = async () => {
    try {
      const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
          api_key: process.env.REACT_APP_API_KEY 
        }
      });
      const genreData = response.data.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
      }, {});
      setGenres(genreData);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  fetchGenres();
}, []);
// console.log(movies,"gener")
// Rendering ----------Gener---------------------------------------> 
// The model options for closing and opening -------------------------->
const closeModal = () => {
  setSelectedMovie(null);
}

const openModal = (movie) => {
  setSelectedMovie(movie);
}
// The model options for closing and opening -------------------------->

const handleClickAdd = (data)=>{
  // console.log(data);
  toast({
    title: "Movie Added",
    description: "Movie has been added to your list!",
    info: "success",
    duration: 5000,
    isClosable: true,
  });
  dispatch(submitFormData(data))  


}


 // ------------You Tube===========>
 const fetchMovieVideo = async (id) => {
  try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
          params: {
              api_key: "2f91df7c599cd01601b84f9f8b5c20e0",
          }
      });
      return {
          ...response.data,
          video: response.data.results[0] 
      };
  } catch (error) {
      console.error('Error fetching movie video:', error);
      return null;
  }
}
const handlePlayButton = async (movie) => {
  try {
      const movieVideo = await fetchMovieVideo(movie.id);
      // console.log(movieVideo, "movieVideo");
      if (movieVideo && movieVideo.video && movieVideo.video.key) {
          setYoutubeVideoId(movieVideo.video.key);
      } else {
          console.error('No video found for the movie');
      }
  } catch (error) {
      console.error('Error fetching movie video:', error);
  }
}

const handleCloseTrailer = () => {
  setYoutubeVideoId(null); 
}
// ------------You Tube===========>

  return (
    <div className="carousel">
      {movies.map(movie => (
        <div key={movie.id} className="carousel-cell card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className='movie-poster'
          />
          <div className='hidden'>
          <div className='icons'>
          <Play className='icn brdr'onClick={() => handlePlayButton(movie)} />
          <Add onClick={()=>handleClickAdd({"id":movie.id,"img_url":`https://image.tmdb.org/t/p/w500${movie.poster_path}`,"title":movie.title})} className='icn brdr'/>
          <Like className='icn brdr'/>
          <Dislike className='icn brdr'/>
          <Down className='icn brdr' onClick={() => openModal(movie)}/>
          </div>
          <h2>{movie.title}</h2>
          <span className='green'>{Math.round(movie.vote_average * 10)}% Match </span>
          <div className='gener'>
          <span>{movie.genre_ids.map(id => genres[id]).join(' • ')}</span>
          </div>
          </div>
        </div>
      ))}

      <Modal
        isOpen={selectedMovie !== null}
        onRequestClose={closeModal}
        contentLabel="Movie Details"
        className="custom-modal"
      >
        {selectedMovie && (
          <div>
            {/* <h2>{selectedMovie.original_title}</h2> */}
            <img
              src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
              alt={selectedMovie.original_title}
            />
            <p>{selectedMovie.overview}</p>
          </div>
        )}
        <button onClick={closeModal} className='close-button'><Close/></button>
      </Modal>

      {youtubeVideoId && (
                <div className="youtube-player-crausel">
                    <YouTube videoId={youtubeVideoId} opts={{width: '100%', height: '500vh'}} />
                    <button className='buttonMovie' onClick={handleCloseTrailer}>Close Trailer</button>
                </div>
            )}
    </div>
    
  );
};

export default Crausel;
