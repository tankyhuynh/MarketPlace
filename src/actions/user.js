import user from '../apis/users';
import userAdmin from '../apis/user_Admin';
import userFunctionAdmin from '../apis/userFunction_Admin';
import { 
  USER_ID_URL, 
  USER_ADMIN_URL,
  USER_FUNCTION_ADMIN_URL ,
  USER_RESEARCHER_URL,
  USER_NORMAL_ADMIN_URL,
  USER_RESEARCHER_ADMIN_URL,
  USER_ADMIN_ADMIN_URL,

} from '../environments/constraints';

import {
  FETCH_USERS,
  FETCH_USER,
  CREATE_USER,
  EDIT_USER,
  DELETE_USER,
    
} from './types';


//------ LevelDevelopments --------
export const fetchUsers = () => async dispatch => {
  const response = await userAdmin.get(USER_ADMIN_URL);
  console.log('fetchUsers:', response.data);

  dispatch({ type: FETCH_USERS, payload: response.data });
};

export const fetchUser = (id) => async dispatch => {
  const response = await userAdmin.get(`${USER_ADMIN_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const fetchUserProfileById = (id) => async dispatch => {
  const response = await user.get(`${USER_ID_URL}/${id}`);
  console.log('fetchUserProfileById: ', response.data);

  dispatch({ type: FETCH_USER, payload: response.data });
  
  return response.data;
};

export const createUser = (value) => async dispatch => {
  const response = await userAdmin.post(USER_ADMIN_URL, value);
  console.log('createUser:', response.data);

  dispatch({ type: CREATE_USER, payload: response.data });
};


export const editUser = (value) => async dispatch => {
  const response = await userAdmin.put(`${USER_ADMIN_URL}/${value.id}`, value);
  console.log('editUser:', response.data);

  dispatch({ type: EDIT_USER, payload: response.data });
};

export const editResearcherUser = (value) => async dispatch => {
  const response = await user.put(`${USER_RESEARCHER_URL}/${value.id}`, value);
  console.log('editResearcherUser:', response.data);

  // localStorage.setItem('userData', JSON.stringify(response.data));

  dispatch({ type: EDIT_USER, payload: response.data });

  return response.data;
};

export const editNormalUser_Admin = (value) => async dispatch => {
  const response = await user.put(`${USER_NORMAL_ADMIN_URL}/${value.id}`, value);
  console.log('editNormalUser_Admin:', response.data);

  dispatch({ type: EDIT_USER, payload: response.data });
};

export const editResearcherUser_Admin = (value) => async dispatch => {
  const response = await userAdmin.put(`${USER_RESEARCHER_ADMIN_URL}/${value.id}`, value);
  console.log('editResearcherUser_Admin:', response.data);

  dispatch({ type: EDIT_USER, payload: response.data });
};

export const editAdminUser_Admin = (value) => async dispatch => {
  const response = await userAdmin.put(`${USER_ADMIN_ADMIN_URL}/${value.id}`, value);
  console.log('editAdminUser_Admin:', response.data);

  dispatch({ type: EDIT_USER, payload: response.data });
};

export const deleteUser = id => async dispatch => {
  await userAdmin.delete(`${USER_ADMIN_URL}/${id}`);

  dispatch({ type: DELETE_USER, payload: id });
};

export const editUserFunction = (userId, functionId, checked) => async dispatch => {
  const response = await userFunctionAdmin.put(`${USER_FUNCTION_ADMIN_URL}`, { userId, functionId, isEnable: checked });
  console.log('editUserFunction:', response.data);

  dispatch({ type: FETCH_USERS, payload: response.data });
  // const data = { userId, functionId, isEnable: checked };
  // console.log('editUserFunction data:', data);
};



//------ End LevelDevelopments --------