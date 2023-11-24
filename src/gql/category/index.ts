import { gql } from '@apollo/client';

export type GetCategoriesResDto = {
  categories: Array<{ id: string; name: string }>;
};

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

export type AddCategoryResDto = {
  addCategory: Array<{
    name: string;
    products: Array<{ name: string }>;
  }>;
};

export const ADD_CATEGORY = gql`
  mutation AddCategory($id: Int!, $categoryName: String!, $productIds: [Int]!) {
    addCategory(id: $id, name: $categoryName, products: $productIds) {
      name
      products {
        name
      }
    }
  }
`;
