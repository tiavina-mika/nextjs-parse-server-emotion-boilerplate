import withSession from '../../api/withSession';
import Layout from '../../components/Layout';
import TemplateList from '../../containers/templates/Templates';
import { getCurrentUser } from '../../controllers/auth';
import { getTemplates } from '../../controllers/templates';

const Home = ({ templates, currentUser }) => {
  console.log('currentUser: ', currentUser);
  // console.log('currentUser: ', currentUser);
  // useEffect(() => {
  //   const init = async () => {
  //     const response = await AUTH_API.getCurrentUser();
  //     console.log('response: ', response.data.user.objectId);
  //   };

  //   init();
  // }, []);

  return (
    <Layout>
      <TemplateList templates={templates} />
    </Layout>
  );
};

export const getServerSideProps = withSession(
  async ({ sessionToken }) => {
    const templates = await getTemplates();
    let currentUser = null; // undefined cannot be serialized as json
    if (sessionToken) {
      currentUser = await getCurrentUser(sessionToken);
    }

    return {
      props: {
        templates: templates.map((t) => t.toJSON()),
        currentUser,
      },
    };
  },
);

export default Home;
