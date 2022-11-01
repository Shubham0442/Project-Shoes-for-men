
import axios from 'axios'
import 
{
    USER_LOGIN_FAILURE,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAILURE,
    USER_LOGOUT,
} from './actionTypes'


import { ADMIN_LOGOUT, ADMIN_LOGIN_SUCCESS } from '../AdminAuthReducer/actionTypes'
import { loadData, saveData } from '../../Utilities/LocalStorageAdmin'


export const userRegister = (userData) => (dispatch) =>{

    dispatch({ type: USER_REGISTER_REQUEST })

    return axios.post(`${process.env.REACT_APP_BASE_URL}/users`, userData )
    .then((res)=>{
        //console.log(res.data)
       saveData("regUserCart", { userId: res.data.id, cart:[]})
       return dispatch( { type : USER_REGISTER_SUCCESS, payload : res.data })
       
    })
    .catch((error)=>{
        dispatch({type : USER_REGISTER_FAILURE})
    })
}

export const userLogin = (crid)=>(dispatch)=>{
   
    dispatch({type: USER_LOGIN_REQUEST})

   return axios.get(`${process.env.REACT_APP_BASE_URL}/users`, {
    headers: {'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS'}
   })
    .then((res)=>{

        let flag = false;

        //console.log(res.data)

        for(let i = 0; i < res.data.length; i++)
        {
            if( res.data[i].email === crid.email && res.data[i].password === crid.password && res.data[i].cosign === "user")
            {
                flag = true
                return  dispatch({ type : USER_LOGIN_SUCCESS, payload: res.data[i]})
            }
            else if( res.data[i].email === crid.email && res.data[i].password === crid.password && res.data[i].cosign === "Admin")
            {
                flag = true
                return  dispatch({ type : ADMIN_LOGIN_SUCCESS, payload: res.data[i]})
            }
            
        }

        if(flag === false)
        {
            return "INVALID_USER_CRIDENTIALS"
        }

       
    })
    .catch((error)=>{
        dispatch( { type : USER_LOGIN_FAILURE})
    })
} 

export const userLogout =()=> (dispatch) =>{
    
    dispatch({type: ADMIN_LOGOUT})
    return dispatch({type: USER_LOGOUT})
}