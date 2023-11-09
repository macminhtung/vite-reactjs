import { useMutation, UseMutationOptions } from 'react-query';
import { MutationKeyEnum } from 'common/enum';
import { ISignInPayload, signIn, ISignUpPayload, signUp } from 'api/auth';
import { notification } from 'antd';

const MUTATION_API: { [key in MutationKeyEnum]: (x: any) => Promise<any> } = {
  [MutationKeyEnum.SIGNIN]: signIn,
  [MutationKeyEnum.SIGNUP]: signUp,
};

type ConditionalApiPayload<T extends MutationKeyEnum> = T extends MutationKeyEnum.SIGNIN
  ? ISignInPayload
  : T extends MutationKeyEnum.SIGNUP
  ? ISignUpPayload
  : undefined;

interface IUseCustomMutation<T extends MutationKeyEnum> {
  mutationKey: T;
  options?: Omit<UseMutationOptions<unknown, unknown, unknown, unknown>, 'mutationKey' | 'mutationFn'> | undefined;
}

export const useCustomMutation = <T extends MutationKeyEnum>(payload: IUseCustomMutation<T>) => {
  const { mutationKey, options = {} } = payload;
  const mutationFn = MUTATION_API[mutationKey];
  return useMutation(mutationKey, (payload: ConditionalApiPayload<T>) => mutationFn(payload), {
    onSuccess: () => {
      notification.success({ message: `[${mutationKey}] successfully` });
    },
    onError: (error: any) => {
      notification.error({ message: error?.message });
    },
    ...options,
  });
};
