import { useState } from 'react';

import { Upload as AntdUpload } from 'antd';

import Button from '../../components/Button';
import Typography from '../../components/Typography';
import { mq } from '../../styles/styles';
import { imageUploadValidation } from '../../utils/validations';

const { Dragger } = AntdUpload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
};

const classes = {
  upload: ({ error }) => (theme) => mq({
    marginTop: 90,
    marginBottom: 228,
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

const label = 'Accédez à votre bibliothèque locale de photo et sélectionnez les photos que vous souhaitez utiliser.';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const beforeUpload = (fileInput) => {
    const errorMessage = imageUploadValidation(fileInput);
    setError(errorMessage);
    // message.error(errorMessage);
  };

  const onChange = async ({ file: inputFile }) => {
    if (inputFile.status === 'uploading') {
      // console.log(info.inputFile, info.inputFileList);
    }

    if (inputFile.status === 'done') {
      setFile(inputFile);

      message.success(`${inputFile.name} file uploaded successfully.`);
    }

    // if (file.status === 'error') {
    //   message.error(`${file.name} file upload failed.`);
    // }
    // } else if (status === "error") {
    //   for (const file of fileList) {
    //     message.error(`${file.name} file upload failed.`);
    //   }
    // }
  };

  // const onCheckImages = (checkedValues) => {
  //   console.log('checkedValues: ', checkedValues);
  // };

  return (
    <div css={classes.upload({ error })} className="flexCenter">
      <Dragger
        {...props}
        style={classes.dragger}
        onChange={onChange}
        showUploadList={false}
        beforeUpload={beforeUpload}
      >
        <div css={classes.uploadInput} className="flexCenter">
          <div css={classes.content} className="flexCenter">
            <Typography className={classes.text}>
              {error || label}
            </Typography>
            <Button text="Accéder à vos photos" className={classes.button} />
          </div>
        </div>
      </Dragger>
    </div>
  );
};

export default Upload;
