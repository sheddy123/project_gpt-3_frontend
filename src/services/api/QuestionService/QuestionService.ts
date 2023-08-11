import { Questions_Url } from "@/utils/Constants/ApiConstants/api_constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const getQuestionService = createAsyncThunk(
  "users/Question/getAllQuestions",
  async (_, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.get(Questions_Url, {
        withCredentials: true,
        signal,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Your error message");
    } finally {
      controller.abort();
    }
  }
);

export const getCourseDopdownListsService = createAsyncThunk(
  "users/Questions/getCourseDopdownLists",
  async (_, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await toast.promise(
        new Promise((resolve, reject) => {
          axios
            .get(
              `${Questions_Url}${
                import.meta.env.VITE_COURSE_DROPDOWN_LISTS_URL
              }`,
              {
                withCredentials: true,
                signal,
              }
            )
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        }),
        {
          loading: "Loading...",
          success: "Data fetched successfully",
          error: (err) =>
            err?.response?.data?.msg ?? "Server is down, please try again",
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Server is down, please try again");
    } finally {
      controller.abort();
    }
  }
);

export const deletetQuestionService = createAsyncThunk(
  "users/Question/deleteQuestion",
  async (props: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await toast.promise(
        new Promise((resolve, reject) => {
          axios
            .delete(
              `${Questions_Url}${
                import.meta.env.VITE_DELETE_QUESTION_URL
              }/${props}`,
              {
                withCredentials: true,
                signal,
              }
            )
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        }),
        {
          loading: "Loading...",
          success: "Question deleted successfully",
          error: (err) =>
            err?.response?.data?.msg ?? "Server is down, please try again",
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Your error message");
    } finally {
      controller.abort();
    }
  }
);

export const createQuestionService = createAsyncThunk(
  "users/Question/createQuestion",
  async (props: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await toast.promise(
        new Promise((resolve, reject) => {
          axios
            .post(
              `${Questions_Url}${import.meta.env.VITE_CREATE_QUESTION_URL}`,
              props,
              {
                withCredentials: true,
                signal,
              }
            )
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        }),
        {
          loading: "Loading...",
          success: "Question saved successfully",
          error: (err) =>
            err?.response?.data?.msg ?? "Server is down, please try again",
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Your error message");
    } finally {
      controller.abort();
    }
  }
);

export const editQuestionService = createAsyncThunk(
  "users/Question/editQuestion",
  async (props: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await toast.promise(
        new Promise((resolve, reject) => {
          axios
            .patch(
              `${Questions_Url}${import.meta.env.VITE_UPDATE_QUESTION_URL}`,
              props,
              {
                withCredentials: true,
                signal,
              }
            )
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        }),
        {
          loading: "Loading...",
          success: "Question updated successfully",
          error: (err) =>
            err?.response?.statusText ?? "Server is down, please try again",
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err?.response?.data);
    } finally {
      controller.abort();
    }
  }
);

export const gradeStudentQuizService = createAsyncThunk(
  "users/Question/gradeStudentQuiz",
  async (props: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await toast.promise(
        new Promise((resolve, reject) => {
          axios
            .post(
              `${Questions_Url}${import.meta.env.VITE_GRADE_STUDENT_QUIZ_URL}`,
              props,
              {
                withCredentials: true,
                signal,
              }
            )
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        }),
        {
          loading: "Loading...",
          success: "Scores graded successfully",
          error: (err) =>
            err?.response?.data?.msg ?? "Server is down, please try again",
        }
      );

      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Your error message");
    } finally {
      controller.abort();
    }
  }
);
