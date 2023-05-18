import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import dataSlice from "../reducers/dataSlice";
import { persistReducer, persistStore } from "redux-persist";
import logger from "redux-logger";
const persistConfig = {
  key: "root",
  storage,

};

const reducer = combineReducers({
  data: dataSlice,
 
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);