import users from '../apis/users';

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
    // const formUpdate = { ...formValues, roleId: 4 }
    // const response = await users.post('/user', { ...formUpdate });
    dispatch({ type: LOADED });

    propsHistory.push('/auth/signin');
  };
  
  const renderRedirectAfterLogin = (roleCode, propsHistory) => {
    if(roleCode === 'NNC'){
      propsHistory.push('/researchers');
    }
    if(roleCode === 'USER'){
      propsHistory.push('/');
    }
    if(roleCode === 'ADMIN'){
      propsHistory.push('/admin');
    }
  }
  
  // Xài history của props để push thì mới chịu đi
  export const login = (formValues, propsHistory) => async (dispatch, getState) => {
    dispatch({ type: LOADING });
    const response = await users.post('/user/login', { ...formValues });


    try {
      if(response.status === 200){
        const roleCode = response.data.role.code;
        console.log(response)
      
        dispatch({ type: SIGN_IN, payload: response.data });
        dispatch({ type: LOADED });
  
        renderRedirectAfterLogin(roleCode, propsHistory);
      }
    } catch (error) {
      propsHistory.push('/auth/signin');
    }
    
  };
  // ------ End Auth --------