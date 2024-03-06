import React, { useEffect, useState } from 'react'
import "../Styles/navbar.css"
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Logout, Searchic } from '../utils/icons';
import { useToast } from '@chakra-ui/react';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const {userName,isAuth,Login} =  useSelector((store)=>store.RegisterReducer)
  const navigate = useNavigate()
  const UserName = localStorage.getItem("UserName")
  const toast = useToast();
  // console.log(isAuth ? "true":"false" ,"is auth in nav")
  // console.log(userName,"userName  in nav") 
  // console.log(Login,"Login  in nav") 
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // for search--------------------->
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleSearchSubmit =  (e) => {
    e.preventDefault();   
    localStorage.setItem("serach",searchQuery)
    navigate("/search")
  };
  // for search--------------------->
 const clearLcstrg=()=>{
  toast({
    title: 'Logged out successfully',
    status: 'success',
    duration: 3000,
    isClosable: true,
  });
  localStorage.clear()
  navigate("/users/login")
 }

  return (
    <nav className={`nav ${scrolled ? 'black' : ''}`}>
    <div className='navbar-main'>
    <Link to="/"><img  src='https://nextflix-azure.vercel.app/_next/image?url=%2Fassets%2Flogo.png&w=96&q=75' alt='logo'/></Link>
      <h2>TV Shows</h2>
      <h2><Link to="/movies">Movies</Link></h2>
      <h2>News & Popular</h2>
      <h2><Link to="/list/">My List</Link> </h2>
    <div className='nav_icons'>
    <div className='search-box' style={{marginTop:"20px"}}>
                <input
                style={{color:"white"}}
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  placeholder="Search..."
                />
                <button onClick={handleSearchSubmit}><Searchic/></button>
              </div>
      <div className='name mob-hidden'>{isAuth? `Hey ${UserName}` : <Link to="/users/login"><button >Login</button></Link>} </div>
      <div className='name' onClick={clearLcstrg}><Logout/></div>
    </div>
    </div>

      
    </nav>
  )
}
 