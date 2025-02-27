import React, { useMemo } from 'react'
import './styles.sass'
import { SkinSlot } from '../../../../shared/Skins/SkinSlot'
import { useAppSelector } from '../../../../hooks/redux'
import { SkinsEvents, SkinsPayloads } from '../../../../shared/Skins/events'
import { callClient } from '../../../../utils/api'
import { Skin } from '../../../../shared/Skins/Skin'

type Props = {
  className?: string
  slot: SkinSlot
}

const BlockSetButton: React.FC<Props> = ({ className = '', slot }) => {
  const { skins, slots } = useAppSelector((state) => state.skins)

  const currentSkin = useMemo(
    () => skins.find((skin) => skin.id === slots[slot]),
    [slot, skins, slots],
  )

  const setAmount = useMemo(() => {
    if (currentSkin?.set == null) {
      return 0
    }
    const list: Skin[] = []
    skins.forEach((skin) => {
      if (
        list.findIndex(({ slot }) => slot === skin.slot) === -1 &&
        skin?.set === currentSkin.set
      ) {
        list.push(skin)
      }
    })
    console.log(list)
    return list.length
  }, [currentSkin, skins])

  const disabled = useMemo(() => setAmount < 2, [setAmount])

  return (
    <div
      className={`BlockSetButton ${className} ${disabled && '-disabled'}`}
      onClick={() => {
        if (disabled || currentSkin?.set == null) {
          return
        }
        const payload: SkinsPayloads[SkinsEvents.EquipSet] = {
          setId: currentSkin?.set,
        }
        callClient(SkinsEvents.EquipSet, payload)
      }}
    >
      <div className="title">Установить полный сет</div>
      <div className="helper">(Доступно: {setAmount}/4)</div>
    </div>
  )
}

export default BlockSetButton
