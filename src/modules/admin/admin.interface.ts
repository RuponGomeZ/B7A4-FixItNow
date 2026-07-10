import { Status } from "../../../generated/prisma/enums";

export interface ICategory {
  name: string;
  description: string;
}

export interface IStatus {
  status: Status;
}
