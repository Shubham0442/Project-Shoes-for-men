import { Box, Text, Flex, Image, Progress, Button } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUserOrderDetails } from '../Redux/CartRedux/action'
import { getAllOrderDetails } from '../Redux/orderDetailsReducer/action'
import { getUserData } from '../Redux/userDataReducer/userDataAction'

const MyOrders = () => { 

    const usersData = useSelector((state)=>state?.userAuthReducer?.userData) 
    const isUser = useSelector((state)=>state.userAuthReducer.isAuthUser)
    const allUserData = useSelector((state)=>state.userDataReducer.userData)
    const dispatch = useDispatch()
    const [ userInfo, setUserInfo ] = useState({}) 
    const [allOrders, setAllOrders] = useState([])

    

    const Total = userInfo?.orderDetails?.reduce((acc, elem)=> acc + (elem.price * elem.Qty), 0)
    const cartLength = userInfo?.orderDetails?.reduce((acc, elem)=> acc + (elem.Qty), 0) 

    useEffect(()=>{
        
      if(allUserData.length === 0)
      {
        dispatch(getUserData())
      }
    },[allUserData.length])

    useEffect(()=>{
      if(usersData.id)
      {
          let currentUser = allUserData.find((elem)=>elem.id === usersData.id) 
          currentUser && setUserInfo(currentUser) 
          currentUser && setAllOrders(currentUser.ordersHistory)
      }
       
    },[usersData.id, allUserData])
    //let status = usersData?.order_status 
   
    const handleShowOrders = ()=>{
       
    }
    



    //console.log("My orders",userInfo)
  return (
    <Box w={"100%"} bg={"#f1f3f6 "} m={"auto"}>
       <Text fontSize={"20px"} fontWeight={"550"}>Your Orders</Text>
      <Box p={"10px"}  pt={"20px"} w={{base:"90%", sm:"85%",md:"75%",lg:"70%"}} m={"auto"} fontSize={"12px"} fontWeight={"550"} bg={"white"}> 
        {
          userInfo?.ordersHistory?.map((elem)=>(
            <Box border={"1px solid #eae8e8"} borderRadius={"8px"} key={elem.id} p={"15px"} mb={"10px"}>
              <Flex flexWrap={"wrap"} gap={"8px"} mb={"8px"} justifyContent={"space-between"}>
                <Flex gap={"10px"} flexWrap={"wrap"}>
                    <Text fontWeight={"600"} alignItems={"center"} textDecoration={"underline"}>Order No.</Text>
                    <Text fontWeight={"400"}>{elem.order_No}</Text>
                </Flex>
                <Flex gap={"10px"} flexWrap={"wrap"}>
                     <Text fontWeight={"600"} alignItems={"center"} textDecoration={"underline"}>Order Placed on:</Text>
                     <Text fontWeight={"400"}>{elem.Date_order_placed}</Text>
                </Flex> 
              </Flex> 
              <Text mb={"10px"} textAlign={"left"} fontSize={"14px"} fontWeight={"550"}>Track Your Order</Text>
                <Box mb={"10px"} w={"98%"} m={"auto"}>
                  <Progress value={
                        elem?.orderStatus === "Placed" ? 3 : elem?.orderStatus=== "shipped"?  10 : elem?.orderStatus === "In Transit"? 60 : elem?.orderStatus === "Ariving Today" ? 83 : elem?.orderStatus === "Delivered"? 100 : 0
                        
                        
                      } size='xs' colorScheme='green' borderRadius={"5px"}/>
                </Box>
                <Flex m={"auto"} mb={"15px"}>
                     <Box w={"10%"} m={"auto"} >
                         <Text mb={"10px"} fontSize={{base:"7px", sm:"8px", md:"9px", lg:"10px"}} color={elem?.orderStatus==="Placed"? "black": "gray"} fontWeight={elem?.orderStatus==="Placed"? "Bolder": "400"}>Placed</Text>
                     </Box>
                     <Box w={"20%"} m={"auto"}  textAlign={"left"} >
                         <Text mb={"10px"} fontSize={{base:"7px", sm:"8px", md:"9px", lg:"10px"}} color={elem?.orderStatus==="shipped"? "black": "gray"} fontWeight={elem?.orderStatus==="shipped"? "Bolder": "400"}>Shipped</Text>
                     </Box>
                     <Box w={"40%"} m={"auto"}  textAlign={"right"}>
                         <Text mb={"10px"} fontSize={{base:"7px", sm:"8px", md:"9px", lg:"10px"}} color={elem?.orderStatus==="In Transit"? "black": "gray"} fontWeight={elem?.orderStatus==="In Transit"? "Bolder": "400"}>In Transit</Text>
                     </Box>
                     <Box w={"25%"} m={"auto"}  textAlign={"right"}>
                         <Text mb={"10px"} fontSize={{base:"7px", sm:"8px", md:"9px", lg:"10px"}} color={elem?.orderStatus==="Ariving Today"? "black": "gray"} fontWeight={elem?.orderStatus==="Ariving Today"? "Bolder": "400"}>Ariving today</Text>
                     </Box>
                     <Box w={"15%"} m={"auto"}  textAlign={"right"}>
                         <Text mb={"10px"} fontSize={{base:"7px", sm:"8px", md:"9px", lg:"10px"}} color={elem?.orderStatus==="Delivered"? "black": "gray"} fontWeight={elem?.orderStatus==="Delivered"? "Bolder": "400"}>Delivered</Text>
                     </Box>
                </Flex> 
              <Flex gap={"50px"} direction={{base:"column", sm:"column", md:"row", lg:"row"}}>
                    <Box>
                         {
                           elem?.orderDetails?.map((item)=>(
                               <Flex key={item.id} gap={"20px"} mb={"8px"}>
                                     <Box w={"80px"} h={"80px"}>
                                          <Image src={item.cover}/>
                                     </Box>
                                     <Box textAlign={"left"}>
                                           <Text>{item.name}</Text>
                                           <Text>₹ {item.price}</Text>
                                           <Text>Quantity:-{item.Qty}</Text>
                                     </Box>
                               </Flex>
                           ))
                         }
                    </Box>
                    <Box textAlign={"left"}>
                         <Text textDecoration={"underline"} fontSize={"14px"}>Delivery Address</Text>
                         <Text>{elem?.delivery_address?.AddressLine1}</Text>
                         <Text>{elem?.delivery_address?.AddressLine2}</Text>
                         <Text>{elem?.delivery_address?.Street}</Text>
                         <Text>{elem?.delivery_address?.City}</Text>
                         <Text>{elem?.delivery_address?.State}</Text>
                         <Text>{elem?.delivery_address?.PinCode}</Text>
                    </Box>
              </Flex>
                
            </Box>
          ))
        }

      </Box>
      
    </Box>
  )
}

export default MyOrders