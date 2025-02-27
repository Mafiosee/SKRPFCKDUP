export enum BarbershopEvents {
  Close = "barbershop:close",
  SetActiveProduct = "barbershop:setActiveProduct",
  SetActiveColor = "barbershop:setActiveColor",
  BuyProduct = "barbershop:buyProduct",
}

export type BarbershopPayloads = {
  [BarbershopEvents.SetActiveProduct]: {
    productId: any;
  };
  [BarbershopEvents.SetActiveColor]: {
    colorId: any;
  };
  [BarbershopEvents.BuyProduct]: {
    productId: any;
    colorId: any;
  };
};
