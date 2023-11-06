import { APIService, API_MODULE } from 'api';

// # =============== #
// # ==> SIGN-IN <== #
// # =============== #
export interface ISignInPayload {
  email: string;
  password: string;
}

export const signIn = (payload: ISignInPayload): Promise<any> => {
  return APIService.post(`${API_MODULE.AUTH}/sign-in`, payload);
};

// # =============== #
// # ==> SIGN-UP <== #
// # =============== #
export interface ISignUpPayload {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export const signUp = (payload: ISignUpPayload): Promise<any> => {
  return APIService.post(`${API_MODULE.AUTH}/sign-up`, payload);
};

// # ======================== #
// # ==> GET AUTH PROFILE <== #
// # ======================== #
export const getAuthProfile = (): Promise<any> => {
  return APIService.get(`${API_MODULE.AUTH}/profile`);
};
