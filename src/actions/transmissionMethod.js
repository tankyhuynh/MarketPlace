import transmissionMethod from '../apis/transmissionMethod';
import { TRANSMISSION_URL } from '../environments/constraints';

import {
  FETCH_TRANSMISSION_METHODS,
  FETCH_TRANSMISSION_METHOD,

} from './types';


//------ TransmissionMethods --------
export const fetchTransmissionMethods = () => async dispatch => {
    const response = await transmissionMethod.get(TRANSMISSION_URL);
    console.log('transmissionMethods:', response.data);
  
    // sửa chỗ response.data => response.data.projects
    dispatch({ type: FETCH_TRANSMISSION_METHODS, payload: response.data });
  };
  
  
  export const fetchTransmissionMethod = (id) => async dispatch => {
    const response = await transmissionMethod.get(`${TRANSMISSION_URL}/${id}`);
    console.log(response);
  
    dispatch({ type: FETCH_TRANSMISSION_METHOD, payload: response.data });
  };
  //------ End TransmissionMethods --------








