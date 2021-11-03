import _ from 'lodash';

import { 
    FETCH_ABOUTS,
    FETCH_ABOUT,
    CREATE_ABOUT,
    EDIT_ABOUT,
    DELETE_ABOUT,

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_ABOUTS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_ABOUT:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_ABOUT:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_ABOUT:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_ABOUT:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}