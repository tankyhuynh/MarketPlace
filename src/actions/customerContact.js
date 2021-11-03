import customerContact from '../apis/customerContact';
import { CUSTOMER_CONTACT_URL } from '../environments/constraints';


import {
  FETCH_CUSTOMER_CONTACTS,
  FETCH_CUSTOMER_CONTACT,
  CREATE_CUSTOMER_CONTACT,
  EDIT_CUSTOMER_CONTACT,
  DELETE_CUSTOMER_CONTACT,
    
} from './types';


//------ Research group --------
export const fetchcCustomerContacts = () => async dispatch => {
  const response = await customerContact.get(CUSTOMER_CONTACT_URL);
  console.log('fetchcCustomerContacts:', response.data);

  dispatch({ type: FETCH_CUSTOMER_CONTACTS, payload: response.data });
};

export const fetchcCustomerContact = (id) => async dispatch => {
  const response = await customerContact.get(`${CUSTOMER_CONTACT_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_CUSTOMER_CONTACT, payload: response.data });
};

export const createCustomerContact = (value) => async dispatch => {
  const response = await customerContact.post(CUSTOMER_CONTACT_URL, value);
  console.log('createCustomerContact:', response.data);

  dispatch({ type: CREATE_CUSTOMER_CONTACT, payload: response.data });
};


export const editCustomerContact = (value) => async dispatch => {
  const response = await customerContact.put(`${CUSTOMER_CONTACT_URL}/${value.id}`, value);
  console.log('editCustomerContact:', response.data);

  dispatch({ type: EDIT_CUSTOMER_CONTACT, payload: response.data });
};

export const deleteCustomerContact = id => async dispatch => {
  await customerContact.delete(`${CUSTOMER_CONTACT_URL}/${id}`);

  dispatch({ type: DELETE_CUSTOMER_CONTACT, payload: id });
};



//------ End Research group --------