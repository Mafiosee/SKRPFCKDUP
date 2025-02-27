import React from 'react'
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

type Props = {
  activeSkinSlot: SkinSlot
  setActiveSkinSlot: (slot: SkinSlot) => void
  setDragIsActive: (isActive: boolean) => void
  dragSkinId: SkinId | null
}

const AccessoryBlock: React.FC<Props> = ({
  activeSkinSlot,
  setActiveSkinSlot,
  setDragIsActive,
  dragSkinId,
}) => {
  return (
    <div className="AccessoryBlock">
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
            slots={SkinCategoryConfig[SkinCategory.Accessory].slots.map(
              (slot) => ({
                slot,
                imageUrl: SkinSlotImageUrl[slot],
                name: SkinSlotConfig[slot].name,
              }),
            )}
            activeSlot={activeSkinSlot}
            setActiveSlot={setActiveSkinSlot}
          />
        </>
      </BlockFrame>
    </div>
  )
}

export default AccessoryBlock
