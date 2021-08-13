import { useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { createTemplate, editTemplate } from '../../api/templates';
import Alert from '../../components/Alert';
import Layout from '../../components/Layout';
import TemplateForm from './TemplateForm';

const classes = {
  container: (theme) => ({
    width: 500,
    marginTop: theme.spacing(3),
  }),
};

const AddEditTemplate = ({ template }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isAddMode = !template;

  const router = useRouter();

  const onSubmit = async (values) => {
    // ------------------------------------- //
    // -------------- creation ------------- //
    // ------------------------------------- //
    if (isAddMode) {
      const { error: creationError, loading: creationLoading } = await createTemplate(values);
      setError(creationError);
      setLoading(creationLoading);

      if (creationError) return;

      router.push('/');
      return;
    }

    // ------------------------------------- //
    // -------------- edition -------------- //
    // ------------------------------------- //
    const {
      error: editionError,
      loading: editionLoading,
      result,
    } = await editTemplate(template.objectId, values);
    setError(editionError);
    setLoading(editionLoading);

    if (!result) return;

    router.push('/templates/' + result.data.objectId);
  };

  const initialValues = useMemo(() => {
    if (!template) return;
    const { name } = template;
    return {
      name,
    };
  }, [template]);

  return (
    <Layout>
      <div className="flexCenter">
        <div css={classes.container} className="flexCenter">
          {error && <Alert message={error} type="error" />}
          {loading && <Alert message="Loading..." type="info" />}
          <h2>
            {isAddMode ? 'Ajouter nouveau template' : 'Modifier template'}
          </h2>
          <TemplateForm onSubmit={onSubmit} initialValues={initialValues} />
        </div>
      </div>
    </Layout>
  );
};

export default AddEditTemplate;
