import Auth from '../containers/Auth';
import SignupForm from '../containers/auth/SignupForm';

const Signup = () => {
  return (
    <Auth title="Se connecter">
      <SignupForm />
    </Auth>
  );
};

export default Signup;
