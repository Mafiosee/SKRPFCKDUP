import "./styles.sass";
import React from "react";
import { useAppSelector } from "../../../../hooks/redux";
import { numberWithSeparator } from "../../../../utils/numberWithSeparator";

const Balance: React.FC = () => {
  const { balance } = useAppSelector((state) => state.tattooShop);
  return <div className="_Balance">{numberWithSeparator(balance, ".")}</div>;
};

export default Balance;
