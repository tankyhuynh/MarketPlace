import _ from 'lodash';

import { 
    FETCH_RESEARCH_GROUPS,
    FETCH_RESEARCH_GROUP,
    CREATE_RESEARCH_GROUP,
    EDIT_RESEARCH_GROUP,
    DELETE_RESEARCH_GROUP

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_RESEARCH_GROUPS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_RESEARCH_GROUP:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_RESEARCH_GROUP:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_RESEARCH_GROUP:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_RESEARCH_GROUP:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}