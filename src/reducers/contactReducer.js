import _ from 'lodash';

import { 
    FETCH_CONTACTS,
    FETCH_CONTACT,
    CREATE_CONTACT,
    EDIT_CONTACT,
    DELETE_CONTACT,

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_CONTACTS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_CONTACT:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_CONTACT:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_CONTACT:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_CONTACT:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}