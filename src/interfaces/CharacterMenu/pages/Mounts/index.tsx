import React from "react";
import "./styles.sass";
import { useAppSelector } from "../../../../hooks/redux";
import {
  MountImages,
  MountsNames,
} from "../../data";
import { QualityColors, QualityNames } from "../../../Inventory/data";
import { TextColorByRarity } from "../../../../shared/inventory/itemColor";

type PropsType = {};

export const Mounts = () => {
  const { mounts } = useAppSelector((state) => state.characterMenu);
  return (
    <div className={"_Mounts"}>
      <div className="content">
        {mounts.length > 0 &&
          mounts.map((mount, idx) => (
            <div key={idx} className={"mount"}>
              <div
                className="bg"
                style={{
                  backgroundImage: `url(${MountImages[mount.mount]?.[mount.rarity]})`,
                }}
              />
              <div className="info">
                <div className="rarity">
                  <div className="rarity">
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.625 10L10 0.625L19.375 10L10 19.375L0.625 10Z"
                        stroke="white"
                        strokeOpacity="0.16"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M1.25 10L10 1.25L18.75 10L10 18.75L1.25 10Z"
                        fill="url(#paint0_radial_2194_120816)"
                      />
                      <defs>
                        <radialGradient
                          id="paint0_radial_2194_120816"
                          cx="0"
                          cy="0"
                          r="1"
                          gradientUnits="userSpaceOnUse"
                          gradientTransform="translate(10 10) rotate(90) scale(8.75)"
                        >
                          <stop stopOpacity="0" />
                          <stop offset="0.0001" stopOpacity="0" />
                          <stop
                            offset="1"
                            stopColor={QualityColors[mount.rarity]}
                          />
                        </radialGradient>
                      </defs>
                    </svg>
                    <div
                      className="shadow"
                      style={{ backgroundColor: QualityColors[mount.rarity] }}
                    />
                    <div className="icon" />
                  </div>
                  <div
                    className="text"
                    style={{ color: TextColorByRarity[mount.rarity] }}
                  >
                    {QualityNames[mount.rarity]}
                  </div>
                </div>
                <div className="name">{MountsNames[mount.mount]}</div>
              </div>
            </div>
          ))}
        {mounts.length === 0 && (
          <div className={"not-have-mounts"}>
            <div className="content">
              <div className="icon" />
              <div className="text">
                у вас еще нет маунтов, их можно приобрести{" "}
                <span>в конюшне</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
