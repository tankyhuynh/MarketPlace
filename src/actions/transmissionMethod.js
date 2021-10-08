import history from '../history'

import transmissionMethod from '../apis/transmissionMethod';
import transmissionMethod_Admin from '../apis/transmissionMethod_Admin';
import { TRANSMISSION_URL, TRANSMISSION_ADMIN_URL } from '../environments/constraints';

import {
  FETCH_TRANSMISSION_METHODS,
  FETCH_TRANSMISSION_METHOD,
  CREATE_TRANSMISSION_METHOD,
  EDIT_TRANSMISSION_METHOD,

} from './types';


//------ TransmissionMethods --------
export const fetchTransmissionMethods = () => async dispatch => {
    const response = await transmissionMethod.get(TRANSMISSION_URL);
    console.log('fetchTransmissionMethods:', response.data);
  
    // sửa chỗ response.data => response.data.projects
    dispatch({ type: FETCH_TRANSMISSION_METHODS, payload: response.data });
  };
  
  
  export const fetchTransmissionMethod = (id) => async dispatch => {
    const response = await transmissionMethod.get(`${TRANSMISSION_URL}/${id}`);
    console.log(response);
  
    dispatch({ type: FETCH_TRANSMISSION_METHOD, payload: response.data });
  };

  export const createTransmissionMethod = formValues => async (dispatch, getState) => {
    const response = await transmissionMethod_Admin.post(TRANSMISSION_ADMIN_URL, formValues);
    console.log(response);
  
    dispatch({ type: CREATE_TRANSMISSION_METHOD, payload: response.data });
    history.push('/admin');
  };
  
  export const editTransmissionMethod = (value) => async dispatch => {
    const response = await transmissionMethod_Admin.put(`${TRANSMISSION_ADMIN_URL}/${value.id}`, value);
    console.log('editTransmissionMethod:', response.data);
  
    dispatch({ type: EDIT_TRANSMISSION_METHOD, payload: response.data });
  };
  //------ End TransmissionMethods --------








