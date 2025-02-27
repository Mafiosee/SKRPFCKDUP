import "./styles.sass";
import React from "react";
import { useAppSelector } from "../../../../hooks/redux";

type Props = {
  activeCategoryId: any;
  setActiveCategoryId: (categoryId: any) => void;
};

const Navbar: React.FC<Props> = ({ activeCategoryId, setActiveCategoryId }) => {
  const { categories } = useAppSelector((state) => state.tradingStore);

  const getCategories = () =>
    [{ id: null, name: "Все" }, ...categories].map(({ id, name }) => {
      const isActive = activeCategoryId === id;
      const setActive = () => setActiveCategoryId(id);

      return (
        <div
          key={id}
          className={`category ${isActive && "-active"}`}
          onClick={setActive}
        >
          <div className="shadow" />
          <div className="content">
            <div className="name">{name}</div>
            <div className="line" />
          </div>
        </div>
      );
    });

  return <div className="_Navbar">{getCategories()}</div>;
};

export default Navbar;
