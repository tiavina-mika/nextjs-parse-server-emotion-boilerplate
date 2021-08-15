import withSession from '../../api/withSession';
import Layout from '../../components/Layout';
import Page from '../../components/Page';
import TemplateList from '../../containers/templates/Templates';
import { getCurrentUser } from '../../controllers/auth';
import { getTemplates } from '../../controllers/templates';

const Templates = ({ templates, currentUser }) => {
  console.log('currentUser: ', currentUser);

  return (
    <Layout>
      <Page title="Liste des templates" headTitle="Templates">
        <TemplateList templates={templates} />
      </Page>
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

export default Templates;
