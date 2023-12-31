import {
  createQuestionService,
  deletetQuestionService,
  editQuestionService,
  getCourseDopdownListsService,
  getQuestionService,
  gradeStudentQuizService,
} from "@/services/api/QuestionService/QuestionService";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  courseDopdownListsData: [],
  createQuestionsResponse: '',
  studentPerformance:{}
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //getQuestionService
      .addCase(getQuestionService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getQuestionService.fulfilled, (state, action) => {
        state.isLoading = true;
        state.data = action.payload;
      })
      .addCase(getQuestionService.rejected, (state, action) => {
        state.isLoading = false;
      })
      //createQuestionService
      .addCase(createQuestionService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createQuestionService.fulfilled, (state, action) => {
        state.isLoading = true;
        state.createQuestionsResponse = action.payload;
      })
      .addCase(createQuestionService.rejected, (state, action) => {
        state.isLoading = false;
        state.createQuestionsResponse = action.payload as string;
      })
      //gradeStudentQuizService
      .addCase(gradeStudentQuizService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(gradeStudentQuizService.fulfilled, (state, action) => {
        state.isLoading = true;
        state.studentPerformance = action.payload;
      })
      .addCase(gradeStudentQuizService.rejected, (state, action) => {
        state.isLoading = false;
      })
      //updateQuestionService
      .addCase(editQuestionService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editQuestionService.fulfilled, (state, action) => {
        state.isLoading = true;
        state.createQuestionsResponse = action.payload;
      })
      .addCase(editQuestionService.rejected, (state, action) => {
        state.isLoading = false;
        state.createQuestionsResponse = action.payload as string;
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
      //deleteQuestionService
      .addCase(deletetQuestionService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletetQuestionService.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletetQuestionService.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const selectAllQuestions = (state) => state.questionReducer.data;
export const selectCreateQuestionResponse = (state) => state.questionReducer.createQuestionsResponse;
export const selectAddQuestionsResponse = (state) => state.questionReducer.data;
export const selectStudentPerformanceResponse = (state) => state.questionReducer.studentPerformance;
export const selectAllDropdownQuestionFields = (state) =>
  state.questionReducer.courseDopdownListsData;

// Actions
export const {} = questionSlice.actions;
// Reducer
export default questionSlice.reducer;
