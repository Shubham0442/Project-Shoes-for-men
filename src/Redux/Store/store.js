import { combineReducers, legacy_createStore, compose, applyMiddleware } from "redux"; 

import { appReducer} from "../AppReducer/appReducer";
import { userAuthReducer } from "../UserAuthReducer/userAuthReducer"; 
import { adminAuthReducer } from "../AdminAuthReducer/adminAuthReducer"; 
import { userDataReducer } from "../userDataReducer/userDataReducer";
import { cartReducer } from "../CartRedux/cartReducer";
import { appReducerAdmin } from "../appReducerAdmin/appReducerAdmin";
import { deliveryAddressReducer } from "../deliveryAddressReducer/deliveryAddressReducer";
import { orderDetailsReducer } from "../orderDetailsReducer/orderDetailsReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

const rootReducer = combineReducers({
      appReducer,
      userAuthReducer,
      adminAuthReducer,
      userDataReducer,
      cartReducer,
      appReducerAdmin,
      deliveryAddressReducer,
      orderDetailsReducer
});

export const store = legacy_createStore( rootReducer, composeEnhancers(applyMiddleware(thunk)))