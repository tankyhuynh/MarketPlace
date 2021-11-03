import faq_admin from '../apis/faqsAdmin';
import { FAQ_ADMIN_URL } from '../environments/constraints';


import {
  FETCH_FAQS,
  FETCH_FAQ,
  CREATE_FAQ,
  EDIT_FAQ,
  DELETE_FAQ
    
} from './types';


//------ Research group --------
export const fetchFaqs = () => async dispatch => {
  const response = await faq_admin.get(FAQ_ADMIN_URL);
  console.log('fetchFaqs:', response.data);

  dispatch({ type: FETCH_FAQS, payload: response.data });
};

export const fetchFaq = (id) => async dispatch => {
  const response = await faq_admin.get(`${FAQ_ADMIN_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_FAQ, payload: response.data });
};

export const createFaq = (value) => async dispatch => {
  const response = await faq_admin.post(FAQ_ADMIN_URL, value);
  console.log('createFaq:', response.data);

  dispatch({ type: CREATE_FAQ, payload: response.data });
};


export const editFaq = (value) => async dispatch => {
  const response = await faq_admin.put(`${FAQ_ADMIN_URL}/${value.id}`, value);
  console.log('editFaq:', response.data);

  dispatch({ type: EDIT_FAQ, payload: response.data });
};

export const deleteFaq = id => async dispatch => {
  await faq_admin.delete(`${FAQ_ADMIN_URL}/${id}`);

  dispatch({ type: DELETE_FAQ, payload: id });
};



//------ End Research group --------