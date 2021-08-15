import { Form as AntdForm } from 'antd';
import PropTypes from 'prop-types';

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
  form: ({ size, fullWidth }) => ({
    width: fullWidth ? '100%' : getSize(size),
  }),
};

const Form = ({
  name, onFinish, children, size, fullWidth,
}) => {
  return (
    <AntdForm
      name={name}
      onFinish={onFinish}
      layout="vertical"
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
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

export default Form;
