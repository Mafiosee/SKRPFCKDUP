export enum WeddingRequestEvents {
  Close = "weddingRequest:close",
  Request = "weddingRequest:request",
}

export type WeddingRequestPayloads = {
  [WeddingRequestEvents.Request]: {
    playerId: any;
  };
};
