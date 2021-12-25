import research_group_Admin from '../apis/research_group_Admin';
import { RESEARCH_GROUP_ADMIN_URL, RESEARCH_GROUP_DETAIL_ADMIN_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_RESEARCH_GROUPS_ADMIN,
  FETCH_RESEARCH_GROUP_ADMIN,
  CREATE_RESEARCH_GROUP_ADMIN,
  EDIT_RESEARCH_GROUP_ADMIN,
  DELETE_RESEARCH_GROUP_ADMIN,

  LOADING,
  LOADED
    
} from './types';


//------ Research group --------
export const fetchGroups = () => dispatch => {
  dispatch({ type: LOADING });
  
  research_group_Admin.get(RESEARCH_GROUP_ADMIN_URL, { headers: authHeader() } )
    .then(response => {
        console.log('fetchGroup:', response.data);
        dispatch({ type: FETCH_RESEARCH_GROUPS_ADMIN, payload: response.data });
    })

  dispatch({ type: LOADED });
};

export const fetchGroup = (id) => async dispatch => {
  const response = await research_group_Admin.get(`${RESEARCH_GROUP_ADMIN_URL}/${id}`, { headers: authHeader() } );
  console.log(response);

  dispatch({ type: FETCH_RESEARCH_GROUP_ADMIN, payload: response.data });
};

export const createGroup = (value) => async dispatch => {
  const response = await research_group_Admin.post(RESEARCH_GROUP_ADMIN_URL, value, { headers: authHeader() });
  console.log('createGroup:', response.data);

  dispatch({ type: CREATE_RESEARCH_GROUP_ADMIN, payload: response.data });
};


export const editGroup = (value) => async dispatch => {
  const response = await research_group_Admin.put(`${RESEARCH_GROUP_ADMIN_URL}/${value.id}`, value, { headers: authHeader() });
  console.log('editGroup:', response.data);

  dispatch({ type: EDIT_RESEARCH_GROUP_ADMIN, payload: response.data });
};

export const deleteGroup = id => async dispatch => {
  await research_group_Admin.delete(`${RESEARCH_GROUP_ADMIN_URL}/${id}`, { headers: authHeader() });

  dispatch({ type: DELETE_RESEARCH_GROUP_ADMIN, payload: id });
};

export const addMember = (value) => async dispatch => {
  const response = await research_group_Admin.post(RESEARCH_GROUP_DETAIL_ADMIN_URL, value, { headers: authHeader() });
  console.log('createGroup:', response.data);

  // dispatch({ type: FETCH_RESEARCH_GROUP_ADMINS_ADMIN, payload: response.data });
};


export const deleteMember = (groupId, userId, roleId) => async dispatch => {
  await research_group_Admin.delete(`${RESEARCH_GROUP_DETAIL_ADMIN_URL}/${groupId}/${userId}/${roleId}`, { headers: authHeader() });

  // dispatch({ type: FETCH_RESEARCH_GROUP_ADMINS_ADMIN, payload: groupId });
};



//------ End Research group --------