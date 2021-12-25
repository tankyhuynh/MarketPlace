import _ from 'lodash';

import { 
    FETCH_FAQS_ADMIN,
    FETCH_FAQ_ADMIN,
    CREATE_FAQ_ADMIN,
    EDIT_FAQ_ADMIN,
    DELETE_FAQ_ADMIN

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_FAQS_ADMIN:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_FAQ_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_FAQ_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_FAQ_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_FAQ_ADMIN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}