import field from '../apis/field';

import {
  FETCH_FIELDS,
  FETCH_FIELD,
    
} from './types';


//------ Start Fields --------
export const fetchFields = () => async dispatch => {
  const response = await field.get('/field');
  console.log('transmissionMethods:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_FIELDS, payload: response.data });
};


export const fetchField = (id) => async dispatch => {
  const response = await field.get(`/field/${id}`);
  console.log(response);

  dispatch({ type: FETCH_FIELD, payload: response.data });
};
//------ End Fields --------