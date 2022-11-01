import axios from "axios"
import { GET_APP_DATA_FOR_ADMIN_FAILURE, GET_APP_DATA_FOR_ADMIN_REQUEST, GET_APP_DATA_FOR_ADMIN_SUCCESS, UPDATE_PRODUCT_DATA } from "./actionType"

export const getAppDataforAdmin = ()=>(dispatch)=>{

    dispatch({type: GET_APP_DATA_FOR_ADMIN_REQUEST})

    axios.get(`${process.env.REACT_APP_BASE_URL}/shoeData`)
    .then((res)=>{
        dispatch({type:GET_APP_DATA_FOR_ADMIN_SUCCESS, payload: res.data})
    })
    .catch((error)=>{
        dispatch({type:GET_APP_DATA_FOR_ADMIN_FAILURE})
    })
}

export const updateProductData = (id, updatedPayload)=>(dispatch)=>{
   
    return axios.patch(`${process.env.REACT_APP_BASE_URL}/shoeData/${id}`, updatedPayload)
    .then((res)=>{
        return dispatch({type: UPDATE_PRODUCT_DATA, payload:res.data})
    })
    .catch((error)=>{
        console.log(error)
    })
}