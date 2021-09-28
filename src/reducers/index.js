import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import streamsReducer from './streamsReducer';
import projectsReducer from './projectsReducer';
import projectsDetailReducer from './projectsDetailReducer';
import levelDevelopmentReducer from './levelDevelopmentReducer';
import transmissionMethodReducer from './transmissionMethodReducer'
import fieldReducer from './fieldReducer'
import loadReducer from './loadReducer'
import statusReducer from './statusReducer'
import functionReducer from './functionReducer'
import categoryReducer from './categoryReducer'

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    levels: levelDevelopmentReducer,
    fields: fieldReducer,
    projects: projectsReducer,
    projectDetail: projectsDetailReducer,
    streams: streamsReducer,
    transmissions: transmissionMethodReducer,
    load: loadReducer,
    status: statusReducer,
    functions: functionReducer,
    categories: categoryReducer
});