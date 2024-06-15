import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id_Order: "",
  driver_id: 0,
  status: 0,
  takeAt: "",
  confirmAt: "",
  deleteAt: "",
  onReceive: "",
  key: "",
  orderImage: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    updateOrder: (state, action) => {
      return { ...state, ...action.payload };
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
    updateKey: (state, action) => {
      state.key = action.payload;
    },
    updateImage: (state, action) => {
      state.orderImage = action.payload;
    },
    clearOrder: () => {
      return initialState;
    },
  },
});

export const { updateOrder, updateStatus, updateKey, clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
