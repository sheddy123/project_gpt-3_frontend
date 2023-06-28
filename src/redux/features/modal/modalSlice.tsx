import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalReducer = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
    },
    closeModal: (state, action) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalReducer.actions;

export default modalReducer.reducer;
