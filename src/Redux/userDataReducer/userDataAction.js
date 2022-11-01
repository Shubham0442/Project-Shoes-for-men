import axios from "axios"
import { GET_USERS_DATA_FAILURE, GET_USERS_DATA_REQUEST, GET_USERS_DATA_SUCCESS, UPDATE_USER_ORDER_STATUE } from "./userDataActionTypes"

export const getUserData = ()=> (dispatch)=>{
    dispatch({type : GET_USERS_DATA_REQUEST})

    return axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
    .then((res)=>{

        //console.log("userData", res.data)
       return dispatch({type: GET_USERS_DATA_SUCCESS, payload : res.data})
        
    })
    .catch((error)=>{
        dispatch({type : GET_USERS_DATA_FAILURE})
    })
} 

export const updateUserOrderStatus = (id, newStatus)=>(dispatch)=>{

    return axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
        order_status: newStatus
    })
    .then((res)=>{
       return dispatch({type: UPDATE_USER_ORDER_STATUE})
    })
    .catch((error)=>{
        console.log(error)
    })
}