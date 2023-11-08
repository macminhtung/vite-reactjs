import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'common/constant';
import { LanguageKeyEnum } from 'common/enum';

export const DashBoard = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t(LanguageKeyEnum.DASHBOARD)}</h1>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.WORKER}>
          {t(LanguageKeyEnum.TEST_WORKER)}
        </Link>
      </div>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.GRAPHQL}>
          {t(LanguageKeyEnum.TEST_GRAPHQL)}
        </Link>
      </div>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.SIGNIN}>
          {t(LanguageKeyEnum.SIGNIN)}
        </Link>
      </div>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.SIGNUP}>
          {t(LanguageKeyEnum.SIGNUP)}
        </Link>
      </div>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.DASHBOARD.PROFILE}>
          {t(LanguageKeyEnum.PROFILE)}
        </Link>
      </div>
    </div>
  );
};
