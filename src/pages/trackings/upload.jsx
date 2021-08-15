import withAuth from '../../api/withAuth';
import Layout from '../../components/Layout';
import TrackingUploadXls from '../../containers/trackings/TrackingUploadXls';

const Upload = () => {
  return (
    <Layout>
      <TrackingUploadXls />
    </Layout>
  );
};

export default withAuth(Upload);
