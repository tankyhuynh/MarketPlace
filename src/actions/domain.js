import domain from '../apis/domain';
import { DOMAINS_URL } from '../environments/constraints';

import {
  FETCH_DOMAINS,
    
} from './types';


//------ Start Functions --------
export const fetchDomains = () => async dispatch => {
  const response = await domain.get(DOMAINS_URL);
  console.log('fetch funtions:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_DOMAINS, payload: response.data });
};




//------ End Fields --------