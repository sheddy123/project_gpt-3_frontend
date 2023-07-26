import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  isConfettiOpen: false, 
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
    openConfetti: (state, action) =>{
      state.isConfettiOpen = true;
    },
    closeConfetti: (state, action) =>{
      state.isConfettiOpen = false;
    }
  },
});

export const { openModal, closeModal,openConfetti,closeConfetti } = modalReducer.actions;

export default modalReducer.reducer;
