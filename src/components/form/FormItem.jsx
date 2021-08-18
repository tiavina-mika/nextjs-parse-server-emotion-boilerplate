import React from 'react';

import { cx } from '@emotion/css';
import { Form, Input, Checkbox } from 'antd';
import PropTypes from 'prop-types';

const { Password } = Input;

const classes = {
  root: (theme) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
    <div className={cx('flexColumn', fullWidth ? 'stretchSelf' : '')}>
      <Form.Item
        label={label}
        name={name}
        rules={rules}
        css={classes.root}
        className="formItem"
        // tooltip={tooltip ? { title: tooltip, icon: <InfoCircleOutlined /> } : null}
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
