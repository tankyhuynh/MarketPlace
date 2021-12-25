import customerContact_Admin from '../apis/customerContact_Admin';
import { CUSTOMER_CONTACT_ADMIN_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_CUSTOMER_CONTACTS_ADMIN,
  FETCH_CUSTOMER_CONTACT_ADMIN,
  EDIT_CUSTOMER_CONTACT_ADMIN,
  DELETE_CUSTOMER_CONTACT_ADMIN,
    
} from './types';


//------ Research group --------
export const fetchcCustomerContacts = () => async dispatch => {
  const response = await customerContact_Admin.get(CUSTOMER_CONTACT_ADMIN_URL, { headers: authHeader() } );
  console.log('fetchcCustomerContacts:', response.data);

  dispatch({ type: FETCH_CUSTOMER_CONTACTS_ADMIN, payload: response.data });
};

export const fetchcCustomerContact = (id) => async dispatch => {
  const response = await customerContact_Admin.get(`${CUSTOMER_CONTACT_ADMIN_URL}/${id}`, { headers: authHeader() } );
  console.log(response);

  dispatch({ type: FETCH_CUSTOMER_CONTACT_ADMIN, payload: response.data });
};

export const createCustomerContact = (value) => async dispatch => {
  const response = await customerContact_Admin.post(CUSTOMER_CONTACT_ADMIN_URL, value, { headers: authHeader() } );
  console.log('createCustomerContact:', response.data);

  const responseFetchAlls = await customerContact_Admin.get(CUSTOMER_CONTACT_ADMIN_URL, { headers: authHeader() } );

  dispatch({ type: FETCH_CUSTOMER_CONTACTS_ADMIN, payload: responseFetchAlls.data });
};


export const editCustomerContact = (value) => async dispatch => {
  const response = await customerContact_Admin.put(`${CUSTOMER_CONTACT_ADMIN_URL}/${value.id}`, value, { headers: authHeader() } );
  console.log('editCustomerContact:', response.data);

  dispatch({ type: EDIT_CUSTOMER_CONTACT_ADMIN, payload: response.data });
};

export const deleteCustomerContact = id => async dispatch => {
  await customerContact_Admin.delete(`${CUSTOMER_CONTACT_ADMIN_URL}/${id}`, { headers: authHeader() } );

  dispatch({ type: DELETE_CUSTOMER_CONTACT_ADMIN, payload: id });
};



//------ End Research group --------