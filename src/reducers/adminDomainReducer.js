import _ from 'lodash';

import { 
    FETCH_DOMAINS_ADMIN,
    FETCH_DOMAIN_ADMIN,
    CREATE_DOMAIN_ADMIN,
    EDIT_DOMAIN_ADMIN,
    DELETE_DOMAIN_ADMIN
    
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_DOMAINS_ADMIN:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_DOMAIN_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_DOMAIN_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_DOMAIN_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_DOMAIN_ADMIN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}