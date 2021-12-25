import projects from '../apis/projects';
import projectsAdmin from '../apis/projects_Admin';
import history from '../history'
import { 
  PROJECTS_ADMIN_URL,
  PROJECTS_URL,
  PROJECTS_BY_STATUS_URL, 
  PROJECTS_BY_DOMAIN_ID_URL,  
  PROJECTS_COMMERCIAL_URL, 
  PROJECTS_RESEARCHING_URL 

} from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_PROJECTS,
  FETCH_PROJECT,
  EDIT_PROJECT,
  CREATE_PROJECT_TEMP,
  FETCH_RESEARCHER_PROJECTS,
  FETCH_ADMIN_PROJECTS,
    
} from './types';

const STATUS_DD_ID = 1 // Đã duyệt
const STATUS_CD_ID = 2 // Chờ duyệt
const STATUS_TC_ID = 3 // Từ chối
const STATUS_TMP_ID = 4 // Nháp

//------ Projects --------
export const fetchProjects_Commercial = () => async dispatch => {
  const response = await projects.get(`${PROJECTS_COMMERCIAL_URL}`, { headers: authHeader() } );
  console.log('fetchProjects PROJECTS_COMMERCIAL_URL:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_PROJECTS, payload: response.data });
};
export const fetchProjects_Researching = () => async dispatch => {
  const response = await projects.get(`${PROJECTS_RESEARCHING_URL}`, { headers: authHeader() } );
  console.log('fetchProjects PROJECTS_RESEARCHING_URL:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_PROJECTS, payload: response.data });
};

export const fetchProjects = () => async dispatch => {
  const response = await projectsAdmin.get(`${PROJECTS_ADMIN_URL}`, { headers: authHeader() } );
  console.log('fetchProjects_all_by_domainId :', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_ADMIN_PROJECTS, payload: response.data });
};

// Fetch by Domain ID
export const fetchProjects_all_by_domainId = (domainId) => async dispatch => {
  const response = await projectsAdmin.get(`${PROJECTS_BY_DOMAIN_ID_URL}/${domainId}`, { headers: authHeader() });
  console.log('fetchProjects_all_by_domainId :', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_ADMIN_PROJECTS, payload: response.data });
};

// End Fetch by Domain ID



export const fetchProjects_DaDuyet = () => async dispatch => {
  const response = await projects.get(`${PROJECTS_BY_STATUS_URL}/${STATUS_DD_ID}`, { headers: authHeader() } );
  console.log('fetchProjects:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_PROJECTS, payload: response.data });
};
export const fetchProjects_ChoDuyet = () => async dispatch => {
  const response = await projects.get(`${PROJECTS_BY_STATUS_URL}/${STATUS_CD_ID}`, { headers: authHeader() } );
  console.log('fetchProjects:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_PROJECTS, payload: response.data });
};
export const fetchProjects_TuChoi = () => async dispatch => {
  const response = await projects.get(`${PROJECTS_BY_STATUS_URL}/${STATUS_TC_ID}`, { headers: authHeader() } );
  console.log('fetchProjects:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_PROJECTS, payload: response.data });
};
export const fetchProjects_Nhap = () => async dispatch => {
  const response = await projects.get(`${PROJECTS_BY_STATUS_URL}/${STATUS_TMP_ID}`, { headers: authHeader() } );
  console.log('fetchProjects:', response.data);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_PROJECTS, payload: response.data });
};

export const fetchProjectByUserIdAndStatusId = (userId, statusId) => async dispatch => {
  const response = await projects.get(`${PROJECTS_URL}/user/${userId}/status/${statusId}`, { headers: authHeader() } );
  console.log('fetchProjectByUserIdAndStatusId:', response.data);
  console.log(response);

  dispatch({ type: FETCH_RESEARCHER_PROJECTS, payload: response.data });
  return response.data
};




export const fetchProject = (id) => async dispatch => {
  const response = await projects.get(`${PROJECTS_COMMERCIAL_URL}/${id}`, { headers: authHeader() } );
  console.log('fetchProject:', response.data);
  console.log(response);

  dispatch({ type: FETCH_PROJECT, payload: response.data });
  // return response.data
};

export const editProject = (id, formValues) => async dispatch => {
  const response = await projects.patch(`${PROJECTS_COMMERCIAL_URL}/${id}`, formValues, { headers: authHeader() } );

  dispatch({ type: EDIT_PROJECT, payload: response.data });
  history.push('/');
};

export const createTempProject = (formValues) => async dispatch => {
  // const response = await projects.patch(`${PROJECTS_COMMERCIAL_URL}`, formValues);

  dispatch({ type: CREATE_PROJECT_TEMP, payload: formValues });
  history.push('/');
};

//------ End Projects --------