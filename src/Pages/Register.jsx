import { Box, FormControl, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Stack,
  Heading,
  Text,
  FormLabel,
  Flex
} from '@chakra-ui/react'

import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { userRegister } from '../Redux/UserAuthReducer/action'
import { v4 as uuid } from 'uuid'

const Register = () => {

   const [ regForm, setRegForm ] = useState({
      
       firstname: "",
       lastname: "",
       email:"",
       mobile: "",
       password: "",
   })

  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch();
  const regToast = useToast()


  const handleRegistration = (e)=>{ 
    let {name, value} = e.target 

    setRegForm({
      ...regForm,
      [name] : value
    })

  }

  const handleSubmit = (e)=>{
     e.preventDefault()
     dispatch(userRegister({
       id: uuid(),
       firstname : regForm.firstname,
       lastname : regForm.lastname,
       email : regForm.email,
       mobile : regForm.mobile,
       password : regForm.password,
       cosign: "user",
       cart : [],
       order_Amount : "",
       order_Details:[],
       order_status : "",
       delivery_address:{},
       Multiple_delivery_addresses:[],
       ordersHistory:[]

     }))
     .then((res)=>{
        if(res.type === "USER_REGISTER_SUCCESS")
        {
          regToast({
              title: 'Registration Successful!',
              status: 'success',
              duration: 3000,
              isClosable: true,
          })
        }
     })
     onClose()
  }
  return (

    <Box >
      <Box display={{base:"none", sm:"none", md: "block", lg:"block"}}>
        <Button 
               display={{base:"none", sm:"none", md: "block", lg:"block"}}
               border={"0"} variant={"unstyled"} onClick={onOpen}>Register</Button>

            <Modal isOpen={isOpen} onClose={onClose} size={{base:"xs", sm:"xs", md:"sm"}} >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                <Stack align={'center'}>
                  <Heading fontSize={'2xl'} textAlign={'center'}>
                    Registration
                  </Heading>
                </Stack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody p={"20px"}>
                  <form onSubmit={handleSubmit}>
                    <Flex direction={{base: "column", sm: "column", md:"row"}} justifyContent="space-evenly" gap={"5px"}>
                        <Box mb={"10px"}>
                          <FormControl isRequired>
                          <FormLabel>First Name</FormLabel>
                          <Input type={"text"}   value={regForm.firstname} borderRadius={"0px"} name="firstname" onChange={handleRegistration}/>
                          </FormControl>
                        </Box>
                        
                        <Box mb={"10px"}> 
                         <FormControl isRequired>
                          <FormLabel>Last Name</FormLabel>
                          <Input type={"text"}   value={regForm.lastname} borderRadius={"0px"} name="lastname" onChange={handleRegistration}/>
                          </FormControl>
                        </Box>
                    </Flex>
                    
                   
                  
                    <Box mb={"10px"}>
                      <FormControl isRequired>
                      <FormLabel>Email</FormLabel>
                      <Input type={"email"}  value={regForm.email} borderRadius={"0px"} name="email" onChange={handleRegistration}/>
                      </FormControl>
                    </Box>
                   
                  
                    <Box mb={"10px"}>
                      <FormControl isRequired>
                      <FormLabel>Mobile number</FormLabel>
                      <Input type={"number"}  value={regForm.mobile} borderRadius={"0px"} name="mobile" onChange={handleRegistration}/>
                      </FormControl>
                    </Box>
                   
                  
                    <Box mb={"10px"}> 
                      <FormControl isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input type={"password"}  value={regForm.password} borderRadius={"0px"} name="password" onChange={handleRegistration}/>
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
                      Register
                    </Button>
                  </Stack>
                </form>
                  <Stack pt={6}>
                    <Text align={'center'}>
                     
                    </Text>
                    {/* <Box display={{base:"none", sm:"none", md:"", lg:"block"}} w="20%" m={"auto"} textAlign={"center"}>
                         <Login/>
                    </Box> */}
                     <Box display={{base:"block", sm:"block", md:"none"}}>
                         Already user?
                        <Link  to={"/register"} color={'blue.400'}>Login</Link>
                     </Box> 
                  </Stack>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
            <Box display={{base:"block", sm:"block", md: "none", lg:"none"}} w={"65%"} m={"auto"}>
            <Stack align={'center'}>
                  <Heading fontSize={'20px'} textAlign={'center'} mb="20px">
                     Registration
                  </Heading>
                </Stack>
            <form onSubmit= {handleSubmit}>
                    <Flex direction={{base: "column", sm: "row", md:"row"}} justifyContent="space-evenly" gap={"5px"}>
                        <Box mb={"4px"}>
                        <FormLabel>First Name</FormLabel>
                          <Input type={"text"} size={"sm"}  value={regForm.firstname} borderRadius={"0px"} name="firstname" onChange={handleRegistration}/>
                        </Box>
                        <Box mb={"4px"}>
                          <FormLabel>Last Name</FormLabel>
                          <Input type={"text"}  size={"sm"} value={regForm.lastname} borderRadius={"0px"}name="lastname" onChange={handleRegistration}/>
                        </Box>
                    </Flex>
                    <Box mb={"4px"}>
                      <FormLabel>Email</FormLabel>
                      <Input type={"email"}size={"sm"}  value={regForm.email} borderRadius={"0px"} name="email" onChange={handleRegistration}/>
                    </Box>
                   
                  
                    <Box mb={"4px"}>
                      <FormLabel>Mobile number</FormLabel>
                      <Input type={"number"} size={"sm"} value={regForm.mobile} borderRadius={"0px"} name="mobile" onChange={handleRegistration}/>
                    </Box>
                   
                  
                    <Box mb={"4px"}>
                      <FormLabel>Password</FormLabel>
                      <Input type={"password"} size={"sm"} value={regForm.password} borderRadius={"0px"} name="password" onChange={handleRegistration}/>
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
                      Register
                    </Button>
                  </Stack>
                </form>
                  <Stack pt={6}>
                    <Text align={'center'}>
                      Already a user? <Link to={"/login"} color={'blue.400'}>Login</Link>
                    </Text>
                  </Stack>
            </Box>
    </Box>
  )
}

export default Register