// src/store/reducers/authReducer.js
import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    SET_USER_TYPE,
    SET_AUTH_TOKEN
  } from './authActions';
  
  const initialState = {
    userType: null, // 'customer' or 'vendor'
    isLoading: false,
    isAuthenticated: false,
    token: null,
    user: null,
    error: null
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_USER_TYPE:
        return {
          ...state,
          userType: action.payload
        };
        
      case SET_AUTH_TOKEN:
        return {
          ...state,
          token: action.payload,
          isAuthenticated: !!action.payload
        };
        
      case AUTH_LOGIN_REQUEST:
        return {
          ...state,
          isLoading: true,
          error: null
        };
        
      case AUTH_LOGIN_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isAuthenticated: true,
          token: action.payload.token,
          user: action.payload.user,
          error: null
        };
        
      case AUTH_LOGIN_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
        
      case AUTH_LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          token: null,
          user: null
        };
        
      default:
        return state;
    }
  };
  
  export default authReducer;