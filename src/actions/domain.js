import domain from '../apis/domain';
import { DOMAINS_ADMIN_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_DOMAINS,
  CREATE_DOMAIN,
  EDIT_DOMAIN,
  DELETE_DOMAIN
    
} from './types';


//------ Start Functions --------
export const fetchDomains = () => async dispatch => {
  const response = await domain.get(DOMAINS_ADMIN_URL, { headers: authHeader() });
  console.log('fetch funtions:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_DOMAINS, payload: response.data });
};

export const createDomain = (value) => async dispatch => {
  const response = await domain.post(DOMAINS_ADMIN_URL, value);
  console.log('createDomain client send:', value);
  console.log('createDomain server response:', response.data);

  dispatch({ type: CREATE_DOMAIN, payload: response.data });
};

export const editDomain = (value) => async dispatch => {
  const response = await domain.put(`${DOMAINS_ADMIN_URL}/${value.id}`, value);
  console.log('editDomain:', response.data);

  dispatch({ type: EDIT_DOMAIN, payload: response.data });
};

export const deleteDomain = id => async dispatch => {
  await domain.delete(`${DOMAINS_ADMIN_URL}/${id}`);

  dispatch({ type: DELETE_DOMAIN, payload: id });
};




//------ End Fields --------