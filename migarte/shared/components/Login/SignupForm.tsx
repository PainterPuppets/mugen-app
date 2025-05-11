import React from 'react';
import { observer } from 'mobx-react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, message, Form } from 'antd';

interface Props {
  onSignup: Function;
}

const SignupForm: React.SFC<Props> = observer((props) => {

  const handleSubmit = (values: any) => {
    props.onSignup(values.username, values.email, values.password).then(() => {
      message.success('注册成功');
    });
  }

  return (
    <Form onFinish={handleSubmit} className="sigin-form">
      <Form.Item
        name="email"
        rules={[
          { type: 'email', message: '请输入正确的邮箱' },
          { required: true, message: '请输入邮箱!' }
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="请输入电子邮箱（Email）" />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item
        name="confirm"
        rules={[
          { required: true, message: '请确认你的密码!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('两次输入的密码不一致!');
            },
          }),
        ]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="请再次输入密码" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  );
});

export default SignupForm;
