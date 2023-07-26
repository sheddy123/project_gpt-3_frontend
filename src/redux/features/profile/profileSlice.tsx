import { IProfileModal } from "@/interfaces/ProfileModal/IProfileModal";
import {
  createProfileService,
  getProfileService,
} from "@/services/api/ProfileService/profileService";
import { createSlice } from "@reduxjs/toolkit";

const initialState: IProfileModal = {
  years_of_experience: "",
  level: "",
  profile_summary: "",
  programming_skills: "",
};

const profileSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.years_of_experience = action.payload?.yearsOfExperience;
      state.level = action.payload?.level;
      state.programming_skills = action.payload?.programming_skills;
      state.profile_summary = action.payload?.profile_summary;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProfileService.fulfilled, (state, action) => {
        state.years_of_experience = action.payload?.years_of_experience;
        state.level = action.payload?.level;
        state.programming_skills = action.payload?.programming_skills;
        state.profile_summary = action.payload?.profile_summary;
        state.last_updated = action.payload?.last_updated;
      })
      .addCase(getProfileService.fulfilled, (state, action) => {
        state.years_of_experience = action.payload?.years_of_experience;
        state.level = action.payload?.level;
        state.programming_skills = action.payload?.programming_skills;
        state.last_updated = action.payload?.last_updated;
        state.profile_summary = action.payload?.profile_summary;
      });
  },
});

export const { updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
