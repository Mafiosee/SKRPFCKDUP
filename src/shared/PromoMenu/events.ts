export enum PromoMenuEvents {
  ActivatePromo = "escMenu:activatePromo",
  TakeGifts = "escMenu:takeGifts",
}

export type PromoMenuPayloads = {
  [PromoMenuEvents.ActivatePromo]: {
    promo: string;
  };
};
