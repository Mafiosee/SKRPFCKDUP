import "./styles.sass";
import React from "react";
import { SettingParameterData, SettingParameterType } from "../../types";
import { callClient } from "../../../../utils/api";
import { EscMenuEvents, UpdateSettingValuePayload } from "../../api";
import { useAppDispatch } from "../../../../hooks/redux";
import { escMenuActions } from "../../reducer";

type Props = {
  settingId: any;
  data: SettingParameterData[SettingParameterType.Select];
};

const SettingsSelect: React.FC<Props> = ({ data, settingId }) => {
  const dispatch = useAppDispatch();

  const updateValue = (diff: number) => {
    let newIndex = data.current + diff;
    const max = data.values.length - 1;

    if (newIndex < 0) {
      newIndex = max;
    } else if (newIndex > max) {
      newIndex = 0;
    }

    const payload: UpdateSettingValuePayload = {
      settingId,
      newValue: data.values[newIndex].id,
    };
    callClient(EscMenuEvents.UpdateSettingValue, payload);
    dispatch(escMenuActions.setChangedSettings(true));
  };

  return (
    <div className="_SettingsSelect">
      <div className="arrow" onClick={() => updateValue(-1)} />
      <div className="current">
        {data.values.find((el) => el.id === data.current)?.title}
      </div>
      <div className="arrow" onClick={() => updateValue(1)} />
    </div>
  );
};

export default SettingsSelect;
