import { Box } from '@chakra-ui/react'
import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverArrow,
    PopoverCloseButton,
    useDisclosure,
    Button,
    useToast
  } from '@chakra-ui/react'
  import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userLogout } from '../Redux/UserAuthReducer/action'
import { assignUserCartToTempCart, removeFromCart, getTempCart} from '../Redux/CartRedux/action'
import { getDeliveryAddress, removeAddressFromCommonData } from '../Redux/deliveryAddressReducer/action'
import { getAllOrderDetails, removeFromAllOrders } from '../Redux/orderDetailsReducer/action'

const AccountPopover = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const authUser = useSelector((state)=>state.userAuthReducer) 
  const isAdmin = useSelector((state)=>state.adminAuthReducer)
  let cart = useSelector((state)=>state.cartReducer.tempCart)
  const dispatch = useDispatch()
  const LogoutToast = useToast()
  const navigate = useNavigate()

  const handleUserLogout =()=>{
        
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

          dispatch(getDeliveryAddress())
          .then((res)=>{
            if(res.type === "GET_DELIVERY_ADDRESS")
            {
              if(res.payload.length  > 0)
                {
                  for(let i = 0; i < res.payload.length; i++)
                  {
                    dispatch(removeAddressFromCommonData(res.payload[i].id))
                  }
                }
            }
      
          }) 

          dispatch(getAllOrderDetails())
          .then((res)=>{
             if(res.type === "GET_ORDER_DETAILS_SUCCESS")
             { 
              if(res.payload.length > 0)
              {
                for(let i = 0; i < res.payload.length; i++)
                {
                  dispatch(removeFromAllOrders(res.payload[i].id))
                }
              } 
             }
          })
     })
     
    
     dispatch(getTempCart())
     .then((res)=>{
          dispatch(userLogout())

            LogoutToast({
              title: 'Successfully Logout.',
              description: ``,
              status: 'success',
              duration: 4000,
              isClosable: true,
              position: "bottom"
            })
      navigate("/")
     })
      
      onClose()
  }

  //console.log("pop",authUser)

  return (
    <>
    <Box display={{base:"none", sm:"none", md:"none", lg:"block"}}>
        <Popover>
            <PopoverTrigger>
                <Button variant={"unstyled"}>
                  {authUser.isAuthUser ?  authUser.userData.firstname : isAdmin.isAuthAdmin ? `${isAdmin.adminData.firstname}(Admin)` :<></>}</Button>
            </PopoverTrigger>
            <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Hello</PopoverHeader>
                <PopoverBody textAlign={"left"} pl={"100px"}>
                  <Box onClick={onClose}>
                  <Link to={"/myaccount"}>My Account</Link>
                  </Box>
                  <Box onClick={onClose}>
                  <Link to ={"/cart"}>My Cart</Link>
                  </Box>
                  <Box onClick={onClose}>
                  <Link to ={"/myorders"}>My Orders</Link>
                  </Box>
                  {
                     isAdmin.isAuthAdmin && 
                     <Box onClick={onClose} >
                        <Link to ={"/adm"}>Admin</Link>
                     </Box>
                  }
                  
                  <Box>
                  <Button onClick={handleUserLogout} variant={"unstyled"}>Logout</Button>
                  </Box> 
                </PopoverBody>
            </PopoverContent>
        </Popover>
    </Box>
    <Box display={{base:"block", sm:"block", md:"block", lg:"none"}}>
    <Button ref={btnRef} variant={"unstyled"} onClick={onOpen}>
    {authUser.isAuthUser ?  authUser.userData.firstname : isAdmin.isAuthAdmin ? `${isAdmin.adminData.firstname}(Admin)` :<></>} 
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader >Hello {authUser.isAuthUser ?  authUser.userData.firstname : isAdmin.isAuthAdmin ? `${isAdmin.adminData.firstname}(Admin)` :<></>} </DrawerHeader>
          
          <DrawerBody>
                  <Box onClick={onClose}>
                  <Link to={"/myaccount"}>My Account</Link>
                  </Box>
                  <Box onClick={onClose}>
                  <Link to ={"/cart"}>My Cart</Link>
                  </Box>
                  <Box onClick={onClose}>
                  <Link to ={"/myorders"}>My Orders</Link>
                  </Box>
                  {
                     isAdmin.isAuthAdmin && 
                     <Box onClick={onClose} >
                        <Link to ={"/adm"}>Admin</Link>
                     </Box>
                  }
                  <Box>
                  <Button onClick={handleUserLogout} variant={"unstyled"}>Logout</Button>
                  </Box>
          </DrawerBody>

           <DrawerFooter>
            <Button  variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>

    </>
  )
}

export default AccountPopover