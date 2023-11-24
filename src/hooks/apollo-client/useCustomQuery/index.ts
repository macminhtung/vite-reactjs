import { useQuery, TypedDocumentNode, OperationVariables, QueryHookOptions, NoInfer } from '@apollo/client';
import { notification } from 'antd';
import type { DocumentNode } from 'graphql/language/ast';
import { GET_CATEGORIES, GetCategoriesResDto } from 'gql';

export enum QueryKeyEnum {
  GET_CATEGORIES = 'GET_CATEGORIES',
}

const QUERY_GRAPHQL: { [key in QueryKeyEnum]: DocumentNode } = {
  [QueryKeyEnum.GET_CATEGORIES]: GET_CATEGORIES,
};

type QueryType = QueryKeyEnum | DocumentNode | TypedDocumentNode<any, OperationVariables>;

type ConditionalResponse<T extends QueryType> = T extends QueryKeyEnum.GET_CATEGORIES ? GetCategoriesResDto : any;

export const useCustomQuery = <T extends QueryType>(
  query: T,
  options?: QueryHookOptions<NoInfer<any>, NoInfer<any>>,
) => {
  return useQuery<ConditionalResponse<T>, OperationVariables>(QUERY_GRAPHQL?.[query as QueryKeyEnum] || query, {
    onError: (error: any) => {
      notification.error({ message: error?.message });
    },
    ...options,
  });
};
