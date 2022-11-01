import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Box,
    Button,
    useDisclosure,
    Input,
    FormLabel,
    Select,
    Flex,
    Tabs,
    TabPanel,
    TabPanels,
    Tab,
    TabList,
    useToast
} from "@chakra-ui/react"
import { useState } from 'react'                                                                            
import { useDispatch } from 'react-redux'
import { addProduct, getShoesData } from '../Redux/AppReducer/action'
import { useNavigate } from 'react-router-dom'
import { getAppDataforAdmin } from '../Redux/appReducerAdmin/action'

const AddProduct = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const addTost = useToast()
    // Closure: "Lace-Ups"
    // Color: "White"
    // Ideal_for: Men"
    // Model_name: "Rebound JOY"
    // Occasion: "Casual"
    // Outermaterial: "Synthetic Leather"
    // Sole_material: "Rubber"

    const dispatch = useDispatch()
    const [ productForm, setPriductForm ] = useState({
        name: "",
        cover: "",
        rating: "",
        images: [],
        category:"",
        price:"",
        Rate:"",
        details:{}
    }) 

  const [ name, setName ] = useState("")
  const [ cover, setCover] = useState("")
  const [ rating, setRating ] = useState("")
  const [ brand, setBrand ] = useState("")
  const [ price, setPrice ] = useState("")
  const [ category, setCategory ] = useState("")
  const [ Rate, setRate ] = useState("")
  const [ Closure, setClosure ] = useState("")
  const [ Color, setColor ] = useState("")
  const [ Ideal_for, setIdeal_for] = useState("")
  const [ Model_name, setModel_name] = useState("")
  const [ Occasion,  setOccasion ] = useState("")
  const [ Outermaterial, setOutermaterial ] = useState("")
  const [ Sole_material, setSole_material ] = useState("")
  const [img1, setImg1 ] = useState("")
  const [img2, setImg2 ] = useState("")
  const [img3, setImg3 ] = useState("")
  const [img4, setImg4 ] = useState("")

    const handleAddProduce =()=>{   
        let payload = {
            name :name,
            cover : cover,
            Rate : Rate,
            brand: brand,
            rating: rating,
            category: category,
            images: [img1, img2, img3, img4],
            price:price,
            details:{
                Color: Color,
                Outermaterial: Outermaterial,
                Model_name: Model_name,
                Ideal_for:  Ideal_for,
                Occasion: Occasion,
                Sole_material: Sole_material,
                Closure: Closure
            }
        }
      console.log("Add Product",payload)
        dispatch(addProduct(payload))
        .then((res)=>{
            if(res.type === "ADD_PRODUCT_SUCCESS")
            {  
                addTost({
                    title: 'Product Added Successfully.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  })

                  dispatch(getShoesData())
                  dispatch(getAppDataforAdmin())
            }
        });
        onClose()
    }

  return (
    <Box>
           <Button size={"sm"} variant={"outline"} onClick={onOpen}>Add New Product</Button> 

        <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody >
                        <Tabs isFitted variant='enclosed'>
                            <TabList mb='1em'>
                                <Tab>Basic Info</Tab>
                                <Tab>Specifications</Tab>
                                <Tab>Product Images</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                        <Box>
                                            <FormLabel>Name</FormLabel>
                                            <Input borderRadius={"0px"} type={"text"} value={name} onChange={(e)=>setName(e.target.value)}/>
                                        </Box>
                                        <Box>
                                            <FormLabel>Avatar</FormLabel>
                                            <Input type={"text"} value={cover} onChange={(e)=>setCover(e.target.value)}/>
                                        </Box>
                                        
                                        <Box>
                                            <FormLabel>Rating</FormLabel>
                                            <Flex gap={"20px"}>
                                                <Input type={"number"} value={rating} onChange={(e)=>setRating(e.target.value)}/>
                                                <Select value={Rate} onChange={(e)=>setRate(e.target.value)}>
                                                    <option value="3Above">3 ★ & Above</option>
                                                    <option value="4Above">4 ★ & Above</option>
                                                </Select>
                                            </Flex>
                                        </Box>
                                        <Flex justifyContent={"space-evenly"} alignItems={"center"} gap={"15px"}>
                                            <Box>
                                                <FormLabel>Category</FormLabel>
                                                {/* <Input type={"text"} value={category} onChange={(e)=>setCategory(e.target.value)}/> */}
                                                <Select value={category} onChange={(e)=>setCategory(e.target.value)}>
                                                    <option value="Casual">Casual</option>
                                                    <option value="Sports">Sports</option>
                                                    <option value="Formal">Formal</option>
                                                    <option value="Boot">Boot</option>
                                                </Select>
                                            </Box>
                                            <Box>
                                                <FormLabel>Price</FormLabel>
                                                <Input type={"number"} value={price} onChange={(e)=>setPrice(e.target.value)}/>
                                           </Box>
                                            <Box>
                                                <FormLabel>Brand</FormLabel>
                                                <Select value={brand} onChange={(e)=>setBrand(e.target.value)}>
                                                    <option value="NIKE">NIKE</option>
                                                    <option value="REEBOK">REEBOK</option>
                                                    <option value="PUMA">PUMA</option>
                                                    <option value="Red Chief">Red Chief</option>
                                                    <option value="ADIDAS">ADIDAS</option>
                                                    <option value="WOODLAND">WOODLAND</option>
                                                    <option value="LEE COOPER">LEE COOPER</option>
                                                </Select>
                                            </Box>
                                            
                                       </Flex>
                                </TabPanel>
                                <TabPanel>
                                        <Flex justifyContent={"space-evenly"} alignItems={"center"} gap={"15px"}>
                                                <Box>
                                                    <FormLabel>Color</FormLabel>
                                                    <Input type={"text"} value={Color} onChange={(e)=>setColor(e.target.value)}/>
                                                </Box>
                                                <Box>
                                                    <FormLabel>Ideal For</FormLabel>
                                                    <Input type={"text"} value={Ideal_for} onChange={(e)=>setIdeal_for(e.target.value)}/>
                                                </Box>
                                                <Box>
                                                    <FormLabel>Modal Name</FormLabel>
                                                    <Input type={"text"} value={Model_name} onChange={(e)=>setModel_name(e.target.value)}/>
                                                </Box>
                                                <Box>
                                                    <FormLabel>Occasion</FormLabel>
                                                    <Input type={"text"} value={Occasion} onChange={(e)=>setOccasion(e.target.value)}/>
                                                </Box>
                                        </Flex>
                                        <Flex justifyContent={"space-around"} alignItems={"center"}>
                                            <Box>
                                                <FormLabel>Closure Type</FormLabel>
                                                <Select value={Closure} onChange={(e)=>setClosure(e.target.value)}>
                                                    <option value="Slip-ons">Slip-ons</option>
                                                    <option value="Lace-Ups">Lace-Ups</option>
                                                </Select>
                                            </Box>
                                            <Box>
                                                <FormLabel>Sole material</FormLabel>
                                                <Select value={Sole_material} onChange={(e)=>setSole_material(e.target.value)}>
                                                    <option value="Rubber">Rubber</option>
                                                    <option value="TPR">TPR</option>
                                                    <option value="EVA">EVA</option>
                                                </Select>
                                            </Box>
                                            <Box>
                                                <FormLabel>Outer material</FormLabel>
                                                <Select value={Outermaterial} onChange={(e)=>setOutermaterial(e.target.value)}>
                                                    <option value="Synthetic">Synthetic</option>
                                                    <option value="Synthetic Leather">Synthetic Leather</option>
                                                    <option value="Leather">Leather</option>
                                                    <option value="Mesh">Mesh</option>
                                                    <option value="Textile">Textile</option>
                                                    <option value="Textile">Textile</option>
                                                    <option value="Canvas">Canvas</option>
                                                    <option value="Genuine Leather">Genuine Leather</option>
                                                    <option value="Nubuck Leather">Nubuck Leather</option>
                                                    <option value="Synthetic, Textile">Synthetic, Textile</option>
                                                </Select>
                                            </Box>
                                        </Flex>
                                </TabPanel>
                                <TabPanel>
                                        <Flex direction={"column"} gap={"10px"}>
                                            <FormLabel>Product Images</FormLabel>
                                            <Input  size='sm' type={"text"} value={img1} onChange={(e)=>setImg1(e.target.value)}/>
                                            <Input  size='sm' type={"text"} value={img2} onChange={(e)=>setImg2(e.target.value)}/>
                                            <Input  size='sm' type={"text"} value={img3} onChange={(e)=>setImg3(e.target.value)}/>
                                            <Input  size='sm' type={"text"} value={img4} onChange={(e)=>setImg4(e.target.value)}/>
                                        </Flex>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
          </ModalBody>
          
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleAddProduce} colorScheme='green' variant='solid'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default AddProduct