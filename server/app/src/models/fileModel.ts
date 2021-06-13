import { User } from "./userModel";

export interface File {
  name: string;
  type: string;
  destination: string;
  path: string;
  size: number;
}