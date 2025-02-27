import "./styles.sass";
import React from "react";
import { useAppSelector } from "../../../../hooks/redux";

const StoreName: React.FC = () => {
  const { storeName } = useAppSelector((state) => state.armorStore);
  return <div className="_StoreName">{storeName}</div>;
};

export default StoreName;
