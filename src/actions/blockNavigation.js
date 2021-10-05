
import {
    BLOCK_NAVIGATION,
    UNBLOCK_NAVIGATION
    
  } from './types';

export const block_navigation = () => {
  return {
    type: BLOCK_NAVIGATION
  };
};
export const unblock_navigation = () => {
  return {
    type: UNBLOCK_NAVIGATION
  };
};