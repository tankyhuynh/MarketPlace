import levelDevelopments from '../apis/levelDevelopment';
import { LEVEL_URL } from '../environments/constraints';

import {
  FETCH_LEVEL_DEVELOPMENTS,
  FETCH_LEVEL_DEVELOPMENT,
  CREATE_LEVEL_DEVELOPMENT
    
} from './types';


//------ LevelDevelopments --------
export const fetchLevelDevelopments = () => async dispatch => {
  const response = await levelDevelopments.get(LEVEL_URL);
  console.log('levelDevelopments:', response.data);

  dispatch({ type: FETCH_LEVEL_DEVELOPMENTS, payload: response.data });
};


export const fetchLevelDevelopment = (id) => async dispatch => {
  const response = await levelDevelopments.get(`${LEVEL_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_LEVEL_DEVELOPMENT, payload: response.data });
};

export const createLevel = formValues => async (dispatch, getState) => {
  const response = await levelDevelopments.post(LEVEL_URL, formValues);
  console.log(response);

  dispatch({ type: CREATE_LEVEL_DEVELOPMENT, payload: response.data });
  // history.push('/');
};

//------ End LevelDevelopments --------