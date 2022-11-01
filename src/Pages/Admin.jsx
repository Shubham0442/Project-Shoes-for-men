import { Box, 
  Flex, 
  Text, 
  Image, 
  Table, 
  TableCaption, 
  Thead, 
  Tr, 
  Th, 
  Tbody, 
  Td, 
  TableContainer, 
  CircularProgressLabel,
  CircularProgress,
  Progress,
  Button,
  useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spiner from '../Components/Spiner'
import { deleteProduct, getShoesData } from '../Redux/AppReducer/action'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import AddProduct from '../Components/AddProduct'
import UsersData from '../Components/UsersData'
import _default from 'react-redux/es/components/connect'
import { getAppDataforAdmin } from '../Redux/appReducerAdmin/action'
import ProductDataEdit from '../Components/ProductDataEdit'

const Admin = () => {

  const shoeDatas = useSelector((state)=>state.appReducerAdmin.allProducts)
   const loading = useSelector((state)=>state.appReducerAdmin.isLoading)
  const dispatch = useDispatch()
  const deleteProductTost = useToast()
  const [ toggleData, setToggleData ] = useState(false)
  const [ page, setPage ] = useState(1)

  const handleToggleData =()=>{
    setToggleData(!toggleData)
  }

     useEffect(()=>{
        if(shoeDatas.length === 0)
        {
            dispatch(getAppDataforAdmin())
        }
     },[shoeDatas.length])
     
     let casual = 0;
     let sports = 0; 
     let formal = 0;
     let boot = 0;
     
     let casualPercent = 0;
     let sportsPrecent = 0;
     let formalPercent = 0;
     let bootPercent = 0;

     for(let i = 0; i < shoeDatas.length; i++)
     {
         if(shoeDatas[i].category === "Casual")
         {
          casual++;
         }
         else if(shoeDatas[i].category === "Sports"){
          sports++
         }
         else if(shoeDatas[i].category === "Formal"){
          formal++
         }
         else if(shoeDatas[i].category === "Boot"){
          boot++
         }
     }

     let Adidas = 0;
     let Reebok = 0;
     let Puma = 0;
     let RedChief = 0;
     let nike = 0; 
     let Above3 = 0;
     let Above4 = 0;
     let woodland = 0;
     let leeCuper = 0;

     for(let i = 0; i < shoeDatas.length; i++)
     {
         if(shoeDatas[i].brand === "REEBOK")
         {
          Reebok++;
         }
         else if(shoeDatas[i].brand === "PUMA"){
          Puma++
         }
         else if(shoeDatas[i].brand === "ADIDAS"){
          Adidas++
         }
         else if(shoeDatas[i].brand === "Red Chief"){
          RedChief++
         }
         else if(shoeDatas[i].brand === "NIKE"){
          nike++
         }
         else if(shoeDatas[i].brand === "WOODLAND"){
          woodland++
         }
         else if(shoeDatas[i].brand === "LEE COOPER"){
          leeCuper++
         }
     }
     
     for(let i = 0; i < shoeDatas.length; i++)
     {
        if(Number(shoeDatas[i].rating) >= 3)
        {
          Above3++
        }
        if(Number(shoeDatas[i].rating) >= 4)
        {
          Above4++
        }
     }



     console.log(casual, sports) 

     casualPercent = Math.floor((casual/shoeDatas.length) * 100)
     sportsPrecent = Math.floor((sports/shoeDatas.length) * 100) 
     formalPercent = Math.floor((formal/shoeDatas.length) * 100)
     bootPercent =  Math.floor((boot/shoeDatas.length) * 100)

     let nikePer = Math.floor((nike/shoeDatas.length)*100)
     let redchiefPer = Math.floor((RedChief/shoeDatas.length) *100)
     let pumaPer = Math.floor((Puma/shoeDatas.length) *100 )
     let reebokPer = Math.floor((Reebok/shoeDatas.length) *100) 
     let adidasPer = Math.floor((Adidas/shoeDatas.length) *100) 
     let above3Per = Math.floor((Above3/shoeDatas.length) * 100)
     let above4Per = Math.floor((Above4/shoeDatas.length) * 100 )
     let woodlandPer = Math.floor((woodland/shoeDatas.length) * 100 )
     let leeCoperPer = Math.floor((leeCuper/shoeDatas.length) * 100 )

     //console.log(above3Per, above4Per)
     

     const handleDelete =(id)=>{
        //console.log("id", id)

        dispatch(deleteProduct(id))
        .then((res)=>{
          if(res.type === "DELETE_PRODUCT_SUCCESS"){
            deleteProductTost({
              title: 'Product Deleted Successfully.',
              status: 'success',
              duration: 3000,
              isClosable: true,
            })
            dispatch(getShoesData())
            dispatch(getAppDataforAdmin())
          }
            
        })
     }


  return (
    <Box w={"100%"} bg={"#e1e1e1"} m="auto"  pt={"20px"} >
      <Flex  w={{md:"97%", lg:"90%"}} bg={"white"} m="auto"  justifyContent={"space-between"} p={"5px"} alignItems={"center"}>
        <Button size={"sm"} variant={"outline"} onClick={handleToggleData}>{toggleData ? "Show Users Data" : "Show Products Data"}</Button>
        <AddProduct/>
      </Flex >
    <Flex w={{md:"97%", lg:"90%"}}  m={"auto"} gap={"10px"} pt={"20px"} >
       {
          toggleData ?
       
          <Box w={{md:"30%", lg:"22%"}}   bg="white" p={"20px"} >
            <Box mt={"30px"} mb={"30px"}> 
              <Text fontWeight={"660"}>Products Data</Text>
              <Box mb={"30px"}>
                    <Text fontWeight={"600"} fontSize={"12px"} mb={"10px"}>Products According to Categories</Text>
                    <Flex justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        <Box>
                          <CircularProgress value={casualPercent} color='green.400' size={"90px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10px"}>Casual {casualPercent}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        <Box>
                          <CircularProgress value={sportsPrecent} color='green.400' size={"90px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10px"}>Sports {sportsPrecent}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        {
                          formalPercent > 0 &&
                          <Box>
                          <CircularProgress value={formalPercent} color='green.400' size={"90px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10px"}>Formal {formalPercent}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        }

                        {
                          bootPercent > 0 &&
                          <Box>
                          <CircularProgress value={bootPercent} color='green.400' size={"90px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10px"}>Boot {bootPercent}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        }
                        
                    </Flex>
              </Box>
              <Box mb={"30px"} >
                <Text fontWeight={"600"} fontSize={"12px"} mb={"10px"}>Products According to Brands</Text>
                    <Flex justifyContent={"space-evenly"} flexWrap={"wrap"}>
                        <Box>
                          <CircularProgress value={nikePer} color='blue.400' size={"80px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10px"}>Nike {nikePer}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        <Box>
                          <CircularProgress value={redchiefPer} color='blue.400' size={"80px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10px"}>Red Chief {redchiefPer}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        <Box>
                          <CircularProgress value={pumaPer} color='blue.400' size={"80px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10"}>Puma {pumaPer}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        <Box>
                          <CircularProgress value={reebokPer} color='blue.400' size={"80px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10"}>Reebok {reebokPer}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        <Box>
                          <CircularProgress value={adidasPer} color='blue.400' size={"80px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10"}>Adidas {adidasPer}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        {
                          woodlandPer > 0 && 
                          <Box>
                          <CircularProgress value={woodlandPer} color='blue.400' size={"80px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10px"}>WoodLand {woodlandPer}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        }
                        {
                          leeCoperPer > 0 && 
                          <Box>
                          <CircularProgress value={leeCoperPer} color='blue.400' size={"80px"}>
                            <CircularProgressLabel fontWeight={"600"} fontSize={"10px"}>lee Cooper {leeCoperPer}%</CircularProgressLabel>
                          </CircularProgress>
                        </Box>
                        }
                    </Flex>
                </Box> 
                <Box mb={"30px"}>
                <Text fontWeight={"600"} fontSize={"12px"} mb={"10px"}>Products According to Rating</Text>
                    <Flex justifyContent={"space-evenly"} flexWrap={"wrap"} direction={"column"} gap={"20px"}>
                    
                        <Box>
                           <Flex justifyContent={"space-between"}>
                           <Text fontWeight={"550"} fontSize={"12px"}>3 ★ & above</Text>
                           <Text fontWeight={"550"} fontSize={"12px"}>{above3Per}%</Text>
                           </Flex>
                          <Progress colorScheme='green' size='sm' value={above3Per} />
                        </Box>
                        <Box>
                            <Flex justifyContent={"space-between"}>
                                <Text fontWeight={"550"} fontSize={"12px"}>4 ★ & above</Text>
                                <Text fontWeight={"550"} fontSize={"12px"}>{above4Per}%</Text>
                            </Flex>
                          <Progress colorScheme='green' size='sm' value={above4Per} />
                        </Box>
                    </Flex>
                </Box>     
            </Box>
          </Box> : 
          <Box w={{md:"30%", lg:"22%"}}   bg="white" p={"20px"}>
             <Text>Users Data</Text>
          </Box>
           }   
          <Box w={{md:"70%", lg:"78%"}} pl={"5px"}  bg="white" >
            <TableContainer position={"relative"} h={"530px"}  
              overflowY="auto"
              css={{
                '&::-webkit-scrollbar': {
                  width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                  borderRadius: '24px',
                },
              }}
             >
              {
                toggleData ? 
              
             <Table   variant={"simple"} size={"xs"} fontSize={"12px"} textAlign={"center"} alignContent={"center"} >
                 <TableCaption placement={"top"}>{toggleData ? "All Products" : "All Users"}</TableCaption>
                 <Thead fontSize={"12px"} >
                   <Tr>
                     <Th>Sr.No</Th>
                     <Th>Avatar</Th>
                     <Th>Name</Th>
                     <Th>Category</Th>
                     <Th>Brand</Th>
                     <Th>Price (₹)</Th>
                     <Th>Rating</Th>
                     <Th>Edit</Th>
                     <Th>Delete</Th>
                   </Tr>
                 </Thead>
                 <Tbody > 
                     { loading && <Spiner/>}
                     {
                      shoeDatas.length > 0 && 

                      shoeDatas.map((elem)=>(
                        <Tr key={elem.id}>
                          <Td>{elem.id}</Td>
                          <Td  textAlign={"center"} w={"20px"} h={"35px"}> 
                              <Image src={elem.cover} w="100%" h={"35px"} display={"block"} alt="product"/>
                          </Td>
                          <Td>
                            {elem.name}
                          </Td>
                          <Td>
                            {elem.category}
                          </Td>
                          <Td>
                            {elem.brand}
                          </Td>
                          <Td>
                            {elem.price}
                          </Td>
                          <Td>
                            {elem.rating}
                          </Td>
                          <Td>
                           <ProductDataEdit shoeDatas={shoeDatas} id={elem.id}/>
                          </Td>
                          <Td >
                            <Button size={"xs"} onClick={()=>handleDelete(elem.id)}>
                                  <DeleteIcon/>
                            </Button>
                          </Td>
                        </Tr>
                      ))   
                    }
                 </Tbody>
             </Table> : <UsersData/> }
             </TableContainer>
          </Box>
         
    </Flex>
    </Box>
  )
}

export default Admin