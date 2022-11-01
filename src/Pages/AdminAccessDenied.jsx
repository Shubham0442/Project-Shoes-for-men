import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const AdminAccessDenied = () => {
  return (
    <Box textAlign={"center"} h={"500px"} pt={"240px"} fontWeight={"550"}>
           <Text  fontSize={"20px"} color={"red"}>⚠️ ACCESS DENIED ⚠️</Text>
           <Text>You do not have authority to access this page</Text>
    </Box >
  )
}

export default AdminAccessDenied