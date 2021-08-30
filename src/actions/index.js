
import streams from '../apis/streams'
import users from '../apis/users';
import levelDevelopments from '../apis/levelDevelopment';
import projects from '../apis/projects';
import transmissionMethod from '../apis/transmissionMethod';

import history from '../history'

import {
    CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM,
  SIGN_IN,
  SIGN_OUT,
  FETCH_LEVEL_DEVELOPMENTS,
  FETCH_LEVEL_DEVELOPMENT,
  FETCH_PROJECTS,
  FETCH_PROJECT,
  FETCH_TRANSMISSION_METHODS,
  FETCH_TRANSMISSION_METHOD,
  EDIT_PROJECT
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
export const signup = (formValues) => async (dispatch, getState) => {
  // const response = await users.post('/signup', { ...formValues });
  // console.log(response);

  // dispatch({ type: SIGN_IN, payload: response.data });
  // history.push('/');
  console.log('Signup', formValues);
};


// Xài history của props để push thì mới chịu đi
export const login = (formValues, propsHistory) => async (dispatch, getState) => {
  const response = await users.post('/user/login', { ...formValues });
  // const response = await projects.get('/projects', { ...formValues });
  console.log(response.data);

  dispatch({ type: SIGN_IN, payload: response.data });
  propsHistory.push('/researchers');
};
// ------ End Auth --------

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
    const response = await streams.patch(`/project/${id}`, formValues);
  
    dispatch({ type: EDIT_PROJECT, payload: response.data });
    history.push('/');
  };
  //------ End Projects --------


//------ LevelDevelopments --------
export const fetchLevelDevelopments = () => async dispatch => {
    const response = await levelDevelopments.get('/leveldevelopment');
    console.log('levelDevelopments:', response.data);
  
    dispatch({ type: FETCH_LEVEL_DEVELOPMENTS, payload: response.data });
  };
  
  
  export const fetchLevelDevelopment = (id) => async dispatch => {
    const response = await levelDevelopments.get(`/leveldevelopment/${id}`);
    console.log(response);
  
    dispatch({ type: FETCH_LEVEL_DEVELOPMENT, payload: response.data });
  };
  //------ End LevelDevelopments --------


//------ TransmissionMethods --------
export const fetchTransmissionMethods = () => async dispatch => {
    const response = await transmissionMethod.get('/transmissionmethod');
    console.log('transmissionMethods:', response.data);
  
    // sửa chỗ response.data => response.data.projects
    dispatch({ type: FETCH_TRANSMISSION_METHODS, payload: response.data });
  };
  
  
  export const fetchTransmissionMethod = (id) => async dispatch => {
    const response = await transmissionMethod.get(`/transmissionmethod/${id}`);
    console.log(response);
  
    dispatch({ type: FETCH_TRANSMISSION_METHOD, payload: response.data });
  };
  //------ End TransmissionMethods --------

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