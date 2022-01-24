import { Atom } from "./store";

export type Counter = {
  count: number;
  from: string;
};
export const storedCounter: Atom<Counter> = {
  init: { count: 0, from: "counter" },
};
