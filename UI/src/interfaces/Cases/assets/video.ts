import {Amount, Step} from "../types";

export const Video = {
  [Step.Drop]: require('./videos/drop.webm'),
  [Step.Idle]: require('./videos/idle.webm'),
  [Step.Open]: {
    [Amount.One]: require('./videos/open_1.webm'),
    [Amount.Three]: require('./videos/open_3.webm'),
  },
  [Step.After]: {
    [Amount.One]: require('./videos/after_1.webm'),
    [Amount.Three]: require('./videos/after_3.webm'),
  },
}