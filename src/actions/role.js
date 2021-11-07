import roles_Admin from '../apis/role_Admin';
import { ROLES_ADMIN_URL } from '../environments/constraints';

import {
  FETCH_ROLES,
  CREATE_ROLE,
  EDIT_ROLE,
  DELETE_ROLE
    
} from './types';


//------ LevelDevelopments --------
export const fetchRoles = () => async dispatch => {
  const response = await roles_Admin.get(ROLES_ADMIN_URL);
  console.log('fetchRoles:', response.data);

  dispatch({ type: FETCH_ROLES, payload: response.data });
};

export const createRole = (value) => async dispatch => {
  const response = await roles_Admin.post(ROLES_ADMIN_URL, value);
  console.log('createRole:', response.data);

  dispatch({ type: CREATE_ROLE, payload: response.data });
};


export const editRole = (value) => async dispatch => {
  const response = await roles_Admin.put(`${ROLES_ADMIN_URL}/${value.id}`, value);
  console.log('editRole:', response.data);

  dispatch({ type: EDIT_ROLE, payload: response.data });
};

export const deleteRole = id => async dispatch => {
  await roles_Admin.delete(`${ROLES_ADMIN_URL}/${id}`);

  dispatch({ type: DELETE_ROLE, payload: id });
};


//------ End LevelDevelopments --------