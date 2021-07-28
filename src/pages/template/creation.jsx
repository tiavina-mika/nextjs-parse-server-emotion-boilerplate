import TemplateForm from '../../containers/template/TemplateForm';

const TemplateCreation = () => {
  const onSubmit = (data) => {
    console.log(JSON.stringify(data));
  };

  return (
    <TemplateForm
      title="Ajouter nouveau template"
      onSubmit={onSubmit}
    />
  );
};

export default TemplateCreation;
