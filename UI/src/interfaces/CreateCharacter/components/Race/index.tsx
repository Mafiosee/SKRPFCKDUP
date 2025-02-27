import "./styles.sass";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { ValuesKeys } from "../../types";
import { callClient } from "../../../../utils/api";
import { createCharacterActions } from "../../reducer";
import { Race as Races } from "../../../../types/race";
import { Gender } from "../../../../shared/characterEditor/enums/Genders";
import { CreateCharacterEvents } from "../../../../shared/characterEditor/events";

const Images: Record<Races, Record<Gender, string>> = {
  [Races.Nord]: {
    [Gender.Male]: require("../../assets/images/race/nord.png"),
    [Gender.Female]: require("../../assets/images/race/nord-female.png"),
  },
  [Races.Imperial]: {
    [Gender.Male]: require("../../assets/images/race/imperial.png"),
    [Gender.Female]: require("../../assets/images/race/imperial-female.png"),
  },
  [Races.Orc]: {
    [Gender.Male]: require("../../assets/images/race/orc.png"),
    [Gender.Female]: require("../../assets/images/race/orc-female.png"),
  },
  [Races.Argonian]: {
    [Gender.Male]: require("../../assets/images/race/argonian.png"),
    [Gender.Female]: require("../../assets/images/race/argonian-female.png"),
  },
  [Races.DarkElf]: {
    [Gender.Male]: require("../../assets/images/race/darkElf.png"),
    [Gender.Female]: require("../../assets/images/race/darkElf-female.png"),
  },
  [Races.HighElf]: {
    [Gender.Male]: require("../../assets/images/race/highElf.png"),
    [Gender.Female]: require("../../assets/images/race/highElf-female.png"),
  },
  [Races.Breton]: {
    [Gender.Male]: require("../../assets/images/race/breton.png"),
    [Gender.Female]: require("../../assets/images/race/breton-female.png"),
  },
  [Races.WoodElf]: {
    [Gender.Male]: require("../../assets/images/race/woodElf.png"),
    [Gender.Female]: require("../../assets/images/race/woodElf-female.png"),
  },
  [Races.Khajit]: {
    [Gender.Male]: require("../../assets/images/race/khajit.png"),
    [Gender.Female]: require("../../assets/images/race/khajit-female.png"),
  },
  [Races.Redguard]: {
    [Gender.Male]: require("../../assets/images/race/redguard.png"),
    [Gender.Female]: require("../../assets/images/race/redguard-female.png"),
  },
};

type RaceProps = {
  componentId: ValuesKeys;
  list: { id: Races; name: string }[];
};

const Race: React.FC<RaceProps> = ({ componentId, list }) => {
  const dispatch = useAppDispatch();
  const { values } = useAppSelector((state) => state.createCharacter);
  const activeRaceRef = useRef<HTMLDivElement>(null);

  const gender: Gender = values[ValuesKeys.Gender];

  useEffect(() => {
    activeRaceRef.current?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeRaceRef.current]);

  const renderList = () =>
    list.map(({ id, name }) => {
      const isActive = id === values[componentId];
      const setActive = () => {
        dispatch(
          createCharacterActions.setValue({ id: componentId, value: id }),
        );
        callClient(CreateCharacterEvents.UpdateRace, { race: id });
      };
      return (
        <div
          className={`item ${isActive && "-active"}`}
          key={id}
          onClick={setActive}
          style={{ backgroundImage: `url(${Images[id][gender]})` }}
          ref={isActive ? activeRaceRef : null}
        >
          <div className="hover" />
          <div className="name">{name}</div>
        </div>
      );
    });

  return <div className="_Race">{renderList()}</div>;
};

export default Race;
