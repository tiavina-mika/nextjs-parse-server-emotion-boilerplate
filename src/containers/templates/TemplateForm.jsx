import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Button from '../../components/Button';
import Field from '../../components/Field';

const schema = yup.object().shape({
  name: yup.string().required(),
});

const classes = {
  container: (theme) => ({
    width: 500,
    marginTop: theme.spacing(3),
  }),
  button: (theme) => ({
    marginTop: theme.spacing(3),
  }),
};

const TemplateForm = ({
  onSubmit, title, defaultValues, buttonText,
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <div className="flexCenter">
      <div css={classes.container} className="flexCenter">
        {title && (
          <h2>
            {title}
          </h2>
        )}
        <form className="flexColumn stretchSelf" onSubmit={handleSubmit(onSubmit)}>
          <Field
            name="name"
            register={register}
            // defaultValue={defaultValues?.name}
            placeholder="Nom"
            error={errors.name?.message}
            required
            fullWidth
          />
          <Button text={buttonText || 'Enregistrer'} className={classes.button} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default TemplateForm;
