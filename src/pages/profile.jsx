import withSession from '../api/withSession';
import Layout from '../components/Layout';
import { getCurrentUser } from '../controllers/auth';

const Profile = ({ currentUser }) => {
  return (
    <Layout>
      <h1>Email: {currentUser.username}</h1>
    </Layout>
  );
};

export const getServerSideProps = withSession(
  async ({ sessionToken }) => {
    let currentUser = null;
    if (sessionToken) {
      currentUser = await getCurrentUser(sessionToken);
    }

    return {
      props: {
        currentUser,
      },
    };
  },
);

export default Profile;
