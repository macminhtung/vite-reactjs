import { useMutation, MutationHookOptions, OperationVariables, NoInfer, TypedDocumentNode } from '@apollo/client';
import { notification } from 'antd';
import type { DocumentNode } from 'graphql/language/ast';
import { ADD_CATEGORY } from 'gql';

export enum MutationKeyEnum {
  ADD_CATEGORY = 'ADD_CATEGORY',
}

const MUTATION_GRAPHQL: { [key in MutationKeyEnum]: DocumentNode } = {
  [MutationKeyEnum.ADD_CATEGORY]: ADD_CATEGORY,
};

export const useCustomMutation = (
  query: MutationKeyEnum | DocumentNode | TypedDocumentNode<any, OperationVariables>,
  options?: MutationHookOptions<NoInfer<any>, NoInfer<any>, unknown, any>,
) => {
  return useMutation(MUTATION_GRAPHQL?.[query as MutationKeyEnum] || query, {
    onError: (error: any) => {
      notification.error({ message: error?.message });
    },
    ...options,
  });
};
