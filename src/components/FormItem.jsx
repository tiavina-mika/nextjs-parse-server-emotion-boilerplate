import React from 'react';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Form, Input, Checkbox } from 'antd';
import PropTypes from 'prop-types';

const { Password } = Input;

const classes = {
  root: (theme) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }),
  fullWidth: {
    width: '100%',
  },
  formItem: (theme) => ({
    borderRadius: 4,
    fontWeight: 400,
    fontSize: 15,
    flex: '1 0 auto',
    lineHeight: 1.4,
    margin: 0,
    width: '100%',
    '& .ant-input-affix-wrapper': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '& input': {
      padding: `${theme.spacing(1.8)}px ${theme.spacing(1)}px !important`,
      transition: 'border-color .3s ease-out',
    },
  }),
};

const FormItem = ({
  name,
  label,
  type,
  fullWidth,
  rules,
  wrapperCol,
  component,
  tooltip,
  help,
  placeholder,
  ...otherProps
}) => {
  let defaultComponent;

  switch (type) {
    case 'password':
      defaultComponent = <Password placeholder={placeholder} />;
    break;
    case 'checkbox':
      defaultComponent = <Checkbox>{label}</Checkbox>;
    break;
    default:
      defaultComponent = <Input placeholder={placeholder} />;
  }

  return (
    <div className={`flexColumn ${fullWidth ? 'stretchSelf' : ''}`}>
      <Form.Item
        label={label}
        name={name}
        rules={rules}
        css={[classes.formItem, classes.root]}
        tooltip={tooltip ? { title: tooltip, icon: <InfoCircleOutlined /> } : null}
        wrapperCol={wrapperCol}
        help={help}
        {...otherProps}
      >
        {component || defaultComponent}
      </Form.Item>
    </div>
  );
};

FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  tooltip: PropTypes.string,
  label: PropTypes.string,
  rules: PropTypes.arrayOf(PropTypes.any),
  fullWidth: PropTypes.bool,
  otherProps: PropTypes.any,
  wrapperCol: PropTypes.any,
  component: PropTypes.any,
  help: PropTypes.string,
};

export default FormItem;
