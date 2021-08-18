import { cx } from '@emotion/css';
import { Button as AntdButton } from 'antd';
import PropTypes from 'prop-types';

const classes = {
  primary: (theme) => ({
    backgroundColor: theme.colors.primary,
    color: '#fff',
    '&:hover, &:focus': {
      backgroundColor: theme.colors.primary,
    },
  }),
  default: (theme) => ({
    backgroundColor: '#fff',
    '&:hover,&:focus': {
      backgroundColor: '#fff',
      color: theme.colors.primary,
    },
  }),
};

const Button = ({
  text, htmlType = 'button', className, disabled = false,
  onClick, type = 'primary', fullWidth, ...buttonProps
}) => {
  return (
    <AntdButton
      css={classes[type]}
      className={cx('flexCenter button buttonText', className, fullWidth ? 'fullWidth' : '')}
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
  htmlType: PropTypes.oneOf(['submit', 'button', 'reset']),
  className: PropTypes.any,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['primary', 'ghost', 'link', 'dashed', 'text', 'default']),
  fullWidth: PropTypes.bool,
  buttonProps: PropTypes.any,
};

export default Button;
