import _ from 'lodash';

import { 
    FETCH_FUNCTIONS_ADMIN,
    CREATE_FUNCTION_ADMIN,
    EDIT_FUNCTION_ADMIN,
    DELETE_FUNCTION_ADMIN
    
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_FUNCTIONS_ADMIN:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case CREATE_FUNCTION_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_FUNCTION_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_FUNCTION_ADMIN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}