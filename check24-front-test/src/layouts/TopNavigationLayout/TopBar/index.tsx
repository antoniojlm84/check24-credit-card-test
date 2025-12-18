import { Card, styled } from '@mui/material';
import Link from 'next/link';
import LanguageSwitch from '@/layouts/TopNavigationLayout/TopBar/LanguageSwitchHeader';

const TopBarWrapper = styled(Card)(
  ({ theme }) => `
  border-radius: 0;
  width: 100%;
  display: flex;
  align-items: center;
  top: 0;
  gap: 24px;
  flex-wrap: wrap;
  position: sticky;
  transition: all 0.3s ease;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: none;
  background-color: rgba(255, 255, 255, 0.75);
  justify-content: space-between;
  padding: 20px 5rem 20px 5rem; 
        @media (max-width: ${theme.breakpoints.values.sm}px) {
      padding: 20px 0.5rem;
      justify-content: space-between
   }
`
);

const LanguageSwitchWrapper = styled('div')(
  ({ theme }) => `
    position: relative;
    z-index: 1000;
    @media (max-width: ${theme.breakpoints.values.sm}px) {
      & .MuiIconButton-root {
        width: ${theme.spacing(3.5)};
        height: ${theme.spacing(3.5)};
      }
      & .MuiIconButton-root .flag-icon {
        width: ${theme.spacing(2)};
        height: ${theme.spacing(2)};
      }
    }
  `
);

const LogoWrapper = styled('img')(
  ({ theme }) => `
   padding: 0;
   display: block;
   width: 150px;

   @media (max-width: ${theme.breakpoints.values.sm}px) {
    width: 150px;
    padding-left: 10px;
`
);

function TopBar() {
  return (
    <TopBarWrapper className="landing-wrapper">
      <Link href="/">
        <LogoWrapper src="/static/images/logo/logo.png" />
      </Link>
      <div
        className="buttons-wrapper"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <LanguageSwitchWrapper>
          <LanguageSwitch />
        </LanguageSwitchWrapper>
      </div>
    </TopBarWrapper>
  );
}

export default TopBar;
