import React from 'react'
import './styles.sass'
import { CharacterInfoBg } from '../../components/CharacterInfoBg'
import {
  CharacterBgColorByRace,
  SmallBlockColors,
  SpouseNames,
} from '../../data'
import { useAppSelector } from '../../../../hooks/redux'
import { Peds } from '../../assets/peds'
import { SmallCard } from '../../components/CharacterStatCard/SmallCard'
import { CardBG, CardNames, IconsNames } from '../../assets/icons'
import { BigCard } from '../../components/CharacterStatCard/BigCard'
import {
  GenderNames,
  RaceNames,
} from '../../../SelectCharacter/components/Character'
import { VipsInfo } from '../../../DonateStore/data/vip'

const NotHasVip = 'inactive'

export const Character: React.FC = () => {
  const { character } = useAppSelector((state) => state.characterMenu)
  const { playerInfo, blocksInfo } = character
  return (
    <div className={`_Character`}>
      <div className="info">
        <div className="bg">
          <CharacterInfoBg
            bgColor={
              playerInfo?.bgColor
                ? playerInfo?.bgColor
                : CharacterBgColorByRace[playerInfo.race]
            }
          />
        </div>
        <div className="content">
          <div
            className="image"
            style={{
              backgroundImage: `url(${Peds[playerInfo.race][playerInfo.gender]})`,
            }}
          />
          <div className="info-content">
            <div className="name">
              <div className="text">имя:</div>
              <div className="value">{playerInfo.name}</div>
            </div>
            <div className="lvl-progress">
              <div className="values">
                <div className="lvl">
                  <div className="icon" />
                  <div className="value">{playerInfo.lvl} уровень</div>
                </div>
                <div className="progress">
                  {playerInfo.exp.current}/{playerInfo.exp.max} EXP
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{
                    width: `${(playerInfo.exp.current / playerInfo.exp.max) * 100 > 100 ? 100 : (playerInfo.exp.current / playerInfo.exp.max) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="line" />
            <div className="characteristics">
              <div className={'characteristic'}>
                <div className="name">Пол:</div>
                <div className="value">{GenderNames[playerInfo.gender]}</div>
              </div>
              <div className={'characteristic'}>
                <div className="name">Раса:</div>
                <div className="value">{RaceNames[playerInfo.race]}</div>
              </div>
              <div className={'characteristic'}>
                <div className="name">Возраст</div>
                <div className="value">{playerInfo.age}</div>
              </div>
              {playerInfo.spouse && (
                <div className={'characteristic'}>
                  <div className="name">
                    В браке с: {playerInfo.spouse.date}
                  </div>
                  <div className="value">
                    <span style={{ opacity: 0.5 }}>
                      {SpouseNames[playerInfo.gender]}:{' '}
                    </span>
                    {playerInfo.spouse.name}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="stats">
        <div className="column">
          <SmallCard
            color={SmallBlockColors.gold}
            blockIcon={IconsNames.Balance}
            name={'Баланс'}
            isMoney={true}
            value={playerInfo.balance}
          />
          <SmallCard
            color={SmallBlockColors.warn}
            blockIcon={IconsNames.Warn}
            name={'Предупреждение'}
            isMoney={false}
            value={playerInfo.warns}
          />
          <BigCard
            image={CardBG[CardNames.House]}
            blockIcon={IconsNames.House}
            blockName={'Жилище'}
            name={blocksInfo.house ? blocksInfo.house.name : ''}
            timeUntilEndRent={blocksInfo?.house?.timeUntilEndRent}
          />
          <BigCard
            image={CardBG[CardNames.Guild]}
            blockIcon={IconsNames.Guild}
            blockName={'Гильдия'}
            name={blocksInfo.guild ? blocksInfo.guild.name : ''}
            description={blocksInfo.guild ? blocksInfo.guild.description : ''}
          />
        </div>

        <div className="column">
          <BigCard
            image={CardBG[CardNames.Location]}
            blockIcon={IconsNames.Location}
            blockName={'Провинция'}
            name={blocksInfo.location}
          />
          <BigCard
            image={CardBG[CardNames.Business]}
            blockIcon={IconsNames.Business}
            blockName={'Бизнес'}
            name={blocksInfo.business ? blocksInfo.business.name : ''}
            timeUntilEndRent={blocksInfo?.business?.timeUntilEndRent}
          />
          <BigCard
            image={CardBG[CardNames.Vip]}
            blockIcon={IconsNames.Star}
            blockName={'VIP-STATUS'}
            status={
              blocksInfo?.vip ? VipsInfo[blocksInfo.vip.status].name : NotHasVip
            }
            description={blocksInfo.vip ? blocksInfo.vip.description : ''}
          />
        </div>
      </div>
    </div>
  )
}
