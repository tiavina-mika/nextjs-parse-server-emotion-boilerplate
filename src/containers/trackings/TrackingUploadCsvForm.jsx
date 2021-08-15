import { useState } from 'react';

import { Form, Upload as AntdUpload } from 'antd';

import Button from '../../components/Button';
import CardActions from '../../components/card/CardActions';
import FormItem from '../../components/FormItem';
import Typography from '../../components/Typography';
import { mq } from '../../styles/styles';
import { trackingCsvUploadValidation } from '../../utils/validations';

const { Dragger } = AntdUpload;

const props = {
  name: 'file',
  multiple: true,
};

const label = 'Accédez à votre bibliothèque locale de photo et sélectionnez les photos que vous souhaitez utiliser.';

const classes = {
  upload: ({ error }) => (theme) => mq({
    background: error ? theme.colors.errorSecondary : '#E7FDEF',
    border: `2px dashed ${error ? theme.colors.errorPrimary : '#4752D8'}`,
    boxSizing: 'border-box',
    borderRadius: 15,
    height: 281,
    width: ['90vw', false, false, false, 1201],
  }),
  dragger: {
    background: 'none',
    border: 'none',
  },
  uploadInput: mq({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  content: {
    width: 335,
  },
  text: {
    color: '#676C75 !important',
    fontSize: '18px !important',
    fontWeight: 500,
  },
  button: {
    marginTop: 26,
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const TrackingUploadCsvForm = ({
  onSubmit,
}) => {
  const [error, setError] = useState('');
  const [form] = Form.useForm();

  const beforeUpload = (file) => {
    const errorMessage = csvUploadValidation(file);
    setError(errorMessage);
  };

  const onReset = () => {
    setError('');
    form.resetFields();
  };

  return (
    <Form
      className="stretchSelf"
      form={form}
      name="trakingUploadCsvForm"
      onFinish={onSubmit}
      layout="vertical"
    >
      <FormItem
        name="csv"
        fullWidth
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={trackingCsvUploadValidation.csv}
        component={(
          <Dragger {...props} style={classes.dragger} beforeUpload={beforeUpload}>
            <div css={[classes.upload({ error }), classes.uploadInput]} className="flexCenter">
              <div css={classes.content} className="flexCenter">
                <Typography className={classes.text}>
                  {error || label}
                </Typography>
                <Button text="Accéder à vos fichier csv" className={classes.button} />
              </div>
            </div>
          </Dragger>
        )}
      />
      <CardActions
        onSecondaryAction={onReset}
        secondaryTextButton="Initialiser"
        disabled={!!error}
        alignment="center"
        direction="horizontal"
      />
    </Form>
  );
};

export default TrackingUploadCsvForm;
