import './styles.sass'
import React from 'react';
import {calcVh} from "../../../../utils/calcVh";

type Props = {
  marginBottom?: number
}

const Separator: React.FC<Props> = ({ marginBottom = 0 }) => {
  return (
    <div className='_Separator' style={{ marginBottom: calcVh(marginBottom) }}/>
  );
};

export default Separator;