import './styles.sass'
import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {PageId} from "../../../../shared/Auth/pageId";
import Header from "../../components/Header";
import Helper from "../../components/Helper";
import {numberWithSeparator} from "../../../../utils/numberWithSeparator";

const PageQueue = () => {

  const {page, queuePosition} = useAppSelector(state => state.auth)

  const isOpen = page === PageId.Queue

  return (
    <div className={`PageQueue ${isOpen && '-show'}`}>
      <Header text='Сервер переполнен'/>

      <Helper text='Вы успешно вошли в аккаунт, но сейчас сервер переполнен.' marginBottom={21}/>

      <div className="value">
        <div className="shadow"/>
        <div className="text">{numberWithSeparator(queuePosition, ' ')}</div>
      </div>

      <div className="title">Ваше место в очереди:</div>
    </div>
  );
};

export default PageQueue;