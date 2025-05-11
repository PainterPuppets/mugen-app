import React from 'react';
import { observer } from 'mobx-react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {
  Form, Input, Button, Checkbox, message
} from 'antd';
import './styles.less';

interface Props {
  loading?: boolean;
  username?: string;
  onLogin: Function;
}

const LoginForm: React.SFC<Props> = observer((props) => {

  const handleSubmit = (values: any) => {
    props.onLogin(values.Username, values.Password, values.remember).then(() => {
      message.success('登录成功');
    });
  }

  return (
    <Form
      className="login-form"
      name="login-form"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="Username"
        rules={[{ required: true, message: '请输入你的用户名!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="Password"
        rules={[{ required: true, message: '请输入你的密码!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        name="remember"
        valuePropName="checked"
        initialValue={true}
      >
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
});

export default LoginForm;
