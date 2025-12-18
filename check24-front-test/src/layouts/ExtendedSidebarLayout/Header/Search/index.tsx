import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  Ref,
  ReactElement
} from 'react';
import { useTranslation } from 'next-export-i18n';
import { useFormik } from 'formik';
import {
  Box,
  Divider,
  IconButton,
  CircularProgress,
  InputBase,
  Tooltip,
  Typography,
  Card,
  Dialog,
  // alpha,
  Slide,
  styled,
  useTheme
} from '@mui/material';
import {
  ContactSupportTwoTone,
  FilterListOff,
  SearchTwoTone
} from '@mui/icons-material';

// import Scrollbar from 'src/components/Scrollbar';
// import Link from 'src/components/Link';
// import { Security } from 'src/services/security/security';
// import { useAuth } from 'src/hooks/useAuth';
import { TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const SearchInputWrapper = styled(InputBase)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(18)};
    padding: ${theme.spacing(2)};
    width: 100%;
`
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        border-radius: ${theme.general.borderRadiusLg};
`
);

// const ListButton = styled(Link)(
//   ({ theme }) => `
//       background-color: transparent;
//       color:  ${theme.colors.alpha.black[100]};
//       transition: ${theme.transitions.create(['all'])};
//       border: ${theme.colors.alpha.black[10]} solid 1px;
//       border-radius: ${theme.general.borderRadius};
//       padding: ${theme.spacing(1)};
//       margin: ${theme.spacing(1, 0)};
//       cursor: pointer;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;

//       & > div > .MuiSvgIcon-root {
//         color:  ${theme.colors.alpha.black[50]};
//         transition: ${theme.transitions.create(['all'])};
//       }

//       &:hover {
//         background-color: ${alpha(theme.colors.primary.main, 0.08)};
//         color:  ${theme.colors.primary.main};
//         border-color: ${alpha(theme.colors.primary.main, 0.3)};
//         text-decoration: none;

//         & > div > .MuiSvgIcon-root {
//           color:  ${theme.colors.primary.main};
//         }
//       }
// `
// );

