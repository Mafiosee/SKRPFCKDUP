import './styles.sass'
import React from 'react'
import {useAppSelector} from '../../../../hooks/redux'
import {PageType} from '../../../../shared/Fraction/PageType'
import {numberWithSeparator} from '../../../../utils/numberWithSeparator'
import {Logotypes} from '../../assets/logo'
import {FactionConfig} from "../../../../shared/Fraction/FactionConfig";

const PageInfo = () => {

    const {pages, factionHash} = useAppSelector(state => state.fraction)
    const info = pages.find(el => el.type === PageType.Info)
    if (!info || info.type !== PageType.Info) {
        return null
    }
    const {fractionName, level, reputation, staff, stables, bank, canLeave} = info

    return (
        <div className='_PageInfo'>
            <div className='logo'>
                <div className='shadow' style={{backgroundColor: FactionConfig[factionHash].bg}}/>
                <div className='image'
                     style={{backgroundImage: `url(${Logotypes[`${FactionConfig[factionHash].logo}.png`]})`}}/>
            </div>
            <div className='name'>{fractionName}</div>
            <div className='level'>
                <div className='helper'>Уровень</div>
                <div className='value'>
                    <div className='shadow' style={{backgroundColor: FactionConfig[factionHash].color}}/>
                    <div className='text'>{level}</div>
                </div>
            </div>
            <div className='reputation'>
                <div className='current'>{reputation.current}</div>
                <div className='slash'>/</div>
                <div className='max'>{reputation.max}</div>
            </div>
            <div className='progress'>
                <div className='line'>
                    <svg width='100%' height='100%' viewBox='0 0 288 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <mask id='mask0_581_8257' style={{maskType: 'alpha'}} maskUnits='userSpaceOnUse' x='0' y='0'
                              width='288'
                              height='9'>
                            <path d='M4.5 9H283.5L288 4.5L283.5 0H4.5L0 4.5L4.5 9Z' fill='white'/>
                        </mask>
                        <g mask='url(#mask0_581_8257)'>
                            <rect width={288 * (reputation.current / reputation.max)} height='9' fill='white'/>
                        </g>
                    </svg>

                </div>
            </div>

            <div className='block -reputation'>
                <div className='title'>Репутация</div>
                <div className='value'>{numberWithSeparator(reputation.current, ' ')}</div>
            </div>
            <div className='block -staff'>
                <div className='title'>Участники</div>
                <div className='value'>{staff.current}/{staff.max}</div>
            </div>
            <div className='block -stables'>
                <div className='title'>Стойла</div>
                <div className='value'>{stables.current}/{stables.max}</div>
            </div>
            <div className='block -bank'>
                <div className='title'>Хранилище</div>
                <div className='value'>{numberWithSeparator(bank, ' ')}</div>
            </div>
        </div>
    )
}

export default PageInfo