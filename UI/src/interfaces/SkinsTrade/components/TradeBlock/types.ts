export enum TradeType {
  Receive = 'Receive',
  Give = 'Give',
}

export type TradeTypeConfigItem = {
  title: string
  iconUrl: string
}

export const TradeTypeConfig: Record<TradeType, TradeTypeConfigItem> = {
  [TradeType.Receive]: {
    title: 'Вы отдаете',
    iconUrl: require('../../assets/images/tradeTypeIcons/receive.svg'),
  },
  [TradeType.Give]: {
    title: 'Вы получаете',
    iconUrl: require('../../assets/images/tradeTypeIcons/give.svg'),
  },
}
