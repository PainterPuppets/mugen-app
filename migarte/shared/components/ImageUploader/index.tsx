import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { Upload } from "antd";
import FileStore from '@/shared/stores/FileStore';
import './style.less'

interface Props {
  defaultImageUrl?: string;
  className?: string;
  onUpload: (url: string) => void;
}

const ImageUploader: React.SFC<Props> = observer((props) => {
  const [imageChanged, setImageChanged] = useState(false);
  const [imageUrl, setImageUrl] = useState(props.defaultImageUrl || '');

  useEffect(() => {
    if (!imageChanged) {
      setImageUrl(props.defaultImageUrl || '')
    }
  }, [props.defaultImageUrl, imageChanged])

  const beforeUpload = (image: Blob) => {
    FileStore.uploadImage(image).then((res) => {
      setImageChanged(true);
      setImageUrl(res.data.url);
      props.onUpload(res.data.url);
    })

    return false;
  };

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className={`image-uploader ${props.className || ''}`}
      accept=".jpg,.png,.jpeg"
      showUploadList={false}
      multiple={false}
      beforeUpload={beforeUpload}
    >
      <div className="image-uploader-viewer" style={{ backgroundImage: `url(${imageUrl})`}} />
    </Upload>
  );
});

export default ImageUploader;
