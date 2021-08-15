import withAuth from '../../../api/withAuth';
import withSession from '../../../api/withSession';
import Layout from '../../../components/Layout';
import AddEditTemplate from '../../../containers/templates/AddEditTemplate';

const EditTemplate = () => {
  return (
    <Layout>
      <AddEditTemplate />
    </Layout>
  );
};
export const getServerSideProps = withSession(
  async ({ req }) => {
    const template = await new Parse.Query('Template')
      .equalTo('objectId', req.params.id)
      .first();

    return {
      props: {
        template: template.toJSON(),
      },
    };
  },
);

export default withAuth(EditTemplate);
