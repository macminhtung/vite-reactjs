import { APIService, API_MODULE } from 'api';

// # ====================== #
// # ==> GET USER BY ID <== #
// # ====================== #
export interface IGetUserById {
  userId: string;
}

export const getUserById = (payload: IGetUserById): Promise<any> => {
  return APIService.get(`${API_MODULE.USER}/${payload.userId}`);
};
