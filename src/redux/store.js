import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./reducers/BooksSlice";

const rootReducer = combineReducers({
  booksReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
