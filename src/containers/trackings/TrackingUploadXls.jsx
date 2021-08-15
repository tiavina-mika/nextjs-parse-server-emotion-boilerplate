import { useState } from 'react';

import { TRACKING_API } from '../../api/api';
import Page from '../../components/Page';
import TrackingUploadXlsForm from './TrackingUploadXlsForm';

const TrackingUploadXls = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    console.log('values: ', values);
    // setError(xlsUploadValidation(values));

    const formData = new FormData();
    values.xls.forEach((file) => {
      formData.append('xls[]', file.originFileObj);
    });

    await TRACKING_API.uploadXls(formData);

    console.log('values: ', values);
    // const { error: creationError, loading: creationLoading } = await createTemplate(values);
    // setError(creationError);
    // setLoading(creationLoading);

    // if (creationError) return;

    // router.push('/');
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
