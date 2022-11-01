import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserData } from '../Redux/userDataReducer/userDataAction'
import { FaUserCircle } from 'react-icons/fa'
import UserDataEdit from './UserDataEdit'
import { Link } from 'react-router-dom'

const UsersData = () => {

    const usersData = useSelector((state)=>state.userDataReducer.userData)
    const dispatch = useDispatch();

    useEffect(()=>{
         if(usersData.length === 0)
         {
            dispatch(getUserData())
         }
    },[usersData.length])

    console.log(usersData)

  return (
            <Table variant={"simple"} size={"sm"} fontSize={"12px"} textAlign={"center"} alignContent={"center"}>
                <Thead>
                    <Tr>
                    <Th>Avatar</Th>
                    <Th>Id</Th>
                    <Th>Firstname</Th>
                    <Th>Lastname</Th>
                    <Th>Email-id</Th>
                    <Th>Mobile No.</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        usersData.map((elem)=>(

                            elem.cosign === "user" && 
                            <Tr key={elem.id}>
                                  <Td><FaUserCircle size={"30px"}/></Td>
                                  <Td>{elem.id}</Td>
                                  <Td>{elem.firstname}</Td>
                                  <Td>{elem.lastname}</Td>
                                  <Td>{elem.email}</Td>
                                  <Td>{elem.mobile}</Td>
                                  <Td>
                                    <Link to={`/adm/${elem.id}`}>
                                        See More Details
                                    </Link>
                                 </Td>
                                      
                            </Tr>
                        ))
                    }
                </Tbody>
              </Table>
  )
}

export default UsersData