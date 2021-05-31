import { User } from "./userModel";

export interface IFile {
  name: string;
  mimetype: string;
  destination: string;
  path: string;
  size: number;
  // owner: User;
}