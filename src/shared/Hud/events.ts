export enum HudEvents {
  SendMessage = "hud:sendMessage",
  HideInput = "hud:hideInput",
}

export type SendMessageData = {
  message: string;
  command?: string;
};
