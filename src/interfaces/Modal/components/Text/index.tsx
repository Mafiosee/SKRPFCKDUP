import './styles.sass'
import React from 'react';
import {calcVh} from "../../../../utils/calcVh";
import {ComponentText} from "../../../../shared/Modal/Component/Text";

type Props = {
  component: ComponentText
}

const _Text: React.FC<Props> = ({ component }) => {

  return (
    <div className='_Text' style={{ marginBottom: calcVh(component.marginBottom) }}>
      {typeof component.text === 'string' ? component.text : component.text.map((text, idx) => (
        <div className='text' key={idx}>
          <div className="circle"/>
          <div className="body">{text}</div>
        </div>
      ))}
    </div>
  );
};

export default _Text;