import Layout from '../components/Layout';
import Page from '../components/Page';
import LoginForm from '../containers/auth/LoginForm';

const Login = () => {
  return (
    <Layout>
      <Page
        title="Se connecter"
        alignment="center"
      >
        <LoginForm size="sm" />
      </Page>
    </Layout>
  );
};

export default Login;
