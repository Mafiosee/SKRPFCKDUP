import { Mounts } from "../../shared/CharacterMenu/config";
import { Quality } from "../../shared/inventory/itemType";
import { Gender } from "../../shared/characterEditor/enums/Genders";
import { Race } from "../../types/race";

export type PageType = {
  id: PageIds;
  name: string;
};

export enum PageIds {
  Character,
  Mounts,
  Skills,
  Achievements,
}

export const Pages: PageType[] = [
  {
    id: PageIds.Character,
    name: "Персонаж",
  },
  {
    id: PageIds.Mounts,
    name: "Маунты",
  },
  {
    id: PageIds.Skills,
    name: "Навыки",
  },
  {
    id: PageIds.Achievements,
    name: "Достижения",
  },
];

export enum SmallBlockColors {
  warn = "#552626",
  gold = "#6D6750",
}

export const MountsNames = {
  [Mounts.Horse]: "Лошадь",
};

type MountImage = {
  [key in Mounts]?: {
    [key in Quality]?: string;
  };
};
export const MountImages: MountImage = {
  [Mounts.Horse]: {
    [Quality.Unusual]: require("./assets/images/mounts/horse-common.png"),
    [Quality.Normal]: require("./assets/images/mounts/horse-uncommon.png"),
    [Quality.Rare]: require("./assets/images/mounts/horse-rare.png"),
    [Quality.Epic]: require("./assets/images/mounts/horse-epic.png"),
    [Quality.Legendary]: require("./assets/images/mounts/horse-legendary.png"),
  },
};

export const RadialColorByRarity = {
  [Quality.Unusual]:
    "(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0.01%, #515151 100%)",
  [Quality.Normal]:
    "50% 50% at 50% 50%, rgba(57, 146, 65, 0) 0.01%, #399241 100%",
  [Quality.Rare]:
    "(50% 50% at 50% 50%, rgba(76, 128, 174, 0) 0%, #3494E8 100%)",
  [Quality.Epic]:
    "(50% 50% at 50% 50%, rgba(0, 0, 0, 0) 0%, rgba(106, 42, 143, 0) 0.01%, #6A2A8F 100%)",
  [Quality.Legendary]:
    "(50% 50% at 50% 50%, rgba(189, 165, 39, 0) 0%, #FFD912 100%)",
};

export const BoxShadowByRarity = {
  [Quality.Unusual]: "#515151",
  [Quality.Normal]: "#3A6D3F",
  [Quality.Rare]: "#2D4C66",
  [Quality.Epic]: "#2B0E3C",
  [Quality.Legendary]: "#403B20",
};

export const SpouseNames = {
  [Gender.Male]: "Супруга",
  [Gender.Female]: "Супруг",
};

export const CharacterBgColorByRace = {
  [Race.WoodElf]: "#2D393A",
  [Race.Khajit]: "#5B5B5B",
  [Race.DarkElf]: "#4E6285",
  [Race.Nord]: "#7E5320",
  [Race.Breton]: "#243951",
  [Race.Orc]: "#446951",
  [Race.Argonian]: "#918165",
  [Race.HighElf]: "#55542B",
  [Race.Redguard]: "#723D30",
  [Race.Imperial]: "#461818",
};
