import * as yup from 'yup'

export const regSchema = yup.object({
    username: yup
        .string('Enter your username')
        .required('Username is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required')
        .nullable(false),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    repeatPassword: yup
        .string('Repeat your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .nullable(false)
        .required('Password Confirmation is required')
        .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const logSchema = yup.object({
    username: yup
        .string('Enter your username')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const registerInitialValues = {
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
};
export const loginInitialValues = {
    username: '',
    password: '',
};