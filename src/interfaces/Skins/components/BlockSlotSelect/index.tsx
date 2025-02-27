import React, { useMemo } from 'react'
import './styles.sass'

type BlockSlot = {
  slot: any
  imageUrl: string
  name: string
}

type Props = {
  className?: string
  slots: BlockSlot[]
  activeSlot: any
  setActiveSlot: (slot: any) => void
}

const BlockSlotSelect: React.FC<Props> = ({
  className = '',
  slots,
  activeSlot,
  setActiveSlot,
}) => {
  const renderedSlots = useMemo(
    () =>
      slots.map(({ slot, name, imageUrl }) => {
        const isActive = activeSlot === slot
        const setActive = () => setActiveSlot(slot)

        return (
          <div
            key={slot}
            className={`slot ${isActive && '-active'}`}
            onClick={setActive}
          >
            <div className="center">
              <div className="content">
                <div
                  className="image"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                />
                <div className="name">{name}</div>
              </div>
            </div>
          </div>
        )
      }),
    [slots, activeSlot],
  )

  return <div className={`BlockSlotSelect ${className}`}>{renderedSlots}</div>
}

export default BlockSlotSelect
