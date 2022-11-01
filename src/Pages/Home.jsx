import { Box,Flex,Image } from '@chakra-ui/react'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => { 

  const adminAuth = useSelector((state)=>state.adminAuthReducer)
  //console.log(adminAuth)

  const banners = [
    "https://cdn.shopify.com/s/files/1/0567/9503/7849/files/website-banner-desktop-landscape.jpg?v=1635135138",
    "https://i5.walmartimages.com/dfw/4ff9c6c9-c163/k2-_3591cdcf-aa76-4507-a771-4ccf9699e85a.v1.jpg",
    "https://cdn.shopify.com/s/files/1/0566/4935/1211/files/new_collection_Banner_Landscape.png?v=1660211372&width=1500"
  ]
 
  const settings = {
    dots:true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
  };

  return (
    <Box w={{base:"100%"}} m="auto">
        <Box w={{base:"80%", sm: "80%", md:"80%", lg:"80%"}} h={{base:"200px", sm: "300px", md:"400px", lg:"500px"}} m={"auto"}pt="2px">
          <Slider {...settings}>
            {
              banners.map((ele)=>(
                <Box key={ele}>
                <Image w={{lg:"100%"}} h={{base:"150px", sm: "250px", md:"350px", lg:"450px"}} src={ele}/>
              </Box>
              ))
            } 
        </Slider>
      </Box> 
      <Link to={"mensshoe"}>
        <Flex w={{base:"80%", sm: "80%", md:"85%", lg:"80%"}}
              m="auto" 
              h={{base:"150px", sm: "250px", md:"300px", lg:"400px"}}  
              alignItems={"center"}
              gap="10px"
              mb={"20px"}
              >
              
              <Image 
                  w={"60%"} h={{base:"150px", sm: "250px", md:"300px", lg:"400px"}} border={"1px solid #e1e1e1"}
                  src='https://marketplace.canva.com/EAE_tAY8E3w/1/0/800w/canva-shoes-sale-%28banner-%28landscape%29%29-Nmiz3g5Ktq8.jpg'
               />
             
          
              <Image 
                 w={"40%"} h={{base:"150px", sm: "250px", md:"300px", lg:"400px"}} border={"1px solid #e1e1e1"}
                 src='https://i.pinimg.com/originals/c8/c8/f6/c8c8f6a67b4f3402de8c43739a158683.jpg'
               />
          
        </Flex>
        </Link>

        
    </Box >
  )
}

export default Home