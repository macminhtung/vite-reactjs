import { QueryKeyEnum } from 'common/enum';
import { useCustomQuery } from 'hooks/react-query/useCustomQuery';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'common/constant';
import { LanguageKeyEnum } from 'languages';
import { useTrans } from 'i18n';

export const Profile = () => {
  const { t } = useTrans();
  const { isLoading, data } = useCustomQuery({ queryKey: QueryKeyEnum.GET_AUTH_PROFILE });

  return (
    <div>
      <h1>PROFILE PAGE</h1>
      {isLoading && 'LOADING ...'}
      {!!data && (
        <div>
          <strong>DATA:</strong>
          <p>{JSON.stringify(data)}</p>
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
