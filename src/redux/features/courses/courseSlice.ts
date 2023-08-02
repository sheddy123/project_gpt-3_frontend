import {
  createCourseService,
  getCourseService,
} from "@/services/api/CourseService/CourseService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getCourseService
      .addCase(getCourseService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseService.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCourseService.rejected, (state, action) => {
        state.isLoading = false;
      })
      //createCourseService
      .addCase(createCourseService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCourseService.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCourseService.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Reducer
export default courseSlice.reducer;
