export enum StableEvents {
  Close = "stable:close",
  SetActiveProduct = "stable:setActiveProduct",
  BuyProduct = "stable:buyProduct",
}

export type StablePayloads = {
  [StableEvents.SetActiveProduct]: {
    productId: any;
  };
  [StableEvents.BuyProduct]: {
    productId: any;
  };
};
