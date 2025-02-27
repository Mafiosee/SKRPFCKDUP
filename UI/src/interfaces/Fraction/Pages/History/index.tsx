import './styles.sass'
import React from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {PageType} from "../../../../shared/Fraction/PageType";
import {Parameters} from "../../assets/parameters";
import {HistoryBackgrounds} from "../../assets/history";

const PageHistory = () => {

  const {pages} = useAppSelector(state => state.fraction)
  const info = pages.find(el => el.type === PageType.History)
  if (!info || info.type !== PageType.History) return null
  const {history} = info

  const getHistory = () => history.map(({background, name, number, parameters}, idx) => (
    <div key={idx} className='history' style={{ backgroundImage: `url(${HistoryBackgrounds[`${background}.png`]})` }}>
      <div className="info">
        <div className="name">{name}</div>
        <div className="number">
          <div className="icon"/>
          <div className="title">Номер:</div>
          <div className="value">{number}</div>
        </div>
      </div>
      <div className="parameters">
        {parameters.map(({icon, name, value}, idx) => (
          <div key={idx} className='parameter'>
            <div className="icon" style={{ backgroundImage: `url(${Parameters[`${icon}.svg`]})` }}/>
            <div className="name">{name}</div>
            <div className="value">{value}</div>
          </div>
        ))}
      </div>
    </div>
  ))

  return (
    <div className='_PageHistory'>{getHistory()}</div>
  );
};

export default PageHistory;