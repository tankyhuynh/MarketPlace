import _ from 'lodash';

import { 
    FETCH_LEVEL_DEVELOPMENTS,
    FETCH_LEVEL_DEVELOPMENT,
    CREATE_LEVEL_DEVELOPMENT,
    EDIT_LEVEL_DEVELOPMENT,
    DELETE_LEVEL_DEVELOPMENT

} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_LEVEL_DEVELOPMENTS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_LEVEL_DEVELOPMENT:
            return { ...state, [action.payload.id]: action.payload } ;
        case CREATE_LEVEL_DEVELOPMENT:
            return { ...state, [action.payload.id]: action.payload } ;
        case EDIT_LEVEL_DEVELOPMENT:
            return { ...state, [action.payload.id]: action.payload } ;
        case DELETE_LEVEL_DEVELOPMENT:
            return _.omit(state, action.payload);
        default:
            return state;
    }
}