import { InboxOutlined } from '@ant-design/icons';

const DragUpload = () => {
  return (
    <div>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </div>
  );
};

export default DragUpload;
