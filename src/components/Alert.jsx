import { Alert as AntdAlert } from 'antd';
import PropTypes from 'prop-types';

const classes = {
  alert: (theme) => ({
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

const Alert = ({ message, type = 'success', description }) => {
  return (
    <AntdAlert
      css={[classes.alert, classes[type]]}
      className="stretchSelf"
      message={message}
      description={description}
      type={type}
    />
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
};

export default Alert;
