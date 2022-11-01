import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminPrivateRoute from '../Hof/AdminPrivateRoute'
import UserPrivateRoute from '../Hof/UserPrivateRoute'
import Admin from '../Pages/Admin'
import AdminAccessDenied from '../Pages/AdminAccessDenied'
import AdminLogin from '../Pages/AdminLogin'
import Cart from '../Pages/Cart'
import Checkout from '../Pages/Checkout'
import Home from "../Pages/Home"
import Login from '../Pages/Login'
import MensShoe from '../Pages/MensShoe'
import MyAccount from '../Pages/MyAccount'
import MyOrders from '../Pages/MyOrders'
import Register from '../Pages/Register'
import SingleProduct from '../Pages/SingleProduct'
import UserDataEdit from '../Components/UserDataEdit'

const AllRoutes = () => {
  return (
    <div>
      <Routes>
               <Route path='/' element={<Home/>}></Route>
               <Route path='/mensshoe' element={<MensShoe/>}></Route>
               <Route path='/mensshoe/:id' element={<SingleProduct/>}></Route>
               <Route path='/login' element={<Login/>}></Route>
               <Route path='/register' element={<Register/>}></Route>
               <Route path='/cart' element={<Cart/>}></Route>
               <Route path='/myaccount' element={<MyAccount/>}></Route>
               <Route path='/myorders' element={<MyOrders/>}></Route>
               <Route path='/admlog' element={<AdminLogin/>}></Route>
               <Route path='/accessdenied' element={<AdminAccessDenied/>}></Route>
               <Route path='/adm/:id' element={<UserDataEdit/>}></Route>
               <Route path='/adm' element={
                  <AdminPrivateRoute>
                     <Admin/>
                  </AdminPrivateRoute>

               }></Route>
               <Route path='/checkout' element={  
                
                  <Checkout/>
                
               }></Route>
               
      </Routes>
    </div>
  )
}

export default AllRoutes