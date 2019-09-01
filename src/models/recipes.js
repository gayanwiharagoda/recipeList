import { createAction, createReducer } from "redux-act";
import { put, takeEvery, call } from "redux-saga/effects";
import get from "lodash.get";

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

const getEntryNameById = (entries = [], id) =>
  id ? entries.find(entry => entry.sys.id == id).fields.name : "";

const mappedTags = (tags = [], entries = []) => {
  return tags.map(({ sys: { id } }) => getEntryNameById(entries, id));
};

const populateRecipeList = ({
  items,
  includes: { Asset: asserts, Entry: entries }
}) =>
  items.map(item => {
    const photoId = item.fields.photo.sys.id;
    // photo is required
    item.fields.photo = asserts.find(({ sys: { id } }) => id === photoId);
    // tags are optional
    item.fields.tags = mappedTags(item.fields.tags, entries);
    // chef is optional
    item.fields.chef = getEntryNameById(
      entries,
      get(item, "fields.chef.sys.id", "")
    );

    return item;
  });

export function* watcher() {
  yield takeEvery(fetchRecipeListAction, fetchRecipeListSaga);
}
