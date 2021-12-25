import _ from 'lodash';

import { 
    FETCH_CONTACTS_ADMIN,
    FETCH_CONTACT_ADMIN,
    CREATE_CONTACT_ADMIN,
    EDIT_CONTACT_ADMIN,
    DELETE_CONTACT_ADMIN,

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_CONTACTS_ADMIN:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_CONTACT_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_CONTACT_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_CONTACT_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_CONTACT_ADMIN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}