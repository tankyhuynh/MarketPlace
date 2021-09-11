import projects from '../apis/projects';
import history from '../history'

import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  EDIT_PROJECT,
    
} from './types';


//------ Projects --------
export const fetchProjects = () => async dispatch => {
  const response = await projects.get('/project');
  console.log('fetchProjects:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_PROJECTS, payload: response.data });
};


export const fetchProject = (id) => async dispatch => {
  const response = await projects.get(`/project/${id}`);
  console.log(response);

  dispatch({ type: FETCH_PROJECT, payload: response.data });
};

export const editProject = (id, formValues) => async dispatch => {
  const response = await projects.patch(`/project/${id}`, formValues);

  dispatch({ type: EDIT_PROJECT, payload: response.data });
  history.push('/');
};
//------ End Projects --------