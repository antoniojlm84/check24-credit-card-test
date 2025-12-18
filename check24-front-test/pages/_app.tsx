'use client';

import type { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import ThemeProvider from 'src/theme/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from 'src/createEmotionCache';
import { SidebarProvider } from 'src/contexts/SidebarContext';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from 'src/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import useScrollTop from 'src/hooks/useScrollTop';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from 'src/contexts/GoogleAuthContext';
import { AxiosResponseInterceptor } from 'src/components/AxiosResponseInterceptor';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Status500 from './500';
import AppRenderLogic from '@/components/AppRenderLogic';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

interface NidoAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

function NidoApp(props: NidoAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);
  useScrollTop();

  const router = useRouter();
  const [isEnglishOnlyPage, setIsEnglishOnlyPage] = useState(false);

  useEffect(() => {
    setIsEnglishOnlyPage(router.pathname === '/launch-us');
  }, [router.pathname]);

  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);

  return (
    <main>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, shrink-to-fit=no, maximum-scale=1.0"
          />
          <meta
            name="facebook-domain-verification"
            content="dmtudx8m3xgrfczmyebnjn54om7nfb"
          />
        </Head>
        <ReduxProvider store={store}>
          <SidebarProvider>
            {/* @ts-ignore */}
            <ThemeProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <AuthProvider>
                  <SnackbarProvider
                    maxSnack={6}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                  >
                    <CssBaseline />
                    <AxiosResponseInterceptor />
                    <AppRenderLogic
                      getLayout={getLayout}
                      Component={Component}
                      errorComponent={Status500}
                      pageProps={pageProps}
                    />
                  </SnackbarProvider>
                </AuthProvider>
              </LocalizationProvider>
            </ThemeProvider>
          </SidebarProvider>
        </ReduxProvider>
      </CacheProvider>
    </main>
  );
}

export default NidoApp;
