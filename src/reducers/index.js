import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import streamsReducer from './streamsReducer';
import projectsReducer from './projectsReducer';
import levelDevelopmentReducer from './levelDevelopmentReducer';
import transmissionMethodReducer from './transmissionMethodReducer'

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    levels: levelDevelopmentReducer,
    projects: projectsReducer,
    streams: streamsReducer,
    transmissions: transmissionMethodReducer,
});