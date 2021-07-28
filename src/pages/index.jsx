import withSession from '../api/withSession';
import TemplateList from '../containers/templates/Templates';

const Home = ({ templates }) => {
  return <TemplateList templates={templates} />;
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
