import React from "react";
import {
  Spin,
  Typography,
  Col,
  Row,
  Card,
  Empty,
  Divider,
} from "antd";
import workingSVG from "@/assets/svg/working.svg";
import { observer } from "mobx-react";
import UIStore from "@/shared/stores/UIStore";
import CharacterStore from "@/character/stores/CharacterStore";
import { AttributeMap } from "@/interfaces/character";
import { PowerTypeMap, LevelMap } from "@/interfaces/power";
import CharacterFigure from "./CharacterFigure";
import CharacterScrollPanel from './CharacterScrollPanel';
import "./styles.less";
import './PowerItem.less';

const { Paragraph, Text } = Typography;

interface IProps {}

const CharacterPower: React.SFC<IProps> = observer((props) => {
  const character = CharacterStore.characterDetail;

  if (!character) {
    return <Spin />;
  }

  return (
    <Row gutter={16} className="character-card-page">
      {!UIStore.isMobile && (
        <CharacterFigure character={character} />
      )}
      <Col xs={24} md={20} className="character-card-col">
        <CharacterScrollPanel title="角色能力">
          {character.powers.length === 0 ?
            <Empty
              className="page-empty"
              image={workingSVG}
              imageStyle={{
                height: 180,
              }}
              description={<span>没有特殊能力</span>}
            /> :
            character.powers.map((power) => (
            <React.Fragment key={power.id}>
              <Divider orientation="left" style={{ fontSize: 14 }}>
                {PowerTypeMap[power.type]}
              </Divider>
              <div className="power-item">
                <div className="power-item-name item-divide">{power.name}</div>
                <div className="power-item-levels">
                  {power.levels.map((level, index) => (
                    <div key={index} className="power-level-item item-divide dashed">
                      <div className="power-level-item-name emphasis-text">
                        {LevelMap[level.level]}级{level.name ? `: ${level.name}` : ''}
                      </div>
                      {level.description !== '' &&
                        <div>
                          <span className="emphasis-text">描述：</span>
                          <span className="power-level-item-description">
                            {level.description}
                          </span>
                        </div>
                      }
                      <div className="power-level-item-bonuses">
                        <span className="emphasis-text">属性：</span>
                        {level.bonuses.length !== 0 ? level.bonuses.map((bonus, index) => (
                            <span key={index} style={{ marginRight: 8 }}>{AttributeMap[bonus.key]} + {bonus.value}</span>
                          )):
                          <span>无</span>
                        }
                      </div>
                      {level.properties.length !== 0 &&
                        <div className="power-level-item-properties item-divide dashed">
                          {level.properties.map(property => (
                            <div key={property.uuid} className="property-item">
                              <span className="property-name">{property.name}: </span>
                              <span className="property-description">{property.description}</span>
                            </div>
                          ))}
                        </div>
                      }
                    </div>
                  ))}
                </div>
              </div>
            </React.Fragment>
          ))}
        </CharacterScrollPanel>
      </Col>
    </Row>
  );
});

export default CharacterPower;
