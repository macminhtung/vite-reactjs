import { QueryKeyEnum } from 'common/enum';
import { useCustomQuery } from 'hooks/useCustomQuery';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'common/constant';
import { LanguageKeyEnum } from 'common/enum';
import { useTranslation } from 'react-i18next';

export const Profile = () => {
  const { t } = useTranslation();
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
