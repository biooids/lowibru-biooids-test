import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice.js";
import userReducer from "./user/userSlice.js";

export const store = configureStore({
  reducer: { theme: themeReducer, user: userReducer },
});
