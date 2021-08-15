import Layout from '../components/Layout';
import Page from '../components/Page';
import SignupForm from '../containers/auth/SignupForm';

const Signup = () => {
  return (
    <Layout>
      <Page
        title="Création de compte"
        alignment="center"
        headTitle="Créer un compte"
      >
        <SignupForm />
      </Page>
    </Layout>
  );
};

export default Signup;
