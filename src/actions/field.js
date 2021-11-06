// import history from '../history'

import field from '../apis/field';
import field_Admin from '../apis/field_Admin';
import { FIELD_URL, FIELD_ADMIN_URL } from '../environments/constraints';

import {
  FETCH_FIELDS,
  FETCH_FIELD,
  CREATE_FIELD,
  EDIT_FIELD,
  DELETE_FIELD
    
} from './types';


//------ Start Fields --------
export const fetchFields = () => async dispatch => {
  const response = await field.get(FIELD_URL);
  console.log('fetchFields:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_FIELDS, payload: response.data });
};


export const fetchField = (id) => async dispatch => {
  const response = await field.get(`${FIELD_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_FIELD, payload: response.data });
};

export const createField = (value) => async dispatch => {
  const response = await field_Admin.post(FIELD_ADMIN_URL, value);
  console.log('createField:', response.data);

  dispatch({ type: CREATE_FIELD, payload: response.data });

};

export const editField = (value) => async dispatch => {
  const response = await field_Admin.put(`${FIELD_ADMIN_URL}/${value.id}`, value);
  console.log('editField:', response.data);

  dispatch({ type: EDIT_FIELD, payload: response.data });
};

export const deleteField = id => async dispatch => {
  const response = await field_Admin.delete(`${FIELD_ADMIN_URL}/${id}`);
  console.log('deleteField:', response.data);

  dispatch({ type: DELETE_FIELD, payload: id });
};





//------ End Fields --------