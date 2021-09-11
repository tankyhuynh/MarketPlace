import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import streamsReducer from './streamsReducer';
import projectsReducer from './projectsReducer';
import levelDevelopmentReducer from './levelDevelopmentReducer';
import transmissionMethodReducer from './transmissionMethodReducer'
import fieldReducer from './fieldReducer'
import loadReducer from './loadReducer'

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    levels: levelDevelopmentReducer,
    fields: fieldReducer,
    projects: projectsReducer,
    streams: streamsReducer,
    transmissions: transmissionMethodReducer,
    load: loadReducer,
});