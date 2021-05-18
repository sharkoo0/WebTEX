import { User } from "./userModel";

export interface File {
  name: string;
  mimetype: string;
  destination: string;
  path: string;
  size: number;
  owner: User;
}