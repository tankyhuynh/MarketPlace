/* eslint-disable import/no-anonymous-default-export */
import { BLOCK_NAVIGATION, UNBLOCK_NAVIGATION } from '../actions/types';

const INITIAL_STATE = {
    isBlock: false
};



export default (state = INITIAL_STATE, action) => {
    // eslint-disable-next-line default-case

    Object.assign(state.isBlock, state.isBlock);

    switch (action.type) {
        case BLOCK_NAVIGATION:
            return { 
                ...state, 
                isBlock : true
            };
        case UNBLOCK_NAVIGATION:
            return { 
                ...state, 
                isBlock : false
            };
        default:
            return state;
    }
} 