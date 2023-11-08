import { createContext, useContext, useState, PropsWithChildren, useEffect, useCallback } from 'react';
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

  // Update accessToken for default Authorization
  useEffect(() => {
    if (accessToken) APIService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }, [accessToken]);

  // Configuration interceptors for APIService
  useEffect(() => {
    APIService.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        const { config, response, code } = error;
        const { message, statusCode } = response?.data || {};

        // Update message for error
        error.message = message || code;

        // CASE: JWT Expired
        if (statusCode === 401 && message === 'jwt expired') {
          try {
            // Get newAccessToken
            // const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) || '';
            const newAccessToken = 'await getNewAccessToken(refreshToken)';

            // Update newAccessToken
            setAccessToken(newAccessToken);
            config.headers.Authorization = `Bearer ${newAccessToken}`;
            localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

            // Re-Call API with newAccessToken
            return await APIService(config);
          } catch (error) {
            logout();
            return Promise.reject(error);
          }
        }
        // CASE: API response error
        else return Promise.reject(error);
      },
    );
  }, [logout]);

  const store: IAuthContext = {
    accessToken,
    setAccessToken,
    authInfo,
    setAuthInfo,
    logout,
  };

  return <AuthContext.Provider value={store} {...props} />;
};

export const useAuthContext = () => useContext(AuthContext);
