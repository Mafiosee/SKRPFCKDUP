import React, { useState } from 'react'
import './styles.sass'
import BlockFrame from '../BlockFrame'
import BlockSkin from '../BlockSkin'
import BlockHelper, { HelperType } from '../BlockHelper'
import BlockSlotSelect from '../BlockSlotSelect'
import { SkinSlot, SkinSlotConfig } from '../../../../shared/Skins/SkinSlot'
import {
  SkinCategory,
  SkinCategoryConfig,
} from '../../../../shared/Skins/SkinCategory'
import { SkinSlotImageUrl } from '../../assets/SkinSlotImages'
import BlockSkinSlot from '../BlockSkinSlot'
import { SkinId } from '../../../../shared/Skins/Skin'
import BlockSetButton from '../BlockSetButton'

type Props = {
  activeSkinSlot: SkinSlot
  setActiveSkinSlot: (slot: SkinSlot) => void
  setDragIsActive: (isActive: boolean) => void
  dragSkinId: SkinId | null
}

const ArmorBlock: React.FC<Props> = ({
  activeSkinSlot,
  setActiveSkinSlot,
  setDragIsActive,
  dragSkinId,
}) => {
  return (
    <div className="ArmorBlock">
      <BlockFrame>
        <>
          <BlockSkinSlot
            skinSlot={activeSkinSlot}
            setDragIsActive={setDragIsActive}
            dragSkinId={dragSkinId}
          />
          <BlockSkin
            className="blockSkin"
            imageUrl={SkinSlotImageUrl[activeSkinSlot]}
            name={SkinSlotConfig[activeSkinSlot].name}
          />
          <BlockHelper className="blockHelper" type={HelperType.Move} />
          <BlockSlotSelect
            className="blockSlotSelect"
            slots={SkinCategoryConfig[SkinCategory.Armor].slots.map((slot) => ({
              slot,
              imageUrl: SkinSlotImageUrl[slot],
              name: SkinSlotConfig[slot].name,
            }))}
            activeSlot={activeSkinSlot}
            setActiveSlot={setActiveSkinSlot}
          />
          <BlockSetButton slot={activeSkinSlot} />
        </>
      </BlockFrame>
    </div>
  )
}

export default ArmorBlock
