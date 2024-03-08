import { useQuery, TypedDocumentNode, OperationVariables, QueryHookOptions, NoInfer } from '@apollo/client';
import { notification } from 'antd';
import type { DocumentNode } from 'graphql/language/ast';
import { GET_CATEGORIES, GetCategoriesResDto, GET_PRODUCTS, GetProductsResDto } from 'gql';

export enum QueryKeyEnum {
  GET_CATEGORIES = 'GET_CATEGORIES',
  GET_PRODUCTS = 'GET_PRODUCTS',
}

const QUERY_GRAPHQL: { [key in QueryKeyEnum]: DocumentNode } = {
  [QueryKeyEnum.GET_CATEGORIES]: GET_CATEGORIES,
  [QueryKeyEnum.GET_PRODUCTS]: GET_PRODUCTS,
};

type QueryType = QueryKeyEnum | DocumentNode | TypedDocumentNode<any, OperationVariables>;

type ConditionalResponse<T extends QueryType> = T extends QueryKeyEnum.GET_CATEGORIES
  ? GetCategoriesResDto
  : T extends QueryKeyEnum.GET_PRODUCTS
  ? GetProductsResDto
  : any;

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
