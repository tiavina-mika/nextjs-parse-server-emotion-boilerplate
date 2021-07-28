import withSession from '../../../api/withSession';
import AddEditTemplate from '../../../containers/templates/AddEditTemplate';

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

export default AddEditTemplate;
