import { createAction, createReducer } from "redux-act";
import { put, takeEvery, call } from "redux-saga/effects";

import { getLiveMatches } from "../services/liveMatches";

// Actions
export const fetchUpcomingMatchesAction = createAction(
  "[upcomingMatches][fetching] fetch upcoming matches"
);
export const fetchUpcomingMatchesSuccessAction = createAction(
  "[upcomingMatches][fetchSuccess] fetch upcoming matches success"
);
export const fetchUpcomingMatchesFailedAction = createAction(
  "[upcomingMatches][fetchFailed] fetch upcoming matches failed"
);

const defaultState = {
  upcomingMatches: [],
  error: undefined
};

// Reducer
export const reducer = createReducer(
  {
    [fetchUpcomingMatchesSuccessAction]: (state, upcomingMatches) => ({
      ...state,
      upcomingMatches
    }),
    [fetchUpcomingMatchesFailedAction]: (state, error) => ({
      ...state,
      error
    })
  },
  defaultState
);

export function* fetchUpcomingMatchesSaga() {
  try {
    const response = yield call(getLiveMatches);
    // save match list when services success
    yield put(fetchUpcomingMatchesSuccessAction(response.liveEvents));
  } catch (e) {
    // save error object when error happened in the data fetching
    yield put(fetchUpcomingMatchesFailedAction(e));
  }
}

export function* watcher() {
  yield takeEvery(fetchUpcomingMatchesAction, fetchUpcomingMatchesSaga);
}
