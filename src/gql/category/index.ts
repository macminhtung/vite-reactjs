import { gql } from '@apollo/client';

export interface ICategory {
  id: number;
  name: string;
  products: number[];
}

export interface ICategoryRes {
  id: number;
  name: string;
  products: { id: number; name: string }[];
}

export type GetCategoriesResDto = { categories: ICategory[] };

export const GET_CATEGORIES = gql`
  query {
    categories {
      id
      name
      products {
        id
        name
      }
    }
  }
`;

export type AddCategoryResDto = { addCategory: ICategory };

export const ADD_CATEGORY = gql`
  mutation addCategory($id: Int!, $name: String!, $products: [Int]!) {
    addCategory(id: $id, name: $name, products: $products) {
      id
      name
      products {
        name
      }
    }
  }
`;

export type UpdateCategoryResDto = { updateCategory: ICategoryRes };

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: Int!, $name: String!, $products: [Int]!) {
    updateCategory(id: $id, name: $name, products: $products) {
      id
      name
      products {
        name
      }
    }
  }
`;

export type DeleteCategoryResDto = { deleteCategory: ICategoryRes };

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      id
      name
      products {
        name
      }
    }
  }
`;
