export enum BuyMaterialsEvents {
  Close = "buyMaterials:close",
  Buy = "buyMaterials:buy",
}

export type BuyMaterialsPayloads = {
  [BuyMaterialsEvents.Buy]: {
    amount: number;
  };
};
