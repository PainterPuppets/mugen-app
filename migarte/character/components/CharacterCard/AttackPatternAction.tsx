import React, { useState } from "react";
import { observer } from "mobx-react";
import { Button, Modal, message } from "antd";
import { IMugenAttack } from "@/interfaces/mugen";
import AttackPatternStore, {CreateAttackPatternData} from "@/character/stores/AttackPatternStore";
import AttackPatternForm from '@/shared/components/AttackPatternForm';

interface IProps {
  characterUuid: string;
  onUpdate?: (attackPattern: IMugenAttack) => void;
}
const AttackPatternAction: React.SFC<IProps> = observer((props) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <React.Fragment>
      <Button
        type="primary"
        style={{ marginTop: "auto" }}
        block
        onClick={() => setModalVisible(true)}
      >
        创建新的攻击预设
      </Button>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        closable={false}
        footer={null}
      >
        <AttackPatternForm
          onFinish={(values) => {
            values['characterUuid'] = props.characterUuid

            AttackPatternStore.create((values as CreateAttackPatternData)).then((res) => {
              if (props.onUpdate) {
                props.onUpdate(res.data)
              }
              message.success('创建成功');
              setModalVisible(false);
            })
          }}
        />
      </Modal>
    </React.Fragment>
  );
});

export default AttackPatternAction;
