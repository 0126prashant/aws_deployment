import axios from "axios"
import { SUBMIT_LIST_ERROR, SUBMIT_LIST_LOADING, SUBMIT_LIST_SUCCESS } from "./listActionTypes";

export const submitFormData = (formData) => async (dispatch) => {
  try {
    
    const token = localStorage.getItem("token") 
    dispatch({ type: SUBMIT_LIST_LOADING });

    const response = await axios.post(`https://splendid-veil-fox.cyclic.app/list/add`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
console.log(response.data,"resdata")
    dispatch({ type: SUBMIT_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SUBMIT_LIST_ERROR, payload: error.message });
  }
};

  
