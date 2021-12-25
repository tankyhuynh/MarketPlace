import _ from 'lodash';

import { 
    FETCH_RESEARCH_GROUPS_ADMIN,
    FETCH_RESEARCH_GROUP_ADMIN,
    CREATE_RESEARCH_GROUP_ADMIN,
    EDIT_RESEARCH_GROUP_ADMIN,
    DELETE_RESEARCH_GROUP_ADMIN

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_RESEARCH_GROUPS_ADMIN:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_RESEARCH_GROUP_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_RESEARCH_GROUP_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_RESEARCH_GROUP_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_RESEARCH_GROUP_ADMIN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}