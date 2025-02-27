import { SkinSlot } from './SkinSlot'
import { SetId, SkinId } from './Skin'

export enum SkinsEvents {
  Close = 'skins:close',
  PutOn = 'skins:putOn',
  TakeOff = 'skins:takeOff',
  EquipSet = 'skins:equipSet',
}

export type SkinsPayloads = {
  [SkinsEvents.Close]: undefined
  [SkinsEvents.PutOn]: { slot: SkinSlot; skinId: SkinId }
  [SkinsEvents.TakeOff]: { slot: SkinSlot }
  [SkinsEvents.EquipSet]: { setId: SetId }
}
