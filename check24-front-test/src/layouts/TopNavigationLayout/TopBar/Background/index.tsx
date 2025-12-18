import { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import { useRouter } from 'next/router';
import backgroundItems, { BackgroundItem } from './items';
import TitlePage from 'src/layouts//TopNavigationLayout/TopBar/Title';

const TopBarImage = styled(Box)(
  () => `
    background-size: cover;
    position: relative;
    min-height: 435px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    backdrop-filter: blur(5px);
`
);

function Background({ short = false, button = false }) {
  const router = useRouter();
  const [background, setBackground] = useState('');

  const handleBackground = () => {
    if (router.isReady) {
      setBackground(getBackground());
    }
  };

  const getBackground = () => {
    const background = backgroundItems.items.filter(
      (section: BackgroundItem) => {
        return section.path == router.pathname;
      }
    );

    return background[0]?.image
      ? background[0].image
      : '/static/images/placeholders/covers/header_3.png';
  };

  useEffect(handleBackground, [router.isReady, router.asPath]);

  return (
    <>
      <TopBarImage
        sx={{
          opacity: 0.9,
          backgroundImage: `url("${background}")`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: short ? '118px' : '435px',
          height: short ? '118px' : 'auto'
        }}
      >
        {!short && <TitlePage button={button} />}
      </TopBarImage>
    </>
  );
}

export default Background;
