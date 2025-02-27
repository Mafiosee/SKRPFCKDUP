import './styles.sass'
import React, {ReactNode} from 'react';
import {calcVh} from "../../../../utils/calcVh";

type Props = {
  text: string | ReactNode
  marginBottom?: number
}

const Helper: React.FC<Props> = ({ text, marginBottom = 0 }) => {
  return (
    <div className='_Helper' style={{ marginBottom: calcVh(marginBottom) }}>{text}</div>
  );
};

export default Helper;