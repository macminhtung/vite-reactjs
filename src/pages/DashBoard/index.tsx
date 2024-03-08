import { useTrans } from 'i18n';
import { Link } from 'react-router-dom';
import { ROUTER_PATHS } from 'common/constant';
import { LanguageKeyEnum } from 'languages';

export const DashBoard = () => {
  const { t } = useTrans();
  return (
    <div>
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
        <Link className='text-orange' to={ROUTER_PATHS.DASHBOARD.GRAPHQL}>
          {t(LanguageKeyEnum.TEST_GRAPHQL)}
        </Link>
      </div>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.DASHBOARD.PROFILE}>
          {t(LanguageKeyEnum.PROFILE)}
        </Link>
      </div>
      <div className='mt-5'>
        <Link className='text-orange' to={ROUTER_PATHS.DASHBOARD.WORKER}>
          {t(LanguageKeyEnum.TEST_WORKER)}
        </Link>
      </div>
    </div>
  );
};
