import _ from 'lodash';

import { 
    FETCH_DOMAINS,
    
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_DOMAINS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        default:
            return state;
    }
}