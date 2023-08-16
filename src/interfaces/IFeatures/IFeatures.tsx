import { FieldType } from "@/utils/Constants/ApiConstants/api_constants";
import { IToolbarSettings } from "@syncfusion/ej2-react-richtexteditor";

/************************************ Authentication/Authorization ************************************/
export interface IAuth {
  message: string;
  auth_response: IAuthResponse;
  studentProgress: StudentProgress[];
  studentProgressIsLoading:boolean;
  studentLogTime:object;
  highestScorers:object;
  getHighestScorersIsLoading: boolean;
}

export interface ILogin {
  code: string;
  provider: string;
}

export interface StudentProgress {
  name: string;
  levels: string[];
  questionsPerLevel: number;
  questionsTaken: QuestionsTaken;
  percentageProgress?: string;
}

export interface QuestionsTaken{
  easy: number;
  medium: number;
  difficult: number;
}

export interface IAuthResponse {
  isLoading: boolean;
  code: string;
  access_failed_count: string;
  email: string;
  locked_out_enabled: string;
  lockout_end: string;
  normalized_email: string;
  image_url: string;
  normalized_username: string;
  phone_number: string;
  security_stamp: string;
  user_name: string;
  twoFactorEnabled: string;
  roles: IRoles[];
  token: string;
  refresh_token: string;
  refresh_token_expiry_time: string;
}

export interface IRoles {
  id: number;
  roleName: string;
}
/************************************ Authentication/Authorization ************************************/

/************************************ Code Executor ************************************/
export interface ICodeExecutor {
  language: string;
  code: string;
}

export interface ICodeResponse {
  response: object;
  timeTaken: number;
}
/************************************ Code Executor ************************************/

/************************************ GeoLocation/Profile ************************************/
export interface IGeoLocation {
  ip: string;
  network: string;
  version: string;
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: string;
  postal: string;
  latitude: string;
  longitude: string;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: string;
  country_population: string;
  asn: string;
  org: string;
}
/************************************ GeoLocation/Profile ************************************/

/************************************ Courses ************************************/
export interface ICourse {
  courseCode: string;
  title: string;
  languages: string;
  captions: string;
  version: string;
  description: string;
}
/************************************ Courses ************************************/

/************************************ Dynamic Form ************************************/
export interface FormFieldDescriptions {
  description_h2: string;
  description_paragraph: string;
  fields: FormField[];
}
export interface ISelectOptions {
  id: string | number;
  value: string | number;
}
export interface FormField {
  name: string;
  type: FieldType;
  required: boolean;
  options: ISelectOptions[]; // For select and radio inputs
  label: string; // For checkbox input
  toolbarSettings?: IToolbarSettings;
  value?: string;
  addMore?: boolean;
}

export interface DynamicFormProps {
  formFields: FormFieldDescriptions;
  onSubmit: (formData: { [key: string]: string | boolean | string[] }) => void;
  isLoading: boolean;
  initialValues?: { [key: string]: string | boolean | string[] };
  currentMode?: string;
}
/************************************ Dynamic Form ************************************/

/************************************ StudentCourseQuizById ************************************/

export interface IStudentCourseQuizById {
  courseQuizDetailsDto: ICourseQuizDetailsDto;
  courseQuizDetailsDtoList: ICourseQuizDetailsDto[];
  difficultyLevel: string[];
  totalQuestions: number;
  totalPracticeTests: number;
  questionType: string[];
  title: string[];
  language: string[];
}
/************************************ StudentCourseQuizById ************************************/

/************************************ CourseQuizDetailsDto ************************************/
export interface ICourseQuizDetailsDto {
  courseId: string;
  caption: string;
  courseCode: string;
  courseDescription: string;
  courseLanguages: string;
  courseTitle: string;
  courseVersion: string;
  difficultyLevel: string;
  practiceTests: string;
  dateCreated: string;
  maxStatus: string;
  statusText: string;
  questionType: string;
  language: string;
}
/************************************ CourseQuizDetailsDto ************************************/

/************************************ ICourseRealtedQuestions ************************************/
export interface ICourseRealtedQuestions {
  course_id: number;
  question: string;
  options: string;
  date_created: string;
}
/************************************ ICourseRealtedQuestions ************************************/