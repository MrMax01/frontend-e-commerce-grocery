import { combineReducers, configureStore } from "@reduxjs/toolkit";

import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import tokenAuthReducer from "../reducer/tokenAuthReducer";
import meReducer from "../reducer/me";
import productsReducer from "../reducer/productsReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userToken"],
};

const rootReducer = combineReducers({
  userToken: tokenAuthReducer,
  me: meReducer,
  products: productsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
