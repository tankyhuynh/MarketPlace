/* eslint-disable import/no-anonymous-default-export */
import { LOADING, LOADED } from '../actions/types';

const INITIAL_STATE = {
    isLoading: false
};



export default (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line default-case

    Object.assign(state.isLoading, state.isLoading);

    switch (action.type) {
        case LOADING:
            return { 
                ...state, 
                isLoading : true
            };
        case LOADED:
            return { 
                ...state, 
                isLoading : false
            };
        default:
            return state;
    }
} 