import { useState } from 'react';

import { TRACKING_API } from '../../api/api';
import Page from '../../components/Page';
import TrackingUploadCsvForm from './TrackingUploadCsvForm';

const TrackingUploadCsv = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    console.log('values: ', values);
    // setError(csvUploadValidation(values));

    const formData = new FormData();
    values.csv.forEach((file) => {
      formData.append('csv[]', file.originFileObj);
    });

    await TRACKING_API.uploadCsv(formData);

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
