import about from '../apis/about';
import { ABOUT_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_ABOUTS,
  FETCH_ABOUT,
  CREATE_ABOUT,
  EDIT_ABOUT,
  DELETE_ABOUT,
    
} from './types';

//------ Research group --------
export const fetchAbouts = () => async dispatch => {
  // const response = await about_admin.get(ABOUT_ADMIN_URL, { headers: authHeader() });
  const response = await about.get(`${ABOUT_URL}`, { headers: authHeader() });
  // const response = await about_admin.get(ABOUT_ADMIN_URL);

  dispatch({ type: FETCH_ABOUTS, payload: response.data });
};

export const fetchAbout = (id) => async dispatch => {
  console.log('fetchAbouts:', ABOUT_URL);
  const response = await about.get(`${ABOUT_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_ABOUT, payload: response.data });
};

export const createAbout = (value) => async dispatch => {
  const response = await about.post(ABOUT_URL, value);
  console.log('createAbout:', response.data);

  dispatch({ type: CREATE_ABOUT, payload: response.data });
};


export const editAbout = (value) => async dispatch => {
  const response = await about.put(`${ABOUT_URL}/${value.id}`, value);
  console.log('editAbout:', response.data);

  dispatch({ type: EDIT_ABOUT, payload: response.data });
};

export const deleteAbout = id => async dispatch => {
  await about.delete(`${ABOUT_URL}/${id}`);

  dispatch({ type: DELETE_ABOUT, payload: id });
};



//------ End Research group --------