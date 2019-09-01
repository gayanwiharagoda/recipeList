import { combineReducers } from "redux";
import { reducer as recipesReducer } from "../models/recipes";

export default combineReducers({
  recipes: recipesReducer
});
