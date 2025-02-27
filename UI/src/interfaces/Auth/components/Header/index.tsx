import './styles.sass'
import React from 'react';
import {useAppSelector} from "../../../../hooks/redux";

type Props = {
  text: string
}

const Header: React.FC<Props> = ({ text }) => {
  return (
    <div className='_Header'>{text}</div>
  );
};

export default Header;