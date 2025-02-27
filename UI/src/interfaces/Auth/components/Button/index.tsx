import './styles.sass'
import React from 'react';
import {calcVh} from "../../../../utils/calcVh";

export enum ButtonType {
  Light,
  Dark,
}

const Info: Record<ButtonType, { backgroundImage: string, color: string }>  = {
  [ButtonType.Light]: {
    backgroundImage: require('../../assets/images/button-light.svg'),
    color: '#080808',
  },
  [ButtonType.Dark]: {
    backgroundImage: require('../../assets/images/button-dark.svg'),
    color: '#fff',
  },
}

type Props = {
  type: ButtonType
  text: string
  onClick: () => void
  isDisabled?: boolean
  marginBottom?: number
}

const Button: React.FC<Props> = ({ text, type, onClick, isDisabled = false, marginBottom = 0 }) => {

  const info = Info[type]

  return (
    <div
      className={`_Button ${isDisabled && '-disabled'}`}
      style={{
        backgroundImage: `url(${info.backgroundImage})`,
        color: info.color,
        marginBottom: calcVh(marginBottom),
      }}
      onClick={() => {
        if(isDisabled) return
        onClick()
      }}
    >{text}</div>
  );
};

export default Button;
