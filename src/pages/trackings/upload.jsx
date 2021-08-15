import withAuth from '../../api/withAuth';
import Layout from '../../components/Layout';
import TrackingUploadCsv from '../../containers/trackings/TrackingUploadCsv';

const Upload = () => {
  return (
    <Layout>
      <TrackingUploadCsv />
    </Layout>
  );
};

export default withAuth(Upload);
