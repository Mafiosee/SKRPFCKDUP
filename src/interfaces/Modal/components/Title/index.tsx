import './styles.sass'
import React from 'react';
import {ComponentTitle} from "../../../../shared/Modal/Component/Title";
import {calcVh} from "../../../../utils/calcVh";

type Props = {
  component: ComponentTitle
}

const _Title: React.FC<Props> = ({ component }) => {

  return (
    <div className='_Title' style={{ marginBottom: calcVh(component.marginBottom) }}>{component.text}</div>
  );
};

export default _Title;