import { useQuery, UseQueryOptions } from 'react-query';
import { QueryKeyEnum } from 'common/enum';
import { getAuthProfile } from 'api/auth';
import { IGetUserById, getUserById } from 'api/user';
import { notification } from 'antd';

const QUERY_API: { [key in QueryKeyEnum]: (x: any) => Promise<any> } = {
  [QueryKeyEnum.GET_AUTH_PROFILE]: getAuthProfile,
  [QueryKeyEnum.GET_USER_BY_ID]: getUserById,
};

type ConditionalUseCustomQuery<T extends QueryKeyEnum> = T extends QueryKeyEnum.GET_USER_BY_ID
  ? IBaseUseCustomQuery<T> & { apiPayload: IGetUserById }
  : IBaseUseCustomQuery<T> & { apiPayload?: undefined };

interface IBaseUseCustomQuery<T extends QueryKeyEnum> {
  queryKey: T;
  dependentQueries?: any[];
  options?: Omit<UseQueryOptions<unknown, unknown, unknown, any[]>, 'queryKey' | 'queryFn'> | undefined;
}

export const useCustomQuery = <T extends QueryKeyEnum>(payload: ConditionalUseCustomQuery<T>) => {
  const { queryKey, dependentQueries = [], apiPayload = {}, options = {} } = payload;
  const queryFn = QUERY_API[queryKey];
  return useQuery([queryKey, ...dependentQueries], () => queryFn(apiPayload), {
    onSuccess() {
      notification.info({ message: `[${queryKey}] successfully` });
    },
    onError: (error: any) => {
      notification.error({ message: error?.message });
    },
    refetchOnMount: false,
    retryOnMount: false,
    refetchOnWindowFocus: false,
    ...options,
  });
};
