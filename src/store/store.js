import { configureStore } from "@reduxjs/toolkit";
import fetchDataReducer from "../slice/fetchDataSlice";

const rootReducer = {
  getData: fetchDataReducer,
};

const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
