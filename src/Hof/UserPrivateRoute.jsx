import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from "react-router-dom"

const UserPrivateRoute = ({children}) => {

  const isUser =  useSelector((state)=>state.userAuthReducer.isAuthUser)
  const isAdmin = useSelector((state)=>state.adminAuthReducer.isAuthAdmin)

  if( isUser === false || isAdmin === false)
    {
        return <Navigate to={"/login"}/>
    }
    else{
        return children
    }
}

export default UserPrivateRoute