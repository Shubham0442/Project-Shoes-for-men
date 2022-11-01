import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, GET_CART_DATA } from "./actionTyes"

const initState = {
    isLoading: false,
    isError : false,
    tempCart : []
} 

export const cartReducer = (state = initState, { type, payload})=>{

    switch(type){

        case ADD_TO_CART_REQUEST: {
            return{
                ...state,
                isLoading: true
            }
        }

        case ADD_TO_CART_SUCCESS : {
            return{
                ...state,
                isLoading: false,
                tempCart: [
                    ...state.tempCart,
                    payload
                ]
            }
        }

        case ADD_TO_CART_FAILURE :{
            return{
                ...state,
                isLoading:false,
                isError: true
            }
        }

        case GET_CART_DATA:{
            return{
                ...state,
                isLoading:false,
                isError:false,
                tempCart: payload
            }
        }

        default : return state
    }
}