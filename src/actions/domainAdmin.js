import domainAdmin from '../apis/domainAdmin';
import { DOMAINS_ADMIN_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_DOMAINS_ADMIN,
  CREATE_DOMAIN_ADMIN,
  EDIT_DOMAIN_ADMIN,
  DELETE_DOMAIN_ADMIN
    
} from './types';


//------ Start Functions --------
export const fetchDomains = () => async dispatch => {
  const response = await domainAdmin.get(DOMAINS_ADMIN_URL, { headers: authHeader() } );
  console.log('fetch funtions:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_DOMAINS_ADMIN, payload: response.data });
};

export const createDomain = (value) => async dispatch => {
  const response = await domainAdmin.post(DOMAINS_ADMIN_URL, value, { headers: authHeader() } );
  console.log('createDomain client send:', value);
  console.log('createDomain server response:', response.data);

  dispatch({ type: CREATE_DOMAIN_ADMIN, payload: response.data });
};

export const editDomain = (value) => async dispatch => {
  const response = await domainAdmin.put(`${DOMAINS_ADMIN_URL}/${value.id}`, value, { headers: authHeader() } );
  console.log('editDomain:', response.data);

  dispatch({ type: EDIT_DOMAIN_ADMIN, payload: response.data });
};

export const deleteDomain = id => async dispatch => {
  await domainAdmin.delete(`${DOMAINS_ADMIN_URL}/${id}`, { headers: authHeader() } );

  dispatch({ type: DELETE_DOMAIN_ADMIN, payload: id });
};




//------ End Fields --------