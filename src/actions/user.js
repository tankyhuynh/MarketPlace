import user from '../apis/user';
import { USER_URL } from '../environments/constraints';

import {
  FETCH_USERS,
  CREATE_USER,
  EDIT_USER
    
} from './types';


//------ LevelDevelopments --------
export const fetchUsers = () => async dispatch => {
  const response = await user.get(USER_URL);
  console.log('fetchUsers:', response.data);

  dispatch({ type: FETCH_USERS, payload: response.data });
};

export const createUser = (value) => async dispatch => {
  const response = await user.post(USER_URL, value);
  console.log('createUser:', response.data);

  dispatch({ type: CREATE_USER, payload: response.data });
};


export const editUser = (value) => async dispatch => {
  const response = await user.put(`${USER_URL}/${value.id}`, value);
  console.log('editUser:', response.data);

  dispatch({ type: EDIT_USER, payload: response.data });
};


//------ End LevelDevelopments --------