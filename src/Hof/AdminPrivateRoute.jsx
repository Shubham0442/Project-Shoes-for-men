import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'


const AdminPrivateRoute = ({children}) => {
    const isAdmin = useSelector((state)=>state.adminAuthReducer.isAuthAdmin)

    //console.log("private admin",isAdmin)


    if(isAdmin === false)
    {
        return <Navigate to={"/accessdenied"}/>
    }
    else{
        return children
    }
  
}

export default AdminPrivateRoute