export const BaseUrl = import.meta.env.VITE_API_BASE_URL;
export const AUTH_TOKEN = "/";
export const Login_Url = BaseUrl + import.meta.env.VITE_LOGIN;
export const Student_Progress_Url = BaseUrl + import.meta.env.VITE_STUDENT_PROGRESS_URL;
export const Student_Log_Time_Url = BaseUrl + import.meta.env.VITE_STUDENT_LOG_TIME_URL;
export const Highest_Performing_Scorers_Url = BaseUrl + import.meta.env.VITE_GET_HIGHEST_PERFORMING_SCORERS_URL;
export const Logout_Url = BaseUrl + import.meta.env.VITE_LOGOUT;
export const Create_Profile_Url =
  BaseUrl + import.meta.env.VITE_CREATE_PROFILE_URL;
export const Get_Profile_Url = BaseUrl + import.meta.env.VITE_PROFILE_URL;
export const Course_Url = BaseUrl + import.meta.env.VITE_COURSE_URL;
export const Questions_Url = BaseUrl + import.meta.env.VITE_QUESTIONS_URL;

export const ROLES = {
  Administrator: "Admin",
  Instructor: "Instructor",
  Student: "Student",
};

export enum FieldType {
  Input = "input",
  TextArea = "textArea",
  Select = "select",
  Radio = "radio",
  Checkbox = "checkbox",
  RichText = "richText",
}
export enum FieldLabel {
  Course = "Course",
  Difficulty = "Difficulty",
  solution_Type = "Solution_Type",
  Optional_fields = "Optional_fields",
  Answer = "Answer",
  Feedback = "Feedback",
  question_Type = "Question_Type",
  Question = "Question",
  Language = "Language",
  Options = "Options",
  QuestionId = "QuestionId",
}
export enum FieldName {
  Course = "Course",
  Difficulty = "Difficulty",
  SolutionType = "Solution Type",
  OptionalFields = "Optional fields",
  Answer = "Answer",
  Feedback = "Feedback",
  QuestionType = "Question Type",
  Question = "Question",
  Language = "Language",
  MultipleOptions = "Multiple Options",
  Options = "Options",
}

export enum CourseStatus {
  Active = "Active",
  Pending = "Pending",
  Completed = "Completed",
}
export enum ApiResponses {
  Saved_Successfully = "Saved Successfully",
}
