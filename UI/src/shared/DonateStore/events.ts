import { VipType } from '../Vip/types'

export enum DonateStoreEvents {
  Opened = 'donateStore:opened',
  RequestGiftPlayer = 'donateStore:requestGiftPlayer',
  ProductBuy = 'donateStore:productBuy',
  ProductGift = 'donateStore:productGift',
  CaseBuy = 'donateStore:caseBuy',
  CaseGift = 'donateStore:caseGift',
  Replenish = 'donateStore:replenish',
  ReplenishGift = 'donateStore:replenishGift',
  Exchange = 'donateStore:exchange',
  ExchangeGift = 'donateStore:exchangeGift',
  VipBuy = 'donateStore:vipBuy',
  ServiceBuy = 'donateStore:serviceBuy',
  SellWarehouseItem = 'donateStore:sellWarehouseItem',
  GiftWarehouseItem = 'donateStore:giftWarehouseItem',
  ClickWarehouseButton = 'donateStore:clickWarehouseButton',
}

export type DonateStorePayloads = {
  [DonateStoreEvents.Opened]: undefined
  /** Запрос на игрока по uid (найти игрока на бэке и вызвать функцию setGiftPlayer) */
  [DonateStoreEvents.RequestGiftPlayer]: {
    uid: any
  }
  /** Покупка продукта */
  [DonateStoreEvents.ProductBuy]: {
    productId: any
  }
  /** Подарок продукта */
  [DonateStoreEvents.ProductGift]: {
    productId: any
    playerUid: any
  }
  /** Покупка кейса */
  [DonateStoreEvents.CaseBuy]: {
    caseId: any
    amount: number
  }
  /** Подарок кейса */
  [DonateStoreEvents.CaseGift]: {
    caseId: any
    amount: number
    playerUid: any
  }

  /** Пополнение */
  [DonateStoreEvents.Replenish]: {
    sum: number
  }

  /** Пополнение в подарок */
  [DonateStoreEvents.ReplenishGift]: {
    sum: number
    playerUid: any
  }

  /** Обмен валюты */
  [DonateStoreEvents.Exchange]: {
    sum: number
  }

  /** Обмен валюты в подарок */
  [DonateStoreEvents.ExchangeGift]: {
    sum: number
    playerUid: any
  }

  /** Покупка VIP */
  [DonateStoreEvents.VipBuy]: {
    vipType: VipType
    durationId: any
  }

  /** Покупка услуги */
  [DonateStoreEvents.ServiceBuy]: {
    serviceId: any
    input?: string
  }

  /** Продать предмет со склада */
  [DonateStoreEvents.SellWarehouseItem]: {
    itemId: any
  }

  /** Подарить предмет со склада */
  [DonateStoreEvents.GiftWarehouseItem]: {
    itemId: any
    amount: number
    playerUid: any
  }

  [DonateStoreEvents.ClickWarehouseButton]: {
    itemId: any
    buttonId: any
  }
}
