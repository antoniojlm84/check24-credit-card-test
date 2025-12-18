import { useEffect, useRef } from 'react';
import { httpClient } from 'src/components/Axios';
import Router from 'next/router';

const not500urls = ['/extras', '/preferred-client-brand', 'form/response/'];

export const AxiosResponseInterceptor = () => {
  const interceptorId = useRef(null);

  const checkIfUrlToBeRedirect500 = (error: any) => {
    if (error.config) {
      const url = error.config.url;
      const found = not500urls.filter((urlToCheck) => url.includes(urlToCheck));
      if (found.length > 0) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    interceptorId.current = httpClient.interceptors.response.use(
      undefined,
      (error: any) => {
        const errorRoute = error.config?.errorRoute;

        if (errorRoute === 'no-redirect') {
          return Promise.reject(error);
        }

        if (checkIfUrlToBeRedirect500(error)) {
          switch (error.response.status) {
            case 401:
              Router.push('/form/');
              break;
            case 500:
            case 501:
            case 502:
            case 503:
            case 504:
              Router.push('/500/');
              break;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      httpClient.interceptors.response.eject(interceptorId.current);
    };
  }, []);

  return null;
};
