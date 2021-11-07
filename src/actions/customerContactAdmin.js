import customerContact_Admin from '../apis/customerContact_Admin';
import { CUSTOMER_CONTACT_ADMIN_URL } from '../environments/constraints';


import {
  FETCH_CUSTOMER_CONTACTS,
  FETCH_CUSTOMER_CONTACT,
  CREATE_CUSTOMER_CONTACT,
  EDIT_CUSTOMER_CONTACT,
  DELETE_CUSTOMER_CONTACT,
    
} from './types';


//------ Research group --------
export const fetchcCustomerContacts = () => async dispatch => {
  const response = await customerContact_Admin.get(CUSTOMER_CONTACT_ADMIN_URL);
  console.log('fetchcCustomerContacts:', response.data);

  dispatch({ type: FETCH_CUSTOMER_CONTACTS, payload: response.data });
};

export const fetchcCustomerContact = (id) => async dispatch => {
  const response = await customerContact_Admin.get(`${CUSTOMER_CONTACT_ADMIN_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_CUSTOMER_CONTACT, payload: response.data });
};

export const createCustomerContact = (value) => async dispatch => {
  const response = await customerContact_Admin.post(CUSTOMER_CONTACT_ADMIN_URL, value);
  console.log('createCustomerContact:', response.data);

  const responseFetchAlls = await customerContact_Admin.get(CUSTOMER_CONTACT_ADMIN_URL);

  dispatch({ type: FETCH_CUSTOMER_CONTACTS, payload: responseFetchAlls.data });
};


export const editCustomerContact = (value) => async dispatch => {
  const response = await customerContact_Admin.put(`${CUSTOMER_CONTACT_ADMIN_URL}/${value.id}`, value);
  console.log('editCustomerContact:', response.data);

  dispatch({ type: EDIT_CUSTOMER_CONTACT, payload: response.data });
};

export const deleteCustomerContact = id => async dispatch => {
  await customerContact_Admin.delete(`${CUSTOMER_CONTACT_ADMIN_URL}/${id}`);

  dispatch({ type: DELETE_CUSTOMER_CONTACT, payload: id });
};



//------ End Research group --------