import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import streamsReducer from './streamsReducer';
import projectsReducer from './projectsReducer';
import researcherProjectsReducer from './researcherProjectsReducer';
import adminProjectsReducer from './adminProjectsReducer';
import projectsDetailReducer from './projectsDetailReducer';
import tempProjectsDetailReducer from './tempProjectsReducer';
import levelDevelopmentReducer from './levelDevelopmentReducer';
import transmissionMethodReducer from './transmissionMethodReducer'
import fieldReducer from './fieldReducer'
import loadReducer from './loadReducer'
import blockNavigationReducer from './blockNavigationReducer'
import statusReducer from './statusReducer'
import functionReducer from './functionReducer'
import adminFunctionReducer from './adminFunctionReducer'
import categoryReducer from './categoryReducer'
import domainReducer from './domainReducer'
import adminDomainReducer from './adminDomainReducer'
import roleReducer from './roleReducer'
import adminRoleReducer from './adminRoleReducer'
import roleOfGroupReducer from './roleOfGroupReducer'
import userReducer from './userReducer'
import researchGroupReducer from './researchGroupReducer'
import adminResearchGroupReducer from './adminResearchGroupReducer';
import faqReducer from './faqReducer'
import adminFaqReducer from './adminFaqReducer'
import aboutReducer from './aboutReducer'
import adminAboutReducer from './adminAboutReducer'
import contactReducer from './contactReducer'
import adminContactReducer from './adminContactReducer'
import customerContactReducer from './customerContactReducer'
import adminCustomerContactReducer from './adminCustomerContactReducer'

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    levels: levelDevelopmentReducer,
    fields: fieldReducer,
    projects: projectsReducer,
    researcherProjects: researcherProjectsReducer,
    adminProjects: adminProjectsReducer,
    projectsDetail: projectsDetailReducer,
    tempProject: tempProjectsDetailReducer,
    streams: streamsReducer,
    transmissions: transmissionMethodReducer,
    load: loadReducer,
    blockNavigation: blockNavigationReducer,
    status: statusReducer,
    functions: functionReducer,
    adminFunctions: adminFunctionReducer,
    categories: categoryReducer,
    domains: domainReducer,
    adminDomains: adminDomainReducer,
    roles: roleReducer,
    adminRoles: adminRoleReducer,
    rolesOfGroup: roleOfGroupReducer,
    users: userReducer,
    adminResearchGroups: adminResearchGroupReducer,
    researchGroups: researchGroupReducer,
    faqs: faqReducer,
    adminFaqs: adminFaqReducer,
    abouts: aboutReducer,
    adminAbouts: adminAboutReducer,
    contacts: contactReducer,
    adminContacts: adminContactReducer,
    customerContacts: customerContactReducer,
    adminCustomerContacts: adminCustomerContactReducer
});

