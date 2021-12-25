import projectsAdmin from '../apis/projects_Admin';
import { PROJECTS_ADMIN_COMMERCIAL_URL, PROJECTS_ADMIN_RESEARCHING_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_PROJECT_DETAIL,
    
} from './types';


//------ Projects --------

export const fetchProjectDetailAdmin_Commercial = (id) => async dispatch => {
  const response = await projectsAdmin.get(`${PROJECTS_ADMIN_COMMERCIAL_URL}/${id}`, { headers: authHeader() } );
  console.log('fetchProjectDetail_Commercial: ', response.data);

  dispatch({ type: FETCH_PROJECT_DETAIL, payload: response.data });
  return response.data;
};

export const fetchProjectDetailAdmin_Researching = (id) => async dispatch => {
  const response = await projectsAdmin.get(`${PROJECTS_ADMIN_RESEARCHING_URL}/${id}`, { headers: authHeader() } );
  console.log('fetchProjectDetailAdmin_Researching: ', response.data);

  dispatch({ type: FETCH_PROJECT_DETAIL, payload: response.data });
  return response.data;
};

//------ End Projects --------