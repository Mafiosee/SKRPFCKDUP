import { SkinId } from '../Skins/Skin'

export enum SkinsTradeEvents {
  Close = 'skinsTrade:close',
  AddSkinToTrade = 'skinsTrade:addSkinToTrade',
  RemoveSkinFromTrade = 'skinsTrade:removeSkinFromTrade',
  ConfirmTrade = 'skinsTrade:confirmTrade',
  CancelTrade = 'skinsTrade:cancelTrade',
}

export type SkinsTradePayloads = {
  [SkinsTradeEvents.Close]: undefined
  [SkinsTradeEvents.AddSkinToTrade]: { skinId: SkinId }
  [SkinsTradeEvents.RemoveSkinFromTrade]: { skinId: SkinId }
  [SkinsTradeEvents.ConfirmTrade]: { sum: number }
  [SkinsTradeEvents.CancelTrade]: undefined
}
