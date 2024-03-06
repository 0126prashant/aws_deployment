import { SUBMIT_LIST_ERROR, SUBMIT_LIST_LOADING, SUBMIT_LIST_SUCCESS } from "./listActionTypes";

const initialState = {
    loading: false,
    error: null,
    data: null
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case SUBMIT_LIST_LOADING:
        return {
          ...state,
          loading: true,
          error: null
        };
      case SUBMIT_LIST_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: null
        };
      case SUBMIT_LIST_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default formReducer;
  