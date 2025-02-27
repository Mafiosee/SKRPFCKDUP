export enum HouseSystemEvents {
  Exit = 'houseSystem:exit',
  Buy = 'houseSystem:buy',
  Enter = 'houseSystem:enter',
  Pay = 'houseSystem:pay',
  Sell = 'houseSystem:sell',
  ToggleOpen = 'houseSystem:toggleOpen',
  KickMember = 'houseSystem:kickMember',
  BuyInterior = 'houseSystem:buyInterior',
  BuyUpgrade = 'houseSystem:buyUpgrade',
}

export type HouseSystemPayload = {
  houseId: number
}

export type HouseSystemKickMemberPayload = HouseSystemPayload & {
  memberId: any
}

export type HouseSystemBuyInteriorPayload = HouseSystemPayload & {
  interiorId: any
}

export type HouseSystemBuyUpgradePayload = HouseSystemPayload & {
  upgradeId: any
}
