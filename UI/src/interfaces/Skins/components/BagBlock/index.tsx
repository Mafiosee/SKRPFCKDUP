import React from 'react'
import './styles.sass'
import BlockFrame from '../BlockFrame'
import BlockSkin from '../BlockSkin'
import BlockHelper, { HelperType } from '../BlockHelper'
import { SkinSlot, SkinSlotConfig } from '../../../../shared/Skins/SkinSlot'
import { SkinSlotImageUrl } from '../../assets/SkinSlotImages'
import BlockSkinSlot from '../BlockSkinSlot'
import { SkinId } from '../../../../shared/Skins/Skin'

type Props = {
  activeSkinSlot: SkinSlot
  setActiveSkinSlot: (slot: SkinSlot) => void
  setDragIsActive: (isActive: boolean) => void
  dragSkinId: SkinId | null
}

const BagBlock: React.FC<Props> = ({
  activeSkinSlot,
  setDragIsActive,
  dragSkinId,
}) => {
  return (
    <div className="BagBlock">
      <BlockFrame className="blockFrame">
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
        </>
      </BlockFrame>
    </div>
  )
}

export default BagBlock
