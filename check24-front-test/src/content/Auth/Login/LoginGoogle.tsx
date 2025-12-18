import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import { googleConfig } from 'config';
import { useState, useEffect, FC } from 'react';

import { Typography, CircularProgress, Box, Alert } from '@mui/material';
import { useAuth } from 'src/hooks/useAuth';
import { useTranslation } from 'next-export-i18n';
import Script from 'next/script';

declare const window: Window &
  typeof globalThis & {
    google: any;
  };

export const LoginGoogle: FC = (props) => {
  const { t } = useTranslation();
  const { login, user } = useAuth() as any;
  const router = useRouter();
  const [loginState, setLoginState] = useState({
    loading: false,
    error: false
  });
  const [gsiScriptLoaded, setGsiScriptLoaded] = useState(false);

  const handleGoogleSignIn = async (res: {
    clientId: any;
    credential: any;
  }) => {
    try {
      if (!res.clientId || !res.credential) return;

      setLoginState({ loading: true, error: false });
      await login(res).then(function (response: string | boolean) {
        if (true == response) {
          const backTo = (router.query.backTo as string) || '/dashboard';
          router.push(backTo);
        } else {
          console.log('error2: ' + response);
          setLoginState({ loading: false, error: true });
          setGsiScriptLoaded(false);
        }
      });
    } catch (err) {
      console.log('erro3');
      setLoginState({ loading: false, error: true });
      setGsiScriptLoaded(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      submit: null
    },
    onSubmit: async (): Promise<void> => {
      try {
        console.log('Login google');
      } catch (err) {
        console.error(err);
      }
    }
  });

  const initializeGsi = () => {
    if (!window.google || gsiScriptLoaded) {
      return;
    }

    setGsiScriptLoaded(true);

    window.google.accounts.id.initialize({
      client_id: googleConfig.client_id,
      callback: handleGoogleSignIn,
      auto_prompt: 'false'
    });

    window.google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      {
        type: 'standard',
        shape: 'rectangular',
        theme: 'filled_blue',
        size: 'large',
        logo_alignment: 'left',
        width: '330',
        text: "{t('Sign in with Google')}"
      }
    );
  };

  useEffect(() => {
    if (user?._id || gsiScriptLoaded) {
      return;
    }

    initializeGsi();

    return () => {
      // Cleanup function that runs when component unmounts
      window.google?.accounts.id.cancel();
      document.getElementById('google-client-script')?.remove();
    };
  }, [gsiScriptLoaded, user?._id]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://accounts.google.com/gsi/client`}
        id="google-client-script"
        async
        defer
        onLoad={() => {
          initializeGsi();
        }}
      />
      <form noValidate onSubmit={formik.handleSubmit} {...props}>
        <Typography
          variant="h4"
          color="text.secondary"
          fontWeight="normal"
          sx={{
            mb: 1
          }}
        >
          {t('login.text1')}
        </Typography>
        {loginState.loading ? (
          <Typography
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
            sx={{ mb: 'auto' }}
          >
            <CircularProgress size="1rem" /> {t('login.sign-in-loading')}
          </Typography>
        ) : (
          <div id="buttonDiv"></div>
        )}
      </form>
      {loginState.error && (
        <Box my={4}>
          <Alert severity="error">{t('login.error')}</Alert>
        </Box>
      )}
    </>
  );
};
