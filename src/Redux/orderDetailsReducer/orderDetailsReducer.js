import { ADD_DELIVERY_ADDRESS_FAILURE } from "../deliveryAddressReducer/actionTypes"
import { ADD_ORDER_DETAILS_REQUEST, ADD_ORDER_DETAILS_SUCCESS, GET_ORDER_DETAILS_FAILURE, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS } from "./actionTypes"

const initState = {
    orderDetails : [],
    isLoading : false,
    isError : false
} 

export const orderDetailsReducer = (state = initState, { type, payload }) =>{

    switch(type){
        
        case ADD_ORDER_DETAILS_REQUEST : {
            return {
                ...state,
                isLoading: true
            }
        }

        case ADD_ORDER_DETAILS_SUCCESS : {
            return {
                ...state,
                isLoading: false,
                state: [
                    ...state.orderDetails,
                    payload
                ]
            }
        }

        case ADD_DELIVERY_ADDRESS_FAILURE : {
            return {
               isLoading: false,
               isError : true
            }
        }

        case GET_ORDER_DETAILS_REQUEST : {
            return {
                ...state,
                isLoading : true
            }
        }

        case GET_ORDER_DETAILS_SUCCESS : {
            return {
                ...state,
                isLoading : false,
                orderDetails: payload
            }
        }

        case GET_ORDER_DETAILS_FAILURE : {
            return {
                ...state,
                isLoading : false,
                isError : true
            }
        }

        default : return state
    }
}