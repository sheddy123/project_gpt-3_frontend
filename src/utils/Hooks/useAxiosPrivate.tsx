
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';
import { appAxiosAuthInstance } from '../Helpers/axios_config';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = appAxiosAuthInstance.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth?.refreshToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = appAxiosAuthInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return appAxiosAuthInstance(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
        appAxiosAuthInstance.interceptors.request.eject(requestIntercept);
        appAxiosAuthInstance.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return appAxiosAuthInstance;
};

export default useAxiosPrivate;
