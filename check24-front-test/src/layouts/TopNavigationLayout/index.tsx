import { FC, ReactNode } from 'react';
import { Box, Card, Container, styled } from '@mui/material';
import TopBar from './TopBar';

interface TopNavigationLayoutProps {
  children?: ReactNode;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
  padding: ${theme.spacing(0, 0, 0)};

  .MuiDrawer-fm .MuiPaper-root {
    top: 0;
    height: 100%;
  }

  .Mui-FixedWrapper .MuiPaper-root {
    top: 0;
    left: 0;
  }
  .MuiDrawer-hd .MuiPaper-root {
    top: 0;
    height: 100%;
  }

  .footer-wrapper {
    box-shadow: 0px 0px 2px ${theme.colors.alpha.black[30]};
  }
`
);

const MainContent = styled(Container)(
  ({}) => `
    position: relative;
    z-index: 55;
    padding: 0px !important;
`
);

const CardWrapper = styled(Card)(
  ({}) => `
    min-height: 100%;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
`
);

const TopNavigationLayout: FC<TopNavigationLayoutProps> = ({ children }) => {
  return (
    <>
      <MainWrapper>
        <TopBar />
        <MainContent maxWidth={false}>
          <Box mx={0}>
            <CardWrapper className="contentCustom">{children}</CardWrapper>
          </Box>
        </MainContent>
      </MainWrapper>
    </>
  );
};

export default TopNavigationLayout;
