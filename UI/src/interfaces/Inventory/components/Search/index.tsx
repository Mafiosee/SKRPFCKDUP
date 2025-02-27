import './styles.sass'
import React from 'react'
import { useAppSelector } from '../../../../hooks/redux'
import { ColorByRace, SearchBg } from '../../assets/searchBg'
import { callClient } from '../../../../utils/api'
import { InventoryEvents } from '../../../../shared/inventory/events'
import { Race } from '../../../../shared/Race/type'
import { Gender } from '../../../../shared/characterEditor/enums/Genders'
import { RaceName } from '../../../../shared/Race/RaceName'
import { calcVh } from '../../../../utils/calcVh'
import Grid from '../Grid'
import { Grids } from '../../../../shared/inventory/inventoryType'
import { ActionsList, DragInfo, HoverInfo } from '../../types'

const Logo: Record<Race, Record<Gender, string>> = {
  [Race.Argonian]: {
    [Gender.Male]: require('../../assets/images/search/races/argonian-male.png'),
    [Gender.Female]: require('../../assets/images/search/races/argonian-female.png'),
  },
  [Race.Breton]: {
    [Gender.Male]: require('../../assets/images/search/races/breton-male.png'),
    [Gender.Female]: require('../../assets/images/search/races/breton-female.png'),
  },
  [Race.DarkElf]: {
    [Gender.Male]: require('../../assets/images/search/races/darkElf-male.png'),
    [Gender.Female]: require('../../assets/images/search/races/darkElf-female.png'),
  },
  [Race.HighElf]: {
    [Gender.Male]: require('../../assets/images/search/races/highElf-male.png'),
    [Gender.Female]: require('../../assets/images/search/races/highElf-female.png'),
  },
  [Race.Imperial]: {
    [Gender.Male]: require('../../assets/images/search/races/imperial-male.png'),
    [Gender.Female]: require('../../assets/images/search/races/imperial-female.png'),
  },
  [Race.Khajit]: {
    [Gender.Male]: require('../../assets/images/search/races/khajit-male.png'),
    [Gender.Female]: require('../../assets/images/search/races/khajit-female.png'),
  },
  [Race.Nord]: {
    [Gender.Male]: require('../../assets/images/search/races/nord-male.png'),
    [Gender.Female]: require('../../assets/images/search/races/nord-female.png'),
  },
  [Race.Orc]: {
    [Gender.Male]: require('../../assets/images/search/races/orc-male.png'),
    [Gender.Female]: require('../../assets/images/search/races/orc-female.png'),
  },
  [Race.Redguard]: {
    [Gender.Male]: require('../../assets/images/search/races/redgard-male.png'),
    [Gender.Female]: require('../../assets/images/search/races/redgard-female.png'),
  },
  [Race.WoodElf]: {
    [Gender.Male]: require('../../assets/images/search/races/woodElf-male.png'),
    [Gender.Female]: require('../../assets/images/search/races/woodElf-female.png'),
  },
}

type Props = {
  drag: {
    info: DragInfo
    set: (info: DragInfo) => void
  }
  hover: {
    info: HoverInfo
    set: (info: HoverInfo) => void
  }
  setActionsList?: (info: ActionsList) => void
}

const Search: React.FC<Props> = ({ drag, hover, setActionsList }) => {
  const { search } = useAppSelector((state) => state.inventory)

  return search != null ? (
    <div className="_Inventory_Search">
      <div className="background">
        <SearchBg race={search.race} />
        <div className="title">{search.title}</div>
        <div
          className="close"
          onClick={() => callClient(InventoryEvents.Close)}
        />
      </div>
      <div className="content">
        <div className="body">
          <div className="header">
            <div className="player">
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${Logo[search.race][search.gender]})`,
                  filter: `drop-shadow(0 0 ${calcVh(64)} ${ColorByRace[search.race]}aa)`,
                }}
              />
              <div className="info">
                <div className="name">{search.name}</div>
                <div className="race">{RaceName[search.race]}</div>
              </div>
            </div>
            <div className="weight">
              <div className="title">Вес предметов:</div>
              <div className="value">
                {search.grid.items
                  .reduce(
                    (acc, item) =>
                      acc + (item?.weight ?? 0) * (item?.amount ?? 1),
                    0,
                  )
                  .toFixed(2)}{' '}
                кг
              </div>
            </div>
          </div>
          <div className="grid">
            <Grid
              grid={search.grid}
              gridId={Grids.Search}
              drag={drag}
              hover={hover}
              maxHeight={8}
              setActionsList={setActionsList}
            />
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default Search
