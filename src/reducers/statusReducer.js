import _ from 'lodash';

import { 
    FETCH_STATUSES,
    FETCH_STATUS,
    CREATE_STATUS,
    EDIT_STATUS,
    DELETE_STATUS
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_STATUSES:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_STATUS:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_STATUS:
            return { ...state, [action.payload.id]: action.payload };
        case EDIT_STATUS:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_STATUS:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}