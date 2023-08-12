import {
  createCourseService,
  createRelatedCourseRatingsService,
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
  ratingsResponse: string;
}

const initialState: IInitialState = {
  isLoading: false,
  data: [],
  courseQuizDetails: [],
  ratingsResponse: "",
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    resetRatingResponse: (state) => {
      state.ratingsResponse = "";
    },
  },
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
      //deleteCourseService
      .addCase(createRelatedCourseRatingsService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRelatedCourseRatingsService.fulfilled, (state, action) => {
        state.isLoading = true;
        state.ratingsResponse = action.payload;
      })
      .addCase(createRelatedCourseRatingsService.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const selectAllCourses = (state) => state.courseReducer.data;
export const selectRatingsResponse = (state) =>
  state.courseReducer.ratingsResponse;
export const selectCourseQuizDetals = (state) =>
  state.courseReducer.courseQuizDetails;

// Actions
export const {resetRatingResponse} = courseSlice.actions;
// Reducer
export default courseSlice.reducer;
