import React, { useEffect, useState } from 'react'
import { Data } from '../components/Data'
import "../Styles/homepage.css"
import { Navbar } from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const HomePage = () => {
  const navigate = useNavigate()
  const [secondsRemaining, setSecondsRemaining] = useState(10);
  const {isAuth} =  useSelector((store)=>store.RegisterReducer)

  // console.log("apikey",process.env.apiKey)
  useEffect(() => {
    const redirectTimer = setInterval(() => {
      setSecondsRemaining(prev => prev - 1);
    }, 1000);

    if (secondsRemaining === 0 && !isAuth) {
      clearInterval(redirectTimer);
      navigate("/users/login");
    }

    return () => clearInterval(redirectTimer);
  }, [secondsRemaining, isAuth]);
  return (
    <>
    {isAuth ? (<div className='homepage_main'>
    <Navbar/>
      <Data/>
    </div>)
    :(<div className='redirecting'>
    <img src='https://images.unsplash.com/photo-1633793675529-58eecb6ea16f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='lll' />
     <p>You are not Authorized so you have to login in {secondsRemaining} seconds...</p>
    </div>)
     }
    

    
    </>
  )
}
