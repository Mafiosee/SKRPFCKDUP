import "./styles.sass";
import React from "react";
import { callClient } from "../../../../utils/api";
import { BarbershopEvents } from "../../../../shared/Barbershop/events";

const ExitButton: React.FC = () => {
  return (
    <div
      className="_ExitButton"
      onClick={() => callClient(BarbershopEvents.Close)}
    >
      Покинуть магазин
    </div>
  );
};

export default ExitButton;
