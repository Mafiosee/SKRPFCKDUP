import './styles.sass'
import React from 'react'
import {useAppSelector} from '../../../../hooks/redux'
import {Logotypes} from '../../assets/logo'
import {FactionConfig} from "../../../../shared/Fraction/FactionConfig";

const Player = () => {

    const {player, factionHash} = useAppSelector(state => state.fraction)
    return (
        <div className='_Player'>
            <div className='logo'
                 style={{backgroundImage: `url(${Logotypes[`${FactionConfig[factionHash].logo}.png`]})`}}/>
            <div className='name'>{player.name}</div>
            <div className='rank'>{player.rank}</div>
        </div>
    )
}

export default Player