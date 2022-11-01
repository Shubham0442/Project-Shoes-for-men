import axios from "axios"
import { 
    ADD_TO_CART_FAILURE, 
    ADD_TO_CART_REQUEST, 
    ADD_TO_CART_SUCCESS, 
    ASSIGN_CART_USER, 
    ASSIGN_USER_CART_TO_TEMPCART, 
    GET_CART_DATA, 
    MANAGE_QUANTITY,
    REMOVE_PRODUCT_FROM_CART,
    SETTING_USER_DELIVERY_ADDRESS,
    GET_USER_ORDER_DETAILS
} from "./actionTyes"

export const addToCart = (cartItem) => (dispatch) =>{
   
    dispatch({type: ADD_TO_CART_REQUEST})
   return axios.post(`${process.env.REACT_APP_BASE_URL}/tempCart`, cartItem)
    .then((res)=>{
        //console.log(res.data)
        //assignCartToUser(id, newArr)
       return dispatch({type: ADD_TO_CART_SUCCESS, payload: res.data})
    })
    .catch((error)=>{
        dispatch({type: ADD_TO_CART_FAILURE})
    })

}

export const getTempCart = ()=>(dispatch)=>{
   
    return axios.get(`${process.env.REACT_APP_BASE_URL}/tempCart`)
        .then((res)=>{
           return dispatch({type: GET_CART_DATA, payload: res.data})
        })
        .catch((error)=>{
            console.log(error)
        })
} 


export const removeFromCart = (id)=>(dispatch)=>{

    return axios.delete(`${process.env.REACT_APP_BASE_URL}/tempCart/${id}`)
    .then((res)=>{
       return dispatch({ type : REMOVE_PRODUCT_FROM_CART})
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const manageQuantity = (id, x, quantity)=>(dispatch)=>{

    return axios.patch(`${process.env.REACT_APP_BASE_URL}/tempCart/${id}`,{
        Qty : x + quantity
    })
    .then((res)=>{
        // console.log("from action",res.data)
       return dispatch({ type : MANAGE_QUANTITY})
    })
    .catch((error)=>{
        console.log(error)
    })
}

export const assignCartToUser = (id, newCart )=>(dispatch)=>{

    //console.log(newcart)

    return axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
        cart: newCart
    })
    .then((res)=>{
        // console.log(res.data)
        dispatch( { type: ASSIGN_CART_USER, payload: res.data} )
    })
    .catch((error)=>{
        console.log(error)
    })
} 

export const makeOrderDetails = (id, newCart )=>(dispatch)=>{

    //console.log(newcart)

    return axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
        order_Details: newCart,
        order_status:"Placed",
    })
    .then((res)=>{
        // console.log(res.data)
        dispatch( { type: ASSIGN_CART_USER, payload: res.data} )
        console.log("after checkout", res.data)
    })
    .catch((error)=>{
        console.log(error)
    })
} 



export const assignUserCartToTempCart = (userCart)=>(dispatch)=>{

    return axios.post(`${process.env.REACT_APP_BASE_URL}/tempCart`, userCart)
    .then((res)=>{
        //console.log(res)
        return dispatch({type: ASSIGN_USER_CART_TO_TEMPCART})
    })
    .catch((error)=>{
        console.log(error)
    })

} 


export const settingUserDeliveryAddress = (id,userAddress)=>(dispatch)=>{

    return axios.patch(`${process.env.REACT_APP_BASE_URL}/users/${id}`, {
        delivery_address: userAddress
    })
    .then((res)=>{
        // console.log(res.data)
        dispatch({ type: SETTING_USER_DELIVERY_ADDRESS, payload: res.data} )
        console.log("after checkout", res.data)
    })
    .catch((error)=>{
        console.log(error)
    })
} 

export const getUserOrderDetails = (id)=>(dispatch)=>{

    return axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`)
    .then((res)=>{
        // console.log(res.data)
       return  dispatch( { type: GET_USER_ORDER_DETAILS, payload: res.data} )
       
    })
    .catch((error)=>{
        console.log(error)
    })
}