import contact from '../apis/contact';
import { CONTACT_URL } from '../environments/constraints';


import {
  FETCH_CONTACTS,
  FETCH_CONTACT,
  CREATE_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
    
} from './types';


//------ Research group --------
export const fetchContacts = () => async dispatch => {
  const response = await contact.get(CONTACT_URL);
  console.log('fetchContacts:', response.data);

  dispatch({ type: FETCH_CONTACTS, payload: response.data });
};

export const fetchContact = (id) => async dispatch => {
  const response = await contact.get(`${CONTACT_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_CONTACT, payload: response.data });
};

export const createContact = (value) => async dispatch => {
  const response = await contact.post(CONTACT_URL, value);
  console.log('createContact:', response.data);

  dispatch({ type: CREATE_CONTACT, payload: response.data });
};


export const editContact = (value) => async dispatch => {
  const response = await contact.put(`${CONTACT_URL}/${value.id}`, value);
  console.log('editContact:', response.data);

  dispatch({ type: EDIT_CONTACT, payload: response.data });
};

export const deleteFaq = id => async dispatch => {
  await contact.delete(`${CONTACT_URL}/${id}`);

  dispatch({ type: DELETE_CONTACT, payload: id });
};



//------ End Research group --------