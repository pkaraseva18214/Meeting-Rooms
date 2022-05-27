import {
    Alert,
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    ThemeProvider,
    Typography
} from "@mui/material";
import {Formik} from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useDispatch, useSelector} from "react-redux";
import {registerRequest} from "../../ducks/auth";
import {Link} from "react-router-dom";
import {PATH} from "../../constants/mainConstants";
import {selectError} from "../../ducks/auth/selectors";
import {registerInitialValues, regSchema} from "../../helper/authSchema";
import {theme} from "../../constants/styleConstants";

export default function RegistrationComponent() {

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
                        Registration
                    </Typography>
                    <Formik
                        initialValues={registerInitialValues}
                        validationSchema={regSchema}
                        onSubmit={(values) => {
                            dispatch(registerRequest(values))
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
                                        (responseError && responseError.payload.statusCode.toString() === '422') && (
                                            <Alert severity="error">
                                                User with such username already exists. Please choose a different username
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
                                    error={!!(touched.email && errors.email)}
                                    helperText={touched.email && errors.email}
                                    margin={'normal'}
                                    required
                                    fullWidth
                                    id={'email'}
                                    label={'Email'}
                                    name={'email'}
                                    autoComplete={'email'}
                                    autoFocus
                                    value={values.email}
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

                                <TextField
                                    error={!!(touched.repeatPassword && errors.repeatPassword)}
                                    helperText={touched.repeatPassword && errors.repeatPassword}
                                    margin={'normal'}
                                    required
                                    fullWidth
                                    id={'repeatPassword'}
                                    label={'Repeat password'}
                                    name={'repeatPassword'}
                                    type={'password'}
                                    autoComplete={'current-password'}
                                    value={values.repeatPassword}
                                    onChange={handleChange}
                                />

                                <Button
                                    type={'submit'}
                                    fullWidth
                                    variant={'contained'}
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Create new account!
                                </Button>
                                <Grid item>
                                    <Link
                                        style={{color: '#3da9fc', textDecoration: 'none'}}
                                        to={PATH.LOGIN}
                                    >
                                        {"Already have an account? Sign In"}
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
