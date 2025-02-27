import "./styles.sass";
import React from "react";
import { SettingParameterData, SettingParameterType } from "../../types";
import { EscMenuEvents, UpdateSettingValuePayload } from "../../api";
import { callClient } from "../../../../utils/api";
import { escMenuActions } from "../../reducer";
import { useAppDispatch } from "../../../../hooks/redux";

type Props = {
  settingId: any;
  data: SettingParameterData[SettingParameterType.Checkbox];
};

const SettingsCheckbox: React.FC<Props> = ({ data, settingId }) => {
  const dispatch = useAppDispatch();

  const updateValue = () => {
    const payload: UpdateSettingValuePayload = {
      settingId,
      newValue: !data.current,
    };
    callClient(EscMenuEvents.UpdateSettingValue, payload);
    dispatch(escMenuActions.setChangedSettings(true));
  };

  return (
    <div className="_SettingsCheckbox" onClick={updateValue}>
      <div className={`check ${data.current && "-checked"}`} />
      <div className="helper">{data.helper}</div>
    </div>
  );
};

export default SettingsCheckbox;
