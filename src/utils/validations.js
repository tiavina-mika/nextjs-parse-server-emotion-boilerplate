import * as yup from 'yup';

const login = {
  email: yup.string().required(),
  password: yup.string().required('Password is required'),
};

const signup = {
  ...login,
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
};

export const loginSchema = yup.object().shape(login);
export const signupSchema = yup.object().shape(signup);
