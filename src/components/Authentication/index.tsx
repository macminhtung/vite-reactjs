import { Outlet } from 'react-router-dom';
import { Header } from 'components/Header';
// import { useAuthContext } from 'contexts/auth';
// import { Navigate, useNavigate } from 'react-router-dom';
// import { ROUTER_PATHS } from 'common/constant';

export const Authentication = () => {
  // const { accessToken } = useAuthContext();
  // const navigate = useNavigate();

  // if (!accessToken) return <Navigate to={ROUTER_PATHS.SIGNIN} />;

  return (
    <div className='h-[calc(100vh-4.5rem)] bg-white'>
      <Header />
      <Outlet />
    </div>
  );
};
