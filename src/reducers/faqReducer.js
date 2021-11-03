import _ from 'lodash';

import { 
    FETCH_FAQS,
    FETCH_FAQ,
    CREATE_FAQ,
    EDIT_FAQ,
    DELETE_FAQ

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_FAQS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_FAQ:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_FAQ:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_FAQ:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_FAQ:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}