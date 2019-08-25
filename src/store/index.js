import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from "./rootReducer";
import rooSaga from "./rootSagas";

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)




export const sagaMiddleware = createSagaMiddleware();

export const store =  createStore(
  persistedReducer,
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

export const persistor = persistStore(store)

sagaMiddleware.run(rooSaga);
