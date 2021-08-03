import React from 'react';

import { Form, Input } from 'antd';
import { Controller } from 'react-hook-form';

const classes = {
  root: (theme) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }),
  fullWidth: {
    width: '100%',
  },
  formItem: {
    borderRadius: 4,
    fontWeight: 400,
    background: '#fff',
    fontSize: 15,
    border: '1px solid #e3e3e3',
    flex: '1 0 auto',
    lineHeight: 1.4,
    margin: 0,
    transition: 'border-color .3s ease-out',
    width: '100%',
  },
  invalidInput: {
    border: '1px solid red',
  },
  error: (theme) => ({
    color: 'red',
    fontSize: 12,
    marginBottom: theme.spacing(1),
  }),
  input: (theme) => ({
    padding: `${theme.spacing(1.8)}px ${theme.spacing(1)}px`,
  }),
};

const FormItem = ({
  name,
  label,
  defaultValue = '',
  control,
  component,
  error,
  type,
  placeholder,
  inputCss,
  fullWidth,
}) => {
  const Component = component || Input;

  return (
    <div className={`flexColumn ${fullWidth ? 'stretchSelf' : ''}`}>
      <Form.Item
        label={label}
        css={[classes.formItem, classes.root, error && classes.invalidInput]}
      >
        <Controller
          name={name}
          defaultValue={defaultValue}
          control={control}
          render={({ field }) => (
            <Component
              {...field}
              type={type}
              placeholder={placeholder}
              css={[classes.input, inputCss]}
            />
          )}
        />
      </Form.Item>
      {/* ------------- error ------------- */}
      {error && (
        <div css={classes.error}>
          {error}
        </div>
      )}
    </div>

  );
};

export default FormItem;
