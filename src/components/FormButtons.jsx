import PropTypes from 'prop-types';

import Button from './Button';

const classes = {
  submitButton: (theme) => ({
    marginTop: theme.spacing(0),
  }),
  resetButton: (theme) => ({
    marginTop: theme.spacing(1),
    paddingLeft: 25,
    paddingRight: 25,
  }),
};

const FormButtons = ({
  primaryButtonText, secondaryButtonText, secondaryAction, disabled,
}) => {
  return (
    <div className="flexCenter stretchSelf">
      <Button
        text={primaryButtonText || 'Enregistrer'}
        className={classes.submitButton}
        htmlType="submit"
        fullWidth
        disabled={disabled}
      />
      {secondaryAction && (
        <Button
          text={secondaryButtonText || 'Annuler'}
          onClick={secondaryAction}
          className={classes.resetButton}
          htmlType="button"
          type="default"
          fullWidth
        />
      )}
    </div>
  );
};

FormButtons.propTypes = {
  disabled: PropTypes.bool,
  primaryButtonText: PropTypes.string,
  secondaryButtonText: PropTypes.string,
  secondaryAction: PropTypes.func,
};

export default FormButtons;
