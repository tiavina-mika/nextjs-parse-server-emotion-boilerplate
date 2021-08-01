const classes = {
  alert: (theme) => ({
    flex: 1,
    padding: `${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    borderRadius: 3,
  }),
  success: (theme) => ({
    color: theme.colors.successPrimary,
    backgroundColor: theme.colors.successSecondary,
    border: '1px solid ' + theme.colors.successPrimary,
  }),
  error: (theme) => ({
    color: theme.colors.errorPrimary,
    backgroundColor: theme.colors.errorSecondary,
    border: '1px solid ' + theme.colors.errorPrimary,
  }),
  warning: (theme) => ({
    color: theme.colors.warningPrimary,
    backgroundColor: theme.colors.warningSecondary,
    border: '1px solid ' + theme.colors.warningPrimary,
  }),
  info: (theme) => ({
    color: theme.colors.infoPrimary,
    backgroundColor: theme.colors.infoSecondary,
    border: '1px solid ' + theme.colors.infoPrimary,
  }),
};

const Alert = ({ text, variant = 'success' }) => {
  return (
    <div css={[classes.alert, classes[variant]]} className="flexRow stretchSelf">
      <span>
        {text}
      </span>
    </div>
  );
};

export default Alert;
