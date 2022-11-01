import axios from "axios"
import { ADD_DELIVERY_ADDRESS_FAILURE, ADD_DELIVERY_ADDRESS_REQUEST, ADD_DELIVERY_ADDRESS_SUCCESS, ASSIGN_DELIVERY_ADDRESSES_TO_USER, GET_DELIVERY_ADDRESS, REMOVE_ADDRESS_FROM_COMMON_DATA } from "./actionTypes"

export const addDeliveryAddress = (deliveryAddress)=>(dispatch)=>{

    dispatch({ type : ADD_DELIVERY_ADDRESS_REQUEST})

    return axios.post(`${process.env.REACT_APP_BASE_URL}/address`,  deliveryAddress, {
        headers: {'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
       })
    .then((res)=>{
       return dispatch( { type : ADD_DELIVERY_ADDRESS_SUCCESS, payload : res.data})
    })
    .catch((error)=>{
        dispatch({type : ADD_DELIVERY_ADDRESS_FAILURE})
    })
}

export const getDeliveryAddress = ()=>(dispatch)=>{

    return axios.get(`${process.env.REACT_APP_BASE_URL}/address`,{
        headers: {'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
       })
    .then((res)=>{
       return dispatch({ type : GET_DELIVERY_ADDRESS, payload : res.data})
    })
    .catch((error)=>{
        console.log(error)
    })
} 

export const assignDeliveryAddresses = (id,addresses)=>(dispatch)=>{
    
    return axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${id}`,{
        Multiple_delivery_addresses: addresses
    })
    .then((res)=>{
        dispatch({type: ASSIGN_DELIVERY_ADDRESSES_TO_USER, payload: res.data})
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const removeAddressFromCommonData = (id)=>(dispatch)=>{

    return axios.delete(`${process.env.REACT_APP_BASE_URL}/address/${id}`)
    .then((res)=>{
        dispatch({ type:REMOVE_ADDRESS_FROM_COMMON_DATA})
    })
    .catch((error)=>{
        console.log(error)
    })
} 
