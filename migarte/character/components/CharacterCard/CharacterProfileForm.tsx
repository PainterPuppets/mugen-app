import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
} from "antd";
import { FormProps } from "antd/lib/form";
import {
  Gender,
  GENDER_MAP,
} from "@/interfaces/character";
import { IMugenCharacter } from "@/interfaces/mugen";

const { Option } = Select;

interface AttackPatternFormProps extends FormProps {
  character?: IMugenCharacter;
}

const CharacterProfileForm: React.SFC<AttackPatternFormProps> = (props) => {
  let initialValues: any = {};

  if (props.character) {
    initialValues = Object.assign(initialValues, props.character)
  }

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      initialValues={initialValues}
      onFinish={props.onFinish}
    >
      <Form.Item label="名字" name="name" required>
        <Input />
      </Form.Item>
      <Form.Item label="性别" name="gender">
        <Select>
          {Object.keys(GENDER_MAP).map((gender) => (
            <Option key={gender} value={parseInt(gender)}>
              {GENDER_MAP[(parseInt(gender) as Gender)]}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="外貌" name="appearance">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="简介" name="overview">
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 20, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          保存
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CharacterProfileForm;
