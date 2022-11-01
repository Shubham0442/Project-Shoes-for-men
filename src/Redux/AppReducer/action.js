import axios from "axios"
import {
    GET_SHOES_DATA_FAILURE, 
    GET_SHOES_DATA_LOADING, 
    GET_SHOES_DATA_SUCCESS,
    ADD_PRODUCT_FAILURE, 
    ADD_PRODUCT_REQUEST, 
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE, 
    DELETE_PRODUCT_REQUEST, 
    DELETE_PRODUCT_SUCCESS,
} from "./actionTypes" 


export const getShoesData = (q)=>(dispatch)=>{

    //console.log("page",page)
    
    dispatch({type: GET_SHOES_DATA_LOADING}) 

    return axios.get(`${process.env.REACT_APP_BASE_URL}/shoeData`, q)
    .then((res)=>{
        //console.log(res.data)
       return dispatch({type: GET_SHOES_DATA_SUCCESS, payload: res.data})
    })
    .catch((error)=>{
        dispatch({type: GET_SHOES_DATA_FAILURE})
    })
}



export const addProduct = (productInfo) =>(dispatch)=>{
    
    dispatch({type : ADD_PRODUCT_REQUEST})

    return axios.post(`${process.env.REACT_APP_BASE_URL}/shoeData`, productInfo)
    .then((res)=>{
      return  dispatch({type : ADD_PRODUCT_SUCCESS, payload: res})
    })
    .catch((error)=>{
        dispatch({type: ADD_PRODUCT_FAILURE})
    })
} 



export const deleteProduct = (id)=>(dispatch)=>{

    dispatch({type:DELETE_PRODUCT_REQUEST})

    return axios.delete(`${process.env.REACT_APP_BASE_URL}/shoeData/${id}`)
    .then((res)=>{
       return dispatch({type: DELETE_PRODUCT_SUCCESS})
    })
    .catch((error)=>{
        dispatch({type: DELETE_PRODUCT_FAILURE})
    })
}
