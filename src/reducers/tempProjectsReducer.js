// import _ from 'lodash';

import { 
    CREATE_PROJECT_TEMP,
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type){
        case CREATE_PROJECT_TEMP:
            return { ...state, 1: action.payload } ;
        default:
            return state;
    }
}