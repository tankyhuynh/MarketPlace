import function_api from '../apis/functionAdmin';
import { FUNCTIONS_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_FUNCTIONS_ADMIN,
  CREATE_FUNCTION_ADMIN,
  EDIT_FUNCTION_ADMIN,
  DELETE_FUNCTION_ADMIN
    
} from './types';


//------ Start Functions --------
export const fetchFunctions = () => async dispatch => {
  const response = await function_api.get(FUNCTIONS_URL, { headers: authHeader() } );
  console.log('fetch funtions:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_FUNCTIONS_ADMIN, payload: response.data });
};

export const createFunction = formValues => async (dispatch, getState) => {
  const response = await function_api.post(FUNCTIONS_URL, formValues, { headers: authHeader() } );
  console.log(response);

  dispatch({ type: CREATE_FUNCTION_ADMIN, payload: response.data });
  // history.push('/');
};

export const editFunction = (value) => async dispatch => {
  const response = await function_api.put(`${FUNCTIONS_URL}/${value.id}`, value, { headers: authHeader() } );
  console.log('editFunction:', response.data);

  dispatch({ type: EDIT_FUNCTION_ADMIN, payload: response.data });
};

export const deleteFunction = id => async dispatch => {
  await function_api.delete(`${FUNCTIONS_URL}/${id}`, { headers: authHeader() } );

  dispatch({ type: DELETE_FUNCTION_ADMIN, payload: id });
};




//------ End Fields --------