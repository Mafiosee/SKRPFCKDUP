export enum AdBoardEvents {
  Exit = 'adBoard:exit',
  AddAd = 'adBoard:addAd',
}

export type AdBoardAddAdPayload = {
  title: string
  description: string
}