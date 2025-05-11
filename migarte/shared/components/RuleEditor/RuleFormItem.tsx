import React, { useState } from 'react';
import { EditOutlined } from "@ant-design/icons";
import { AnyRule } from '@/interfaces/rule';
import { DEFAULT_RULE } from './constants';
import RuleEditor, { renderRule } from './index';

interface RuleFormItemProps {
  value?: AnyRule;
  onChange?: (value: AnyRule) => void;
}

const RuleFormItem: React.FC<RuleFormItemProps> = ({ value = DEFAULT_RULE, onChange }) => {
  const [editorVisible, setEditorVisible] = useState(false)

  const onSave = (rule: AnyRule) => {
    if (onChange) {
      onChange(rule);
    }
    console.log(rule);
  }

  return (
    <React.Fragment>
      {renderRule(value)}
      <EditOutlined 
        className="primary-text"
        style={{ marginLeft: 8 }}
        onClick={() => setEditorVisible(true)}
      />
      <RuleEditor
        rule={value}
        visible={editorVisible}
        onCancel={() => setEditorVisible(false)}
        onSave={onSave}
      />
    </React.Fragment>
  )
};

export default RuleFormItem;