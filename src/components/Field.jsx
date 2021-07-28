const classes = {
  fullWidth: {
    width: '100%',
  },
  input: {
    borderColor: 'rgb(227, 227, 227)',
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
};

const Field = ({
 label, register, required, className, name, fullWidth,
 placeholder, rootClassName, labelClassName, defaultValue,
}) => (
  <div css={[fullWidth && classes.fullWidth, rootClassName]}>
    {label && (
      <label css={labelClassName}>
        {label}
      </label>
    )}
    <input
      {...register(name, { required })}
      css={[classes.input, className]}
      placeholder={placeholder}
      defaultValue={defaultValue}
    />
  </div>
);

export default Field;
