import roles_Admin from '../apis/role_Admin';
import { ROLES_ADMIN_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_ROLES_ADMIN,
  CREATE_ROLE_ADMIN,
  EDIT_ROLE_ADMIN,
  DELETE_ROLE_ADMIN
    
} from './types';


//------ LevelDevelopments --------
export const fetchRoles = () => async dispatch => {
  const response = await roles_Admin.get(ROLES_ADMIN_URL, { headers: authHeader() } );
  console.log('fetchRoles admin:', response.data);

  dispatch({ type: FETCH_ROLES_ADMIN, payload: response.data });
};

export const createRole = (value) => async dispatch => {
  const response = await roles_Admin.post(ROLES_ADMIN_URL, value, { headers: authHeader() } );
  console.log('createRole:', response.data);

  dispatch({ type: CREATE_ROLE_ADMIN, payload: response.data });
};


export const editRole = (value) => async dispatch => {
  const response = await roles_Admin.put(`${ROLES_ADMIN_URL}/${value.id}`, value, { headers: authHeader() } );
  console.log('editRole:', response.data);

  dispatch({ type: EDIT_ROLE_ADMIN, payload: response.data });
};

export const deleteRole = id => async dispatch => {
  await roles_Admin.delete(`${ROLES_ADMIN_URL}/${id}`, { headers: authHeader() } );

  dispatch({ type: DELETE_ROLE_ADMIN, payload: id });
};


//------ End LevelDevelopments --------