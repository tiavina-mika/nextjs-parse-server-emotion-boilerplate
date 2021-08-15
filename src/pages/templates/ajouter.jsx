import withAuth from '../../api/withAuth';
import Layout from '../../components/Layout';
import AddEditTemplate from '../../containers/templates/AddEditTemplate';

const AddTemplate = () => {
  return (
    <Layout>
      <AddEditTemplate />
    </Layout>
  );
};

export default withAuth(AddTemplate);
