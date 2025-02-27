import {PaymentMethod} from "./PaymentMethod";

export enum CreateGuildEvents {
  Close = 'createGuild:close',
  Create = 'createGuild:create',
  Rules = 'createGuild:rules',
}

export type CreateGuildCreatePayload = {
  paymentMethod: PaymentMethod
  houseId: any
  additionalIds: any[]
}