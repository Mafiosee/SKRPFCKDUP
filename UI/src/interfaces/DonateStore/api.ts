import {
  DonateStoreEvents,
  DonateStorePayloads,
} from '../../shared/DonateStore/events'
import { callClient } from '../../utils/api'

export const ApiFunctions = {
  [DonateStoreEvents.ProductBuy]: (
    payload: DonateStorePayloads[DonateStoreEvents.ProductBuy],
  ) => {
    callClient(DonateStoreEvents.ProductBuy, payload)
  },

  [DonateStoreEvents.ProductGift]: (
    payload: DonateStorePayloads[DonateStoreEvents.ProductGift],
  ) => {
    callClient(DonateStoreEvents.ProductGift, payload)
  },

  [DonateStoreEvents.RequestGiftPlayer]: (
    payload: DonateStorePayloads[DonateStoreEvents.RequestGiftPlayer],
  ) => {
    callClient(DonateStoreEvents.RequestGiftPlayer, payload)
  },

  [DonateStoreEvents.CaseBuy]: (
    payload: DonateStorePayloads[DonateStoreEvents.CaseBuy],
  ) => {
    callClient(DonateStoreEvents.CaseBuy, payload)
  },

  [DonateStoreEvents.CaseGift]: (
    payload: DonateStorePayloads[DonateStoreEvents.CaseGift],
  ) => {
    callClient(DonateStoreEvents.CaseGift, payload)
  },

  [DonateStoreEvents.Replenish]: (
    payload: DonateStorePayloads[DonateStoreEvents.Replenish],
  ) => {
    callClient(DonateStoreEvents.Replenish, payload)
  },

  [DonateStoreEvents.ReplenishGift]: (
    payload: DonateStorePayloads[DonateStoreEvents.ReplenishGift],
  ) => {
    callClient(DonateStoreEvents.ReplenishGift, payload)
  },

  [DonateStoreEvents.Exchange]: (
    payload: DonateStorePayloads[DonateStoreEvents.Exchange],
  ) => {
    callClient(DonateStoreEvents.Exchange, payload)
  },

  [DonateStoreEvents.ExchangeGift]: (
    payload: DonateStorePayloads[DonateStoreEvents.ExchangeGift],
  ) => {
    callClient(DonateStoreEvents.ExchangeGift, payload)
  },

  [DonateStoreEvents.VipBuy]: (
    payload: DonateStorePayloads[DonateStoreEvents.VipBuy],
  ) => {
    callClient(DonateStoreEvents.VipBuy, payload)
  },

  [DonateStoreEvents.ServiceBuy]: (
    payload: DonateStorePayloads[DonateStoreEvents.ServiceBuy],
  ) => {
    callClient(DonateStoreEvents.ServiceBuy, payload)
  },

  [DonateStoreEvents.SellWarehouseItem]: (
    payload: DonateStorePayloads[DonateStoreEvents.SellWarehouseItem],
  ) => {
    callClient(DonateStoreEvents.SellWarehouseItem, payload)
  },

  [DonateStoreEvents.GiftWarehouseItem]: (
    payload: DonateStorePayloads[DonateStoreEvents.GiftWarehouseItem],
  ) => {
    callClient(DonateStoreEvents.GiftWarehouseItem, payload)
  },
}
