import React,{useState} from 'react'
import { Box, Flex, Input, Text, FormLabel, Button, Image, FormControl } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getTempCart, makeOrderDetails, removeFromCart, assignCartToUser, settingUserDeliveryAddress } from '../Redux/CartRedux/action'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getDeliveryAddress } from '../Redux/deliveryAddressReducer/action'
import AddDeliveryAddressAccount from '../Components/AddDeliveryAddressAccount'
import { v4 as uuid } from 'uuid'
import { TiTick } from 'react-icons/ti'
import { addOrderDetails, assignOrderDetailToUser, getAllOrderDetails } from '../Redux/orderDetailsReducer/action'



const Checkout = () => { 

  const userData = useSelector((state)=>state.userAuthReducer.userData)
  const cart = useSelector((state)=>state.cartReducer.tempCart)
  const isUser =  useSelector((state)=>state.userAuthReducer.isAuthUser)
  const deliveryAddress = useSelector((state)=>state.deliveryAddressReducer.address)
  const [addressDone, setAddressDone] = useState({}) 


  let c = 0;

  for(let key in addressDone)
  {
    c++;
  }
 
  const [showload, showSetLoad] = useState(false)
  const paymentSuccessfulToast = useToast()
  const orderPlacedToast = useToast()
  const navigate = useNavigate()
  

  //console.log(userData)
  const dispatch = useDispatch() 


    useEffect(()=>{
    if(cart.length === 0)
    {
       dispatch(getTempCart())
      // dispatch(assignCartToUser(userData.id, cart))
    }
  }, [cart.length])
  
  const Total = cart.reduce((acc, elem)=> acc + (elem.price * elem.Qty), 0)
  const cartLength = cart.reduce((acc, elem)=> acc + (elem.Qty), 0)
  


       const handleOrderPlace = ()=>{ 

              dispatch(addOrderDetails(addressDone))
              .then((res)=>{
                if(res.type === "ADD_ORDER_DETAILS_SUCCESS")
                {
                    dispatch(getAllOrderDetails())
                    .then((resp)=>{
                       if(resp.type === "GET_ORDER_DETAILS_SUCCESS")
                       {
                          dispatch(assignOrderDetailToUser(userData.id,resp.payload))
                       }
                    })
                }
              })



              showSetLoad(true)
              setTimeout(()=>{
                showSetLoad(false)
                dispatch(getTempCart())
                .then((res)=>{
                
                    if(res.type === "GET_CART_DATA")
                    {
                      if(res.payload.length  > 0)
                      {
                        for(let i = 0; i < res.payload.length; i++)
                        {
                          dispatch(removeFromCart(res.payload[i].id))
                        }
                      }
                    }
                })

                  paymentSuccessfulToast({
                    title: 'PAYMENT SUCCESSFUL!',
                    status: 'success',
                    duration: 7000,
                    isClosable: true,
                    position: "top"
                  })

        
            },5000)

                setTimeout(()=>{
                  showSetLoad(false)
                  dispatch(getTempCart())
                  .then((res)=>{
                      if(res.type === "GET_CART_DATA")
                      {
                        dispatch(assignCartToUser(userData.id,res.payload))
                      }
                  })


                  orderPlacedToast({
                    title: ' YOUR ORDER HAS BEEN PLACED!',
                    description: "",
                    status: 'success',
                    duration: 7000,
                    isClosable: true,
                    position: "top"
                })


                navigate("/myorders")
          },10000)

       }

       useEffect(()=>{
        
        if(deliveryAddress.length === 0)
        {
          dispatch(getDeliveryAddress())
        }

       },[deliveryAddress.length]) 

       const handleSelectDeliveryAddress =(selectedAddress)=>{
           // console.log("selected", selectedAddress) 
          
           dispatch(getTempCart())
                  .then((res)=>{
                      if(res.type === "GET_CART_DATA")
                      {
                        dispatch(assignCartToUser(userData.id,res.payload))
                      }
                  })
            let date = new Date().toString()
            const payload = {
              order_No: uuid(),
              orderDetails: cart,
              delivery_address : selectedAddress,
              orderStatus : "Placed",
              Date_order_placed : date,
              Date_order_delivered : "",
            }
            console.log("order", payload)
            setAddressDone(payload)
       }

   console.log(addressDone)

  return (
    <Box w={"100%"} bg={"#f1f3f6 "} m={"auto"}>
            <Flex w={{base: "90%", sm:"90%", md:"85%", lg:"80%"}} m={"auto"} gap={"5px"} pt={"20px"} direction={{base:"column", sm:"column", md:"row", lg:"row"}}>

                  <Box  w={{base: "100%", sm:"100%", md:"65%", lg:"65%"}}> 
                  { deliveryAddress.length > 0 &&
                        <Box p={"5px"} bg={"white"}>
                          <Text fontSize={"18px"} fontWeight={"550"}>Choose delivery address</Text>
                          <Box p={"10px"} w={{base: "90%", sm:"90%", md:"80%", lg:"75%"}} m={"auto"}>
                              {
                                deliveryAddress.map((ele)=>(
                                  <Box border={"1px solid #e1e1e1"} p={"5px"} borderRadius={"10px"} key={ele.id} mb={"5px"}>
                                        <Flex gap={"10px"} flexWrap={"wrap"}>
                                            <Text>{ele.AddressLine1}</Text>
                                        </Flex>
                                        <Flex gap={"30px"} flexWrap={"wrap"} >
                                            <Text>{ele.AddressLine2}</Text> 
                                        </Flex>
                                        <Flex gap={"10px"}>
                                            <Text>{ele.Street}</Text>
                                            <Text>{ele.City}</Text>
                                        </Flex>
                                        <Flex gap={"10px"}>
                                            <Text>{ele.State}</Text>
                                            <Text>{ele.PinCode}</Text>
                                        </Flex>
                                        <Box textAlign={"left"}>
                                          <Button variant={"solid"} bg={"#ffcc33"} size={"xs"} onClick={()=>handleSelectDeliveryAddress(ele)}>Deliver to this address</Button>
                                        </Box>
                                  </Box>
                                ))
                              }
                          </Box >
                        </Box> 
                        }

                    <hr/>
                    
                      <Box bg={"white"} pb={"10px"} mb={"10px"} pt={"10px"}>
                        <AddDeliveryAddressAccount/>
                      </Box>
                      <hr/>
                      { c > 0 ? 
                         <Box bg={"white"} pb={"10px"}>
                            <Text fontSize={"18px"} pt={"20px"} fontWeight={"550"}>Delivery Address Details</Text>
                            <Box border={"1px solid #e1e1e1"} p={"10px"} fontWeight={"550"} borderRadius={"10px"} w={{base: "90%", sm:"90%", md:"80%", lg:"75%"}} m={"auto"}>
                                        <Flex gap={"10px"} flexWrap={"wrap"}>
                                            <Text>{addressDone?.delivery_address?.AddressLine1}</Text>
                                        </Flex>
                                        <Flex gap={"30px"} flexWrap={"wrap"} >
                                            <Text>{addressDone?.delivery_address?.AddressLine2}</Text> 
                                        </Flex>
                                        <Flex gap={"10px"}>
                                            <Text>{addressDone?.delivery_address?.Street}</Text>
                                            <Text>{addressDone?.delivery_address?.City}</Text>
                                        </Flex>
                                        <Flex gap={"10px"}>
                                            <Text>{addressDone?.delivery_address?.State}</Text>
                                            <Text>{addressDone?.delivery_address?.PinCode}</Text>
                                        </Flex>
                                  </Box>
                         </Box> : <></>}
                      
                      <Box bg={"white"}>
                      <Text fontSize={"18px"} fontWeight={"550"}>Add Payment Details</Text>
                             <Box w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"} mb={"8px"}>
                                  <FormControl isRequired>
                                   <FormLabel>Card Holder Name</FormLabel>
                                   <Input  type={"text"} borderRadius={"0px"} variant={"outline"}  />
                                  </FormControl>
                             </Box>
                             <Box w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"} mb={"8px"}>
                                  <FormControl isRequired>
                                   <FormLabel>Card Number</FormLabel>
                                   <Input  type={"number"} borderRadius={"0px"} variant={"outline"}  />
                                  </FormControl>
                             </Box>

                             <Flex w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"} gap={"10px"}>
                                  <Box w={"40%"} m={"auto"} mb={"8px"}>
                                      <FormControl isRequired>
                                        <FormLabel>CVV</FormLabel>
                                        <Input  type={"number"} borderRadius={"0px"} variant={"outline"}  />
                                      </FormControl>
                                  </Box>
                                  <Box w={"60%"} m={"auto"} mb={"8px"}>
                                       <FormControl isRequired>
                                        <FormLabel>Expiray </FormLabel>
                                        <Input  type={"month"} borderRadius={"0px"} variant={"outline"}  />
                                       </FormControl>
                                 </Box>
                             </Flex> 
                             <Box w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"}mt={"25px"} pb={"20px"}>
                              <Button variant={"solid"} bg={"green.400"} borderRadius={"0px"} isLoading={showload} color={"white"}  w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} onClick={handleOrderPlace}>Place an Order</Button>
                            </Box>
                      </Box>
                  </Box>
                  <Box  w={{base: "100%", sm:"100%", md:"35%", lg:"35%"}}  bg={"white"} >
                        <Text fontSize={"18px"} fontWeight={"550"} mt={"15px"} mb={"20px"}>Your Purchase</Text>
                        <Box w={{base: "80%", sm:"80%"}} m={"auto"}>
                            {
                              cart.map((elem)=>(
                                <Box key={elem.id} mb={"20px"}>
                                    <Box m={"auto"} w={"80%"}>
                                      <Image display={"block"} m={"auto"} w={"100px"} src={elem.cover} alt={"cartPics"}/>
                                    </Box>
                                    <Box textAlign={"left"} pl={"10px"} fontSize={"14px"} fontWeight={"550"}>
                                      <Text>{elem.name}</Text>
                                      <Text>Quantity: {elem.Qty}</Text>
                                      <Text>₹ {elem.price}</Text>
                                    </Box>
                                </Box>
                              ))
                            }
                        </Box>
                        <hr></hr>
                        <Text fontSize={"18px"} fontWeight={"550"} mt={"15px"} mb={"20px"}>Your Order Details</Text>
                        <Box>
                              <Flex justifyContent={"space-between"} pt={"20px"} mb={"40px"} pl={"20px"} pr={"20px"} alignItems={"center"}>
                                  <Text fontSize={"14px"} fontWeight={"600"}>Price ({cartLength} Items.)</Text>
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
                                  <Text fontSize={"17px"} fontWeight={"640"}>Total Payable Amount</Text>
                                  <Text fontSize={"17px"} fontWeight={"640"}>₹ {Total}</Text>
                            </Flex>
                        </Box>
                  </Box>
            </Flex>   
    </Box>
  )
}

export default Checkout