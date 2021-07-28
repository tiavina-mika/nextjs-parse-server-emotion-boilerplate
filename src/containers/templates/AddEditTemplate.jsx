
import { useMemo } from 'react';

import axios from 'axios';
import { useRouter } from 'next/dist/client/router';

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
     await axios.post('http://localhost:3000/api/templates', values);
      // const data = await axios.post('http://localhost:3000/api/templates', values);
      router.push('/templates');
      return;
    }

    const data = await axios.put('http://localhost:3000/api/templates/' + template.objectId, values);
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
    <div className="flexCenter">
      <div css={classes.container} className="flexCenter">
        <h2>
          {isAddMode ? 'Ajouter nouveau template': 'Modifier template'}
        </h2>
        <TemplateForm onSubmit={onSubmit} defaultValues={defaultValues} />
      </div>
    </div>
  );
};

export default AddEditTemplate;