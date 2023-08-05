import {
  createCourseService,
  deletetCourseService,
  editCourseService,
  getCourseDopdownListsService,
  getCourseService,
} from "@/services/api/CourseService/CourseService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  courseDopdownListsData: []
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
      //getCourseDopdownListsService
      .addCase(getCourseDopdownListsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseDopdownListsService.fulfilled, (state, action) => {
        state.courseDopdownListsData = action.payload;
        state.isLoading = true;
      })
      .addCase(getCourseDopdownListsService.rejected, (state, action) => {
        state.isLoading = false;
      })
      //deleteCourseService
      .addCase(deletetCourseService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletetCourseService.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletetCourseService.rejected, (state, action) => {
        state.isLoading = false;
      })
      ;
  },
});
export const selectAllCourses = (state) => state.courseReducer.data;
export const selectAllDropdownCourses = (state) => state.courseReducer.courseDopdownListsData;

// Actions
export const {} = courseSlice.actions;
// Reducer
export default courseSlice.reducer;
