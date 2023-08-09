import {
  createCourseService,
  deleteCourseService,
  editCourseService,
  getCourseQuizDetailsService,
  getCourseRelatedQuestionService,
  getCourseService,
} from "@/services/api/CourseService/CourseService";
import { createSlice } from "@reduxjs/toolkit";
import { IStudentCourseQuizById } from "@/interfaces/IFeatures/IFeatures";

interface IInitialState {
  isLoading: boolean;
  data: any[]; // You can replace 'any' with the appropriate type
  courseQuizDetails: IStudentCourseQuizById[]; // Assign the interface here
}


const initialState : IInitialState = {
  isLoading: false,
  data: [],
  courseQuizDetails: [],
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
      //getCourseQuizDetailsService
      .addCase(getCourseQuizDetailsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseQuizDetailsService.fulfilled, (state, action) => {
        state.isLoading = true;
        state.courseQuizDetails = action.payload;
      })
      .addCase(getCourseQuizDetailsService.rejected, (state, action) => {
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
export const selectCourseQuizDetals = (state) => state.courseReducer.courseQuizDetails;

// Actions
export const {} = courseSlice.actions;
// Reducer
export default courseSlice.reducer;
