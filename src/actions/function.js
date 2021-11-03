import function_api from '../apis/function';
import { FUNCTIONS_URL } from '../environments/constraints';

import {
  FETCH_FUNCTIONS,
  CREATE_FUNCTION,
  EDIT_FUNCTION,
  DELETE_FUNCTION,
    
} from './types';


//------ Start Functions --------
export const fetchFunctions = () => async dispatch => {
  const response = await function_api.get(FUNCTIONS_URL);
  console.log('fetch funtions:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_FUNCTIONS, payload: response.data });
};

export const createFunction = formValues => async (dispatch, getState) => {
  const response = await function_api.post(FUNCTIONS_URL, formValues);
  console.log(response);

  dispatch({ type: CREATE_FUNCTION, payload: response.data });
  // history.push('/');
};

export const editFunction = (value) => async dispatch => {
  const response = await function_api.put(`${FUNCTIONS_URL}/${value.id}`, value);
  console.log('editFunction:', response.data);

  dispatch({ type: EDIT_FUNCTION, payload: response.data });
};

export const deleteFunction = id => async dispatch => {
  await function_api.delete(`${FUNCTIONS_URL}/${id}`);

  dispatch({ type: DELETE_FUNCTION, payload: id });
};




//------ End Fields --------