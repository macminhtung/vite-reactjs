import { gql } from '@apollo/client';

export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export type GetProductsResDto = { products: IProduct[] };

export const GET_PRODUCTS = gql`
  query {
    products {
      id
      name
      price
    }
  }
`;
