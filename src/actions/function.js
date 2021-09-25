import field from '../apis/field';
import { FUNCTIONS_URL } from '../environments/constraints';

import {
  FETCH_FUNCTIONS,
    
} from './types';


//------ Start Functions --------
export const fetchFunctions = () => async dispatch => {
  const response = await field.get(FUNCTIONS_URL);
  console.log('fetch funtions:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_FUNCTIONS, payload: response.data });
};




//------ End Fields --------