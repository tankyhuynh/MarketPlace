import categories from '../apis/category';
import categories_Admin from '../apis/category_Admin';
import { CATEGORY_URL, CATEGORY_ADMIN_URL } from '../environments/constraints';

import {
  FETCH_CATEGORIES,
  CREATE_CATEGORY,
  EDIT_CATEGORY
    
} from './types';


//------ LevelDevelopments --------
export const fetchCategories = () => async dispatch => {
  const response = await categories.get(CATEGORY_URL);
  console.log('fetchCategories:', response.data);

  dispatch({ type: FETCH_CATEGORIES, payload: response.data });
};

export const createCategory = (value) => async dispatch => {
  const response = await categories_Admin.post(CATEGORY_ADMIN_URL, value);
  console.log('createCategory:', response.data);

  dispatch({ type: CREATE_CATEGORY, payload: response.data });
};


export const editCategory = (value) => async dispatch => {
  const response = await categories_Admin.put(`${CATEGORY_ADMIN_URL}/${value.id}`, value);
  console.log('editCategory:', response.data);

  dispatch({ type: EDIT_CATEGORY, payload: response.data });
};


//------ End LevelDevelopments --------