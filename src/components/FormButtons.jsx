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
  isSubmitting, primaryButtonText, secondaryButtonText, secondaryAction,
}) => {
  return (
    <div className="flexCenter stretchSelf">
      <Button
        text={primaryButtonText || 'Enregistrer'}
        className={classes.submitButton}
        disabled={isSubmitting}
        htmlType="submit"
        fullWidth
      />
      {secondaryAction && (
        <Button
          text={secondaryButtonText || 'Annuler'}
          onClick={secondaryAction}
          className={classes.resetButton}
          disabled={isSubmitting}
          htmlType="button"
          type="default"
          fullWidth
        />
      )}
    </div>
  );
};

FormButtons.propTypes = {
  primaryButtonText: PropTypes.string,
  isSubmitting: PropTypes.bool,
  secondaryButtonText: PropTypes.string,
  secondaryAction: PropTypes.func,
};

export default FormButtons;
