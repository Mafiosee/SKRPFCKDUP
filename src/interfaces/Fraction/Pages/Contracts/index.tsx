import './styles.sass'
import React from 'react';
import {useAppSelector} from "../../../../hooks/redux";
import {PageType} from "../../../../shared/Fraction/PageType";
import {getTimeString} from "../../../../utils/time";
import {ContractCondition} from "../../../../shared/Fraction/contract/Condition";
import {ContractBackgrounds, ContractIcons} from "../../assets/contracts";
import {numberWithSeparator} from "../../../../utils/numberWithSeparator";
import {calcVh} from "../../../../utils/calcVh";
import {FractionContractActionPayload, FractionEvents} from "../../../../shared/Fraction/events";
import {callClient} from "../../../../utils/api";

const PageContracts = () => {

  const {pages} = useAppSelector(state => state.fraction)
  const info = pages.find(el => el.type === PageType.Contracts)
  if (!info || info.type !== PageType.Contracts) return null
  const {timeToUpdate, contracts} = info

  const getContracts = () => contracts.map(contract => {
    const {id, condition} = contract
    switch (condition) {
      case ContractCondition.Available: {
        const {background, name, task, timeToComplete, reward} = contract
        return (
          <div key={id} className='contract -available'>
            <div className="background" style={{backgroundImage: `url(${ContractBackgrounds[`${background}.png`]})`}}/>
            <div className="content">
              <div className="name">{name}</div>
              <div className="info">
                <div className="row">
                  <div className="title">Задача:</div>
                  <div className="value">{task}</div>
                </div>
                <div className="row">
                  <div className="title">Время на выполнение:</div>
                  <div className="value">{getTimeString(timeToComplete)}</div>
                </div>
                <div className="row">
                  <div className="title">Награда:</div>
                  <div className="value -money">{numberWithSeparator(reward, ' ')}</div>
                </div>
              </div>
              <div className="line"/>
              <div className="button" onClick={() => {
                const payload: FractionContractActionPayload = { contractId: id }
                callClient(FractionEvents.ContractStart, payload)
              }}>Начать выполнение</div>
            </div>
          </div>
        )
      }

      case ContractCondition.Started: {
        const {background, name, task, timeToEnd, reward, icon, progress} = contract
        return (
          <div key={id} className='contract -started'>
            <div className="background" style={{backgroundImage: `url(${ContractBackgrounds[`${background}.png`]})`}}/>
            <div className="content">
              <div className="name">{name}</div>
              <div className="info">
                <div className="row">
                  <div className="title">Задача:</div>
                  <div className="value">{task}</div>
                </div>
                <div className="row">
                  <div className="title">Время на выполнение:</div>
                  <div className="value">{getTimeString(timeToEnd)}</div>
                </div>
                <div className="row">
                  <div className="title">Награда:</div>
                  <div className="value -money">{numberWithSeparator(reward, ' ')}</div>
                </div>
              </div>
              <div className="line"/>
              <div className="progress">
                <div className="title">Текущий прогресс</div>
                <div className="row">
                  <div className="bar">
                    <div className="line" style={{width: `${calcVh(155 * (progress.current / progress.max))}`}}/>
                  </div>
                  <div className="value">
                    <div className="icon" style={{backgroundImage: `url(${ContractIcons[`${icon}.svg`]})`}}/>
                    <div className="current">{progress.current}</div>
                    <div className="slash">/</div>
                    <div className="max">{progress.max}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      case ContractCondition.Finished: {
        const {background, name, task, reward, icon, progress} = contract
        return (
          <div key={id} className='contract -finished'>
            <div className="background" style={{backgroundImage: `url(${ContractBackgrounds[`${background}.png`]})`}}/>
            <div className="content">
              <div className="name">{name}</div>
              <div className="info">
                <div className="row">
                  <div className="title">Задача:</div>
                  <div className="value">{task}</div>
                </div>
                <div className="row">
                  <div className="title">Время на выполнение:</div>
                  <div className="value">--:--:--</div>
                </div>
                <div className="row">
                  <div className="title">Награда:</div>
                  <div className="value -money">{numberWithSeparator(reward, ' ')}</div>
                </div>
              </div>
              <div className="line"/>
              <div className="progress">
                <div className="title">Текущий прогресс</div>
                <div className="row">
                  <div className="bar">
                    <div className="line" style={{width: `${calcVh(155 * (progress.current / progress.max))}`}}/>
                  </div>
                  <div className="value">
                    <div className="icon" style={{backgroundImage: `url(${ContractIcons[`${icon}.svg`]})`}}/>
                    <div className="current">{progress.current}</div>
                    <div className="slash">/</div>
                    <div className="max">{progress.max}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="over">
              <div className="background"/>
              <div className="content">
                <div className="check"/>
                <div className="title">Заершено</div>
                <div className="reward">
                  <div className="icon"/>
                  <div className="value">{numberWithSeparator(reward, ' ')}</div>
                </div>
                <div className="button" onClick={() => {
                  const payload: FractionContractActionPayload = { contractId: id }
                  callClient(FractionEvents.ContractFinish, payload)
                }}>Забрать награду</div>
              </div>
            </div>
          </div>
        )
      }

      case ContractCondition.Waiting: {
        const {timeToNext} = contract
        return (
          <div key={id} className='contract -waiting'>
            <div className="shadow"/>
            <div className="image"/>
            <div className="content">
              <div className="title">Следующий контракт будет доступен через:</div>
              <div className="time">{getTimeString(timeToNext)}</div>
            </div>
          </div>
        )
      }

      default:
        return null
    }
  })

  return (
    <div className='_PageContracts'>
      <div className="timeToUpdate">Обновление контрактов через: {getTimeString(timeToUpdate)}</div>
      <div className="contracts">{getContracts()}</div>
    </div>
  );
};

export default PageContracts;