import withSession from '../api/withSession';
import Layout from '../components/Layout';
import TemplateList from '../containers/templates/Templates';

const Home = ({ templates }) => {
  return (
    <Layout>
      <TemplateList templates={templates} />
    </Layout>
  );
};

export const getServerSideProps = withSession(
  async ({ sessionToken }) => {
    console.log('sessionToken: ', sessionToken);
    const templates = await new Parse.Query('Template').find();

    return {
      props: {
        templates: templates.map((t) => t.toJSON()),
      },
    };
  },
);

export default Home;
