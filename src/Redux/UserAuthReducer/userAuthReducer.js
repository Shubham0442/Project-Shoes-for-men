import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT} from "./actionTypes"
import { saveData, loadData} from "../../Utilities/LocalStorageAdmin"

const initState = 
 loadData("userAuth") || 
{
    isAuthUser : false,
    userData : {},
    isLoading : false,
    isError : false
} 

export const userAuthReducer = ( state = initState, { type, payload }) =>{

    switch(type){
        case USER_LOGIN_REQUEST:{
            return {
                ...state,
                isLoading: true
            }
        } 

        case USER_LOGIN_SUCCESS:{

            const userInfo = payload 
            saveData("userAuth", {isAuthUser: true, userData: userInfo })
            return {
                ...state,
                isLoading: false,
                isAuthUser: true,
                userData: userInfo
            }
        } 

        case USER_LOGIN_FAILURE:{
            
            return {
                ...state,
                isLoading: false,
                isAuthUser:false,
                userData:null,
                isError: true
            }
        }

        case USER_LOGOUT:{
            saveData("userAuth", {isAuthUser: false, userData: null })
            return {
                ...state,
                isLoading: false,
                isAuthUser:false,
                userData:null,
                isError: false
            }
        }
        
        default : return state
        
    }
}