import "./styles.sass";
import React, { useEffect, useState } from "react";
import { SettingParameterData, SettingParameterType } from "../../types";
import { calcVw } from "../../../../utils/calcVw";
import { EscMenuEvents, UpdateSettingValuePayload } from "../../api";
import { callClient } from "../../../../utils/api";
import { useAppDispatch } from "../../../../hooks/redux";
import { escMenuActions } from "../../reducer";

type Props = {
  settingId: any;
  data: SettingParameterData[SettingParameterType.List];
};

const SettingsList: React.FC<Props> = ({ data, settingId }) => {
  const dispatch = useAppDispatch();
  const [isListOpened, setIsListOpened] = useState(false);

  const currentValue = data.values.find((el) => el.id === data.current);
  if (!currentValue) {
    return null;
  }

  const updateValue = (id: any) => {
    const payload: UpdateSettingValuePayload = {
      settingId,
      newValue: id,
    };
    callClient(EscMenuEvents.UpdateSettingValue, payload);
    dispatch(escMenuActions.setChangedSettings(true));
  };

  useEffect(() => {
    const onClickHandler = () => setIsListOpened(false);
    document.addEventListener("click", onClickHandler);
    return () => {
      document.removeEventListener("click", onClickHandler);
    };
  }, []);

  return (
    <div className="_SettingsList">
      <div
        className="current"
        onClick={(event) => {
          event.stopPropagation();
          setIsListOpened((prev) => !prev);
        }}
      >
        <div className="title">{currentValue.title}</div>
        <div className={`arrow ${isListOpened && "-opened"}`} />
      </div>
      <div
        className="list"
        style={{
          height: isListOpened ? calcVw(data.values.length * 50) : 0,
          opacity: isListOpened ? 1 : 0,
        }}
      >
        {data.values.map(({ id, title }) => (
          <div key={id} className="item" onClick={() => updateValue(id)}>
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsList;
