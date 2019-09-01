import { createAction, createReducer } from "redux-act";
import { put, takeEvery, call } from "redux-saga/effects";

import { getRecipes } from "../services/recipes";

// Actions
export const fetchRecipeListAction = createAction(
  "[recipe][fetching] fetch recipe list"
);
export const fetchRecipeListSuccessAction = createAction(
  "[recipe][fetchSuccess] fetch recipe list success"
);
export const fetchRecipeListFailedAction = createAction(
  "[recipe][fetchFailed] fetch recipe list failed"
);

const defaultState = {
  recipeList: [],
  error: undefined
};

// Reducer
export const reducer = createReducer(
  {
    [fetchRecipeListSuccessAction]: (state, recipeList) => ({
      ...state,
      recipeList
    }),
    [fetchRecipeListFailedAction]: (state, error) => ({
      ...state,
      error
    })
  },
  defaultState
);

export function* fetchRecipeListSaga() {
  try {
    const response = yield call(getRecipes);
    const recipeList = populateRecipeList(response);
    // save recipe list when services success
    yield put(fetchRecipeListSuccessAction(recipeList));
  } catch (e) {
    // save error object when error happened in the data fetching
    yield put(fetchRecipeListFailedAction(e));
  }
}

const mappedTags = (tags = [], entryList = []) => {
  return tags.map(
    ({ sys: { id } }) => entryList.find(entry => entry.sys.id == id).fields.name
  );
};

const populateRecipeList = ({
  items,
  includes: { Asset: asserts, Entry: entries }
}) =>
  items.map(item => {
    const photoId = item.fields.photo.sys.id;
    item.fields.photo = asserts.find(({ sys: { id } }) => id === photoId);
    item.fields.tags = mappedTags(item.fields.tags, entries);

    return item;
  });

export function* watcher() {
  yield takeEvery(fetchRecipeListAction, fetchRecipeListSaga);
}
