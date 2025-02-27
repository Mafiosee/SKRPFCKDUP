import "./styles.sass";
import React from "react";
import { callClient } from "../../../../utils/api";
import { StableEvents } from "../../../../shared/Stable/events";

const ExitButton: React.FC = () => {
  return (
    <div className="_ExitButton" onClick={() => callClient(StableEvents.Close)}>
      Покинуть магазин
    </div>
  );
};

export default ExitButton;
