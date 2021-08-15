import streams from '../apis/streams';
import projects from '../apis/projects';
import quill from '../apis/quill';
import users from '../apis/users';
import history from '../history';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  FETCH_PROJECTS,
  FETCH_PROJECT,
} from './types';

export const signIn = (userId, userProfile) => {
  return {
    type: SIGN_IN,
    payload: {
      userId: userId,
      userProfile: userProfile
    }
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};


// ------ Auth --------
export const signup = formValues => async (dispatch, getState) => {
  // const response = await users.post('/signup', { ...formValues });
  // console.log(response);

  // dispatch({ type: SIGN_IN, payload: response.data });
  // history.push('/');
  console.log('Signup', formValues);
};

export const login = formValues => async (dispatch, getState) => {
  const response = await users.post('/user/login', { ...formValues });
  console.log(response);

  dispatch({ type: SIGN_IN, payload: response.data });
  history.push('/');
 
};
// ------ End Auth --------



//------ Projects --------
export const fetchProjects = () => async dispatch => {
  const response = await projects.get('/projects');
  console.log('fetchProjects:', response.data.projects);

  // sửa chỗ response.data => response.data.projects
  dispatch({ type: FETCH_PROJECTS, payload: response.data });
};
export const fetchProjectsWithQuill = () => async dispatch => {
  const response = await quill.get('/api/projects/getProjects');
  console.log(response.data);

  dispatch({ type: FETCH_PROJECTS, payload: response.data.projects });
};

export const fetchProject = id => async dispatch => {
  const response = await projects.get(`/projects/${id}`);
  console.log(response);

  dispatch({ type: FETCH_PROJECT, payload: response.data });
};


//------ End Projects --------





// ------ Streams --------
export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
  history.push('/');
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
  history.push('/');
};
// ------ End Streams --------