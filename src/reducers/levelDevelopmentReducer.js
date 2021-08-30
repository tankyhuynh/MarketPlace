import _ from 'lodash';

import { 
    FETCH_LEVEL_DEVELOPMENTS,
    FETCH_LEVEL_DEVELOPMENT
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_LEVEL_DEVELOPMENTS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_LEVEL_DEVELOPMENT:
            return { ...state, [action.payload.id]: action.payload } ;
        default:
            return state;
    }
}