import _ from 'lodash';

import { 
    FETCH_DOMAINS,
    FETCH_DOMAIN,
    CREATE_DOMAIN,
    EDIT_DOMAIN,
    DELETE_DOMAIN,
    
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_DOMAINS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_DOMAIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_DOMAIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_DOMAIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_DOMAIN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}