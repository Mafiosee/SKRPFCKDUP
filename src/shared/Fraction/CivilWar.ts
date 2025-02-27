import {CivilWarMembers} from "./CivilWar/Members";

export enum ZoneId {
  Haafingar_0,
  Reach_0,
  Reach_1,
  Reach_2,
  Reach_3,
  Reach_4,
  Reach_5,
  Hjaaalmarch_0,
  Hjaaalmarch_1,
  Hjaaalmarch_2,
  Hjaaalmarch_3,
  Hjaaalmarch_4,
  Hjaaalmarch_5,
  Pale_0,
  Pale_1,
  Pale_2,
  Pale_3,
  Pale_4,
  Pale_5,
  Winterhold_0,
  Winterhold_1,
  Winterhold_2,
  Winterhold_3,
  Winterhold_4,
  Winterhold_5,
  Whiterun_0,
  Whiterun_1,
  Whiterun_2,
  Whiterun_3,
  Whiterun_4,
  Whiterun_5,
  Falkreath_0,
  Falkreath_1,
  Falkreath_2,
  Falkreath_3,
  Falkreath_4,
  Falkreath_5,
  Eastmarch_0,
  Rift_0,
  Rift_1,
  Rift_2,
  Rift_3,
  Rift_4,
  Rift_5,
}

export type Zone = {
  id: ZoneId
  owner: CivilWarMembers
  isSpawn: boolean
  captureDatetime: string
  canCapture: boolean
}