export enum EmploymentEvents {
  Close = "employment:close",
  GetJobPosition = "employment:getJobPosition",
  StatusChanged = "employment:statusChanged",
}

export type EmploymentPayloads = {
  [EmploymentEvents.GetJobPosition]: {
    id: any;
  };
  [EmploymentEvents.StatusChanged]: {
    id: any;
  };
};
