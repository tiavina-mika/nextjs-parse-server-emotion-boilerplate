
import { useMemo } from 'react';

import TemplateForm from './TemplateForm';

const classes = {
  container: (theme) => ({
    width: 500,
    marginTop: theme.spacing(3),
  }),
};

const AddEditTemplate = ({ template }) => {
  const isAddMode = !template;
  
  const onSubmit = (data) => {
    console.log('data: ', data);
      // return isAddMode
      //     ? createUser(data)
      //     : updateUser(user.id, data);
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