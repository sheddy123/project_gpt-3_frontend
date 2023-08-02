import { FieldType } from "@/utils/Constants/ApiConstants/api_constants";

/************************************ Authentication/Authorization ************************************/
export interface IAuth {
  message: string;
  auth_response: IAuthResponse;
}

export interface ILogin {
  code: string;
  provider: string;
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
export interface FormField {
  name: string;
  type: FieldType;
  required: boolean;
  options: string[]; // For select and radio inputs
  label: string; // For checkbox input
}

export interface DynamicFormProps {
  formFields: FormFieldDescriptions;
  onSubmit: (formData: { [key: string]: string | boolean }) => void;
}
/************************************ Dynamic Form ************************************/