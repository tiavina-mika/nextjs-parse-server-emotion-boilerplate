import { Form } from 'antd';
import { useRouter } from 'next/router';

import { AUTH_API } from '../../api/api';
import FormButtons from '../../components/FormButtons';
import FormItem from '../../components/FormItem';
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

  return (
    <Form
      className="stretchSelf"
      name="loginForm"
      onFinish={onSubmit}
      layout="vertical"
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
      <FormButtons
        primaryButtonText="Se connecter"
      />
    </Form>
  );
};

export default LoginForm;
