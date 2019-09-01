
import { all } from 'redux-saga/effects'
import { watcher as recipesWatcher } from "../models/recipes"

export default function* rootSaga() {
    yield all([
      recipesWatcher()
    ])
}  