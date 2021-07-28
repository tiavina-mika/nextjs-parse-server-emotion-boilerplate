import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../../components/Button';
import Field from '../../components/Field';

const schema = yup.object().shape({
  name: yup.string().required(),
});

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

const TemplateForm = ({
  onSubmit, defaultValues, buttonText,
}) => {
  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form className="flexColumn stretchSelf" onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="name"
        register={register}
        placeholder="Nom"
        error={errors.name?.message}
        required
        fullWidth
      />
      <div className="flexCenter stretchSelf">
        <Button
          text={buttonText || 'Enregistrer'}
          css={classes.submitButton}
          disabled={isSubmitting}
          type="submit"
          fullWidth
        />
        <Button
          text="Annuler"
          onClick={() => reset(defaultValues)}
          css={classes.resetButton}
          disabled={isSubmitting}
          type="button"
          color="default"
          fullWidth
        />
      </div>
    </form>
  );
};

export default TemplateForm;
