import { memo, useMemo, useState } from 'react';
import { CustomButton } from 'components/antd';
// import { useTrans } from 'i18n';
// import { Link } from 'react-router-dom';
// import { ROUTER_PATHS } from 'common/constant';
// import { LanguageKeyEnum } from 'languages';

const TestReactMemo = memo((props: { count: number }) => {
  return (
    <div>
      <p>{new Date().getTime()}</p>
      <p>Count: {props.count}</p>
    </div>
  );
});

export const DashBoard = () => {
  // const { t } = useTrans();
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  const testUseMemo = useMemo(() => {
    return (
      <div>
        <p>{new Date().getTime()}</p>
        <p>Count: {count}</p>
      </div>
    );
  }, [count]);

  return (
    <div>
      <CustomButton onClick={() => setCount(count + 1)}>COUNT</CustomButton>
      <h1>ReactMemo</h1>
      <TestReactMemo count={count} />
      <br />
      <h1>useMemo</h1>
      {testUseMemo}
      <br />
      <CustomButton onClick={() => setFlag(!flag)}>FLAG</CustomButton>
      <p>Flag: {`${flag}`}</p>
      {/* <div className='mt-5'>
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
      </div> */}
    </div>
  );
};
