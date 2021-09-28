// import _ from 'lodash';

import { 
    FETCH_PROJECT_DETAIL,
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case FETCH_PROJECT_DETAIL:
            return { ...state, [action.payload.id]: action.payload } ;
        default:
            return state;
    }
}