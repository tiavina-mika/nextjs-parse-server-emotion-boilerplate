import { useState } from 'react';

import Page from '../../components/Page';
import TrackingUploadCsvForm from './TrackingUploadCsvForm';

const TrackingUploadCsv = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    // setError(csvUploadValidation(values));
    console.log('values: ', values);
    // const { error: creationError, loading: creationLoading } = await createTemplate(values);
    // setError(creationError);
    // setLoading(creationLoading);

    // if (creationError) return;

    // router.push('/');
  };

  return (
    <Page
      title="Importer un fichier csv"
      alignment="center"
      error={error}
      loading={loading}
    >
      <TrackingUploadCsvForm onSubmit={onSubmit} />
    </Page>
  );
};

export default TrackingUploadCsv;
