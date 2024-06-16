import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme/themeSlice.js";
import userReducer from "./user/userSlice.js";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer, // Correctly added the user reducer here
  },
});

// Incorrect code: The user reducer should be inside the reducer object
// export const store = configureStore({
//   reducer: { theme: themeReducer },
//   user: userReducer, // This was outside the reducer object
// });
