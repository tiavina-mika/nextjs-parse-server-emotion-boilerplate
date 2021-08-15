import Page from '../components/Page';
import SignupForm from '../containers/auth/SignupForm';

const Signup = () => {
  return (
    <Page
      title="Création de compte"
      alignment="center"
    >
      <SignupForm />
    </Page>
  );
};

export default Signup;
