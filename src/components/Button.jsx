import { Button as AntdButton } from 'antd';
import PropTypes from 'prop-types';

const classes = {
  button: {
    color: '#fff',
    borderRadius: 4,
    fontWeight: 400,
    textAlign: 'center',
    border: 'none',
    padding: '14px 22px',
    fontSize: 18,
    '&:hover': {
      opacity: 0.8,
    },
  },
  primary: (theme) => ({
    backgroundColor: theme.colors.primary,
    '&:hover': {
      backgroundColor: theme.colors.primary,
    },
  }),
  default: {
    backgroundColor: 'grey',
    '&:hover': {
      backgroundColor: 'grey',
    },
  },
  fullWidth: {
    flex: 1,
    alignSelf: 'stretch',
  },
};

const Button = ({
  text, htmlType, className, disabled = false,
  onClick, type = 'primary', fullWidth, ...buttonProps
}) => {
  return (
    <AntdButton
      css={[classes.button, className, classes[type], fullWidth && classes.fullWidth]}
      htmlType={htmlType === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...buttonProps}
    >
      {text}
    </AntdButton>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  htmlType: PropTypes.oneOf(['submit', 'button']),
  className: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'ghost', 'link', 'dashed', 'text', 'default']),
  fullWidth: PropTypes.bool,
  buttonProps: PropTypes.any,
};

export default Button;
