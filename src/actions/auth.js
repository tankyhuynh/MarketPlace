import _ from 'lodash';
// import history from '../history';

import users from '../apis/users';
import { 
  USER_ID_URL,
  ROLE_SUPER_ADMIN,
  ROLE_ADMIN, 
  ROLE_NNC, 
  ROLE_USER,
  LOGIN_URL,
  SIGNUP_NORMAL_USER_URL,
  SIGNUP_RESEARCHER_USER_URL 
} 
  from '../environments/constraints';

import {
    SIGN_IN,
    SIGN_OUT,
    LOADING,
    LOADED,

    FETCH_USER,
    CLEAR_PROJECTS,
    CLEAR_RESEARCHER_PROJECTS,
    CLEAR_ADMIN_PROJECTS
    
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
  
  export const signOut = () => dispatch => {
    // return {
    //   type: SIGN_OUT
    // };

    dispatch({ type: SIGN_OUT });
    dispatch({ type: CLEAR_PROJECTS });
    dispatch({ type: CLEAR_RESEARCHER_PROJECTS });
    dispatch({ type: CLEAR_ADMIN_PROJECTS });
  };

  // ------ Auth --------
export const signupNormalUser = (formValues, propsHistory) => async (dispatch, getState) => {
    dispatch({ type: LOADING });
    // const formUpdate = { ...formValues, roleId: 4 }
    if(formValues.gender === true){
      formValues = {...formValues, gender: 1}
    }
    else {
      formValues = {...formValues, gender: 0}
    }
    _.unset(formValues, 'repassword')
    const response = await users.post(SIGNUP_NORMAL_USER_URL,  formValues);
    console.log('client send: ', formValues)
    console.log('server response: ', response)

    // history.push('/auth/signin');
    propsHistory.push('/auth/signin');
    dispatch({ type: LOADED });
};
export const signupResearcherUser = (formValues, propsHistory) => async (dispatch, getState) => {
    dispatch({ type: LOADING });
    // const formUpdate = { ...formValues, roleId: 4 }
    if(formValues.gender === true){
      formValues = {...formValues, gender: 1}
    }
    else {
      formValues = {...formValues, gender: 0}
    }
    _.unset(formValues, 'repassword')
    const response = await users.post(SIGNUP_RESEARCHER_USER_URL,  formValues);
    console.log('client send: ', formValues)
    console.log('server response: ', response)

    // history.push('/auth/signin');
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
          await users.get(`${USER_ID_URL}/${response.data.id}`)
          .then(res => {
              const roleCode = res.data.role.code;
              console.log(res)
              localStorage.setItem('userData', JSON.stringify(res.data));

              dispatch({ type: SIGN_IN, payload: res.data });
              dispatch({ type: FETCH_USER, payload: res.data });

              dispatch({ type: LOADED });
    
              renderRedirectAfterLogin(roleCode, propsHistory);
          })
      }
    } catch (error) {
      propsHistory.push(LOGIN_URL);
    }
    
  };
  // ------ End Auth --------