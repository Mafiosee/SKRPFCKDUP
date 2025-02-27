import "./styles.sass";
import React, { useEffect, useState } from "react";
import { SettingParameterData, SettingParameterType } from "../../types";
import { EscMenuEvents, UpdateSettingValuePayload } from "../../api";
import { callClient } from "../../../../utils/api";
import { useAppDispatch } from "../../../../hooks/redux";
import { escMenuActions } from "../../reducer";

type Props = {
  settingId: any;
  data: SettingParameterData[SettingParameterType.Input];
};

const SettingsInput: React.FC<Props> = ({ data, settingId }) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState(data.current);

  const onChange = (newValue: string) => {
    if (newValue.length > data.maxLength) {
      return;
    }
    const payload: UpdateSettingValuePayload = {
      settingId,
      newValue: newValue,
    };
    callClient(EscMenuEvents.UpdateSettingValue, payload);
    dispatch(escMenuActions.setChangedSettings(true));
    setValue(newValue);
  };

  return (
    <div className="_SettingsInput">
      <input
        type="text"
        placeholder={data.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SettingsInput;
