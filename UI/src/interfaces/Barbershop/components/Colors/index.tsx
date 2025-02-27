import "./styles.sass";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../../../hooks/redux";

type Props = {
  activeColorId: any;
  setActiveColorId: (colorId: any) => void;
};

const Colors: React.FC<Props> = ({ activeColorId, setActiveColorId }) => {
  const { colors } = useAppSelector((state) => state.barbershop);
  const activeColorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeColorRef.current == null) {
      return;
    }
    activeColorRef.current.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center",
    });
  }, [activeColorRef.current]);

  const updateActiveColor = (diff: number) => {
    const currentIndex = colors.findIndex(
      (color) => color.id === activeColorId,
    );
    if (currentIndex === -1) {
      return;
    }
    const newIndex = currentIndex + diff;
    if (newIndex < 0 || newIndex >= colors.length) {
      return;
    }
    setActiveColorId(colors[newIndex].id);
  };

  const renderColors = () =>
    colors.map(({ id, value }) => {
      const isActive = activeColorId === id;
      const setActive = () => setActiveColorId(id);
      const [a, r, g, b] = value.toString(16).split(/(?=(?:..)*$)/);

      return (
        <div
          key={id}
          className={`color ${isActive && "-active"}`}
          onClick={setActive}
          ref={isActive ? activeColorRef : undefined}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.0001 7.77293C24.8392 7.77293 25.6093 7.4832 26.2122 7.00012L44 24.4561L26.2124 41.9119C25.6094 41.4287 24.8393 41.1389 24.0001 41.1389C23.1609 41.1389 22.3907 41.4287 21.7877 41.912L4 24.4561L21.7879 7C22.3909 7.48315 23.161 7.77293 24.0001 7.77293Z"
              fill={`#${r}${g}${b}`}
            />
          </svg>
        </div>
      );
    });

  return (
    <div className="_Colors">
      <div className="title">Цвет растительности</div>
      <div className="select">
        <div className="arrow -left" onClick={() => updateActiveColor(-1)} />
        <div className="colors">{renderColors()}</div>
        <div className="arrow -right" onClick={() => updateActiveColor(1)} />
      </div>
    </div>
  );
};

export default Colors;