const HeaderSearch = (props) => {
  const { t } = useTranslation();
  const theme = useTheme();
  // const { allowIf } = Security();
  // const { user } = useAuth();

  const searchRef = useRef(null);
  const [searchHasResults, setSearchHasResults] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  //const [searchUsers, setSearchUsers] = useState(new UserCollection());

  const formik = useFormik({
    initialValues: {
      query: '',
      submit: null
    },
    onSubmit: async () => {
      // let hasResults = false;
      // if (values.query == searchQuery) {
      //   return;
      // }
      // setSearchQuery(values.query);
      // if (values.query.length == 0) {
      //   return;
      // }
      // setSearchLoading(true);
      // setSearchHasResults(false);
      // try {
      //   const response = await searchHttpRepository.getSearch(values);
      //   if (allowIf(user, 'ADMIN') && response.user) {
      //     const userCollection = new UserCollection(response.user);
      //     hasResults = userCollection.total > 0 ? true : hasResults;
      //     setSearchUsers(userCollection);
      //   }
      //   setSearchLoading(false);
      //   setSearchHasResults(hasResults);
      // } catch (err) {
      //   console.error(err);
      //   setSearchLoading(false);
      //   setSearchQuery("");
      //   setSearchHasResults(false);
      // }
    }
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (url?: string) => {
    if (url) {
      window.location.href = url;
    }
    setOpen(false);
    formik.resetForm();
    setSearchLoading(false);
    setSearchQuery('');
    setSearchHasResults(false);
  };

  useEffect(() => {
    if (open) {
      searchRef.current?.focus();
    }
  }, [open, searchRef]);

  return (
    <>
      <Tooltip arrow title={t('Search')}>
        <IconButtonWrapper color="primary" onClick={handleClickOpen}>
          <SearchTwoTone fontSize="small" />
        </IconButtonWrapper>
      </Tooltip>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth
        scroll="paper"
        onClose={() => handleClose()}
      >
        <Box>
          <form noValidate onSubmit={formik.handleSubmit} {...props}>
            <Box display="flex" alignItems="center">
              <Box flexGrow={1} display="flex" alignItems="center">
                <SearchTwoTone
                  sx={{ ml: 2, color: theme.colors.secondary.main }}
                />
                <SearchInputWrapper
                  inputRef={searchRef}
                  name="query"
                  value={formik.values.query}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setTimeout(() => formik.submitForm(), 700);
                  }}
                  inputProps={{ autoFocus: true }}
                  autoFocus={true}
                  placeholder={t('search.placeholder')}
                  fullWidth
                />
              </Box>
              <Card
                sx={{
                  ml: 'auto',
                  mr: 2,
                  py: 0.5,
                  px: 1,
                  background: theme.colors.alpha.black[10]
                }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  esc
                </Typography>
              </Card>
            </Box>
          </form>
        </Box>
        <Divider />
        {searchLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              my: 5
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {searchQuery == '' ? (
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  background: theme.colors.info.lighter,
                  color: theme.colors.info.main,
                  borderRadius: theme.general.borderRadius,
                  fontSize: theme.typography.pxToRem(13),
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  mx: 2,
                  my: 2
                }}
              >
                <ContactSupportTwoTone
                  sx={{ mr: 0.8, fontSize: theme.typography.pxToRem(18) }}
                />
                {t('search.help_text')}
              </Typography>
            ) : !searchHasResults ? (
              <Typography
                variant="subtitle1"
                component="div"
                sx={{
                  background: theme.colors.alpha.black[30],
                  color: theme.colors.alpha.black[100],
                  borderRadius: theme.general.borderRadius,
                  fontSize: theme.typography.pxToRem(13),
                  display: 'flex',
                  alignItems: 'center',
                  p: 1,
                  mx: 2,
                  my: 2
                }}
              >
                <FilterListOff
                  sx={{ mr: 0.8, fontSize: theme.typography.pxToRem(18) }}
                />
                {t('search.help_text_no_results')}
              </Typography>
            ) : (
              <Box sx={{ height: 450 }}>
                {/* <Scrollbar>
                    {allowIf(user, 'ADMIN') && searchUsers && searchUsers.total > 0 && (
                      <Box px={2} py={1} key="user">
                        <Typography
                          sx={{ py: 1 }}
                          variant="h5"
                        >
                          {t('user.list.title')}
                        </Typography>
                        {searchUsers.collection.map((user) => (
                          <Fragment key={user.id}>
                            <ListButton
                              href={`/admin/user/edit/?id=${user.id}`}
                              onClick={() => handleClose(`/admin/user/edit/?id=${user.id}`)}
                            >
                              <Box display="flex" alignItems="flex-start">
                                <Person sx={{ mr: 1 }} fontSize="small" />
                                <Typography>{user.name}</Typography>
                              </Box>
                              <Box display="flex" alignItems="center">
                                <KeyboardArrowRightTwoTone sx={{ ml: 1 }} fontSize="small" />
                              </Box>
                            </ListButton>
                          </Fragment>
                        ))}
                        {searchUsers.total > searchUsers.limit &&
                          <Box sx={{ pt: 1 }} textAlign="right">
                            <Link
                              href={`/admin/user/list?q=${formik.values.query}`}
                              onClick={() => handleClose(`/admin/user/list?q=${formik.values.query}`)}
                            >
                              {1 == searchUsers.total - searchUsers.limit
                              ? t('user.search.one_more')
                              : t('user.search.more', { num: searchUsers.total - searchUsers.limit })
                              }
                            </Link>
                          </Box>
                        }
                      </Box>
                    )}
                  </Scrollbar> */}
              </Box>
            )}
          </>
        )}
      </DialogWrapper>
    </>
  );
};

export default HeaderSearch;
