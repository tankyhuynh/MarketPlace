/* eslint-disable import/no-anonymous-default-export */
import { SIGN_IN, SIGN_OUT } from '../actions/types';

const userDataLocalStorage = localStorage.getItem("userData");
const user = JSON.parse(userDataLocalStorage);
console.log('SIGN_IN', user)

const INITIAL_STATE = {
    isSignedIn: user ? true : false,
    userId: user ? user.id : null,
    fullName: user ? user.fullName : null,
    userProfile: user ? user : null
};



export default (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case SIGN_IN:
            return { 
                ...state, 
                isSignedIn: true,
                userId: action.payload.id, 
                fullName: action.payload.fullName,
                userProfile: action.payload 
            };
        case SIGN_OUT:
            return { 
                ...state, 
                isSignedIn: false, 
                userId: null,
                fullName: null,
            };
        default:
            return state;
    }
} 