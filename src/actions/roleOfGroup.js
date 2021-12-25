import roleOfGroup_Admin from '../apis/roleOfGroup_Admin';
import { ROLE_OF_GROUP_ADMIN_URL } from '../environments/constraints';
import authHeader from '../services/auth.header'

import {
  FETCH_ROLES_OF_GROUP,
  // FETCH_ROLE_OF_GROUP,
  CREATE_ROLES_OF_GROUP,
  EDIT_ROLES_OF_GROUP,
    
} from './types';


//------ LevelDevelopments --------
export const fetchRolesOfGroup = () => async dispatch => {
  const response = await roleOfGroup_Admin.get(ROLE_OF_GROUP_ADMIN_URL, { headers: authHeader() });
  console.log('fetchRolesOfGroup:', response.data);

  dispatch({ type: FETCH_ROLES_OF_GROUP, payload: response.data });
};

export const createRoleOfGroup = (value) => async dispatch => {
  const response = await roleOfGroup_Admin.post(ROLE_OF_GROUP_ADMIN_URL, value);
  console.log('createRoleOfGroup:', response.data);

  dispatch({ type: CREATE_ROLES_OF_GROUP, payload: response.data });
};


export const editRoleOfGroup = (value) => async dispatch => {
  const response = await roleOfGroup_Admin.put(`${ROLE_OF_GROUP_ADMIN_URL}/${value.id}`, value);
  console.log('editRoleOfGroup:', response.data);

  dispatch({ type: EDIT_ROLES_OF_GROUP, payload: response.data });
};


//------ End LevelDevelopments --------