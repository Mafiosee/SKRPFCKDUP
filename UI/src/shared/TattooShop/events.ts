export enum TattooShopEvents {
  Close = "tattooShop:close",
  SetActiveProduct = "tattooShop:setActiveProduct",
  SetActiveColor = "tattooShop:setActiveColor",
  BuyProduct = "tattooShop:buyProduct",
}

export type TattooShopPayloads = {
  [TattooShopEvents.SetActiveProduct]: {
    productId: any;
  };
  [TattooShopEvents.SetActiveColor]: {
    colorId: any;
  };
  [TattooShopEvents.BuyProduct]: {
    productId: any;
    colorId: any;
  };
};
