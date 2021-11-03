import users from '../apis/users';
import { 
  ROLE_SUPER_ADMIN,
  ROLE_ADMIN, 
  ROLE_NNC, 
  ROLE_USER,
  LOGIN_URL,
  SIGNUP_URL 
} 
  from '../environments/constraints';

import {
    SIGN_IN,
    SIGN_OUT,
    LOADING,
    LOADED
    
  } from './types';

  

export const signIn = (userId, userProfile) => {
    return {
      type: SIGN_IN,
      payload: {
        userId: userId,
        userProfile: userProfile
      }
    };
  };
  
  export const signOut = () => {
    return {
      type: SIGN_OUT
    };
  };

  // ------ Auth --------
export const signup = (formValues, propsHistory) => async (dispatch, getState) => {
    dispatch({ type: LOADING });
    const formUpdate = { ...formValues, roleId: 4 }
    const response = await users.post(SIGNUP_URL, { ...formUpdate });
    console.log('client send: ', formValues)
    console.log('server response: ', response)

    propsHistory.push('/auth/signin');
    dispatch({ type: LOADED });
  };
  
  const renderRedirectAfterLogin = (roleCode, propsHistory) => {
    if(roleCode === ROLE_NNC){
      propsHistory.push('/researchers');
    }
    if(roleCode === ROLE_USER){
      propsHistory.push('/');
    }
    if(roleCode === ROLE_ADMIN || roleCode === ROLE_SUPER_ADMIN){
      propsHistory.push('/admin');
    }
  }
  
  // Xài history của props để push thì mới chịu đi
  export const login = (formValues, propsHistory) => async (dispatch, getState) => {
    dispatch({ type: LOADING });
    const response = await users.post(LOGIN_URL, { ...formValues });

    try {
      if(response.status === 200){
        const roleCode = response.data.role.code;
        console.log(response)
        localStorage.setItem('userData', JSON.stringify(response.data));
      
        dispatch({ type: SIGN_IN, payload: response.data });
        dispatch({ type: LOADED });
  
        renderRedirectAfterLogin(roleCode, propsHistory);
      }
    } catch (error) {
      propsHistory.push(LOGIN_URL);
    }
    
  };
  // ------ End Auth --------