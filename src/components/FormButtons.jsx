import Button from './Button';

const classes = {
  submitButton: (theme) => ({
    marginTop: theme.spacing(2),
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
        css={classes.submitButton}
        disabled={isSubmitting}
        type="submit"
        fullWidth
      />
      { secondaryAction && (
        <Button
          text={secondaryButtonText || 'Annuler'}
          onClick={secondaryAction}
          css={classes.resetButton}
          disabled={isSubmitting}
          type="button"
          color="default"
          fullWidth
        />
      )}
    </div>
  );
};

export default FormButtons;
