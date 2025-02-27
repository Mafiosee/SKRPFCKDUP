import './styles.sass'
import React from 'react';
import {calcVh} from "../../../../utils/calcVh";

type Props = {
  text: string
  marginBottom?: number
}

const Title: React.FC<Props> = ({ text, marginBottom = 0 }) => {
  return (
    <div className='_Title' style={{ marginBottom: calcVh(marginBottom) }}>{text}</div>
  );
};

export default Title;
