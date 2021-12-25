import faq from '../apis/faqs';
import { FAQ_URL } from '../environments/constraints';

import {
  FETCH_FAQS,
  FETCH_FAQ,
  CREATE_FAQ,
  EDIT_FAQ,
  DELETE_FAQ,

  LOADING,
  LOADED
    
} from './types';


//------ Research group --------
export const fetchFaqs = () => dispatch => {
  dispatch({ type: LOADING })
  faq.get(FAQ_URL)
    .then((response) => {
        console.log('fetchFaqs:', response.data);
        dispatch({ type: FETCH_FAQS, payload: response.data });
    });
  dispatch({ type: LOADED })
};

export const fetchFaq = (id) => dispatch => {
  dispatch({ type: LOADED })
  faq.get(`${FAQ_URL}/${id}`)
      .then(response => {
          console.log(response);
          dispatch({ type: FETCH_FAQ, payload: response.data });
      })
  dispatch({ type: LOADED })
};

export const createFaq = (value) => async dispatch => {
  const response = await faq.post(FAQ_URL, value);
  console.log('createFaq:', response.data);

  dispatch({ type: CREATE_FAQ, payload: response.data });
};


export const editFaq = (value) => async dispatch => {
  const response = await faq.put(`${FAQ_URL}/${value.id}`, value);
  console.log('editFaq:', response.data);

  dispatch({ type: EDIT_FAQ, payload: response.data });
};

export const deleteFaq = id => async dispatch => {
  await faq.delete(`${FAQ_URL}/${id}`);

  dispatch({ type: DELETE_FAQ, payload: id });
};



//------ End Research group --------