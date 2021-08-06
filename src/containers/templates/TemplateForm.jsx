import { Form } from 'antd';

import FormButtons from '../../components/FormButtons';
import FormItem from '../../components/FormItem';
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
      <FormButtons
        secondaryAction={onReset}
      />
    </Form>
  );
};

export default TemplateForm;
