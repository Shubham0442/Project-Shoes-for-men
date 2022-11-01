import { Box, Flex, IconButton, Image, Collapse, ScaleFade, Slide, SlideFade, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HamburgerIcon } from '@chakra-ui/icons'
import { IoMdCart } from "react-icons/io"
import { FaOpencart } from "react-icons/fa"
import { FaUserAlt } from "react-icons/fa"
import Register from '../Pages/Register'
import Login from '../Pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import AccountPopover from './AccountPopover'
import { getTempCart } from '../Redux/CartRedux/action'
import { useEffect } from 'react'


const Navbar = () => { 

  const [ showDropdown, setShowDropdown ] = useState(false)
  const authUser = useSelector((state)=>state.userAuthReducer)
  const userData = useSelector((state)=>state.userAuthReducer.userData)
  const isAdmin = useSelector((state)=>state.adminAuthReducer)
  const cart = useSelector((state)=>state.cartReducer.tempCart) 
  const dispatch = useDispatch()
  

  //console.log("navbar userdata", userData.cart.length)
  

  useEffect(()=>{
     if(cart.length === 0)
     {
      dispatch(getTempCart())
     }
  },[cart.length])
  
  //console.log("navbar",cart)
  const cartLength = cart.reduce((acc, elem)=> acc + (elem.Qty), 0)
  
  
  const { isOpen, onToggle } = useDisclosure()

  const links = [
    {
      to:"/",
      title: "Home"
    },
    {
      to:"/mensshoe",
      title: "Products"
    },
    {
      to:"/register",
      title: "Register"
    },
    {
      to:"/login",
      title: "Login"
    },
    {
      to:"/cart",
      title: "Cart"
    }
  ]

const activeStyle = {
  fontWeight: "650",
  fontSize:{ base: '18px', md: '24px', lg: '40px' },
  color: "#ffcc33",
  
}

const inactiveStyle = {
  fontWeight: "450",
  color: "white"
}

const handleDropdown = ()=>{
   setShowDropdown(!showDropdown)
}
  return (
    <Box  w="100%" h="120px" margin="auto" >
      <Flex direction={{base: "row", sm: "row", md: "row", lg: "column"}} justifyContent={"space-around"} alignItems="center" bg={"#ffcc33"}>
           {/* <Flex justifyContent={{base:"end", sm:"end", md: "end"}} border={"1px solid red"} w={{base:"70%"}}> */}
            <Box display={{base: "block",sm:"block", md:"block", lg:"none"}} pt={"45px"} pl={"10px"} w="auto"  h="120px" m={"auto"} alignContent="center">
              
              <IconButton
                  variant={"outline"}
                  colorScheme='#ffcc33'
                  icon = {< HamburgerIcon/>}
                  onClick={onToggle}
                  />  
            </Box>
            <Box w={{ sm: "95%", md: "95%", lg:"100%", xl:"100%"}} h="80px" bg={"#ffcc33"} m="auto" textAlign={"left"}>
                  <Link to={"/"}>
                    <Image src='https://i.imgur.com/1kv8UNN.png' w={{ sm: "38%", md: "38%", lg:"38%", xl:"20%"}} h="80px" background={"transparent"} pt="15px" />
                  </Link>
            </Box>
          {/* </Flex> */}
       <Flex display={{base: "none",sm:"none", md:"none", lg:"flex"}} w={"100%"} h="40px" justifyContent={"space-between"} alignItems="center"  bg={"#333333"} m="auto" p={"5px"}>
              <Flex border={"0px solid yellow"}  w={"20%"} alignItems="center" gap={"20px"} justifyContent={"space-evenly"}>
                   <NavLink to={"/"} 
                      style={({ isActive }) =>
                      isActive ? activeStyle : inactiveStyle
                      }
                      >
                       Home
                   </NavLink>

                   <NavLink to={"/mensshoe"}
                      style={({ isActive }) =>
                            isActive ? activeStyle : inactiveStyle
                      }
                      >
                      All Products
                   </NavLink>
              </Flex>
              <Flex border={"0px solid yellow"} w={"21%"} alignItems="center" gap={"30px"} justifyContent={"space-around"}>
                  <Box  style={inactiveStyle} 
                        display={{base:"none", sm:"none", md:"block", lg:"block"}}
                      >
                        {
                         authUser.isAuthUser ? <Flex alignItems={"center"} gap={"5px"}></Flex> : isAdmin.isAuthAdmin ? <Flex alignItems={"center"} gap={"5px"}></Flex> : <Register/>
                      }
                      
                   </Box>
                   <Box  style={inactiveStyle} 
                        display={{base:"none", sm:"none", md:"block", lg:"block"}}
                      >
                      {
                         authUser.isAuthUser ? 
                         <Flex alignItems={"center"} gap={"5px"}><FaUserAlt/><AccountPopover/></Flex> : 
                         isAdmin.isAuthAdmin ? 
                         <Flex alignItems={"center"} gap={"5px"}><FaUserAlt/><AccountPopover/></Flex> : 
                         <Login/>
                      } 
                   </Box>
                   <NavLink  to={"/cart"}
                      style={({ isActive }) =>
                      isActive ? activeStyle : inactiveStyle
                      }
                      >
                        <Flex fontSize={"22px"} alignItems={"center"} position={"relative"}>
                          <FaOpencart/>

                          {
                            authUser.isAuthUser ? 
                          
                          <Box  
                             color={"black"}  
                             borderRadius={"50%"} 
                             bg={"blue.100"}
                             h={"20px"} 
                             w={"20px"} 
                             fontSize={"14px"} 
                             fontWeight={"700"}
                             position={"absolute"}
                             bottom={"10px"}
                             left={"15px"}
                             >
                              {cartLength}
                            </Box> : <></>
                           }
                        </Flex>
                   </NavLink>
              </Flex>
       </Flex>
       <Box display={{base: "block",sm:"block", md:"column", lg:"none"}} 
            pt={{base:"45px", sm:"45px", md:"20px"}} pr={"10px"} gap={{base:"10px", sm:"10px",md:"0px"}} 
            h="120px" m={"auto"} 
            flexWrap={"wrap"}
            alignContent="center"
            textAlign={"left"} 
            direction={{base:"flex", sm:"flex", md:"row", lg:"none"}}
            >
                

                      {
                         authUser.isAuthUser ? 
                         <Flex alignItems={"center"} gap={"5px"}><FaUserAlt/><AccountPopover/>
                         
                         <NavLink  to={"/cart"}
                      // style={({ isActive }) =>
                      // isActive ? activeStyle : inactiveStyle
                      // }
                      >
                        <Flex fontSize={"22px"} alignItems={"center"} position={"relative"}>
                          <FaOpencart color={"black"}/>

                          {
                            authUser.isAuthUser ? 
                          
                          <Box  
                             color={"#ffcc33"}  
                             borderRadius={"50%"} 
                             bg={"black"}
                             h={"20px"} 
                             w={"20px"} 
                             fontSize={"14px"} 
                             fontWeight={"700"}
                             position={"absolute"}
                             bottom={"10px"}
                             left={"10px"}
                             textAlign={"center"}
                             >
                              {cartLength}
                            </Box> : <></>
                           }
                        </Flex>
                       </NavLink>

                         </Flex> : 
                         isAdmin.isAuthAdmin ? 
                         <Flex alignItems={"center"} gap={"5px"}><FaUserAlt/><AccountPopover/>
                         {/* <NavLink  to={"/cart"}
                     
                           >
                        <Flex fontSize={"22px"} alignItems={"center"} position={"relative"}>
                          <FaOpencart color={"black"}/>

                          {
                            authUser.isAuthUser ? 
                          
                          <Box  
                             color={"black"}  
                             borderRadius={"50%"} 
                             bg={"blue.100"}
                             h={"20px"} 
                             w={"20px"} 
                             fontSize={"14px"} 
                             fontWeight={"700"}
                             position={"absolute"}
                             bottom={"10px"}
                             left={"20px"}
                             >
                              {cartLength}
                            </Box> : <></>
                           }
                        </Flex>
                        </NavLink> */}
                         </Flex> : <>


                     <NavLink  to={"/cart"}
                      // style={({ isActive }) =>
                      // isActive ? activeStyle : inactiveStyle
                      // }
                      >
                        <Flex fontSize={"22px"} alignItems={"center"} position={"relative"}>
                          <FaOpencart color={"black"}/>

                          {
                            authUser.isAuthUser ? 
                          
                          <Box  
                             color={"black"}  
                             borderRadius={"50%"} 
                             bg={"blue.100"}
                             h={"20px"} 
                             w={"20px"} 
                             fontSize={"12px"} 
                             fontWeight={"700"}
                             position={"absolute"}
                             bottom={{base:"10px"}}
                             left={{base:"10px"}}
                             
                             >
                              {cartLength}
                            </Box> : <></>
                           }
                        </Flex>
                   </NavLink>
                         
                       
                  <Box display={{base:"block", sm:"block", md:"none", lg:"none"}} 
                       fontSize={{base:"12px", sm:"14px"}} fontWeight={{base:"550", sm:"600"}}
                      >
                      <NavLink 
                       to={"/register"}>Register</NavLink>
                   </Box>
                   <Box  fontSize={{base:"12px", sm:"14px"}} fontWeight={{base:"550", sm:"600"}} 
                        display={{base:"none", sm:"none", md:"block", lg:"block"}}
                      >
                      <Register/>
                   </Box>
                   
                   
                   <Box display={{base:"block", sm:"block", md:"none", lg:"none"}}
                        fontSize={{base:"12px", sm:"14px"}} fontWeight={{base:"550", sm:"600"}}
                      >
                      <NavLink 
                       to={"/login"}>Login</NavLink>
                   </Box>
                   <Box color={"black"} fontSize={{base:"12px", sm:"14px"}} fontWeight={{base:"550", sm:"600"}}
                        display={{base:"none", sm:"none", md:"block", lg:"block"}}
                      >
                      <Login/>
                   </Box>
                   

                   </>  }
       </Box>
      </Flex >
     {
       
          <SlideFade in={isOpen} onClick={onToggle}>
            <Box w={"100%"}
              color='black'
              bg={"#ffcc33"} 
              rounded='sm'
              position={"absolute"} zIndex={"99999"}
              display={{base:"block", sm:"block", md:"block", lg:"none"}}
               >
             
                <Link to={"/"}>
                        <Box borderTop={"1px solid white"}  h="30px" bg={"#ffcc33"} fontWeight= "650"  > Home</Box>
                </Link>
                <hr />
                <Link to={"/mensshoe"}>
                        <Box  h="30px" bg={"#ffcc33"} fontWeight= "650" >Products</Box>
                </Link>
                <hr />
                <Link to={"/cart"}>
                        <Box borderBottom={"1px solid white"}   h="30px" bg={"#ffcc33"} fontWeight= "650" >Cart</Box>
                </Link>
                        {/* <Box  bg={"#ffcc33"} h="30px" fontWeight= "650"></Box> */}
              </Box>
          </SlideFade> 
         
     } 
      
    </Box>
  )
}

export default Navbar