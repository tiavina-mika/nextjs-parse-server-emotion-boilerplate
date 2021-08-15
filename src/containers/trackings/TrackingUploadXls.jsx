import { useState } from 'react';

import { useRouter } from 'next/router';

import { uploadTracking } from '../../api/trackings';
import Page from '../../components/Page';
import TrackingUploadXlsForm from './TrackingUploadXlsForm';

const TrackingUploadXls = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (values) => {
    const { error: uploadError, loading: uploadLoading } = await uploadTracking(values);
    setError(uploadError);
    setLoading(uploadLoading);

    if (uploadError) return;

    router.push('/');
  };

  return (
    <Page
      title="Importer un fichier excel"
      alignment="center"
      error={error}
      loading={loading}
    >
      <TrackingUploadXlsForm onSubmit={onSubmit} />
    </Page>
  );
};

export default TrackingUploadXls;
