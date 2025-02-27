import './styles.sass'
import React from 'react';
import {calcVh} from "../../../../utils/calcVh";
import {ComponentCheckbox} from "../../../../shared/Modal/Component/Checkbox";

type Props = {
  component: ComponentCheckbox
  checked: boolean
  setChecked: (checked: boolean) => void
}

const _Checkbox: React.FC<Props> = ({ component, checked, setChecked }) => {

  return (
    <div className='_Checkbox' style={{ marginBottom: calcVh(component.marginBottom) }} onClick={() => setChecked(!checked)}>
      <div className="row">
        <div className={`checkbox ${checked && '-checked'}`}/>
        <div className="name">{component.name}</div>
      </div>
      <div className="helper">
        <div className="body">{component.helper}</div>
      </div>
    </div>
  );
};

export default _Checkbox;