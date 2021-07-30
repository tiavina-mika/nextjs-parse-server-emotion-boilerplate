import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { AUTH_API } from '../../api/api';
import Field from '../../components/Field';
import FormButtons from '../../components/FormButtons';
import { signupSchema } from '../../utils/validations';

const SignupForm = () => {
  const {
    register, handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const router = useRouter();

  const onSubmit = async (values) => {
    await AUTH_API.signup(values);

    router.push('/templates');
  };

  return (
    <form className="flexColumn stretchSelf" onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="email"
        register={register}
        placeholder="Email"
        error={errors.email?.message}
        required
        fullWidth
      />
      <Field
        name="password"
        register={register}
        placeholder="Mot de passe"
        error={errors.password?.message}
        type="password"
        required
        fullWidth
      />
      <Field
        name="passwordConfirmation"
        register={register}
        placeholder="Confirmation mot de passe"
        error={errors.passwordConfirmation?.message}
        type="password"
        required
        fullWidth
      />
      <FormButtons
        primaryButtonText="Créer le compte"
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default SignupForm;
