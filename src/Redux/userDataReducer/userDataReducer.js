import { GET_USERS_DATA_FAILURE, GET_USERS_DATA_REQUEST, GET_USERS_DATA_SUCCESS } from "./userDataActionTypes"


const initState = {
    userData : [],
    isLoading : false,
    isError : false
} 

export const userDataReducer = (state = initState, { type, payload }) =>{
    
    switch (type){
       
        case GET_USERS_DATA_REQUEST: {
            return {
                ...state,
                isLoading : true
            }
        }

        case GET_USERS_DATA_SUCCESS: {
            return {
                ...state,
                isLoading : false,
                userData : payload
            }
        }

        case GET_USERS_DATA_FAILURE: {
            return {
                ...state,
                isLoading : false,
                isError : false
            }
        }

        default : return state
    }
}