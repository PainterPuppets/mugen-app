import React from 'react';
import { observer } from 'mobx-react';
import { DamageDegree } from '@/interfaces/character';
import { getHealthString } from '@/utils/mugen';
import './style.less'
import { Tooltip } from 'antd';

interface IProps {
  healthPoint: number;
  damage: {
    [DamageDegree.BASHING]: number,
    [DamageDegree.LETHAL]: number,
    [DamageDegree.AGGRAVATED]: number,
  }
}

const DamageDegreeClassNameMap = {
  0: 'complete',
  [DamageDegree.BASHING]: 'bashing',
  [DamageDegree.LETHAL]: 'lethal',
  [DamageDegree.AGGRAVATED]: 'aggravated'
}

const HamelStrand:React.SFC<IProps> = observer((props) => {

  let strand: Array<DamageDegree | 0> = [];
  let completeHealth = props.healthPoint;
  let margin = 0;
  (Object.keys(props.damage)).map((key) => {
    let count = Math.max(props.damage[parseInt(key) as DamageDegree], 0);
    strand = strand.concat(new Array(count).fill(parseInt(key)));
    completeHealth -= count;
  });
  strand = strand.concat(new Array(Math.max(completeHealth, 0)).fill(0)).sort();

  if (strand.length < 10) {
    margin = 1;
  }

  return (
    <Tooltip title={getHealthString(props.healthPoint, props.damage)}>
      <div className="haemal-strand">
        {strand.map((degree, index) => (
          <span 
            key={index} 
            className={`strand ${DamageDegreeClassNameMap[degree]}`}
            style={{ marginLeft: margin }}
          />
        ))}
      </div>
    </Tooltip>
  );
})

export default HamelStrand;
