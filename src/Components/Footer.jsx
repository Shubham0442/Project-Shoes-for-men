import React from 'react'
import { Box, Flex, Image } from '@chakra-ui/react'
import { FaFacebookF, FaTwitter, FaInstagramSquare } from 'react-icons/fa';
import { ImYoutube2 } from 'react-icons/im';

const Footer = () => {
  return (
    <Box w={"100%"} m="auto" color={"black"} bg = "blackAlpha.200" fontWeight={"550"}>
      <Flex justifyContent={"space-evenly"} alignItems="center">
           <Box>
                <Flex justifyContent={"space-evenly"} alignItems="center" gap={{base:"10px", sm:"20px", md:"30px"}}>
                    <Box textAlign={"left"} fontSize={{base:"10px", sm:"12px", md:"15px"}} pl="10px">
                        <h2>About us</h2>
                        <h2>Contact</h2>
                        <h2>Payments</h2>
                        <h2>SFM Wholesales</h2>
                    </Box>
                    <Box textAlign={"left"} fontSize={{base:"10px", sm:"12px", md:"15px"}}>
                        <h2>Privacy Policy</h2>
                        <h2>shipping</h2>
                        <h2>FAQ</h2>
                        <h2>Return Policy</h2>
                    </Box>         
                </Flex>
           </Box>
           <Box>
                <Flex direction={"column"} pt="30px" pb={"30px"} justifyContent={"space-evenly"} alignItems="center" gap={"30px"}>
                       <Box>
                            <Flex justifyContent={"space-evenly"} alignItems="center" gap={"10px"} fontSize="20px" pr="10px">
                                <FaFacebookF/>
                                <FaTwitter/>
                                <FaInstagramSquare/>
                                <ImYoutube2/>
                             </Flex>
                       </Box>
                       <Box> 
                        <Flex justifyContent={"space-evenly"} alignItems="center" direction={{ base:"column", sm:"column", md:"row"}} pr="10px">
                          <Image w="120px" h={"30px"} src="https://www.informatique-mania.com/wp-content/uploads/2020/12/Logo-app-Instalcion-Google-Play-Store.png"/>
                          <Image w="120px" h={"35px"} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1-nnSGiJVwuUvJEpvGLIhb7aoB0l9mrC7vdyXQk1GDitpzKEAzaAM0r3sh65eOKwLeN4&usqp=CAU'/>
                        </Flex>
                       </Box>
                </Flex>
           </Box>
      </Flex>
      <Box bg={"#333333"} color="white" h={"30px"} fontSize={{base:"10px", sm:"12px", md:"15px"}} pt="4px">
            <h2>©2022 Shoes For Men</h2> 
      </Box>
    </Box>
  )
}

export default Footer