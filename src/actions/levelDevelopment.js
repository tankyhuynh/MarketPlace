import levelDevelopments from '../apis/levelDevelopment';

import {
  FETCH_LEVEL_DEVELOPMENTS,
  FETCH_LEVEL_DEVELOPMENT,
    
} from './types';

//------ LevelDevelopments --------
export const fetchLevelDevelopments = () => async dispatch => {
  const response = await levelDevelopments.get('/leveldevelopment');
  console.log('levelDevelopments:', response.data);

  dispatch({ type: FETCH_LEVEL_DEVELOPMENTS, payload: response.data });
};


export const fetchLevelDevelopment = (id) => async dispatch => {
  const response = await levelDevelopments.get(`/leveldevelopment/${id}`);
  console.log(response);

  dispatch({ type: FETCH_LEVEL_DEVELOPMENT, payload: response.data });
};
//------ End LevelDevelopments --------