import { createContext, useContext, useState, PropsWithChildren, useEffect, useMemo, useCallback } from 'react';
import { APIService } from 'api';

interface IAuthContext {
  accessToken: string;
  setAccessToken: (x: string) => void;
  authInfo: IAuthInfo;
  setAuthInfo: (x: IAuthInfo) => void;
  logout: () => void;
}

interface IAuthInfo {
  id: string;
  name: string;
  email: string;
  phone: string;
}

const initAuthInfo: IAuthInfo = {
  id: '',
  name: '',
  email: '',
  phone: '',
};

export const clearLocalStorage = () => {
  localStorage.setItem(ACCESS_TOKEN_KEY, '');
  localStorage.setItem(REFRESH_TOKEN_KEY, '');
  delete APIService.defaults.headers.common.Authorization;
};

export const AuthContext = createContext<IAuthContext>({
  accessToken: '',
  setAccessToken: () => null,
  authInfo: initAuthInfo,
  setAuthInfo: () => initAuthInfo,
  logout: () => null,
});

export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY';

export const AuthProvider = (props: PropsWithChildren) => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem(ACCESS_TOKEN_KEY) || '');
  const [authInfo, setAuthInfo] = useState<IAuthInfo>(initAuthInfo);

  const logout = useCallback(() => {
    clearLocalStorage();
    setAccessToken('');
    setAuthInfo(initAuthInfo);
  }, []);

  useEffect(() => {
    if (accessToken) {
      APIService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken || '');
    }
  }, [accessToken]);

  useMemo(() => {
    APIService.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        const originalRequest = error?.config;
        const { message, statusCode } = error?.response?.data || {};
        error.message = message;

        if (statusCode === 401 && message === 'jwt expired') {
          try {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || '';
            const newAccessToken = 'await getNewAccessToken(refreshToken)';
            setAccessToken(newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return await APIService(originalRequest);
          } catch (error) {
            logout();
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      },
    );
  }, [logout]);

  const store = {
    accessToken,
    setAccessToken,
    authInfo,
    setAuthInfo,
    logout,
  };

  return <AuthContext.Provider value={store} {...props} />;
};

export const useAuthContext = () => useContext(AuthContext);
