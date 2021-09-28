import projects from '../apis/projects';
import { PROJECTS_COMMERCIAL_URL } from '../environments/constraints';

import {
  FETCH_PROJECT_DETAIL,
    
} from './types';


//------ Projects --------

export const fetchProjectDetail = (id) => async dispatch => {
  const response = await projects.get(`${PROJECTS_COMMERCIAL_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_PROJECT_DETAIL, payload: response.data });
};

//------ End Projects --------