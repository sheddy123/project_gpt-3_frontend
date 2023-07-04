import { ICodeExecutor, ICodeResponse } from "@/interfaces/IFeatures/IFeatures";
import { appAxiosInstance } from "@/utils/Helpers/axios_config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

let elapsedTime = 0;
export const executeCode = createAsyncThunk(
  "users/CodeEditor/executeCode",
  async (prop: ICodeExecutor, thunkAPI) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const startTime = performance.now();

      const response = await appAxiosInstance.post(
        `${import.meta.env.VITE_API_BASE_URL}${
          import.meta.env.VITE_CODE_EXECUTOR_URL
        }`,
        { code: prop.code, language: prop.language },
        {
          withCredentials: true,
          signal,
        }
      );
      const endTime = performance.now();
      elapsedTime = endTime - startTime;
      return response.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue("Your error message " + err);
    } finally {
      controller.abort();
    }
  }
);


const initialState: ICodeResponse = {
  response: {},
  timeTaken:0
};

const codeEditorSlice = createSlice({
  name: "code-editor",
  initialState,
  reducers: {
    resetEditorResponse: (state) => {
      state.response = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeCode.pending, (state) => {
        state.response = {};
        state.timeTaken = elapsedTime;
      })
      .addCase(executeCode.fulfilled, (state, action) => {
        state.response = action.payload;
        state.timeTaken = elapsedTime;
      })
      .addCase(executeCode.rejected, (state, action) => {
        state.response = {};
        state.timeTaken = elapsedTime;
      });
  },
});

export const { resetEditorResponse } = codeEditorSlice.actions;

export default codeEditorSlice.reducer;
