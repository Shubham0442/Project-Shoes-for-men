import axios from "axios"
import { ADD_ORDER_DETAILS_FAILURE, ADD_ORDER_DETAILS_REQUEST, ADD_ORDER_DETAILS_SUCCESS, ASSIGN_ORDER_DETAILS_TO_USER, GET_ORDER_DETAILS_FAILURE, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, REMOVE_FROM_ALL_ORDERS, UPDATE_ORDER_STATUS_BY_ADMIN } from "./actionTypes"

export const addOrderDetails = (orderDetails)=>(dispatch)=>{

    dispatch( { type: ADD_ORDER_DETAILS_REQUEST }) 
    //console.log(orderDetails)
    return axios.post(`${process.env.REACT_APP_BASE_URL}/allOrders`, orderDetails)
    .then((res)=>{
       return dispatch({ type : ADD_ORDER_DETAILS_SUCCESS, payload: res.data })
    })
    .catch((error)=>{
        dispatch({ type: ADD_ORDER_DETAILS_FAILURE })
    })
} 

export const getAllOrderDetails = () =>(dispatch) =>{

    dispatch({ type : GET_ORDER_DETAILS_REQUEST })

    return axios.get(`${process.env.REACT_APP_BASE_URL}/allOrders`)
    .then((res)=>{
       return dispatch({ type: GET_ORDER_DETAILS_SUCCESS, payload : res.data })
    })
    .catch((error)=>{
        dispatch({ type: GET_ORDER_DETAILS_FAILURE })
    })
} 

export const assignOrderDetailToUser = (id, orderDetails)=>(dispatch)=>{

    console.log("order from actions", id, orderDetails)

    return axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
        ordersHistory: orderDetails
    })
    .then((res)=>{
       return dispatch({type:ASSIGN_ORDER_DETAILS_TO_USER})
    })
    .catch((error)=>{
        console.log(error)
    })
} 

export const removeFromAllOrders = (id)=>(dispatch=>{
    
    return axios.delete(`${process.env.REACT_APP_BASE_URL}/allOrders/${id}`)
    .then((res)=>{
       return dispatch({ type: REMOVE_FROM_ALL_ORDERS })
    })
    .catch((error)=>{
        console.log(error)
    })
}) 

export const updateOrderStatusByAdmin = (id, newStatus)=>(dispatch)=>{
   
    console.log("newStatus", newStatus)

    return axios.patch(`${process.env.REACT_APP_BASE_URL}/allOrders/${id}`, {
        orderStatus: newStatus
    })
    .then((res)=>{
       return dispatch({type: UPDATE_ORDER_STATUS_BY_ADMIN, payload: res.data})
    })
    .catch((error)=>{
        console.log(error)
    })
}