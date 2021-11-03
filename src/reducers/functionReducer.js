import _ from 'lodash';

import { 
    FETCH_FUNCTIONS,
    CREATE_FUNCTION,
    EDIT_FUNCTION,
    DELETE_FUNCTION
    
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_FUNCTIONS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case CREATE_FUNCTION:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_FUNCTION:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_FUNCTION:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}