import { useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { createTemplate, editTemplate } from '../../api/templates';
import Page from '../../components/Page';
import TemplateForm from './TemplateForm';

const AddEditTemplate = ({ template }) => {
  const [error, setError] = useState('');
  console.log('error: ', error);
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
    <Page
      title={isAddMode ? 'Ajouter nouveau template' : 'Modifier template'}
      error={error}
      loading={loading}
      alignment="center"
    >
      <TemplateForm
        onSubmit={onSubmit}
        initialValues={initialValues}
      />
    </Page>
  );
};

export default AddEditTemplate;
