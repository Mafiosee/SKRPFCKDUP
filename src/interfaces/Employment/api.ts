import {
  EmploymentEvents,
  EmploymentPayloads,
} from "../../shared/Employment/events";
import { callClient } from "../../utils/api";

export const onClickLocation = (id: any) => {
  const payload: EmploymentPayloads[EmploymentEvents.GetJobPosition] = {
    id,
  };
  callClient(EmploymentEvents.GetJobPosition, payload);
};

export const onClickJob = (id: any) => {
  const payload: EmploymentPayloads[EmploymentEvents.StatusChanged] = {
    id,
  };

  callClient(EmploymentEvents.StatusChanged, payload);
};

export const onClickExit = () => {
  callClient(EmploymentEvents.Close);
};
