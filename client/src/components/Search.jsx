import { Box, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'


export const Search = () => {
  const [result,setResult] = useState([])
  const searchQry = localStorage.getItem("serach")
    useEffect(()=>{
        const search = async()=>{

            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=2f91df7c599cd01601b84f9f8b5c20e0&query=${searchQry}`);
                const data = await response.json();
                setResult(data.results); 
              } catch (error) {
                console.error('Error fetching data:', error);
              }
        }
        search()
    },[searchQry])
  return (
    <>
    <Navbar/>
    <Box
    display="grid"
    gridTemplateColumns="repeat(auto-fill, minmax(250px, 1fr))"
    gap={4}
    bg={"#141414"}
    p={50}
  >
    {result.map((item) => (
      <Box
        key={item.id}
        p="6"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="base"
        transition="transform 0.2s"
      >
        <Image
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={item.title}
          borderRadius="md"
          mb="4"
        />
        <Text fontWeight="bold" fontSize="xl" mb="2" textAlign="center" color={"#fff"}>
          {item.title}
        </Text>
      </Box>
    ))}
  </Box>
  
</>
  )
}
