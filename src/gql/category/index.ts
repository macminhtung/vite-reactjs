import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
    }
  }
`;

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
