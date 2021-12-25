import faq_admin from '../apis/faqsAdmin';
import { FAQ_ADMIN_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_FAQS_ADMIN,
  FETCH_FAQ_ADMIN,
  CREATE_FAQ_ADMIN,
  EDIT_FAQ_ADMIN,
  DELETE_FAQ_ADMIN
    
} from './types';


//------ Research group --------
export const fetchFaqs = () => async dispatch => {
  const response = await faq_admin.get(FAQ_ADMIN_URL, { headers: authHeader() } );
  console.log('fetchFaqs:', response.data);

  dispatch({ type: FETCH_FAQS_ADMIN, payload: response.data });
};

export const fetchFaq = (id) => async dispatch => {
  const response = await faq_admin.get(`${FAQ_ADMIN_URL}/${id}`, { headers: authHeader() } );
  console.log(response);

  dispatch({ type: FETCH_FAQ_ADMIN, payload: response.data });
};

export const createFaq = (value) => async dispatch => {
  const response = await faq_admin.post(FAQ_ADMIN_URL, value, { headers: authHeader() } );
  console.log('createFaq:', response.data);

  dispatch({ type: CREATE_FAQ_ADMIN, payload: response.data });
};


export const editFaq = (value) => async dispatch => {
  const response = await faq_admin.put(`${FAQ_ADMIN_URL}/${value.id}`, value, { headers: authHeader() } );
  console.log('editFaq:', response.data);

  dispatch({ type: EDIT_FAQ_ADMIN, payload: response.data });
};

export const deleteFaq = id => async dispatch => {
  await faq_admin.delete(`${FAQ_ADMIN_URL}/${id}`, { headers: authHeader() } );

  dispatch({ type: DELETE_FAQ_ADMIN, payload: id });
};



//------ End Research group --------