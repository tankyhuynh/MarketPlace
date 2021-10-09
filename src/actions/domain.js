import domain from '../apis/domain';
import { DOMAINS_URL } from '../environments/constraints';

import {
  FETCH_DOMAINS,
  CREATE_DOMAIN,
  EDIT_DOMAIN
    
} from './types';


//------ Start Functions --------
export const fetchDomains = () => async dispatch => {
  const response = await domain.get(DOMAINS_URL);
  console.log('fetch funtions:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_DOMAINS, payload: response.data });
};

export const createDomain = (value) => async dispatch => {
  const response = await domain.post(DOMAINS_URL, value);
  console.log('createDomain:', response.data);

  dispatch({ type: CREATE_DOMAIN, payload: response.data });
};

export const editDomain = (value) => async dispatch => {
  const response = await domain.put(`${DOMAINS_URL}/${value.id}`, value);
  console.log('editDomain:', response.data);

  dispatch({ type: EDIT_DOMAIN, payload: response.data });
};




//------ End Fields --------