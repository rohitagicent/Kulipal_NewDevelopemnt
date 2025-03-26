import AsyncStorage from '@react-native-async-storage/async-storage';
// import api from '../../services/api';

// Action Types
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SET_USER_TYPE = 'SET_USER_TYPE';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

// Set User Type
export const setUserType = (userType) => ({
  type: SET_USER_TYPE,
  payload: userType
});

// Set Auth Token
export const setAuthToken = (token) => ({
  type: SET_AUTH_TOKEN,
  payload: token
});

// Login Action
export const login = (userType, email, password) => {
  return async (dispatch) => {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    try {
      // Call the appropriate API endpoint based on user type
      const endpoint = userType === 'vendor' ? '/vendor/login' : '/customer/login';
      
    //   const response = await api.post(endpoint, { email, password });
    const response = "d"
      if (response) {
        // Store token in AsyncStorage
        await AsyncStorage.setItem('authToken', response);
        
        // Dispatch success action with user data
        dispatch({
          type: AUTH_LOGIN_SUCCESS,
          payload: {
            token: response,
            user: response
          }
        });
        
        return response.data;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      // Dispatch failure action with error message
      dispatch({
        type: AUTH_LOGIN_FAILURE,
        payload: error.response?.data?.message || 'Login failed. Please try again.'
      });
      
      throw error;
    }
  };
};

// Logout Action
export const logout = () => {
  return async (dispatch) => {
    // Remove token and user type from AsyncStorage
    await AsyncStorage.removeItem('authToken');
    // Note: We're not removing userType to remember the user's preference
    
    // Dispatch logout action
    dispatch({ type: AUTH_LOGOUT });
  };
};

