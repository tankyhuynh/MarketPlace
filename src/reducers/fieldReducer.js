import _ from 'lodash';

import { 
    FETCH_FIELDS,
    FETCH_FIELD,
    CREATE_FIELD,
    EDIT_FIELD,

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_FIELDS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_FIELD:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_FIELD:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_FIELD:
            return { ...state, [action.payload.id]: action.payload } ;
        default:
            return state;
    }
}