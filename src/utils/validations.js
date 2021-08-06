export const templateValidation = {
  name: [
    {
      required: true,
      message: 'Template name required',
    },
  ],
};

export const loginValidation = {
  email: [
    {
      type: 'email',
      message: 'Invalid Email',
    },
    {
      required: true,
      message: 'Email required',
    },
  ],
  password: [
    {
      required: true,
      message: 'Email required',
    },
  ],
};

export const signupValidation = {
  ...loginValidation,
  passwordConfirmation: [
    {
      required: true,
      message: 'Please confirm your password!',
    },
    ({ getFieldValue }) => ({
      validator(_, value) {
        if (!value || getFieldValue('password') === value) {
          return Promise.resolve();
        }

        return Promise.reject(new Error('The two passwords that you entered do not match!'));
      },
    }),
  ],
};
