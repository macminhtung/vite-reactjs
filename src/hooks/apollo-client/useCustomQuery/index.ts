import { useQuery, TypedDocumentNode, OperationVariables, QueryHookOptions, NoInfer } from '@apollo/client';
import { notification } from 'antd';
import type { DocumentNode } from 'graphql/language/ast';
import { GET_CATEGORIES } from 'gql';

export enum QueryKeyEnum {
  GET_CATEGORIES = 'GET_CATEGORIES',
}

const QUERY_GRAPHQL: { [key in QueryKeyEnum]: DocumentNode } = {
  [QueryKeyEnum.GET_CATEGORIES]: GET_CATEGORIES,
};

export const useCustomQuery = (
  query: QueryKeyEnum | DocumentNode | TypedDocumentNode<any, OperationVariables>,
  options?: QueryHookOptions<NoInfer<unknown>, NoInfer<any>>,
) => {
  return useQuery(QUERY_GRAPHQL?.[query as QueryKeyEnum] || query, {
    onError: (error: any) => {
      notification.error({ message: error?.message });
    },
    ...options,
  });
};
