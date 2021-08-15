import { useState } from 'react';

import Alert from '../../components/Alert';
import Typography from '../../components/Typography';
import TrackingUploadCsvForm from './TrackingUploadCsvForm';

const classes = {
  container: (theme) => ({
    marginTop: theme.spacing(3),
  }),
};

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
    <div className="flexCenter">
      <div css={classes.container} className="flexCenter">
        {error && <Alert message={error} type="error" />}
        {loading && <Alert message="Loading..." type="info" />}
        <Typography variant="title" level={1}>
          Importer un fichier csv
        </Typography>
        <TrackingUploadCsvForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default TrackingUploadCsv;
