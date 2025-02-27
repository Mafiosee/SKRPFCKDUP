import "./styles.sass";
import React from "react";
import {
  BarbershopEvents,
  BarbershopPayloads,
} from "../../../../shared/Barbershop/events";
import { callClient } from "../../../../utils/api";

type Props = {
  activeProductId: any;
  activeColorId: any;
};

const BuyButton: React.FC<Props> = ({ activeProductId, activeColorId }) => {
  return (
    <div
      className="_BuyButton"
      onClick={() => {
        const payload: BarbershopPayloads[BarbershopEvents.BuyProduct] = {
          productId: activeProductId,
          colorId: activeColorId,
        };
        callClient(BarbershopEvents.BuyProduct, payload);
      }}
    >
      Приобрести
    </div>
  );
};

export default BuyButton;
