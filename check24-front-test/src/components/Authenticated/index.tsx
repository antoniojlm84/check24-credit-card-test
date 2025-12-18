import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

interface AuthenticatedProps {
  children: ReactNode;
}

export const Authenticated: FC<AuthenticatedProps> = (props) => {
  const { children } = props;
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
  }, [router.isReady]);

  return <>{children}</>;
};

Authenticated.propTypes = {
  children: PropTypes.node
};
