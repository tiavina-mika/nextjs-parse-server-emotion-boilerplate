import { Form as AntdForm } from 'antd';

import CardActions from '../../components/card/CardActions';
import Form from '../../components/form/Form';
import FormItem from '../../components/form/FormItem';
import { templateValidation } from '../../utils/validations';

const TemplateForm = ({
  onSubmit, initialValues,
}) => {
  const [form] = AntdForm.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      name="templateForm"
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <FormItem
        name="name"
        placeholder="Nom"
        rules={templateValidation.name}
        fullWidth
      />
      <CardActions
        onSecondaryAction={onReset}
      />
    </Form>
  );
};

export default TemplateForm;
