import _ from 'lodash';

import { 
    FETCH_ROLES_OF_GROUP,
    FETCH_ROLE_OF_GROUP,
    CREATE_ROLES_OF_GROUP,
    EDIT_ROLES_OF_GROUP,

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_ROLES_OF_GROUP:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_ROLE_OF_GROUP:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_ROLES_OF_GROUP:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_ROLES_OF_GROUP:
            return { ...state, [action.payload.id]: action.payload } ;
        default:
            return state;
    }
}