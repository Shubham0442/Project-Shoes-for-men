import { Box, Button,Text, Flex } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';


const PaginationButtons = () => {

  const [searchParams, setSearchParams ] = useSearchParams();
  const initialPage = searchParams.get("page") 

  const [ page, changePage ] = useState(initialPage || 1)


  useEffect(()=>{
    if(page){
      let params ={} 
      page && (params.page = page)
      setSearchParams(params)
    }
  }, [setSearchParams, page])

    // let pages = new Array(6).fill(0).map((a, i) => (
    //     <Button
    //       key={i}
    //       disabled={page === i + 1}
    //       onClick={() => {
    //         if(Number(page)<= 6){
    //           changePage(Number(page) + 1);
    //         }
    //       }}
    //     >
    //       {i + 1}
    //     </Button>
      // ));
      return <Flex alignItems={"center"}>
              {/* <Button disabled={Number(page)===1} onClick={()=>changePage(Number(page)-1)}>Prev</Button>
              <Text>{page}</Text>
              <Button disabled={Number(page)===6} onClick={()=>changePage(Number(page)+1)}>Next</Button> */}
              <Button disabled={Number(page)===1} onClick={()=>changePage(1)}>1</Button>
              <Button disabled={Number(page)===2} onClick={()=>changePage(2)}>2</Button>
              <Button disabled={Number(page)===3} onClick={()=>changePage(3)}>3</Button>
              <Button disabled={Number(page)===4} onClick={()=>changePage(4)}>4</Button>
              <Button disabled={Number(page)===5} onClick={()=>changePage(5)}>5</Button>
              <Button disabled={Number(page)===6} onClick={()=>changePage(6)}>6</Button>
           </Flex> 
    }




export default PaginationButtons