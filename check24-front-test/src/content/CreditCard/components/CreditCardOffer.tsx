import React from 'react';
import {
  Box,
  Card,
  Grid,
  Typography,
  Link,
  styled,
  useTheme
} from '@mui/material';
import { useTranslation } from 'next-export-i18n';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import parse, { DOMNode, Element } from 'html-react-parser';

const BoxContainer = styled(Box)(
  () => `
    list-style-type: none;
    padding-left: 0;
    text-align: left;
  `
);

const LinkWrapper = styled(Link)(
  () => `
    color: #fff !important;
    background-color: #137a32ff;
    padding: 2px;
    text-align: left;
    font-weight: 100 !important;
    
    &:hover {
      text-decoration: none;
      background-color: #79aa87
    }

    &:visited {
      color: #fff;
    }
  `
);

type CreditCardOfferProps = {
  name: string;
  originalValues: any;
  index?: number;
};

export default function CreditCardOffer({
  name,
  originalValues,
  index
}: CreditCardOfferProps) {
  const theme = useTheme();
  const { t } = useTranslation();

  const getValue = (key: string) => {
    return originalValues && originalValues[key] ? originalValues[key] : null;
  };

  const renderFeatures = (featuresHtml: string) => {
    return parse(featuresHtml, {
      replace: (domNode: DOMNode) => {
        // Solo procesar nodos de tipo Element
        if (domNode.type === 'tag') {
          const element = domNode as Element;
          if (element.name === 'strong') {
            return (
              <strong>
                <CheckBoxIcon
                  style={{
                    verticalAlign: 'middle',
                    marginRight: 4,
                    color: '#137a32ff'
                  }}
                />
                {element.children.map((child) =>
                  child.type === 'text' ? child.data : parse(child as any)
                )}
              </strong>
            );
          }
        }
      }
    });
  };

  const features: string = getValue('anmerkungen') || [];
  const price: string = getValue('kosten') || '';
  const firstYearPayment: string = getValue('gebuehrenjahr1') || '';
  const tae: string = getValue('sollzins') || '';
  const link: string = getValue('link') || '#';
  const logo: string = getValue('logo') || '#';

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'space-between',
        p: 2
      }}
    >
      <Grid container>
        <Grid item mb={2} xs={12} sm={3} textAlign={'left'}>
          <Typography
            variant="h6"
            fontWeight={600}
            gutterBottom
            sx={{ color: '#1976d2', textTransform: 'capitalize' }}
          >
            <span style={{ color: theme.colors.primaryAlt.main }}>
              {index + 1}.
            </span>
            {name.toLowerCase()}
          </Typography>
          <Box ml={4}>
            <Link href={link} underline="hover" target="_blank">
              <img src={logo} alt={name} style={{ maxHeight: 40 }} />
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={5} textAlign={'left'}>
          <BoxContainer>{renderFeatures(features) || ''}</BoxContainer>
          <LinkWrapper href={link} underline="hover" target="_blank">
            {t('credit_cards.online')}
          </LinkWrapper>
        </Grid>
        <Grid item mb={2} xs={12} sm={4}>
          <Box textAlign="right">
            <Typography variant="h5" fontWeight={700} sx={{ color: '#1976d2' }}>
              {price}
            </Typography>
            <Typography variant="body1" fontWeight={700} fontSize={12}>
              {t('credit_cards.annual_fee')}
            </Typography>
            <Typography variant="body1" fontWeight={700} fontSize={12}>
              ({t('credit_cards.first_year_fee')}{' '}
              <span style={{ color: '#1976d2' }}>{firstYearPayment} €</span>)
            </Typography>
            {tae && (
              <Typography variant="caption" color="text.secondary">
                {t('credit_cards.interest_rate')} {tae}%
              </Typography>
            )}
          </Box>
          <Link
            href={link}
            underline="hover"
            sx={{ mt: 1, fontSize: 14, textAlign: 'right', display: 'block' }}
            target="_blank"
          >
            {t('credit_cards.view_offer')}
          </Link>
        </Grid>
      </Grid>
    </Card>
  );
}
