export enum ManufacturingBusinessEvents {
  Close = "manufacturingBusiness:close",
  KickMember = "manufacturingBusiness:kickMember",
  PayTax = "manufacturingBusiness:payTax",
}

export type ManufacturingBusinessPayloads = {
  [ManufacturingBusinessEvents.KickMember]: {
    memberId: any;
  };
  [ManufacturingBusinessEvents.PayTax]: {
    days: number;
  };
};
