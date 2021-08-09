/* eslint-disable import/no-anonymous-default-export */
import { SIGN_IN, SIGN_OUT } from '../actions/types';

const INITIAL_STATE = {
    isSignedIn: null,
    userId: null,
    username: null
};

export default (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case SIGN_IN:
            return { ...state, isSignedIn: true, userId: action.payload.id, userProfile: action.payload.username };
        case SIGN_OUT:
            return { ...state, isSignedIn: false, userId: null, username: null };
        default:
            return state;
    }
} 