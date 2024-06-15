// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 0,
  name: "",
  dob: "",
  gender: 0,
  phone: "",
  vehicle_num: "",
  point: 0,
  status: false,
  isAuto: false,
  avatar: "",
  key: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUser: () => initialState,
  },
});

export const { setUser, updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
