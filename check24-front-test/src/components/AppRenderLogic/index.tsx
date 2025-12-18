import { AuthConsumer } from 'src/contexts/GoogleAuthContext';
import { ErrorBoundary } from 'react-error-boundary';
import Loader from '../Loader';

const AppRenderLogic = ({
  getLayout,
  Component,
  errorComponent,
  pageProps
}) => {
  return (
    <AuthConsumer>
      {(auth) =>
        !auth.isInitialized ? (
          <Loader />
        ) : (
          getLayout(
            <ErrorBoundary FallbackComponent={errorComponent}>
              <Component {...pageProps} />
            </ErrorBoundary>
          )
        )
      }
    </AuthConsumer>
  );
};

export default AppRenderLogic;
