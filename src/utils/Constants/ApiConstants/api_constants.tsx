export const BaseUrl = import.meta.env.VITE_API_BASE_URL;
export const AUTH_TOKEN = "/";
export const Login_Url = BaseUrl + import.meta.env.VITE_LOGIN;
export const Logout_Url = BaseUrl + import.meta.env.VITE_LOGOUT;
export const Create_Profile_Url = BaseUrl + import.meta.env.VITE_CREATE_PROFILE_URL;
export const Get_Profile_Url = BaseUrl + import.meta.env.VITE_PROFILE_URL;
export const Course_Url = BaseUrl + import.meta.env.VITE_COURSE_URL;

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
  RichText = "richText"
}
export enum FieldLabel {
  Course = "Course",
  Difficulty = "Difficulty",
  solution_Type = "Solution_Type",
  Optional_fields = "Optional_fields",
  Answer = "Answer",
  question_Type = "Question_Type",
  Question = "Question",
  Options = "Options"
}
export enum FieldName {
  Course = "Course",
  Difficulty = "Difficulty",
  SolutionType = "Solution Type",
  OptionalFields = "Optional fields",
  Answer = "Answer",
  QuestionType = "Question Type",
  Question = "Question",
  MultipleOptions = "Multiple Options",
}
