export const templateValidation = {
  name: [
    {
      required: true,
      message: 'Template name required',
    },
  ],
};

export const trackingXlsUploadValidation = {
  xls: [
    {
      required: true,
      message: 'A file is required',
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
      message: 'Password required',
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

export const imageUploadValidation = (file) => {
  let error;
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    error = 'You can only upload JPG/PNG file!';
  }
  const isLt2M = file.size / 1024 / 1024 < 30;
  if (!isLt2M) {
    error = 'Image must smaller than 30MB!';
  }
  return error;
};

export const xlsUploadValidation = (file) => {
  let error;
  const isJpgOrPng = file.type === 'application/vnd.ms-excel';
  if (!isJpgOrPng) {
    error = 'You can only upload ms-excel file!';
  }
  const isLt2M = file.size / 1024 / 1024 <= 30;
  if (!isLt2M) {
    error = 'File must smaller than 30MB!';
  }
  return error;
};
