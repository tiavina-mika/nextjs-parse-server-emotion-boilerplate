import { useRouter } from 'next/router';

import { AUTH_API } from '../../api/api';
import CardActions from '../../components/card/CardActions';
import Form from '../../components/form/Form';
import FormItem from '../../components/form/FormItem';
import { PATH_NAMES } from '../../utils/constants';
import { updateCurrentUserLocalStorage } from '../../utils/utils';
import { loginValidation } from '../../utils/validations';

const LoginForm = () => {
  const router = useRouter();

  const onSubmit = async (values) => {
    // send the form values to the login api
    const response = await AUTH_API.login(values);

    // store if connected to the local storage
    if (!response.data.success) return;
    updateCurrentUserLocalStorage(response.data.user);
    // go to the home page if logged in successfully
    router.push('/');
  };

  const onSecondaryAction = async () => {
    router.push(PATH_NAMES.signup);
  };

  return (
    <Form
      name="loginForm"
      onFinish={onSubmit}
    >
      <FormItem
        name="email"
        placeholder="Email"
        rules={loginValidation.email}
        fullWidth
      />
      <FormItem
        name="password"
        type="password"
        placeholder="Mot de passe"
        rules={loginValidation.password}
        fullWidth
      />
      <CardActions
        onSecondaryAction={onSecondaryAction}
        primaryTextButton="Se connecter"
        secondaryTextButton="Pas encore de compte?"
      />
    </Form>
  );
};

export default LoginForm;
