import { POST_LOGIN_FAILURE, POST_LOGIN_SUCCESS, POST_REGISTER_ERROR, POST_REGISTER_REQUEST, POST_REGISTER_SUCCESS } from "../actionTypes/actionTypes"

let token = localStorage.getItem("token")

const initialstate={

    isLoading: false,
    isError: false,
    isAuth:token?true:false,
    userName:"",
    Register:[],
    Login:[]
  }

const reducer=(state=initialstate,action)=>{
   switch(action.type){
    case POST_REGISTER_REQUEST:{
        return {...state,isLoading:true}
    }
    case POST_REGISTER_ERROR:{
        return {...state,isError:true,isLoading:false}
    }
    case POST_REGISTER_SUCCESS:{
        return {...state,Register:[...state.Register,action.payload],isLoading:false}
    }
    case POST_LOGIN_SUCCESS:{
        return {...state,Login:[...state.Login,action.payload],isLoading:false,isAuth:true,userName:action.payload}
    }
    // case POST_LOGIN_FAILURE:{
    //     return {...state,Login:[...state.Login,action.payload],isLoading:false,isAuth:false}
    // }
    default:{
        return {...state}
    }
   }
}

export {reducer}