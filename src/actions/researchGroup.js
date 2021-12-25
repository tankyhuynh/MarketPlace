import research_group from '../apis/research_group';
import { RESEARCH_GROUP_URL, RESEARCH_GROUP_DETAIL_ADMIN_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_RESEARCH_GROUPS,
  FETCH_RESEARCH_GROUP,
  CREATE_RESEARCH_GROUP,
  EDIT_RESEARCH_GROUP,
  DELETE_RESEARCH_GROUP,

  LOADING,
  LOADED
    
} from './types';


//------ Research group --------
export const fetchGroups = () => dispatch => {
  dispatch({ type: LOADING });
  
  research_group.get(`${RESEARCH_GROUP_URL}`, { headers: authHeader() } )
    .then(response => {
        console.log('fetchGroup:', response.data);
        dispatch({ type: FETCH_RESEARCH_GROUPS, payload: response.data });
    })

  dispatch({ type: LOADED });
};

export const fetchGroup = (id) => async dispatch => {
  const response = await research_group.get(`${RESEARCH_GROUP_URL}/${id}`);
  console.log(response);

  dispatch({ type: FETCH_RESEARCH_GROUP, payload: response.data });
};

export const createGroup = (value) => async dispatch => {
  const response = await research_group.post(RESEARCH_GROUP_URL, value);
  console.log('createGroup:', response.data);

  dispatch({ type: CREATE_RESEARCH_GROUP, payload: response.data });
};


export const editGroup = (value) => async dispatch => {
  const response = await research_group.put(`${RESEARCH_GROUP_URL}/${value.id}`, value);
  console.log('editGroup:', response.data);

  dispatch({ type: EDIT_RESEARCH_GROUP, payload: response.data });
};

export const deleteGroup = id => async dispatch => {
  await research_group.delete(`${RESEARCH_GROUP_URL}/${id}`);

  dispatch({ type: DELETE_RESEARCH_GROUP, payload: id });
};

export const addMember = (value) => async dispatch => {
  const response = await research_group.post(RESEARCH_GROUP_DETAIL_ADMIN_URL, value);
  console.log('createGroup:', response.data);

  // dispatch({ type: FETCH_RESEARCH_GROUPS, payload: response.data });
};


export const deleteMember = (groupId, userId, roleId) => async dispatch => {
  await research_group.delete(`${RESEARCH_GROUP_DETAIL_ADMIN_URL}/${groupId}/${userId}/${roleId}`);

  // dispatch({ type: FETCH_RESEARCH_GROUPS, payload: groupId });
};



//------ End Research group --------