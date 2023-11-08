import { useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'common/constant';
import { LanguageKeyEnum } from 'common/enum';
import { useTranslation } from 'react-i18next';

const GET_PRODUCTS = gql`
  query {
    categories {
      id
      name
    }
  }
`;

const ADD_CATEGORY = gql`
  mutation AddCategory($id: Int!, $categoryName: String!, $productIds: [Int]!) {
    addCategory(id: $id, name: $categoryName, products: $productIds) {
      name
      products {
        name
      }
    }
  }
`;

export const GraphqlPage = () => {
  const { t } = useTranslation();
  const { loading: queryLoading, data: queryData } = useQuery(GET_PRODUCTS);
  const [mutateFunction, { data: mutationData, loading: mutationLoading }] = useMutation(ADD_CATEGORY);

  useEffect(() => {
    mutateFunction({
      variables: {
        id: 6,
        categoryName: 'HKT6',
        productIds: [1, 2, 3],
      },
    });
  }, [mutateFunction]);

  return (
    <div>
      <h1>Test Graphql</h1>
      {queryLoading && '[QUERY] LOADING ...'}
      {queryData && (
        <div>
          <strong>[QUERY] DATA:</strong>
          <p>{JSON.stringify(queryData)}</p>
        </div>
      )}
      <br />
      <br />
      {mutationLoading && '[MUTATION] LOADING ...'}
      {mutationData && (
        <div>
          <strong>[MUTATION] DATA:</strong>
          <p>{JSON.stringify(mutationData)}</p>
        </div>
      )}
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.DASHBOARD.MAIN}>
          {t(LanguageKeyEnum.DASHBOARD).toUpperCase()}
        </Link>
      </div>
    </div>
  );
};
