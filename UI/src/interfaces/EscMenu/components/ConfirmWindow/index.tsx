import React from "react";
import "./styles.sass";
import { Simulate } from "react-dom/test-utils";
import cancel = Simulate.cancel;

type PropsType = {
  blockName: string;
  text: string;
  confirm: {
    name: string;
    onClick: () => void;
  };
  cancel: {
    name: string;
    onClick: () => void;
  };
  exit: {
    onClick: () => void;
  };
};

export const ConfirmWindow: React.FC<PropsType> = ({
  blockName,
  text,
  confirm,
  cancel,
  exit,
}) => {
  return (
    <div className={"_ConfirmWindow"}>
      <div className="content">
        <div className="content">
          <div className="text">{text}</div>
          <div className="buttons">
            <div className="btn confirm-btn" onClick={confirm.onClick}>
              {confirm.name}
            </div>
            <div className="btn exit-btn" onClick={cancel.onClick}>
              {cancel.name}
            </div>
          </div>
        </div>
        <div className="block-info">
          <div className="name">{blockName}</div>
          <div className="exit" onClick={exit.onClick} />
        </div>
      </div>
    </div>
  );
};
