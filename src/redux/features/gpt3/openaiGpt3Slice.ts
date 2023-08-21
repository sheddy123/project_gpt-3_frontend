import { TextCompletionResponse } from "@/interfaces/IFeatures/IFeatures";
import {
  createHybridGpt3Service,
  postHybridGpt3Service,
} from "@/services/api/OpenAiGpt3Service/openAiGpt3Service";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TextCompletionResponse = {
  warning: "",
  id: "",
  object: "",
  created: 0,
  model: "",
  choices: [{ text: "", index: 0, logprobs: null, finish_reason: "" }],
  usage: { prompt_tokens: 0, completion_tokens: 0, total_tokens: 0 },
  isLoading: false,
  status: "",
};

const openaiGpt3Slice = createSlice({
  name: "openaiGpt3",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //createHybridGpt3Service
      .addCase(createHybridGpt3Service.fulfilled, (state, action) => {
        console.log("Action payload from gpt3", action.payload);
        state.warning = action.payload?.warning;
        state.id = action.payload?.id;
        state.object = action.payload?.object;
        state.created = action.payload?.created;
        state.model = action.payload?.model;
        state.choices = action.payload?.choices;
        state.usage = action.payload?.usage;
      })
      //postHybridGpt3Service
      .addCase(postHybridGpt3Service.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postHybridGpt3Service.fulfilled, (state, action) => {
        console.log("Action payload from server", action.payload);
        state.status = action.payload;
      })
      .addCase(postHybridGpt3Service.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
//export const { clearGeoLocation, getGeoLocation } = openaiGpt3Slice.actions;

export default openaiGpt3Slice.reducer;
