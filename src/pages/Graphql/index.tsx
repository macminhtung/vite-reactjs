import { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export const GraphqlPage = () => {
  const { loading, data } = useQuery(GET_LOCATIONS);

  useEffect(() => {
    data && console.log('data =', data);
  }, [data]);

  return (
    <div>
      <h1>Test Graphql</h1>
      {loading && 'LOADING'}
      <div>{JSON.stringify(data)}</div>
    </div>
  );
};
