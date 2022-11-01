import {
    GET_SHOES_DATA_FAILURE, 
    GET_SHOES_DATA_LOADING, 
    GET_SHOES_DATA_SUCCESS
} from "./actionTypes"  


const initState = {
    productData : [],
    isLoading : false,
    isError : false
} 

export const appReducer = (state = initState, { type, payload}) =>{

    switch (type){
       case GET_SHOES_DATA_LOADING :{
        return {
            ...state,
            isLoading: true
        }
       }

       case GET_SHOES_DATA_SUCCESS :{
        return {
            ...state,
            isLoading: false,
            productData: payload
        }
       }

       case GET_SHOES_DATA_FAILURE :{
        return {
            ...state,
            isLoading: false,
            isError: true
        }
       }

        default : return state
    }
}