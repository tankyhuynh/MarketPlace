import levelDevelopments from '../apis/levelDevelopment';
import levelDevelopment_Admin from '../apis/levelDevelopment_Admin';
import { LEVEL_URL, LEVEL_ADMIN_URL } from '../environments/constraints';

import {
  FETCH_LEVEL_DEVELOPMENTS,
  FETCH_LEVEL_DEVELOPMENT,
  CREATE_LEVEL_DEVELOPMENT,
  EDIT_LEVEL_DEVELOPMENT,
    
} from './types';


//------ LevelDevelopments --------
export const fetchLevelDevelopments = () => async dispatch => {
  const response = await levelDevelopments.get(LEVEL_URL);
  console.log('fetchLevelDevelopments:', response.data);

  dispatch({ type: FETCH_LEVEL_DEVELOPMENTS, payload: response.data });
};


export const fetchLevelDevelopment = (id) => async dispatch => {
  const response = await levelDevelopments.get(`${LEVEL_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_LEVEL_DEVELOPMENT, payload: response.data });
};

export const createLevel = formValues => async (dispatch, getState) => {
  const response = await levelDevelopment_Admin.post(LEVEL_ADMIN_URL, formValues);
  console.log(response);

  dispatch({ type: CREATE_LEVEL_DEVELOPMENT, payload: response.data });
  // history.push('/');
};

export const editLevel = (value) => async dispatch => {
  const response = await levelDevelopment_Admin.put(`${LEVEL_ADMIN_URL}/${value.id}`, value);
  console.log('editLevel:', response.data);

  dispatch({ type: EDIT_LEVEL_DEVELOPMENT, payload: response.data });
};

//------ End LevelDevelopments --------