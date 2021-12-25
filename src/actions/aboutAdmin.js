import about_admin from '../apis/aboutAdmin';
import { ABOUT_ADMIN_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_ABOUTS_ADMIN,
  FETCH_ABOUT_ADMIN,
  CREATE_ABOUT_ADMIN,
  EDIT_ABOUT_ADMIN,
  DELETE_ABOUT_ADMIN,
    
} from './types';

const userDataLocalStorage = localStorage.getItem("userData");
const user = JSON.parse(userDataLocalStorage);

//------ Research group --------
export const fetchAbouts = () => async dispatch => {
  // const response = await about_admin.get(ABOUT_ADMIN_URL, { headers: authHeader() });
  const response = await about_admin.get(`${ABOUT_ADMIN_URL}`, { headers: authHeader() } );
  // const response = await about_admin.get(ABOUT_ADMIN_URL);
  console.log('fetchAbouts:', response.data);
  console.log('fetchAbouts user:', authHeader());

  dispatch({ type: FETCH_ABOUTS_ADMIN, payload: response.data });
};

export const fetchAbout = (id) => async dispatch => {
  const response = await about_admin.get(`${ABOUT_ADMIN_URL}/${id}`, { headers: authHeader()} );
  console.log(response);

  dispatch({ type: FETCH_ABOUT_ADMIN, payload: response.data });
};

export const createAbout = (value) => async dispatch => {
  const response = await about_admin.post(ABOUT_ADMIN_URL, value, { headers: authHeader() } );
  console.log('createAbout:', response.data);

  dispatch({ type: CREATE_ABOUT_ADMIN, payload: response.data });
};


export const editAbout = (value) => async dispatch => {
  const response = await about_admin.put(`${ABOUT_ADMIN_URL}/${value.id}`, value, { headers: authHeader() } );
  console.log('editAbout:', response.data);

  dispatch({ type: EDIT_ABOUT_ADMIN, payload: response.data });
};

export const deleteAbout = id => async dispatch => {
  await about_admin.delete(`${ABOUT_ADMIN_URL}/${id}`, { headers: authHeader() } );

  dispatch({ type: DELETE_ABOUT_ADMIN, payload: id });
};



//------ End Research group --------