import React from 'react'
import './styles.sass'
import BlockFrame from '../BlockFrame'
import BlockSkin from '../BlockSkin'
import BlockHelper, { HelperType } from '../BlockHelper'
import { SkinSlot, SkinSlotConfig } from '../../../../shared/Skins/SkinSlot'
import BlockSkinSlot from '../BlockSkinSlot'
import { SkinId } from '../../../../shared/Skins/Skin'
import BlockWeaponsList from '../BlockWeaponsList'
import { ItemImagesSquad } from '../../../Inventory/assets/items'
import { SkinSlotImageUrl } from '../../assets/SkinSlotImages'

type Props = {
  activeSkinSlot: SkinSlot
  setActiveSkinSlot: (slot: SkinSlot) => void
  setDragIsActive: (isActive: boolean) => void
  dragSkinId: SkinId | null
}

const WeaponsBlock: React.FC<Props> = ({
  activeSkinSlot,
  setActiveSkinSlot,
  setDragIsActive,
  dragSkinId,
}) => {
  return (
    <div className="WeaponsBlock">
      <BlockWeaponsList
        activeSkinSlot={activeSkinSlot}
        setActiveSkinSlot={setActiveSkinSlot}
      />
      {activeSkinSlot != null && (
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
      )}
    </div>
  )
}

export default WeaponsBlock
