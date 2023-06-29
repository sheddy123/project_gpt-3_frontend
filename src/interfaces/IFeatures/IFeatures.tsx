export interface IAuth {
  message: string;
  auth_response: IAuthResponse;
}
export interface IAuthResponse {
  isLoading: boolean;
  code: string;
  access_failed_count: string;
  email: string;
  locked_out_enabled: string;
  lockout_end: string;
  normalized_email: string;
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
