import withSession from '../../api/withSession';
import Layout from '../../components/Layout';
import TemplateList from '../../containers/templates/Templates';
import { getTemplates } from '../../controllers/templates';

const Templates = ({ templates }) => {
  return (
    <Layout>
      <TemplateList templates={templates} title="Les derniers templates" />
    </Layout>
  );
};

export const getServerSideProps = withSession(
  async ({ sessionToken }) => {
    console.log('sessionToken: ', sessionToken);
    const templates = await getTemplates();

    return {
      props: {
        templates: templates.map((t) => t.toJSON()),
      },
    };
  },
);

export default Templates;
