import React, { useMemo } from 'react'
import './styles.sass'
import { useAppSelector } from '../../../../hooks/redux'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import { SkinSlot } from '../../../../shared/Skins/SkinSlot'
import { SkinSlotImageUrl } from '../../assets/SkinSlotImages'

type Props = {
  className?: string
  activeSkinSlot: SkinSlot
  setActiveSkinSlot: (slot: SkinSlot) => void
}

const BlockWeaponsList: React.FC<Props> = ({
  className = '',
  activeSkinSlot,
  setActiveSkinSlot,
}) => {
  const renderedWeapons = useMemo(() => {
    const WeaponsSlots = [
      SkinSlot.Dagger,
      SkinSlot.Sword,
      SkinSlot.GreatSword,
      SkinSlot.Mace,
      SkinSlot.WarAxe,
      SkinSlot.BattleAxe,
      SkinSlot.WarHammer,
      SkinSlot.Bow,
    ]
    const list = WeaponsSlots.map((weaponSlot) => {
      const isActive = activeSkinSlot === weaponSlot
      const setActive = () => setActiveSkinSlot(weaponSlot)

      return (
        <div
          key={weaponSlot}
          className={`weapon ${isActive && '-active'}`}
          onClick={setActive}
        >
          <div className="center">
            <div className="circle" />
            <div
              className="image"
              style={{
                backgroundImage: `url(${SkinSlotImageUrl[weaponSlot]})`,
              }}
            />
          </div>
        </div>
      )
    })

    while (list.length < 12) {
      list.push(<div key={`empty-${list.length}`} className="weapon -empty" />)
    }

    return list
  }, [activeSkinSlot])

  return (
    <div className={`BlockWeaponsList ${className}`}>{renderedWeapons}</div>
  )
}

export default BlockWeaponsList
