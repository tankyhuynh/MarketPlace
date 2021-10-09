import _ from 'lodash';

import { 
    FETCH_ROLES,
    FETCH_ROLE,
    CREATE_ROLE,
    EDIT_ROLE

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_ROLES:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_ROLE:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_ROLE:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_ROLE:
            return { ...state, [action.payload.id]: action.payload } ;
        default:
            return state;
    }
}