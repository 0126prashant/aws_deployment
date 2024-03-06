import axios from "axios"
import { POST_LOGIN_FAILURE, POST_LOGIN_SUCCESS, POST_REGISTER_REQUEST } from "../actionTypes/actionTypes";

export const register =(data)=> (dispatch) => {
    // console.log(data)
    
  dispatch({type:POST_REGISTER_REQUEST})

  return axios.post("https://splendid-veil-fox.cyclic.app/users/register",data)
  
};

export const loginuser = (data) => (dispatch) => {
  // dispatch({ type: POST_REGISTER_REQUEST });

  return axios.post("https://splendid-veil-fox.cyclic.app/users/login", data)
    .then((response) => {
      const token = response.data.token;
      const username = response.data.username;

      localStorage.setItem('token', token);
      localStorage.setItem('UserName', username);
      dispatch({ type: POST_LOGIN_SUCCESS,payload:username });
      return response;
    })
    .catch((error) => {
      dispatch({ type: POST_LOGIN_FAILURE, payload: error });
      throw error;
    });
};
