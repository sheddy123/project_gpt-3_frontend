import {
  createCourseService,
  deleteCourseService,
  editCourseService,
  getCourseService,
} from "@/services/api/CourseService/CourseService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
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
        state.data = action.payload;
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
      })
      //updateCourseService
      .addCase(editCourseService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editCourseService.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(editCourseService.rejected, (state, action) => {
        state.isLoading = false;
      })
      //deleteCourseService
      .addCase(deleteCourseService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCourseService.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCourseService.rejected, (state, action) => {
        state.isLoading = false;
      })
      ;
  },
});
export const selectAllCourses = (state) => state.courseReducer.data;

// Actions
export const {} = courseSlice.actions;
// Reducer
export default courseSlice.reducer;
