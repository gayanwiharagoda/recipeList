
import { all } from 'redux-saga/effects'
import { watcher as liveMatchesWatcher } from "../models/liveMatches"

export default function* rootSaga() {
    yield all([
      liveMatchesWatcher()
    ])
}  