import { Form as AntdForm } from 'antd';
import PropTypes from 'prop-types';

import { mq } from '../../styles/styles';

const getSize = (size) => {
  switch (size) {
    case 'md':
      return 700;
    case 'lg':
      return 900;
    default:
      return 500;
  }
};

const classes = {
  form: ({ size, fullWidth }) => mq({
    width: fullWidth ? '100%' : ['100%', false, false, getSize(size)],
  }),
};

const Form = ({
  name, onFinish, children, size, fullWidth,
  initialValues, form,
}) => {
  return (
    <AntdForm
      initialValues={initialValues}
      name={name}
      onFinish={onFinish}
      layout="vertical"
      form={form}
      css={classes.form({ size, fullWidth })}
    >
      {children}
    </AntdForm>
  );
};

Form.propTypes = {
  name: PropTypes.string.isRequired,
  onFinish: PropTypes.func,
  children: PropTypes.node,
  fullWidth: PropTypes.bool,
  initialValues: PropTypes.any,
  form: PropTypes.any,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Form;
