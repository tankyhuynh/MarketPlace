import _ from 'lodash';

import { 
    FETCH_CUSTOMER_CONTACTS,
    FETCH_CUSTOMER_CONTACT,
    CREATE_CUSTOMER_CONTACT,
    EDIT_CUSTOMER_CONTACT,
    DELETE_CUSTOMER_CONTACT,

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_CUSTOMER_CONTACTS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_CUSTOMER_CONTACT:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_CUSTOMER_CONTACT:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_CUSTOMER_CONTACT:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_CUSTOMER_CONTACT:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}