import { combineReducers, configureStore } from "@reduxjs/toolkit";
import booksReducer from "./reducers/BooksSlice";
import usersReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
  booksReducer,
  usersReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
