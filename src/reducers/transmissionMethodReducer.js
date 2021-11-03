import _ from 'lodash';

import { 
    FETCH_TRANSMISSION_METHODS,
    FETCH_TRANSMISSION_METHOD,
    CREATE_TRANSMISSION_METHOD,
    EDIT_TRANSMISSION_METHOD,
    DELETE_TRANSMISSION_METHOD
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_TRANSMISSION_METHODS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_TRANSMISSION_METHOD:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_TRANSMISSION_METHOD:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_TRANSMISSION_METHOD:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_TRANSMISSION_METHOD:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}