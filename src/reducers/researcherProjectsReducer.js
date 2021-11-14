import _ from 'lodash';

import { 
    FETCH_RESEARCHER_PROJECTS,
    CLEAR_RESEARCHER_PROJECTS

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_RESEARCHER_PROJECTS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        // case FETCH_PROJECT:
        //     return { ...state, [action.payload.id]: action.payload } ;
        // case CREATE_PROJECT:
        //     return { ...state, [action.payload.id]: action.payload } ;
        // case EDIT_PROJECT:
        //     return { ...state, [action.payload.id]: action.payload } ;
        // case DELETE_PROJECT:
        //     return _.omit(state, action.payload);
        case CLEAR_RESEARCHER_PROJECTS:
            return {};
        default:
            return state;
    }
}