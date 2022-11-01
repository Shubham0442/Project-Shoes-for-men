import { Flex, FormLabel, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Input,
    FormControl,
    useDisclosure
  } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getAppDataforAdmin, updateProductData } from '../Redux/appReducerAdmin/action'


const ProductDataEdit = ({id, shoeDatas}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const dispatch = useDispatch()
    const productUpdateToast = useToast()

    const [ name, setName ] = useState("")
    const [ cover, setCover ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ brand, setBrand ] = useState("")
    const [ category, setCategory ] = useState("")
    const [ rating, setRating ] = useState("")
    const [ img1, setImg1 ] = useState("")
    const [ img2, setImg2 ] = useState("")
    const [ img3, setImg3 ] = useState("")
    const [ img4, setImg4 ] = useState("")

    console.log("product id",id) 

    useEffect(()=>{
        const newProduct = shoeDatas.find((elem)=>elem.id === +id)
        
        
       if(newProduct){
         setName(newProduct.name)
         setBrand(newProduct.brand)
         setCover(newProduct.cover)
         setCategory(newProduct.category)
         setPrice(newProduct.price)
         setRating(newProduct.rating)
         setImg1(newProduct?.images[0])
         setImg2(newProduct?.images[1])
         setImg3(newProduct?.images[2])
         setImg4(newProduct?.images[3])
       }
    },[shoeDatas, id])
    
    const handleUpdateProductData =()=>{
      let payload = {
        name,
        cover,
        price,
        category,
        brand,
        rating,
        images:[img1, img2, img3, img4]
      }
       dispatch(updateProductData(id, payload))
       .then((res)=>{
         if(res.type === "UPDATE_PRODUCT_DATA")
         {
           dispatch(getAppDataforAdmin())
           onClose();
           productUpdateToast({
            title:"Product Data Updated",
            duration: 2000,
            isClosable: true,
            position :"top",
            status:"info"
           })
           
         }
       })
    }
    
  return (
    <>
      <Button ref={btnRef} size={"xs"} onClick={onOpen}>
       <EditIcon/>
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"sm"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Update Product Data</DrawerHeader>

          <DrawerBody>
             <FormControl mb={"15px"}>
                <FormLabel fontSize={"14px"}>Product Name</FormLabel>
                <Input size={"sm"} value={name} borderRadius={"0"} onChange={(e)=>setName(e.target.value)}/>
             </FormControl>
             <FormControl mb={"15px"}>
                <FormLabel fontSize={"14px"}>Avatar</FormLabel>
                <Input size={"sm"} value={cover} borderRadius={"0"} onChange={(e)=>setCover(e.target.value)}/>
             </FormControl>
             <Flex alignItems={"center"} gap={"10px"}>
                  <FormControl mb={"15px"}>
                      <FormLabel fontSize={"14px"}>Price</FormLabel>
                      <Input size={"sm"} value={price} borderRadius={"0"} onChange={(e)=>setPrice(e.target.value)}/>
                  </FormControl>
                  <FormControl mb={"15px"}>
                      <FormLabel fontSize={"14px"}>Rating</FormLabel>
                      <Input size={"sm"} value={rating} borderRadius={"0"} onChange={(e)=>setRating(e.target.value)}/>
                  </FormControl>
             </Flex>
            <Flex alignItems={"center"} gap={"10px"}>
                <FormControl mb={"15px"}>
                    <FormLabel fontSize={"14px"}>Category</FormLabel>
                    <Input size={"sm"} value={category} borderRadius={"0"} onChange={(e)=>setCategory(e.target.value)}/>
                </FormControl>
                <FormControl mb={"15px"}>
                    <FormLabel fontSize={"14px"}>Brand</FormLabel>
                    <Input size={"sm"} value={brand} borderRadius={"0"} onChange={(e)=>setBrand(e.target.value)}/>
                </FormControl>
            </Flex>
             
             <FormControl mb={"15px"}>
                <FormLabel fontSize={"14px"}>Product Image1</FormLabel>
                <Input size={"sm"} value={img1} borderRadius={"0"} onChange={(e)=>setImg1(e.target.value)}/>
             </FormControl>
             <FormControl mb={"15px"}>
                <FormLabel fontSize={"14px"}>Product Image2</FormLabel>
                <Input size={"sm"} value={img2} borderRadius={"0"} onChange={(e)=>setImg2(e.target.value)}/>
             </FormControl>
             <FormControl mb={"15px"}>
                <FormLabel fontSize={"14px"}>Product Image3</FormLabel>
                <Input size={"sm"} value={img3} borderRadius={"0"} onChange={(e)=>setImg3(e.target.value)}/>
             </FormControl>
             <FormControl mb={"15px"}>
                <FormLabel fontSize={"14px"}>Product Image4</FormLabel>
                <Input size={"sm"} value={img4} borderRadius={"0"} onChange={(e)=>setImg4(e.target.value)}/>
             </FormControl>
             
          </DrawerBody>
          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleUpdateProductData} colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>

  )
}

export default ProductDataEdit