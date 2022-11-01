import React, { useState } from 'react'
import { addDeliveryAddress, assignDeliveryAddresses, getDeliveryAddress } from '../Redux/deliveryAddressReducer/action'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Box,
    Input,
    FormLabel,
    FormControl
  } from '@chakra-ui/react'
  import { useDispatch, useSelector} from 'react-redux'

const AddDeliveryAddressAccount = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const userData = useSelector((state)=>state.userAuthReducer.userData)
    const isUser =  useSelector((state)=>state.userAuthReducer.isAuthUser)
    const dispatch = useDispatch() 


    const [addressForm, setAddressForm ] = useState({
        AddressLine1:"",
        AddressLine2:"",
        Street: "",
        City:"",
        State:"",
        PinCode:""
      })

      const handleDeliveryForm = (e)=>{
        let { name, value} = e.target 
        setAddressForm({
          ...addressForm,
          [name]: value
        })
      }

      const handleSubmitDeliveryForm=(e)=>{
        e.preventDefault() 
        if(isUser){ 
          let addressPayload = {
            AddressLine1: addressForm.AddressLine1,
            AddressLine2: addressForm.AddressLine2,
            Street: addressForm.Street,
            City: addressForm.City,
            State: addressForm.State,
            PinCode: addressForm.PinCode
          }

            //console.log("checkout",userData.order_Details)

            dispatch(addDeliveryAddress(addressPayload))
            .then((res)=>{
              //console.log("checkout del",res)
              if(res.type === "ADD_DELIVERY_ADDRESS_SUCCESS"){
                  dispatch(getDeliveryAddress())
                  .then((res)=>{
                    if(res.type === "GET_DELIVERY_ADDRESS"){
                      console.log(res.payload)
                      dispatch(assignDeliveryAddresses(userData.id,res.payload))
                    }
                  })
              }
            })
          } 
          onClose()
               
      }


  return (
    <>
      <Button ref={btnRef} size={"xs"} color={"white"} bg='blue.400' onClick={onOpen}>
       { userData?.Multiple_delivery_addresses.length === 0 ? "Add Delivery Address" : "Add New Delivery Address"}
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
          <DrawerHeader>Add New Delivery Address</DrawerHeader>

          <DrawerBody>
          <form onSubmit= {handleSubmitDeliveryForm}>
                             <Box w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"} mb={"8px"}>
                                  <FormControl isRequired>
                                   <FormLabel>Address Line-1</FormLabel>
                                   <Input  type={"text"} borderRadius={"0px"} variant={"outline"}  name={"AddressLine1"} onChange={handleDeliveryForm} value={addressForm.AddressLine1}/>
                                   </FormControl>
                             </Box>
                             <Box w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"} mb={"8px"}>
                                   <FormLabel>Address Line-2</FormLabel>
                                   <Input type={"text"} borderRadius={"0px"} variant={"outline"} name={"AddressLine2"} onChange={handleDeliveryForm} value={addressForm.AddressLine2} />
                             </Box>
                             <Box w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"} mb={"8px"}>
                                   <FormLabel >Street</FormLabel>
                                   <Input type={"text"} borderRadius={"0px"} variant={"outline"}  name={"Street"} onChange={handleDeliveryForm} value={addressForm.Street}/>
                             </Box>
                             <Box w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"} mb={"8px"}>
                                  <FormControl isRequired>
                                   <FormLabel>City</FormLabel>
                                   <Input  type={"text"} borderRadius={"0px"} variant={"outline"} name={"City"} onChange={handleDeliveryForm} value={addressForm.City} />
                                  </FormControl>
                             </Box>
                             <Box w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"} mb={"8px"}>
                                 <FormControl isRequired>
                                   <FormLabel>State</FormLabel>
                                   <Input  type={"text"} borderRadius={"0px"} variant={"outline"} name={"State"} onChange={handleDeliveryForm} value={addressForm.State} />
                                 </FormControl>
                             </Box>
                             <Box w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"} mb={"8px"}>
                                 <FormControl isRequired>
                                   <FormLabel>Pincode/Zipcode</FormLabel>
                                   <Input  type={"number"} borderRadius={"0px"} variant={"outline"}  name={"PinCode"} onChange={handleDeliveryForm} value={addressForm.PinCode}/>
                                 </FormControl>
                             </Box>
                             
                             <Box w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} m={"auto"}mt={"25px"} pb={"20px"} >
                                   <Button type='submit'   w={{base: "80%", sm:"80%", md:"75%", lg:"70%"}} color={"white"} variant={"solid"} bg={"green.400"} borderRadius={"0px"}>Save Address</Button>
                             </Box>
                           </form>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddDeliveryAddressAccount