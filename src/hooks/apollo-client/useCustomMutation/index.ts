import {
  useMutation,
  MutationHookOptions,
  OperationVariables,
  NoInfer,
  TypedDocumentNode,
  MutationFunctionOptions,
  MutationResult,
  FetchResult,
  ApolloCache,
} from '@apollo/client';
import { notification } from 'antd';
import type { DocumentNode } from 'graphql/language/ast';
import {
  ICategory,
  ADD_CATEGORY,
  AddCategoryResDto,
  UPDATE_CATEGORY,
  UpdateCategoryResDto,
  DELETE_CATEGORY,
  DeleteCategoryResDto,
} from 'gql';

export enum MutationKeyEnum {
  ADD_CATEGORY = 'ADD_CATEGORY',
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
  DELETE_CATEGORY = 'DELETE_CATEGORY',
}

const MUTATION_GRAPHQL: { [key in MutationKeyEnum]: DocumentNode } = {
  [MutationKeyEnum.ADD_CATEGORY]: ADD_CATEGORY,
  [MutationKeyEnum.UPDATE_CATEGORY]: UPDATE_CATEGORY,
  [MutationKeyEnum.DELETE_CATEGORY]: DELETE_CATEGORY,
};

type QueryType = MutationKeyEnum | DocumentNode | TypedDocumentNode<any, OperationVariables>;

type ConditionalResponse<T extends QueryType> = T extends MutationKeyEnum.ADD_CATEGORY
  ? AddCategoryResDto
  : T extends MutationKeyEnum.UPDATE_CATEGORY
  ? UpdateCategoryResDto
  : T extends MutationKeyEnum.DELETE_CATEGORY
  ? DeleteCategoryResDto
  : any;

type ConditionVariables<T extends QueryType> = T extends MutationKeyEnum.ADD_CATEGORY
  ? ICategory
  : T extends MutationKeyEnum.UPDATE_CATEGORY
  ? ICategory
  : T extends MutationKeyEnum.DELETE_CATEGORY
  ? { id: number }
  : OperationVariables;

export const useCustomMutation = <T extends QueryType>(
  query: T,
  options?: MutationHookOptions<NoInfer<any>, NoInfer<any>, unknown, any>,
): [
  (options?: MutationFunctionOptions<any, ConditionVariables<T>, any, ApolloCache<any>>) => Promise<FetchResult>,
  MutationResult,
] => {
  return useMutation<ConditionalResponse<T>, ConditionVariables<T>, unknown, any>(
    MUTATION_GRAPHQL[query as MutationKeyEnum] || query,
    {
      onError: (error: any) => {
        notification.error({ message: error?.message });
      },
      ...options,
    },
  );
};
