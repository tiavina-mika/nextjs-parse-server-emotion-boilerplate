import { useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import { TEMPLATE_API } from '../../api/api';
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
  const isAddMode = !template;

  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      if (isAddMode) {
        const result = await TEMPLATE_API.createTemplate(values);

        if (!result.data.success) {
          setError(result.data.message);
          return;
        }

        router.push('/');
        return;
      }

      const data = await TEMPLATE_API.editTemplate(template.objectId, values);
      router.push('/templates/' + data.data.objectId);
    } catch (e) {
      if (e.response.data) {
        setError(e.response.data.message);
      }
    }
  };

  const defaultValues = useMemo(() => {
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
          {error && <Alert text={error} variant="error" />}
          <h2>
            {isAddMode ? 'Ajouter nouveau template' : 'Modifier template'}
          </h2>
          <TemplateForm onSubmit={onSubmit} defaultValues={defaultValues} />
        </div>
      </div>
    </Layout>

  );
};

export default AddEditTemplate;
