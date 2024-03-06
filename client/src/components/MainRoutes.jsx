import React from 'react'
import { Route, Routes } from "react-router-dom";
import { Login } from './Login';
import { Register } from './Register';
import { HomePage } from '../pages/HomePage';
import { List } from '../pages/List';
import { Search } from './Search';
import Movies from '../pages/Movies';


export const MainRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/list/" element={<List/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/movies" element={<Movies/>}/>
    </Routes>
    </>
  )
}
