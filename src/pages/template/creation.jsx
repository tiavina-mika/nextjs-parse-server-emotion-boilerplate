import { useForm } from 'react-hook-form';

import Button from '../../components/Button';
import Field from '../../components/Field';

const classes = {
  container: (theme) => ({
    width: 500,
    marginTop: theme.spacing(3),
  }),
  button: (theme) => ({
    marginTop: theme.spacing(3),
  }),
};

const TemplateCreation = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };

  return (
    <div className="flexCenter">
      <div css={classes.container} className="flexCenter">
        <h2>Ajouter nouveau template</h2>
        <form className="flexColumn alignSelf" onSubmit={handleSubmit(onSubmit)}>
          <Field name="name" register={register} placeholder="Nom" required fullWidth />
          <Button text="Enregistrer" className={classes.button} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default TemplateCreation;
