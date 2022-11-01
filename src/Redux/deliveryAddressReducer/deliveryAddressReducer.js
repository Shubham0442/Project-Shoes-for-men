import { ADD_DELIVERY_ADDRESS_FAILURE, ADD_DELIVERY_ADDRESS_REQUEST, ADD_DELIVERY_ADDRESS_SUCCESS, GET_DELIVERY_ADDRESS } from "./actionTypes"

const initState = {
    address : [],
    isLoading : false,
    isError : false
} 

export const deliveryAddressReducer = ( state = initState, { type, payload }) =>{ 

    switch(type){

        case ADD_DELIVERY_ADDRESS_REQUEST:{
            return {
                ...state,
                isLoading: true
            }
        }

        case ADD_DELIVERY_ADDRESS_SUCCESS :{
            return{
                ...state,
                isLoading: false,
                address : [
                    ...state.address,
                    payload
                ]
            }
        }

        case ADD_DELIVERY_ADDRESS_FAILURE :{
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        }
        
        case GET_DELIVERY_ADDRESS : {
            return {
                ...state,
                address : payload
            }
        }
        default : return state
    }

}