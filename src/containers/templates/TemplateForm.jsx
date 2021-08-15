import { Form } from 'antd';

import CardActions from '../../components/card/CardActions';
import FormItem from '../../components/form/FormItem';
import { templateValidation } from '../../utils/validations';

const TemplateForm = ({
  onSubmit, initialValues,
}) => {
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Form
      className="stretchSelf"
      form={form}
      name="templateForm"
      onFinish={onSubmit}
      initialValues={initialValues}
      layout="vertical"
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
