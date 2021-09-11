




import transmissionMethod from '../apis/transmissionMethod';

import {
  FETCH_TRANSMISSION_METHODS,
  FETCH_TRANSMISSION_METHOD,

} from './types';



//------ TransmissionMethods --------
export const fetchTransmissionMethods = () => async dispatch => {
    const response = await transmissionMethod.get('/transmissionmethod');
    console.log('transmissionMethods:', response.data);
  
    // sửa chỗ response.data => response.data.projects
    dispatch({ type: FETCH_TRANSMISSION_METHODS, payload: response.data });
  };
  
  
  export const fetchTransmissionMethod = (id) => async dispatch => {
    const response = await transmissionMethod.get(`/transmissionmethod/${id}`);
    console.log(response);
  
    dispatch({ type: FETCH_TRANSMISSION_METHOD, payload: response.data });
  };
  //------ End TransmissionMethods --------








