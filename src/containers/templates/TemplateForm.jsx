import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import FormButtons from '../../components/FormButtons';
import FormItem from '../../components/FormItem';

const schema = yup.object().shape({
  name: yup.string().required(),
});

const TemplateForm = ({
  onSubmit, defaultValues,
}) => {
  const {
    handleSubmit, reset, control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form className="flexColumn stretchSelf" onSubmit={handleSubmit(onSubmit)}>
      <FormItem
        name="name"
        control={control}
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
