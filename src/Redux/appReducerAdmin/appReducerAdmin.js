import { GET_APP_DATA_FOR_ADMIN_FAILURE, GET_APP_DATA_FOR_ADMIN_REQUEST, GET_APP_DATA_FOR_ADMIN_SUCCESS } from "./actionType"

const initialState = {
    allProducts :[],
    isLoading: false,
    isError: false,
} 

export const appReducerAdmin =(state = initialState, { type, payload })=>{
    
    switch(type){
        case GET_APP_DATA_FOR_ADMIN_REQUEST:{
            return {
                ...state,
                isLoading: true
            }
        }

        case GET_APP_DATA_FOR_ADMIN_SUCCESS :{
            return{
                ...state,
                allProducts: payload,
                isLoading: false
            }
        }

        case GET_APP_DATA_FOR_ADMIN_FAILURE :{
            return {
                ...state,
                isLoading: false,
                isError: false
            }
        }
        default: return state
    }
}