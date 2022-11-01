import { Box, Button, Flex, Image, Text, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getShoesData } from '../Redux/AppReducer/action'
import { StarIcon } from '@chakra-ui/icons'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'

  
  import { addToCart, assignCartToUser, getTempCart } from '../Redux/CartRedux/action'

const SingleProduct = () => {

    let {id} = useParams()
    const shoeData = useSelector((state)=>state.appReducer.productData)
    const isUser =  useSelector((state)=>state.userAuthReducer.isAuthUser)
    const userData = useSelector((state)=>state.userAuthReducer.userData)
    
    var newCart  = useSelector((state)=>state.cartReducer.tempCart)
    const dispatch = useDispatch()
    const addProductCartToast = useToast()
    const forceLoginToast = useToast()

    const [ currentShoe, setCurrentShoe ] = useState({}) 
    const [ currentPic , setCurrentPic ] = useState("")
   // var reqCart = [];

   // console.log("outside", newCart)

    // const setUserCart = ()=>{
    //     console.log("from add to cart fun", newCart)
        
    // } 

    // for(let i = 0; i < newCart.length; i++)
    // {
    //      reqCart.push(newCart[i])
    // }
    
//     let x = newCart.map((item)=>item.id === currentShoe.id && 
//        currentShoe
//     )
    
//     userCart = x ;
//    console.log("userCart", userCart)
    const handleAddToCart =()=>{
        
        if(isUser === true)
        {  
            
            dispatch(addToCart(currentShoe))
            .then((res)=>{
                if(res.type === "ADD_TO_CART_SUCCESS")
                {  
                    dispatch(getTempCart())
                    .then((res)=>{
                        if(res.type === "GET_CART_DATA")
                        {
                            //console.log("res.payload",res.payload)
                            dispatch(assignCartToUser(userData.id, res.payload))
                        }
                    })
                    addProductCartToast({
                        title:"Product added to Cart",
                        status: "info",
                        duration: 3000,
                        isClosable: true,
                        position :"top-right"
                    })

                }
                // console.log("hellooo")

                //dispatch(assignCartToUser(userData.id, userData.cart, currentShoe))
                //console.log("from add to cart fun-53", userCart)
            })
            // console.log(userData.id)
             
           
            
        }
        else{
            forceLoginToast({
                    title:"Please Register / Login",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position :"bottom"
            })
        }
          
        
    }

    useEffect(()=>{
          if(shoeData.length === 0)
          {
            dispatch(getShoesData())
          } 
    },[shoeData.length]) 

    useEffect(()=>{
       
        if(id){
            const newCurrentShoe = shoeData.find((elem)=>elem.id === +id)
            
            newCurrentShoe && setCurrentShoe(newCurrentShoe)
        }
    },[id, shoeData]) 

    //console.log(currentShoe)
    const handlePicChange=(a)=>{
        if(currentShoe?.images?.length === 4)
        {
            currentShoe?.images?.push(currentShoe.cover);
        }
        else if(currentShoe?.images?.length === 5)
        {
            setCurrentPic(a)
        }  
    }




  return (
    <Box w={{lg:"80%"}} m="auto" pt={"20px"} pb="20px" >
        <Flex w={{ lg:"100%"}} direction={{base:"column", sm:"column", md:"column", lg:"row"}}  margin="auto">
            <Box w={{md:"70%", lg:"50%"}} m="auto" >
                <Box w={{base : "70%", sm:"60%", md:"60%",lg:"80%"}} h={{base:"200px", sm:"250", md:"300px", lg:"500px"}}  m="auto" boxSizing={"border-box"} position={"relative"} overflow={"hidden"}>
                      <Image objectFit={"contain"} w={{base:"100%",lg:"100%"}} h={"100%"}src={ currentPic ==="" ? currentShoe.cover : currentPic}
                         transition={"all 0.5s"}
                         _hover={{"transform":"scale(1.5)", transition: "all 0.6s"}}
                         display={"block"}
                      />
                </Box>
                 
                 <Box >
                    <Flex w={"80%"} m={"auto"} gap="10px" pt={"15px"}>
                    {
                        currentShoe?.images?.map((ele)=>(
                            <Box key={ele} border="1px solid #e1e1e1" w={"20%"} p="8px" m={"auto"} onClick={()=>handlePicChange(ele)}>
                                    <Image objectFit={"contain"} src={ele} w="100%" h={{base:"40px", md :"80px"}}/>
                            </Box>
                        ))
                    }
                    </Flex>
                 </Box>
            </Box>                
             <Box w={{base: "85%", sm: "80%", md:"60%", lg:"60%"}} textAlign={"left"} pl={{base:"0px", md:"10px", lg:"30px"}} m={"auto"} >
                  <Text fontWeight={"550"} fontSize={"18px"} pb="12px">{currentShoe.name}</Text>
                  <Text fontWeight={"550"} fontSize={"18px"} pb="12px">{currentShoe.brand}</Text>
                  <Text fontWeight={"550"} fontSize={"18px"} color={"#8d8d8d"} pb="12px">{currentShoe.category}</Text>
                  <Text fontWeight={"650"} fontSize={"18px"} pb="12px">₹ {currentShoe.price}</Text>
                  <Box display='flex' mt='2' alignItems='center'pb="12px">
                        {Array(5)
                            .fill('')
                            .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < currentShoe.rating ? '#ffa41c' : 'gray.300'}
                            />
                            ))}
                  </Box> 
                  <Flex direction={{base:"column",sm:"row", md:"row", lg: "row"}} gap="10px">
                    <Button bg={"#ffcc33"} color={"black"} w={{sm:"40%"}} onClick={handleAddToCart}>Add To Cart</Button>
                    <Button bg={"#8d8d8d "} color={"white"} w={{sm:"40%"}}>Add To Wishlist</Button>
                  </Flex>
                  <Box >
                  <TableContainer  >
                                <Table variant='simple' size={{base:"sm", sm:"sm", md:"md"}} >
                                    <TableCaption>Product Specification</TableCaption>
                                    <Thead >
                                    <Tr>
                                        <Th>feature</Th>
                                        <Th>Info</Th>           
                                    </Tr>
                                    </Thead>
                                    <Tbody >
                                    <Tr>
                                        <Td>Color</Td>
                                        <Td>{currentShoe?.details?.Color}</Td>
                                        
                                    </Tr>
                                    <Tr>
                                        <Td>Outer material</Td>
                                        <Td>{currentShoe?.details?.Outermaterial}</Td>
                                        
                                    </Tr>
                                    <Tr>
                                        <Td>SoleMaterial</Td>
                                        <Td>{currentShoe?.details?.Sole_material}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Closure</Td>
                                        <Td>{currentShoe?.details?.Closure}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Model name</Td>
                                        <Td>{currentShoe?.details?.Model_name}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Occasion</Td>
                                        <Td>{currentShoe?.details?.Occasion}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Ideal for</Td>
                                        <Td>{currentShoe?.details?.Ideal_for}</Td>
                                    </Tr>
                                    </Tbody>
                                </Table>
                    </TableContainer>
                  </Box>
            </Box>
        </Flex>
    </Box>
  )
}

export default SingleProduct