import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../Styles/data.css"
import Popular from './filter/Popular';
import { Horror } from './filter/Horror';
import Netflix from './filter/Netflix';
import { Trending } from './filter/Trending';
import { Action } from './filter/Action';
import { Comedies } from './filter/Comedies';
import { Animation } from './filter/Animation';
import { Close, Info, Play } from '../utils/icons';
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player' 

export const Data = () => {
  const [showVideo, setShowVideo] = useState(false);

 

  return (
    <div>
    <div className='poster'>
    <img src={`https://image.tmdb.org/t/p/original/zwKaPkkLizCg1onpHQq89LWugkS.jpg`} alt="poster" />
    <div className='poster_data'>
      <h2>Nowhere</h2>
      <p>A young pregnant woman named Mia escapes <br/>from a country at war by hiding in a maritime container aboard<br/> a cargo ship. After a violent storm, Mia gives birth to the child while<br/> lost at sea, where she must fight to survive...</p>
      <button id='btn-1' onClick={() => setShowVideo(true)}><Play/> Play</button>
      {showVideo && (
        <div className='show-video'>
        <ReactPlayer url='https://youtu.be/KDUtdcU10YA?feature=shared'/>
          <button onClick={() => setShowVideo(false)}>Close Video</button> 
        </div>
      )}
      <button id='btn-2'><Info/> More Info</button>
    </div>
    </div>
    <div className='main_data imp'>
      <Popular/>
      <Horror />
      <Netflix/>
      <Trending/>
      <Comedies/>
      <Action/>
      <Animation/>


        
    </div> 
    </div>
  )
}
