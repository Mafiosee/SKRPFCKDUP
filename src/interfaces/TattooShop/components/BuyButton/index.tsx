import "./styles.sass";
import React from "react";
import { callClient } from "../../../../utils/api";
import {
  TattooShopEvents,
  TattooShopPayloads,
} from "../../../../shared/TattooShop/events";

type Props = {
  activeProductId: any;
  activeColorId: any;
};

const BuyButton: React.FC<Props> = ({ activeProductId, activeColorId }) => {
  return (
    <div
      className="_BuyButton"
      onClick={() => {
        const payload: TattooShopPayloads[TattooShopEvents.BuyProduct] = {
          productId: activeProductId,
          colorId: activeColorId,
        };
        callClient(TattooShopEvents.BuyProduct, payload);
      }}
    >
      Приобрести
    </div>
  );
};

export default BuyButton;
