import { Box, Text, Flex, Button } from '@chakra-ui/react'
import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddDeliveryAddressAccount from '../Components/AddDeliveryAddressAccount'
import { getUserOrderDetails } from '../Redux/CartRedux/action'

const MyAccount = () => {

  const userDetails = useSelector((state)=>state.userAuthReducer.userData)
  const isUser = useSelector((state)=>state.userAuthReducer.isAuthUser)
  const [userInfo, setUserInfo] = useState({})
  
  const dispatch = useDispatch()
  

  useEffect(()=>{
    if(userDetails.id)
    {
      dispatch(getUserOrderDetails(userDetails.id))
      .then((res)=>{
        if(res.type === "GET_USER_ORDER_DETAILS")
        {
              setUserInfo(res.payload)
        }
      })
    }
     
  },[userDetails.id])

  //console.log("account", userInfo)

  return (
    <Box w={"100%"} bg={"#f1f3f6 "} m={"auto"} pt={"20px"}>
              <Box  w={{base:"85%", sm:"70%", md:"65%", lg:"30%"}} m={"auto"} bg={"white"} pl={"15px"} mb={"10px"}>
                  <Text fontSize={"18px"} fontWeight={"550"}>My Account</Text>
              </Box>
          <Box w={{base:"85%", sm:"70%", md:"65%", lg:"30%"}} m={"auto"}  bg={"white"} pl={"15px"} fontSize={"14px"} fontWeight={"550"} pt={"20px"} pb={"20px"} pr={"15px"} mb={"10px"}>
            <Box>
                <Flex alignItems={"center"} justifyContent={"space-between"} gap={"50px"}>
                  <Box w={"50%"} textAlign={"left"}>
                     <Text>Firstname</Text>
                  </Box>
                  <Box  w={"50%"} textAlign={"left"}>
                     <Text>{userInfo.firstname}</Text>
                  </Box>    
                </Flex>
                <Flex alignItems={"center"} justifyContent={"space-between"} gap={"50px"}>
                    <Box w={"50%"} textAlign={"left"}>
                      <Text>Lastname</Text>
                    </Box>
                    <Box  w={"50%"} textAlign={"left"}>
                      <Text>{userInfo.lastname}</Text>
                    </Box>
                </Flex>
            </Box>
            
            <Flex alignItems={"center"} justifyContent={"space-between"} gap={"50px"}>
                  <Box w={"50%"} textAlign={"left"}>
                     <Text>Email</Text>
                  </Box>
                  <Box  w={"50%"} textAlign={"left"}>
                     <Text>{userInfo.email}</Text>
                  </Box>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} gap={"50px"}>
                  <Box w={"50%"} textAlign={"left"}>
                     <Text>Mobile number</Text>
                  </Box>
                  <Box  w={"50%"} textAlign={"left"}>
                     <Text>{userInfo.mobile}</Text>
                  </Box>
            </Flex> 
          </Box>
          <Box w={{base:"85%", sm:"70%", md:"65%", lg:"30%"}} m={"auto"} pt={"5px"} pb={"5px"} bg={"white"} pl={"15px"} mb={"10px"}>
            <Text fontSize={"15px"} textAlign={"left"} fontWeight={"550"}>Delivery Address</Text>
          </Box>
          {
            userInfo?.delivery_address?.PinCode ?
            <Box w={{base:"85%", sm:"70%", md:"65%", lg:"30%"}} m={"auto"}  bg={"white"} pl={"15px"} fontSize={"14px"} fontWeight={"550"} pt={"20px"} pb={"20px"} pr={"15px"}>
            <Box>
                <Flex alignItems={"center"} justifyContent={"space-between"} gap={"50px"} mb={"10px"}>
                  <Box w={"50%"} textAlign={"left"}>
                     <Text>Address Line1</Text>
                  </Box>
                  <Box  w={"50%"} textAlign={"left"}>
                     <Text>{userInfo?.delivery_address?.AddressLine1}</Text>
                  </Box>    
                </Flex>
                <Flex alignItems={"center"} justifyContent={"space-between"} gap={"50px"} mb={"10px"}>
                    <Box w={"50%"} textAlign={"left"}>
                      <Text>Address Line2</Text>
                    </Box>
                    <Box  w={"50%"} textAlign={"left"}>
                      <Text>{userInfo?.delivery_address?.AddressLine2}</Text>
                    </Box>
                </Flex>
            </Box>
            
            <Flex alignItems={"center"} justifyContent={"space-between"} gap={"50px"} mb={"10px"}>
                  <Box w={"50%"} textAlign={"left"}>
                     <Text>Street</Text>
                  </Box>
                  <Box  w={"50%"} textAlign={"left"}>
                     <Text>{userInfo?.delivery_address?.Street}</Text>
                  </Box>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} gap={"50px"} mb={"10px"}>
                  <Box w={"50%"} textAlign={"left"}>
                     <Text>City</Text>
                  </Box>
                  <Box  w={"50%"} textAlign={"left"}>
                     <Text>{userInfo?.delivery_address?.City}</Text>
                  </Box>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} gap={"50px"} mb={"10px"}>
                  <Box w={"50%"} textAlign={"left"}>
                     <Text>State</Text>
                  </Box>
                  <Box  w={"50%"} textAlign={"left"}>
                     <Text>{userInfo?.delivery_address?.State}</Text>
                  </Box>
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"} gap={"50px"} mb={"10px"}>
                  <Box w={"50%"} textAlign={"left"}>
                     <Text>Pincode</Text>
                  </Box>
                  <Box  w={"50%"} textAlign={"left"}>
                     <Text>{userInfo?.delivery_address?.PinCode}</Text>
                  </Box>
            </Flex> 
            </Box> : 
            <Box w={{base:"85%", sm:"70%", md:"65%", lg:"30%"}} m={"auto"} pt={"5px"} pb={"5px"} bg={"white"} pl={"15px"}>
                <Text mb={"10px"}>Not Available</Text>
                <AddDeliveryAddressAccount/>
            </Box>
          }
          
    </Box>
  )
}

export default MyAccount