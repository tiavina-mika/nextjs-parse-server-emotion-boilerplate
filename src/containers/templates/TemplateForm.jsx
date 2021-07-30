import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import Field from '../../components/Field';
import FormButtons from '../../components/FormButtons';

const schema = yup.object().shape({
  name: yup.string().required(),
});

const TemplateForm = ({
  onSubmit, defaultValues,
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
      <FormButtons
        secondaryAction={() => reset(defaultValues)}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default TemplateForm;
