import PropTypes from 'prop-types';

const classes = {
  root: (theme) => ({
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }),
  fullWidth: {
    width: '100%',
  },
  input: {
    // borderColor: 'rgb(227, 227, 227)',
    borderRadius: 4,
    fontWeight: 400,
    background: '#fff',
    fontSize: 15,
    padding: 12,
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
    marginTop: theme.spacing(1),
  }),
};

const Field = ({
 label, register, required, className, name, fullWidth,
 placeholder, rootCss, labelCss, rootClassName, css,
 error, type,
}) => (
  <div css={[classes.root, fullWidth && classes.fullWidth, rootCss]} className={rootClassName}>
    {/* ------------- label ------------- */}
    {label && (
      <label css={labelCss}>
        {label}
      </label>
    )}

    {/* ------------- input ------------- */}
    <input
      {...register(name, { required })}
      css={[classes.input, error && classes.invalidInput, css]}
      className={className}
      placeholder={placeholder}
      type={type || 'text'}
    />

    {/* ------------- error ------------- */}
    {error && (
      <div css={classes.error}>
        {error}
      </div>
    )}
  </div>
);

Field.propTypes = {
  label: PropTypes.string,
  register: PropTypes.any,
  required: PropTypes.bool,
  className: PropTypes.string,
  name: PropTypes.string,
  css: PropTypes.string,
  placeholder: PropTypes.string,
  rootCss: PropTypes.string,
  labelCss: PropTypes.string,
  rootClassName: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.any,
  fullWidth: PropTypes.bool,
};

export default Field;
