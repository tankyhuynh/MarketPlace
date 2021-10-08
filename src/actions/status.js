import status from '../apis/status';
import status_Admin from '../apis/status_Admin';
import { STATUS_URL, STATUS_ADMIN_URL } from '../environments/constraints';

import {
  FETCH_STATUSES,
  FETCH_STATUS,
  CREATE_STATUS,
  EDIT_STATUS,
    
} from './types';


//------ Start Fields --------
export const fetchStatuses = () => async dispatch => {
  const response = await status.get(STATUS_URL);
  console.log('fetchStatuses:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_STATUSES, payload: response.data });
};


export const fetchStatus = (id) => async dispatch => {
  const response = await status.get(`${STATUS_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_STATUS, payload: response.data });
};

export const createStatus = formValues => async (dispatch, getState) => {
  const response = await status_Admin.post(STATUS_ADMIN_URL, formValues);
  console.log(response);

  dispatch({ type: CREATE_STATUS, payload: response.data });
  // history.push('/');
};

export const editStatus = (value) => async dispatch => {
  const response = await status_Admin.put(`${STATUS_ADMIN_URL}/${value.id}`, value);
  console.log('editStatus:', response.data);

  dispatch({ type: EDIT_STATUS, payload: response.data });
};




//------ End Fields --------