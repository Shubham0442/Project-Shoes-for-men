
import axios from "axios";
import { ADMIN_LOGIN_FAILURE, ADMIN_LOGIN_REQUEST, ADMIN_LOGIN_SUCCESS } from "./actionTypes"; 

// export const adminLogin = () => (dispatch) =>{

//     dispatch({type: ADMIN_LOGIN_REQUEST})

//     return axios.get(`${process.env.REACT_APP_BASE_URL}/users`)
//     .then((res)=>{

//         let flag = false;

//         console.log(res.data)

//         for(let i = 0; i < res.data.length; i++)
//         {
//             if( res.data[i].email === crid.email && res.data[i].password === crid.password && res.data[i].cosign === "Admin")
//             {
//                 flag = true
//                 return  dispatch({ type : ADMIN_LOGIN_SUCCESS, payload: res.data[i]})
//             }
//         }

//         if(flag === false)
//         {
//             return "INVALID_CRIDENTIALS"
//         }

//     })
//     .catch((error)=>{
//         dispatch({type:ADMIN_LOGIN_FAILURE})
//     })
// }