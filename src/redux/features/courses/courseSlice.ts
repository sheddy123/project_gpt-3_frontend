import { getCourseService } from "@/services/api/CourseService/GetCourseService";
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
      .addCase(getCourseService.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCourseService.fulfilled, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCourseService.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Reducer
export default courseSlice.reducer;
