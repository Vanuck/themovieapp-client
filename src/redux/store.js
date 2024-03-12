import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./slices/movies.js";
import userReducer from "./slices/user.js";

export const store = configureStore({
  reducer: { movies: movieReducer, user: userReducer },
});
