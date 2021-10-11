import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import streamsReducer from './streamsReducer';
import projectsReducer from './projectsReducer';
import tempProjectsDetailReducer from './tempProjectsReducer';
import levelDevelopmentReducer from './levelDevelopmentReducer';
import transmissionMethodReducer from './transmissionMethodReducer'
import fieldReducer from './fieldReducer'
import loadReducer from './loadReducer'
import blockNavigationReducer from './blockNavigationReducer'
import statusReducer from './statusReducer'
import functionReducer from './functionReducer'
import categoryReducer from './categoryReducer'
import domainReducer from './domainReducer'
import roleReducer from './roleReducer'
import userReducer from './userReducer'

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    levels: levelDevelopmentReducer,
    fields: fieldReducer,
    projects: projectsReducer,
    tempProject: tempProjectsDetailReducer,
    streams: streamsReducer,
    transmissions: transmissionMethodReducer,
    load: loadReducer,
    blockNavigation: blockNavigationReducer,
    status: statusReducer,
    functions: functionReducer,
    categories: categoryReducer,
    domains: domainReducer,
    roles: roleReducer,
    users: userReducer
});