import './styles.sass'
import React from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {PageType} from "../../../../shared/Fraction/PageType";
import {Events} from "../../assets/events";
import {Parameters} from "../../assets/parameters";

const PageEvents = () => {

  const {pages} = useAppSelector(state => state.fraction)
  const info = pages.find(el => el.type === PageType.Events)
  if (!info || info.type !== PageType.Events) return null
  const {events} = info

  const getEvents = () => events.map(({id, background, name, parameters, button}) => (
    <div key={id} className='event' style={{ backgroundImage: `url(${Events[`${background}.png`]})` }}>
      <div className="info">
        <div className="name">{name}</div>
        <div className="parameters">
          {parameters.map(({icon, name, value}, idx) => (
            <React.Fragment key={idx}>
            <div className='parameter'>
              <div className="icon" style={{ backgroundImage: `url(${Parameters[`${icon}.svg`]})` }}/>
              <div className="name">{name}</div>
              <div className="value">{value}</div>
            </div>
              {idx < parameters.length - 1 && <div className='circle'/>}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="button">{button}</div>
    </div>
  ))

  return (
    <div className='_PageEvents'>{getEvents()}</div>
  );
};

export default PageEvents;