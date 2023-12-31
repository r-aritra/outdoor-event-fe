/**
 * Generated by orval v6.23.0 🍺
 * Do not edit manually.
 * Outdoor Event Booking API
 * OpenAPI spec version: 1.0.0
 */
export interface Ok {
  code: number;
  message: string;
}

export interface DataNotFound {
  code: number;
  message: string;
}

export interface OTPExpired {
  code: number;
  message: string;
}

export interface OTPNotValid {
  code: number;
  message: string;
}

export interface DataAlreadyExists {
  code: number;
  message: string;
}

export interface UserCreated {
  code: number;
  message: string;
}

export interface OTPValidate {
  code: number;
  message: string;
}

export type LoginData = {
  access_token: string;
  refresh_token: string;
};

export interface Login {
  code: number;
  data: LoginData;
  message: string;
}

export interface ValidateOTPRequest {
  device_id: string;
  email: string;
  otp: string;
}

export interface SendOTPRequest {
  device_id: string;
  email: string;
}

export interface LoginRequest {
  device_id: string;
  device_type: string;
  email: string;
  password: string;
}

export interface VerifyUserRequest {
  email: string;
}

export interface UserRequest {
  email: string;
  name: string;
  password: string;
}
