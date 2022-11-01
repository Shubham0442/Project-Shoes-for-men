import React from 'react'
import { Box, Flex, Text, Image, Button, useToast } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { assignCartToUser, getTempCart, manageQuantity, removeFromCart } from '../Redux/CartRedux/action'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

  const cart = useSelector((state)=>state.cartReducer.tempCart)
  const isUser =  useSelector((state)=>state.userAuthReducer.isAuthUser)
  const userData =  useSelector((state)=>state.userAuthReducer.userData)
  const isAdmin = useSelector((state)=>state.adminAuthReducer.isAuthAdmin) 

  const dispatch = useDispatch()
  const removeProductToast = useToast()
  const showLoginToast = useToast()
  const navigate = useNavigate()

  const handleRemoveFromCart =(id)=>{

    if(isUser === true)
    {  
        dispatch(removeFromCart(id))
        .then((res)=>{
            if(res.type === "REMOVE_PRODUCT_FROM_CART")
            {
                //dispatch(assignCartToUser(userData.id, cart))
                    dispatch(getTempCart())
                    .then((res)=>{
                        if(res.type === "GET_CART_DATA")
                        {
                            console.log("res.payload",res.payload)
                            dispatch(assignCartToUser(userData.id, res.payload))
                        }
                    })
                removeProductToast({
                    title:"One Product Removed",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position :"top-right"
                })

            }
        })

        
    }
      
  } 

  const handleQuantity = (id, Qty, quantity)=>{

                if(isUser === true)
                {
                    dispatch(manageQuantity(id, Qty, quantity))
                    .then((res)=>{
                       if(res.type === "MANAGE_QUANTITY")
                       {
                           
                           dispatch(getTempCart())
                            .then((res)=>{
                            if(res.type === "GET_CART_DATA")
                            {
                                //console.log("res.payload",res.payload)
                                dispatch(assignCartToUser(userData.id, res.payload))
                            }
                            })     
                       }
                    })
  
                } 
          }

  const handleRedirectToAllProducts =()=>{
    navigate("/mensshoe")
  }

  useEffect(()=>{
      if(cart.length === 0)
      {
         dispatch(getTempCart())
        // dispatch(assignCartToUser(userData.id, cart))
      }
  }, [cart.length])
  


  const Total = cart.reduce((acc, elem)=> acc + (elem.price * elem.Qty), 0)
  const cartLength = cart.reduce((acc, elem)=> acc + (elem.Qty), 0) 

  const handleCheckOut = ()=>{
     if(isUser === true)
     {  

        navigate("/checkout")
     }
     else{
        showLoginToast({
            title:"Please Register/Login",
            status: "error",
            duration: 2000,
            isClosable: true,
            position :"bottom",
            mb:"100px"
        })
     }
  } 
  //console.log(userData.cart)

  return (
    <Box w={"100%"} bg={"#f1f3f6"} m={"auto"}>

        {
           isUser && cart.length > 0  ? 
        <Flex w={{base:"100%", sm:"100%", md:"90%", lg:"80%"}} m={"auto"} gap={"10px"} pt={"20px"} direction={{base:"column", sm:"column", md: "column", lg:"row"}}>
              <Box w={{base:"80%", sm:"80%", md:"80%", lg:"65%"}}  textAlign={"left"} pl={"10px"} m={{base: "auto", sm:"auto", md:"auto", lg:"px"}}>
                  <Box bg={"white"} mb={"20px"} p="5px">
                      <Text fontWeight={"600"} pl={"20px"}>Your Cart ({cartLength})</Text>
                  </Box>
                 
                  <Box >
                        {  cart.length > 0 &&
                            cart.map((elem)=>(
                            <Box key={elem.id} bg={"white"} mb={"8px"} border={"1px solid #f1f3f6"} p={"10px"}  >
                              <Flex direction={{base: "column", sm:"row"}} alignItems={"center"}> 
                                  <Box w={"100px"} m={{base:"auto", sm:"px", md:"px"}} >
                                    <Image objectFit={"cover"}  src={elem.cover} alt={"cartPic"}/>
                                  </Box>
                                  <Box  pl={"15px"} textAlign={"left"}>
                                      <Text fontWeight={"480"} fontSize={"13.5px"}>{elem.name}</Text>
                                      <Text fontWeight={"550"} fontSize={"14px"} color={"#969491"}>{elem.category}</Text>
                                      <Text fontWeight={"550"} fontSize={"14px"}>{elem.brand}</Text>
                                      <Text fontWeight={"650"} fontSize={"16px"}>₹ {elem.price}</Text>
                                      
                                      <Flex alignItems={"center"} gap={"5px"}>
                                          <Text fontWeight={"480"} fontSize={"13.5px"}>Quantity:</Text>
                                          <Button  size={"xs"} fontWeight={"700"} fontSize={"13.5px"} disabled={elem.Qty === 1} onClick={()=>handleQuantity(elem.id,elem.Qty, -1)}>-</Button>
                                             <Text fontWeight={"480"} fontSize={"13.5px"} pl={"5px"} pr={"5px"}>{elem.Qty}</Text>
                                          <Button size={"xs"} fontWeight={"700"}  fontSize={"13.5px"} onClick={()=>handleQuantity(elem.id,elem.Qty, 1)}>+</Button>
                                      </Flex>
                                  </Box>
                              </Flex>
                              <Flex mt={"5px"} alignItems={"center"} gap={"2px"} border={"1px solid #f1f3f6"}>
                                    <Box w={"50%"} >
                                        <Button fontSize={"12px"} variant={"unstyled"} w={"100%"} onClick={()=>handleRemoveFromCart(elem.id)}>Remove</Button>
                                    </Box>
                                    <Box w={"50%"}>
                                        <Button fontSize={"12px"} variant={"unstyled"} w={"100%"}>Add to Wishlist</Button>
                                    </Box>
                              </Flex>
                            </Box>
                            ))
                        }
                  </Box> 
              </Box>
              <Box  w={{base:"80%", sm:"80%", md:"80%", lg:"35%"}} m={{base: "auto", sm:"auto", md:"auto", lg:"px"}} textAlign={"left"} pl={"10px"}>
                  <Box bg={"white"} mb={"20px"} p="5px" textAlign={"left"} pl={"20px"}>
                      <Text fontWeight={"600"}>Order Summery</Text>
                  </Box>
                  <Box bg={"white"}>
                       <Flex justifyContent={"space-between"} pt={"20px"} mb={"40px"} pl={"20px"} pr={"20px"} alignItems={"center"}>
                             <Text fontSize={"14px"} fontWeight={"600"}>Price ({cart.length} Items.)</Text>
                             <Text fontSize={"14px"} fontWeight={"600"}>₹ {Total}</Text>
                       </Flex>
                       <Flex justifyContent={"space-between"} mt={"10px"} mb={"40px"} pl={"20px"} pr={"20px"} alignItems={"center"}>
                             <Text fontSize={"14px"} fontWeight={"600"}>Discount</Text>
                             <Text fontSize={"14px"} fontWeight={"600"}>0.00</Text>
                       </Flex>
                       <Flex justifyContent={"space-between"} mt={"10px"} mb={"40px"} pl={"20px"} pr={"20px"} alignItems={"center"}>
                             <Text fontSize={"14px"} fontWeight={"600"}>Delivery Charges</Text>
                             <Text fontSize={"14px"} fontWeight={"600"} color={"green.400"}>Free</Text>
                       </Flex>
                       <Flex justifyContent={"space-between"} pb={"20px"} mt={"10px"} mb={"40px"} pl={"20px"} pr={"20px"} alignItems={"center"}>
                             <Text fontSize={"17px"} fontWeight={"640"}>Total Amount</Text>
                             <Text fontSize={"17px"} fontWeight={"640"}>₹ {Total}</Text>
                       </Flex>
                  </Box>
                  <Box m={{base: "auto", sm:"auto", md:"auto", lg:"px"}}>
                             <Button 
                                w={"100%"} 
                                bg={"#333333"}
                                color={"white"}
                                borderRadius={"0"}
                                _hover={{bg:"green.500", color:"white"}}
                                onClick={handleCheckOut}
                                >
                                    Proceed to Checkout
                                </Button>
                  </Box>
              </Box>
              
        </Flex> : 
                <Box textAlign={"center"} w={{base:"100%", sm:"100%", md:"30%", lg:"30%"}} m={"auto"} pt={"20px"}>
                       <Image  display={"block"} src={"https://nexispro.com/wp-content/uploads/2020/09/empty-cart.jpg"} alt={"emptyCart"} mb={"10px"}/>
                       <Button bg={"#3470e4 "} onClick={handleRedirectToAllProducts} mb={"10px"} variant={"outline"} borderRadius={"0px"} color={"white"} _hover={{color:"black", bg:"white"}}>
                              Shop Now
                       </Button>
                </Box>
         }
    </Box>
  )
}

export default Cart