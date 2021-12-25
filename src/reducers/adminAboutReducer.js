import _ from 'lodash';

import { 
    FETCH_ABOUTS_ADMIN,
    FETCH_ABOUT_ADMIN,
    CREATE_ABOUT_ADMIN,
    EDIT_ABOUT_ADMIN,
    DELETE_ABOUT_ADMIN,

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_ABOUTS_ADMIN:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_ABOUT_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_ABOUT_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_ABOUT_ADMIN:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_ABOUT_ADMIN:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}