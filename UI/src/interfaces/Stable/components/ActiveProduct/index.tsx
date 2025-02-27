import "./styles.sass";
import React, { useMemo } from "react";
import {
  QualityColor,
  QualityNoShadowIcon,
} from "../../../DonateStore/data/quality";
import { useAppSelector } from "../../../../hooks/redux";
import { Quality } from "../../../../shared/inventory/itemType";
import { QualityNames } from "../../../Inventory/data";
import { StableEvents, StablePayloads } from "../../../../shared/Stable/events";
import { callClient } from "../../../../utils/api";

type Props = {
  activeProductId: any;
};

const ActiveProduct: React.FC<Props> = ({ activeProductId }) => {
  const { products } = useAppSelector((state) => state.stable);

  const product = useMemo(
    () => products.find((product) => product.id === activeProductId),
    [activeProductId, products],
  );

  const renderPoints = (amount: number) =>
    new Array(6)
      .fill(null)
      .map((_, idx) => (
        <div className={`point ${amount - 1 >= idx && "-active"}`} />
      ));

  return (
    <div className={`_ActiveProduct ${activeProductId != null && "-show"}`}>
      <div className="background">
        <div
          className="circle"
          style={{
            backgroundColor:
              QualityColor[product ? product.quality : Quality.Unusual],
          }}
        />
      </div>
      {product != null && (
        <div className="content">
          <div className="name">{product.name}</div>
          <div className="quality">
            <div
              className="icon"
              style={{
                backgroundImage: `url(${QualityNoShadowIcon[product.quality]})`,
              }}
            />
            <div
              className="name"
              style={{ color: QualityColor[product.quality] }}
            >
              {QualityNames[product.quality]}
            </div>
          </div>
          <div className="stats">
            <div className="row">
              <div className="title -speed">Скорость:</div>
              <div className="progress">{renderPoints(product.speed)}</div>
            </div>
            <div className="row">
              <div className="title -health">Выживаемость:</div>
              <div className="progress">{renderPoints(product.health)}</div>
            </div>
            <div className="row">
              <div className="title -weight">Грузоподъёмность:</div>
              <div className="value">{product.weight} кг</div>
            </div>
          </div>
          <div
            className="button"
            onClick={() => {
              const payload: StablePayloads[StableEvents.BuyProduct] = {
                productId: product.id,
              };
              callClient(StableEvents.BuyProduct, payload);
            }}
          >
            Приобрести
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveProduct;
