import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./Reducer/orderSlice";
import userSlice from "./Reducer/userSlice";

const store = configureStore({
  reducer: {
    orderSlice,
    userSlice,
  },
});

export default store;
