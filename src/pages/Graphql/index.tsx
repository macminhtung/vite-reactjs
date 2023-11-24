import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'common/constant';
import { LanguageKeyEnum } from 'common/enum';
import { useTrans } from 'i18n';
import { QueryKeyEnum, useCustomQuery } from 'hooks/apollo-client/useCustomQuery';
import { MutationKeyEnum, useCustomMutation } from 'hooks/apollo-client/useCustomMutation';

export const GraphqlPage = () => {
  const { t } = useTrans();
  const { loading: queryLoading, data: queryData } = useCustomQuery(QueryKeyEnum.GET_CATEGORIES);
  const [mutateFunc, { data: mutationData, loading: mutationLoading }] = useCustomMutation(
    MutationKeyEnum.ADD_CATEGORY,
  );

  useEffect(() => {
    mutateFunc({
      variables: {
        id: 6,
        categoryName: 'HKT6',
        productIds: [1, 2, 3],
      },
    });
  }, [mutateFunc]);

  return (
    <div>
      <h1>Test Graphql</h1>
      {queryLoading && '[QUERY] LOADING ...'}
      {queryData && (
        <div>
          <strong>[QUERY] DATA:</strong>
          <p>{JSON.stringify(queryData.categories)}</p>
        </div>
      )}
      <br />
      <br />
      {mutationLoading && '[MUTATION] LOADING ...'}
      {mutationData && (
        <div>
          <strong>[MUTATION] DATA:</strong>
          <p>{JSON.stringify(mutationData.addCategory)}</p>
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
