import field from '../apis/status';
import { STATUS_URL } from '../environments/constraints';

import {
  FETCH_STATUSES,
  FETCH_STATUS
    
} from './types';


//------ Start Fields --------
export const fetchStatuses = () => async dispatch => {
  const response = await field.get(STATUS_URL);
  console.log('statuses:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_STATUSES, payload: response.data });
};


export const fetchStatus = (id) => async dispatch => {
  const response = await field.get(`${STATUS_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_STATUS, payload: response.data });
};





//------ End Fields --------