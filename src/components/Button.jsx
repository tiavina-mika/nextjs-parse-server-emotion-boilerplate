import PropTypes from 'prop-types';

const classes = {
  button: {
    color: '#fff',
    borderRadius: 4,
    fontWeight: 400,
    textAlign: 'center',
    border: 'none',
    padding: '14px 22px',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  primary: (theme) => ({
    backgroundColor: theme.colors.primary,
  }),
  secondary: (theme) => ({
    backgroundColor: theme.colors.secondary,
  }),
  default: {
    backgroundColor: 'grey',
  },
  text: {
    fontSize: 14,
  },
  fullWidth: {
    flex: 1,
    alignSelf: 'stretch',
  },
};

const Button = ({
 text, type, className, css, textCss, disabled = false,
 onClick, color = 'primary', fullWidth,
}) => {
  return (
    <button
      css={[classes.button, css, classes[color], fullWidth && classes.fullWidth]}
      className={className}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}
    >
      <span css={[classes.text, textCss]}>{text}</span>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'button']),
  className: PropTypes.string,
  css: PropTypes.string,
  textCss: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  color: PropTypes.oneOf(['primary', 'secondary', 'default']),
  fullWidth: PropTypes.bool,
};

export default Button;
