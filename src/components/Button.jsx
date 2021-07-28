const classes = {
  button: (theme) => ({
    color: '#fff',
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    fontWeight: 400,
    margin: '5px auto 20px auto',
    textAlign: 'center',
    border: 'none',
    padding: '14px 22px',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  }),
  text: {
    fontSize: 14,
  },
};

const Button = ({
 text, type, className, textClassName,
}) => {
  return (
    <button css={[classes.button, className]} type={type === 'submit' ? 'submit' : 'button'}>
      <span css={[classes.text, textClassName]}>{text}</span>
    </button>
  );
};

export default Button;
