import projects from '../apis/projects';
import { 
  PROJECTS_COMMERCIAL_URL, 
  PROJECTS_RESEARCHING_URL 

} from '../environments/constraints';

import {
  FETCH_PROJECT_DETAIL,
    
} from './types';


//------ Projects --------

export const fetchProjectDetail_Commercial = (id) => async dispatch => {
  const response = await projects.get(`${PROJECTS_COMMERCIAL_URL}/${id}`);
  console.log('fetchProjectDetail_Commercial: ', response.data);

  dispatch({ type: FETCH_PROJECT_DETAIL, payload: response.data });
  return response.data;
};

export const fetchProjectDetail_Researching = (id) => async dispatch => {
  const response = await projects.get(`${PROJECTS_RESEARCHING_URL}/${id}`);
  console.log('fetchProjectDetail_Researching: ', response.data);

  dispatch({ type: FETCH_PROJECT_DETAIL, payload: response.data });
  return response.data;
};

//------ End Projects --------