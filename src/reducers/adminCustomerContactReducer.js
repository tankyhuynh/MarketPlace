import _ from 'lodash';

import { 
    FETCH_CUSTOMER_CONTACTS_ADMIN,
    FETCH_CUSTOMER_CONTACT_ADMIN,
    CREATE_CUSTOMER_CONTACT_ADMIN,
    EDIT_CUSTOMER_CONTACT_ADMIN,
    DELETE_CUSTOMER_CONTACT_ADMIN,

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_CUSTOMER_CONTACTS_ADMIN:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_CUSTOMER_CONTACT_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_CUSTOMER_CONTACT_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_CUSTOMER_CONTACT_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_CUSTOMER_CONTACT_ADMIN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}