import Page from '../components/Page';
import LoginForm from '../containers/auth/LoginForm';

const Login = () => {
  return (
    <Page
      title="Se connecter"
      alignment="center"
    >
      <LoginForm size="sm" />
    </Page>
  );
};

export default Login;
