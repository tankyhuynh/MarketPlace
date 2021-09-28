import categories from '../apis/category';
import { CATEGORY_URL } from '../environments/constraints';

import {
  FETCH_CATEGORIES,
    
} from './types';


//------ LevelDevelopments --------
export const fetchCategories = () => async dispatch => {
  const response = await categories.get(CATEGORY_URL);
  console.log('levelDevelopments:', response.data);

  dispatch({ type: FETCH_CATEGORIES, payload: response.data });
};


//------ End LevelDevelopments --------