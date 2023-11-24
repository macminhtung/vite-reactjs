import { useMutation, MutationHookOptions, OperationVariables, NoInfer, TypedDocumentNode } from '@apollo/client';
import { notification } from 'antd';
import type { DocumentNode } from 'graphql/language/ast';
import { ADD_CATEGORY, AddCategoryResDto } from 'gql';

export enum MutationKeyEnum {
  ADD_CATEGORY = 'ADD_CATEGORY',
}

const MUTATION_GRAPHQL: { [key in MutationKeyEnum]: DocumentNode } = {
  [MutationKeyEnum.ADD_CATEGORY]: ADD_CATEGORY,
};

type QueryType = MutationKeyEnum | DocumentNode | TypedDocumentNode<any, OperationVariables>;

type ConditionalResponse<T extends QueryType> = T extends MutationKeyEnum.ADD_CATEGORY ? AddCategoryResDto : any;

export const useCustomMutation = <T extends QueryType>(
  query: T,
  options?: MutationHookOptions<NoInfer<any>, NoInfer<any>, unknown, any>,
) => {
  return useMutation<ConditionalResponse<T>, OperationVariables, unknown, any>(
    MUTATION_GRAPHQL?.[query as MutationKeyEnum] || query,
    {
      onError: (error: any) => {
        notification.error({ message: error?.message });
      },
      ...options,
    },
  );
};
