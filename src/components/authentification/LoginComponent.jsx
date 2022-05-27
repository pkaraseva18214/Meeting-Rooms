import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {PATH} from "../../constants/mainConstants";
import {Formik} from "formik";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline, Grid,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {loginRequest} from "../../ducks/auth";
import {selectError} from "../../ducks/auth/selectors";
import {loginInitialValues, logSchema} from "../../helper/authSchema";
import {theme} from "../../constants/styleConstants";


export default function LoginComponent() {
    const dispatch = useDispatch();
    const responseError = useSelector(selectError);

    return (
        <ThemeProvider theme={theme}>
            <Container component={'main'} maxWidth={'xs'}>
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: '8rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component={'h1'} variant={'h5'}>
                        Sign In
                    </Typography>
                    <Formik
                        initialValues={loginInitialValues}
                        validationSchema={logSchema}
                        onSubmit={(values) => {
                            dispatch(loginRequest(values))
                        }}
                        validateOnBlur>
                        {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleSubmit
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                style={{marginTop: 1}}>
                                <div>
                                    {
                                        (responseError && responseError.payload.statusCode.toString() === '400') && (
                                            <Alert severity="error">
                                                Username or password is not valid.
                                            </Alert>
                                        )}
                                </div>

                                <TextField
                                    error={!!(touched.username && errors.username)}
                                    helperText={touched.username && errors.username}
                                    margin={'normal'}
                                    required
                                    fullWidth
                                    id={'username'}
                                    label={'Username'}
                                    name={'username'}
                                    autoComplete={'username'}
                                    autoFocus
                                    value={values.username}
                                    onChange={handleChange}
                                />
                                <TextField
                                    error={!!(touched.password && errors.password)}
                                    helperText={touched.password && errors.password}
                                    margin={'normal'}
                                    required
                                    fullWidth
                                    id={'password'}
                                    label={'Password'}
                                    name={'password'}
                                    type={'password'}
                                    autoComplete={'current-password'}
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                <Button
                                    type={'submit'}
                                    fullWidth
                                    variant={'contained'}
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Sign In
                                </Button>
                                <Grid item>
                                    <Link
                                        style={{color: '#3da9fc', textDecoration: 'none'}}
                                        to={PATH.REGISTRATION}
                                    >
                                        {"Don't have an account? Sign Up!"}
                                    </Link>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Container>
        </ThemeProvider>
    );
}