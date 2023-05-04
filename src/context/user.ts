import { createContext } from "react";

export type User = {
  uid: string,
  email: string,
  displayName: string
}

export default createContext<User | null>(null);