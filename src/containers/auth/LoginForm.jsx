import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { AUTH_API } from '../../api/api';
import Field from '../../components/Field';
import FormButtons from '../../components/FormButtons';
import { updateIsAuthIntoLocalStorage } from '../../utils/utils';
import { loginSchema } from '../../utils/validations';

const LoginForm = () => {
  const {
    register, handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();

  const onSubmit = async (values) => {
    // send the form values to the login api
    const response = await AUTH_API.login(values);

    // store if connected to the local storage
    if (response.data.success) {
      updateIsAuthIntoLocalStorage();
    }

    // go to the home page if logged in successfully
    router.push('/');
  };

  return (
    <form className="flexColumn stretchSelf" onSubmit={handleSubmit(onSubmit)}>
      <Field
        name="email"
        register={register}
        placeholder="Nom"
        error={errors.email?.message}
        required
        fullWidth
      />
      <Field
        name="password"
        register={register}
        placeholder="Nom"
        error={errors.password?.message}
        type="password"
        required
        fullWidth
      />
      <FormButtons
        primaryButtonText="Se connecter"
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default LoginForm;
