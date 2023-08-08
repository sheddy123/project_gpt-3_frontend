import { Course_Url } from "@/utils/Constants/ApiConstants/api_constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCourseService = createAsyncThunk(
  "users/Course/getAllCourses",
  async (_, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.get(Course_Url, {
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

export const deleteCourseService = createAsyncThunk(
  "users/Course/deleteCourse",
  async (props: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await axios.delete(
        `${Course_Url}${import.meta.env.VITE_DELETE_COURSE_URL}/${props}`,
        {
          withCredentials: true,
          signal,
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

export const getCourseQuizDetailsService = createAsyncThunk(
  "users/Course/getCourseQuizDetails",
  async (props: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await axios.get(
        `${Course_Url}${import.meta.env.VITE_COURSE_QUIZ_DETAILS_URL}/${props}`,
        {
          withCredentials: true,
          signal,
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

export const createCourseService = createAsyncThunk(
  "users/Course/createCourse",
  async (props: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await axios.post(
        `${Course_Url}${import.meta.env.VITE_CREATE_COURSE_URL}`,
        {
          title: props.title,
          languages: props.languages,
          captions: props.captions === "Yes",
          version: props.version,
          description: props.description,
          course_code: props.course_code,
        },
        {
          withCredentials: true,
          signal,
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

export const editCourseService = createAsyncThunk(
  "users/Course/editCourse",
  async (props: any, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;
    try {
      const response = await axios.patch(
        `${Course_Url}${import.meta.env.VITE_UPDATE_COURSE_URL}`,
        {
          title: props.title,
          languages: props.languages,
          captions: props.captions === "Yes",
          version: props.version,
          description: props.description,
          course_code: props.course_code,
          courseId: props.courseId,
        },
        {
          withCredentials: true,
          signal,
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
