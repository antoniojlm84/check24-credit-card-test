import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/material';

const PageTitle = styled(Box)(
  ({}) => `
    margin-right: auto;
    margin-left: auto;
    position: relative;
    width: 100%;
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  return (
    <>
      <PageTitle className="MuiPageTitle-wrapper">{children}</PageTitle>
    </>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
