import { Form } from 'antd';
import { useRouter } from 'next/router';

import { AUTH_API } from '../../api/api';
import FormButtons from '../../components/FormButtons';
import FormItem from '../../components/FormItem';
import { signupValidation } from '../../utils/validations';

const SignupForm = () => {
  const router = useRouter();

  const onSubmit = async (values) => {
    await AUTH_API.signup(values);

    router.push('/templates');
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
        rules={signupValidation.email}
        fullWidth
      />
      <FormItem
        name="password"
        type="password"
        placeholder="Mot de passe"
        rules={signupValidation.password}
        fullWidth
        hasFeedback
      />
      <FormItem
        name="passwordConfirmation"
        type="password"
        placeholder="Confirmation mot de passe"
        rules={signupValidation.passwordConfirmation}
        fullWidth
        hasFeedback
      />
      <FormButtons
        primaryButtonText="Créer le compte"
      />
    </Form>
  );
};

export default SignupForm;
