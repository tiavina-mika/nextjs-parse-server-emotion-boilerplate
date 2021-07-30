import Auth from '../containers/Auth';
import LoginForm from '../containers/auth/LoginForm';

const Login = () => {
  return (
    <Auth title="Se connecter">
      <LoginForm />
    </Auth>
  );
};

export default Login;
