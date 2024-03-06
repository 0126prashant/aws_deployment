import React from 'react'
import { Box, Button, Image, Text } from "@chakra-ui/react";



export const Card = ({ title, imageUrl,handleDeleteClick  }) => {
console.log(handleDeleteClick,"handleDeleteClick")
 
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={imageUrl} alt={title} />
      <Box p="6">
        <Text fontWeight="bold" fontSize="xl" mb="2" color={"#fff"}>
          {title}
        </Text>
        <Button
          onClick={handleDeleteClick}
          // isLoading={isDeleting}
          colorScheme="red"
          size="sm"
          mt="2"
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

