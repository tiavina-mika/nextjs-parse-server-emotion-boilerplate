import { useRouter } from 'next/router';

import { AUTH_API } from '../../api/api';
import CardActions from '../../components/card/CardActions';
import Form from '../../components/form/Form';
import FormItem from '../../components/form/FormItem';
import { PATH_NAMES } from '../../utils/constants';
import { signupValidation } from '../../utils/validations';

const SignupForm = () => {
  const router = useRouter();

  const onSubmit = async (values) => {
    await AUTH_API.signup(values);

    router.push('/templates');
  };

  const onSecondaryAction = async () => {
    router.push(PATH_NAMES.login);
  };

  return (
    <Form
      name="signupForm"
      onFinish={onSubmit}
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
      <CardActions
        onSecondaryAction={onSecondaryAction}
        primaryTextButton="créer le compte"
        secondaryTextButton="Se connecter"
      />
    </Form>
  );
};

export default SignupForm;
