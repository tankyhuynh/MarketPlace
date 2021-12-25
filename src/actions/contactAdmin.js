import contact_Admin from '../apis/contact_Admin';
import { CONTACT_ADMIN_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_CONTACTS_ADMIN,
  FETCH_CONTACT_ADMIN,
  CREATE_CONTACT_ADMIN,
  EDIT_CONTACT_ADMIN,
  DELETE_CONTACT_ADMIN,
    
} from './types';


//------ Research group --------
export const fetchContacts = () => async dispatch => {
  const response = await contact_Admin.get(CONTACT_ADMIN_URL, { headers: authHeader() } );
  console.log('fetchContacts cccc:', response.data);

  dispatch({ type: FETCH_CONTACTS_ADMIN, payload: response.data });
};

export const fetchContact = (id) => async dispatch => {
  const response = await contact_Admin.get(`${CONTACT_ADMIN_URL}/${id}`, { headers: authHeader()} );
  console.log(response);

  dispatch({ type: FETCH_CONTACT_ADMIN, payload: response.data });
};

export const createContact = (value) => async dispatch => {
  const response = await contact_Admin.post(CONTACT_ADMIN_URL, value, { headers: authHeader()} );
  console.log('createContact:', response.data);

  dispatch({ type: CREATE_CONTACT_ADMIN, payload: response.data });
};


export const editContact = (value) => async dispatch => {
  const response = await contact_Admin.put(`${CONTACT_ADMIN_URL}/${value.id}`, value, { headers: authHeader()} );
  console.log('editContact:', response.data);

  dispatch({ type: EDIT_CONTACT_ADMIN, payload: response.data });
};

export const deleteFaq = id => async dispatch => {
  await contact_Admin.delete(`${CONTACT_ADMIN_URL}/${id}`, { headers: authHeader()} );

  dispatch({ type: DELETE_CONTACT_ADMIN, payload: id });
};



//------ End Research group --------