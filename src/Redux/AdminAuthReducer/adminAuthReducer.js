
import {ADMIN_LOGIN_SUCCESS, ADMIN_LOGOUT } from "./actionTypes"
//import { USER_LOGIN_FAILURE, USER_LOGIN_REQUEST } from "../UserAuthReducer/actionTypes"
import { saveData, loadData} from "../../Utilities/LocalStorageAdmin"
 const initState = 
 //loadData("adminAuth") || 
 {
    isAuthAdmin : false,
    adminData : {},
}




export const adminAuthReducer = ( state = initState, { type, payload})=>{
     
    switch(type){

          case ADMIN_LOGIN_SUCCESS:{

            const  adminInfo = payload;
            //saveData("adminAuth", {isAuthAdmin:true, adminData: adminInfo})
            return{
                ...state,
                isAuthAdmin: true,
                adminData : adminInfo
            }
          }

          case ADMIN_LOGOUT :{

           // saveData("adminAuth", {isAuthAdmin:false, adminData:null})
            return{
              ...state,
              isAuthAdmin: false,
              adminData : null,
          }
          }
        
        default : return state
    }
}