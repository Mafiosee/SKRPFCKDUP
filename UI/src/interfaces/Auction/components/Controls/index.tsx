import React, { useEffect, useState } from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'
import ControlSelect, { ControlsListItem } from '../ControlSelect'
import { LotType } from '../../../../shared/Auction/LotType'
import { LotTypeName } from '../../types/LotTypeName'
import { Sort, SortName } from '../../types/Sort'
import { useDispatch } from 'react-redux'
import { auctionActions } from '../../reducer'

export enum Control {
  Filter = 'Filter',
  Sort = 'Sort',
  Locations = 'Locations',
}

const FiltersList: ControlsListItem[] = [
  { id: null, name: 'Все' },
  ...Object.values(LotType).map((lotType) => ({
    id: lotType,
    name: LotTypeName[lotType],
  })),
]

const SortsList: ControlsListItem[] = Object.values(Sort).map((sort) => ({
  id: sort,
  name: SortName[sort],
}))

const Controls: React.FC = () => {
  const dispatch = useDispatch()
  const { activeFilter, activeSort, locations, activeLocationIndex } =
    useAppSelector((state) => state.auction)
  const [openedControl, setOpenedControl] = useState<Control | null>(null)

  const toggleOpenedControl = (control: Control) => {
    if (openedControl === control) {
      return setOpenedControl(null)
    }
    setOpenedControl(control)
  }

  useEffect(() => {
    const handleClick = () => setOpenedControl(null)
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="Controls">
      <ControlSelect
        iconUrl={require('../../assets/images/controls-filter.svg')}
        list={FiltersList}
        activeId={activeFilter}
        setActiveId={(id) => dispatch(auctionActions.setActiveFilter(id))}
        opened={openedControl === Control.Filter}
        toggleOpen={() => toggleOpenedControl(Control.Filter)}
      />
      <ControlSelect
        iconUrl={require('../../assets/images/controls-sort.svg')}
        list={SortsList}
        activeId={activeSort}
        setActiveId={(id) => dispatch(auctionActions.setActiveSort(id))}
        opened={openedControl === Control.Sort}
        toggleOpen={() => toggleOpenedControl(Control.Sort)}
      />
      <ControlSelect
        iconUrl={require('../../assets/images/controls-sort.svg')}
        list={[
          { id: null, name: 'Все местоположения' },
          ...locations.map((location, index) => ({
            id: index,
            name: location,
          })),
        ]}
        activeId={activeLocationIndex}
        setActiveId={(id) =>
          dispatch(auctionActions.setActiveLocationIndex(id))
        }
        opened={openedControl === Control.Locations}
        toggleOpen={() => toggleOpenedControl(Control.Locations)}
      />
    </div>
  )
}

export default Controls
