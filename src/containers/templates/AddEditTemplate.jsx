import { useMemo } from 'react';

import { useRouter } from 'next/router';

import { TEMPLATE_API } from '../../api/api';
import Layout from '../../components/Layout';
import TemplateForm from './TemplateForm';

const classes = {
  container: (theme) => ({
    width: 500,
    marginTop: theme.spacing(3),
  }),
};

const AddEditTemplate = ({ template }) => {
  const isAddMode = !template;

  const router = useRouter();

  const onSubmit = async (values) => {
    if (isAddMode) {
      await TEMPLATE_API.createTemplate(values);

      router.push('/templates');
      return;
    }

    const data = await TEMPLATE_API.editTemplate(template.objectId, values);
    console.log('data: ', data);
    router.push('/templates/' + data.data.objectId);
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
