import { Box, FormControl, Input } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Heading,
  Text,
  FormLabel,
  Flex,
  useToast
} from '@chakra-ui/react'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../Redux/UserAuthReducer/action'
import Register from './Register'
import { addToCart, assignUserCartToTempCart, getTempCart } from '../Redux/CartRedux/action'
import { addDeliveryAddress, getDeliveryAddress } from '../Redux/deliveryAddressReducer/action'
import { addOrderDetails, getAllOrderDetails } from '../Redux/orderDetailsReducer/action'


const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const loginSuccessToast = useToast()
  const loginFailToast = useToast()
  const isAuthUser = useSelector((state)=>state.adminAuthReducer)
  const userData = useSelector((state)=>state.userAuthReducer.userData)
  let cart = useSelector((state)=>state.cartReducer.tempCart)
 
  const navigate = useNavigate()

  const [ loginForm, setLoginForm ] = useState({
    email : "",
    password : ""
  })

  const handleLogin = (e)=>{
    let { name, value } = e.target
    setLoginForm({
      ...loginForm,
      [name] : value
    })
  }

  const handleSubmit =(e)=>{
     e.preventDefault();
     
     dispatch(userLogin(loginForm))
     .then((res)=>{
        if(res.type === "USER_LOGIN_SUCCESS")
        { 
          let userCart = res.payload.cart
          let userAddresses = res.payload.Multiple_delivery_addresses
          let userOrderHistory = res.payload.ordersHistory
            dispatch(getTempCart())
            .then((resp)=>{
              
              if(resp.type === "GET_CART_DATA")
              {
                if( userCart.length > 0 && resp.payload.length === 0)
                {
                  for(let i = 0; i < userCart.length; i++)
                  {
                    dispatch(addToCart(userCart[i]))
                  }
                }
              } 

              dispatch(getDeliveryAddress())
              .then((resp)=>{
                  if(resp.type === "GET_DELIVERY_ADDRESS")
                  {

                    if(userAddresses.length > 0 && resp.payload.length === 0)
                    {
                        for(let i = 0; i < userAddresses.length; i++)
                        {
                          dispatch(addDeliveryAddress(userAddresses[i]))
                        }
                    }
                  }
              })

              dispatch(getAllOrderDetails())
              .then((resp)=>{
                if(resp.type === "GET_ORDER_DETAILS_SUCCESS")
                {    
                  //console.log("ueseordersLogin", userOrderHistory)
                     if(userOrderHistory.length > 0 && resp.payload.length === 0)
                     {
                        for(let i = 0; i < userOrderHistory.length; i++)
                        {  
                          //console.log(userOrderHistory[i])
                           dispatch(addOrderDetails(userOrderHistory[i]))
                           
                        }
                     }
                }
              })
          })
          
           
          //console.log("userAdd", userAddresses)
              
       
          //dispatch(assignUserCartToTempCart())
          loginSuccessToast({
            title: 'Login Successful.',
            description: `Welcome ${res.payload.firstname}.`,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: "top"
          })
          navigate('/')
        }
        else if(res.type === "ADMIN_LOGIN_SUCCESS")
        {
          loginSuccessToast({
            title: 'Login Successful.',
            description: `Welcome ${res.payload.firstname}.`,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: "top"
          })
          navigate('/')
        }
        else if(res === "INVALID_USER_CRIDENTIALS")
        {
          loginFailToast({
            title: 'Invalid Cridentials.',
            description: "Please enter correct login cridentials.",
            status: 'error',
            duration: 6000,
            isClosable: true,
            position: "top",
            //size:{{base:"xs", sm:"xs",}}
          })
        }
        else if(res === "INVALID_CRIDENTIALS")
        {
          loginFailToast({
            title: 'Access Denied.',
            description: "Please enter correct login cridentials.",
            status: 'error',
            duration: 6000,
            isClosable: true,
            position: "top",
            //size:{{base:"xs", sm:"xs",}}
          })
        }
     })

    //  setLoginForm({
    //   ...loginForm,
    //   email : "",
    //   password : ""
    // })
     onClose()
  }

  //console.log(isAuthUser)


  return (
    <Box >
    <Box display={{base:"none", sm:"none", md: "block", lg:"block"}}>
      <Button 
             display={{base:"none", sm:"none", md: "block", lg:"block"}}
             border={"0"} variant={"unstyled"} onClick={onOpen}>Login</Button>

          <Modal isOpen={isOpen} onClose={onClose} size={{base:"xs", sm:"xs", md:"xs"}} >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
              <Stack align={'center'}>
                <Heading fontSize={'2xl'} textAlign={'center'}>
                  Login
                </Heading>
              </Stack>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody p={"20px"}>
                <form onSubmit={handleSubmit}>

                  <Box mb={"10px"}>
                    <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input type={"email"}  value={loginForm.email} borderRadius={"0px"} name="email" onChange={handleLogin}/>
                    </FormControl>
                  </Box>
                 
                
                  <Box mb={"10px"}>
                     <FormControl isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input type={"password"}  value={loginForm.password} borderRadius={"0px"} name="password" onChange={handleLogin}/>
                    </FormControl>
                  </Box>
                 <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={'green.400'}
                    color={'white'}
                    _hover={{
                      bg: 'yellow.400',
                    }} borderRadius={"0px"} type={"submit"}>
                    Login
                  </Button>
                </Stack>
              </form>
                <Stack pt={6} >
                  <Text align={'center'}>
                    Not registered ?   
                  </Text>
                    <Box display={{base:"none", sm:"none", md:"block", lg:"block"}} w="20%" m={"auto"} textAlign={"center"}>
                         <Register />
                    </Box>
                     <Box display={{base:"block", sm:"block", md:"none"}}>
                        <Link  to={"/register"} color={'blue.400'}>Register</Link>
                     </Box> 
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
          <Box display={{base:"block", sm:"block", md: "none", lg:"none"}} w={"65%"} m={"auto"}>
          <Stack align={'center'}>
                <Heading fontSize={'20px'} textAlign={'center'} mb="20px">
                   Login
                </Heading>
              </Stack>
          <form onSubmit= {handleSubmit}>
                  <Box mb={"4px"}>
                    <FormLabel>Email</FormLabel>
                    <Input type={"email"}size={"sm"}  value={loginForm.email} borderRadius={"0px"} name="email" onChange={handleLogin}/>
                  </Box>

                  <Box mb={"4px"}>
                    <FormLabel>Password</FormLabel>
                    <Input type={"password"} size={"sm"} value={loginForm.password} borderRadius={"0px"} name="password" onChange={handleLogin}/>
                  </Box>
                 <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="md"
                    bg={'green.400'}
                    color={'white'}
                    _hover={{
                      bg: 'yellow.400',
                    }} borderRadius={"0px"} type={"submit"}>
                    Login
                  </Button>
                </Stack>
              </form>
                <Stack pt={6}>
                  <Text align={'center'}>
                    Not registered yet? <Link to={"/register"} color={'blue.400'}>Register</Link>
                  </Text>
                </Stack>
          </Box>
  </Box>
  )
}

export default Login