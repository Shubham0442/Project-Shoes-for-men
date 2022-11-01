import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Text,
    Checkbox,
    Select
  } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getShoesData } from '../Redux/AppReducer/action'



const FilterComponent = ({page}) => {  
    const [ searchParams, setSearchParams ] = useSearchParams() 
    const initcategoryParams = searchParams.getAll("category")
    const initialBrandParams = searchParams.getAll("brand")
    const initialRatingParams = searchParams.getAll('Rate')
    const initialSortPrice = searchParams.get("sortBy")
    const initialPage = searchParams.get("page")
    //const appData = useSelector((state)=>state.appReducer.productData)
    const appData = useSelector((state)=>state.appReducerAdmin.allProducts)
    const dispatch = useDispatch();

    let formal = 0;
    let boot = 0;
    let woodland = 0;
    let leecoper = 0;

    useEffect(()=>{
        if(appData.length === 0)
        {
            dispatch(getShoesData())
        }
     },[appData.length])

    for(let i = 0; i < appData.length; i++)
    {
        if(appData[i].category === "Formal")
        {
            formal++;
        }
        else if(appData[i].category === "Boot")
        {
            boot++;
        }
        
    }

    for(let i = 0; i < appData.length; i++)
    {
        if(appData[i].brand === "WOODLAND")
        {
            woodland++;
        }
        else if(appData[i].brand === "LEE COOPER")
        {
            leecoper++;
        }
        
    }

    const [ brand, setBrand ] = useState( initialBrandParams || []);
    const [ category, setCategory ] = useState(initcategoryParams || []);
    const [ Rate,  setRate ] = useState(initialRatingParams || []); 
    const [ sortBy, setSort ] = useState(initialSortPrice || "")
     
  
    const handleSortPrice =(e)=>{
        let val = e.target.value
       // console.log(val)
        setSort(e.target.value)
    }
 
    const handleCategory =(e)=>{
        let value = e.target.value
        //console.log(value) 

        let newCategory = [...category];

        if(category.includes(value))
        {
            newCategory.splice(newCategory.indexOf(value),1)
        }
        else{
            newCategory.push(value)
        }

        setCategory(newCategory)
    } 

    const handleBrand = (e)=>{
        let value = e.target.value
        //console.log(value) 

        let newBrand = [...brand];

        if(brand.includes(value))
        {
            newBrand.splice(newBrand.indexOf(value),1)
        }
        else{
            newBrand.push(value)
        }

        setBrand(newBrand)
    }
  
    //console.log(category, brand)

    const handleRating = (e)=>{
       let value = e.target.value 
       //console.log(value) 
      
       let newRating = [...Rate]
       if(Rate.includes(value))
        {
            newRating.splice(newRating.indexOf(value),1)
        }
        else{
            newRating.push(value)
        }

        setRate(newRating)
                
    }

    
  
    //console.log(Rate)
    useEffect(()=>{
        
        if(category || brand || Rate || sortBy || page)
        {
           let params = {};
           
           category && (params.category = category)
           brand && (params.brand = brand ) 
            Rate && (params.Rate = Rate)
            sortBy && ( params.sortBy =sortBy)
            page && (params.page = page)
            
           setSearchParams(params) 
          
          // dispatch(getShoesData(searchParams))
        }
    }, [setSearchParams, category, brand, Rate, sortBy, page])

    


  return (
        <Accordion defaultIndex={[0,1,2]} allowMultiple>
            <AccordionItem>
                <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      Category
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4} textAlign="left" pl={"15px"}>
                    <Box>
                       <Checkbox size='lg' value={"Casual"} onChange={handleCategory} defaultChecked={category.includes("Casual")}/>
                       <label> Casual Shoes</label>
                    </Box>
                    <Box>
                       <Checkbox size='lg' value={"Sports"} onChange={handleCategory} defaultChecked={category.includes("Sports")}/>
                       <label> Sports Shoes</label>
                    </Box>
                    {
                        formal > 0 && 
                        <Box>
                        <Checkbox size='lg' value={"Formal"} onChange={handleCategory} defaultChecked={category.includes("Formal")}/>
                        <label> Formal Shoes</label>
                        </Box>
                    }
                    {
                        boot > 0 && 
                        <Box>
                            <Checkbox size='lg' value={"Boot"} onChange={handleCategory} defaultChecked={category.includes("Boot")}/>
                            <label> Boot</label>
                        </Box>
                        
                    }
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                     Brand
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4} textAlign="left" pl={"15px"}>
                    <Box>
                       <Checkbox size='lg' value={"REEBOK"} onChange={handleBrand} defaultChecked={brand.includes("REEBOK")}/>
                       <label> Reebok</label>
                    </Box>
                    <Box>
                       <Checkbox size='lg' value={"ADIDAS"} onChange={handleBrand} defaultChecked={brand.includes("ADIDAS")}/>
                       <label> Adidas</label>
                    </Box>
                    <Box>
                       <Checkbox size='lg' value={"Red Chief"} onChange={handleBrand} defaultChecked={brand.includes("Red Chief")}/>
                       <label> Red Chief</label>
                    </Box>
                    <Box>
                       <Checkbox size='lg' value={"PUMA"} onChange={handleBrand} defaultChecked={brand.includes("PUMA")}/>
                       <label> Puma</label>
                    </Box>
                    <Box>
                       <Checkbox size='lg' value={"NIKE"} onChange={handleBrand} defaultChecked={brand.includes("NIKE")}/>
                       <label> Nike</label>
                    </Box>
                    {
                        woodland > 0 && 
                        <Box>
                        <Checkbox size='lg' value={"WOODLAND"} onChange={handleBrand} defaultChecked={brand.includes("WOODLAND")}/>
                        <label> Woodland</label>
                        </Box>
                    }
                    {
                        leecoper > 0 && 
                        <Box>
                        <Checkbox size='lg' value={"LEE COOPER"} onChange={handleBrand} defaultChecked={brand.includes("LEE COOPER")}/>
                        <label> Lee Cooper</label>
                        </Box>
                    }
                </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
                <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                     Rating
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4} textAlign="left" pl={"15px"}>
                    <Box>
                       <Checkbox size='lg' value={"3Above"} onChange={handleRating} defaultChecked={Rate.includes("3Above")} />
                       <label> 3 ★ & above</label>
                    </Box>
                    <Box>
                       <Checkbox size='lg' value={"4Above"} onChange={handleRating} defaultChecked={Rate.includes("4Above")} />
                       <label> 4 ★ & above</label>
                    </Box>
                </AccordionPanel>
            </AccordionItem>
            <Text>Sort By:</Text>
            <Select borderRadius={"0"} border="1px solid Blue" onChange = {handleSortPrice}>
              <option value="" >Popular</option>
              <option value="asc" >Price Low to High</option>
              <option value="desc" >Price High to Low</option>
            </Select>
        </Accordion>
  )
}

export default FilterComponent