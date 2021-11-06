import _ from 'lodash';

import { 
    FETCH_USERS,
    FETCH_USER,
    CREATE_USER,
    EDIT_USER,
    DELETE_USER

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_USERS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_USER:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_USER:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_USER:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_USER:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}