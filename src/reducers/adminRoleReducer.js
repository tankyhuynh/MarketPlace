import _ from 'lodash';

import { 
    FETCH_ROLES_ADMIN,
    FETCH_ROLE_ADMIN,
    CREATE_ROLE_ADMIN,
    EDIT_ROLE_ADMIN,
    DELETE_ROLE_ADMIN

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_ROLES_ADMIN:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_ROLE_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_ROLE_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_ROLE_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_ROLE_ADMIN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}