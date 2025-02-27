export enum TradingStoreEvents {
  Close = "tradingStore:close",
  Buy = "tradingStore:buy",
}

export type TradingStorePayloads = {
  [TradingStoreEvents.Buy]: {
    productId: any;
    amount: number;
  };
};
