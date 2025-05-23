import React from 'react';
import { observer } from 'mobx-react';
import { Upload, message, Spin } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import AuthStore from '@/shared/stores/AuthStore';
import './Avatar.less';

@observer
class AvatarUploader extends React.Component<any, {
  isUploading: boolean,
  isEditing: boolean,
  avatar: Blob | null,
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      isUploading: false,
      isEditing: false,
      avatar: null,
    };
  }

  beforeUpload = (avatar: Blob) => {
    this.setState({
      isUploading: true,
    });

    AuthStore.uploadAvatar(avatar).then(() => {
      message.success('头像修改成功')
    }).catch((err) => {
      console.log(err)
      message.error('头像修改失败，请重试')
    }).finally(() => {
      this.setState({ isUploading: false });
    });

    return false;
  }

  render() {
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className={`avatar-uploader ${this.props.className}`}
        accept=".jpg,.png,.jpeg"
        showUploadList={false}
        multiple={false}
        beforeUpload={this.beforeUpload}
      >
        <div className="avatar-img" style={{backgroundImage: `url(${AuthStore.user.avatarUrl})`}}>
          <div
            className="avatar-layer"
            style={(this.state.isUploading) ? { opacity:  1 } : {}}
          >
            {this.state.isUploading ?
              <Spin className="loading-icon"/> :
              <span><UserOutlined />上传头像</span>
            }
          </div>
        </div>
      </Upload>
    );
  }
}

export default AvatarUploader;
