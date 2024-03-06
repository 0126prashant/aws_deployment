import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { POST_REGISTER_SUCCESS } from '../redux/Register/actionTypes/actionTypes';
import { register } from '../redux/Register/actions/userActions';
import { useDispatch } from 'react-redux';
import "../Styles/register.css"

export const Register = () => {
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [password,setPass] = useState("")
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const toast = useToast()


    const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        let obj = {email,name,password}
        if (!passwordRegex.test(password)) {
          toast({
            title: "Invalid Password",
            description: "Password must be at least 8 characters long, The first letter should be Capital and contain at least one numeric character .",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }
        // console.log(e.target)
        dispatch(register(obj)).then((res)=>{
          if(res.type == POST_REGISTER_SUCCESS){
            toast({
              title: "Registration Successful",
              description: "Thank you for registering! You can now log in with your new account.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            navigate("users/login");
          }
          
        })
        
    }

  return (
    <>
    <img src="https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/7fb62e44-31fd-4e1f-b6ad-0b5c8c2a20ef/IN-en-20231009-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="backImage"/>
    <div className='main-container'>
        <h2 className='regiter_h2'>Register</h2>
        <br/>
        <br/>

        <form onSubmit={handleSubmit}>
        <label>Name  </label>
        <input
          type="name"
          name="name"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e)=> setName(e.target.value)}
          required
        />
        <br/>
        <br/>
        <label>Email  </label>
        <input
          type="email"
          name="email"
          placeholder="Enater Your Email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
          required
        />
        <br/>
        <br/>
        <label>Password  </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e)=> setPass(e.target.value)}
          required
        />
         <br/>
        <br/>
        <button className='btn' type="submit">Register</button>
        </form>
    </div>
    </>
  )
}
