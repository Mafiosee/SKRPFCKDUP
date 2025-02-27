import "./styles.sass";
import React, { useEffect, useState } from "react";
import { QualityNoShadowIcon } from "../../../DonateStore/data/quality";
import { Quality } from "../../../../shared/inventory/itemType";
import { QualityNames } from "../../../Inventory/data";

type Props = {
  activeQuality: Quality | null;
  setActiveQuality: (quality: Quality | null) => void;
};

const Qualities = [
  null,
  Quality.Normal,
  Quality.Unusual,
  Quality.Rare,
  Quality.Epic,
  Quality.Legendary,
];

const QualitySelector: React.FC<Props> = ({
  activeQuality,
  setActiveQuality,
}) => {
  const [isOpenList, setIsOpenList] = useState(false);

  useEffect(() => {
    const onClick = () => setIsOpenList(false);
    if (isOpenList) {
      document.addEventListener("click", onClick);
    }
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [isOpenList]);

  const getList = () =>
    Qualities.map((quality) => (
      <div
        key={quality}
        className="quality"
        onClick={() => setActiveQuality(quality)}
      >
        {quality != null && (
          <div
            className="icon"
            style={{
              backgroundImage: `url(${QualityNoShadowIcon[quality]})`,
            }}
          />
        )}
        <div className="name">
          {quality == null ? "Все" : QualityNames[quality]}
        </div>
      </div>
    ));

  return (
    <div className="_QualitySelector">
      <div
        className={`current ${isOpenList && "-opened"}`}
        onClick={(event) => {
          event.stopPropagation();
          setIsOpenList(true);
        }}
      >
        <div className="row">
          {activeQuality != null && (
            <div
              className="icon"
              style={{
                backgroundImage: `url(${QualityNoShadowIcon[activeQuality]})`,
              }}
            />
          )}
          <div className="name">
            {activeQuality == null ? "Все" : QualityNames[activeQuality]}
          </div>
        </div>
      </div>
      <div className={`list ${isOpenList && "-opened"}`}>{getList()}</div>
    </div>
  );
};

export default QualitySelector;
