import { useEffect, useState } from "react";

export type Atom<T> = { init: T };

export type AtomState<T> = { value: T; listeners: Set<() => void> };

const atomStateMap = new WeakMap();

function getAtomState<T>(atom: Atom<T>): AtomState<T> {
  let atomState = atomStateMap.get(atom);
  if (!atomState) {
    atomState = { value: atom.init, listeners: new Set() };
    atomStateMap.set(atom, atomState);
  }
  return atomState;
}

export function useAtom<T>(atom: Atom<T>): [T, (newValue: T) => void] {
  const atomState = getAtomState(atom);

  const [value, setValue] = useState<T>(atomState.value);

  useEffect(() => {
    const callback = () => setValue(atomState.value);
    atomState.listeners.add(callback);
    callback();
    return () => {
      atomState.listeners.delete(callback);
    };
  }, [atomState]);

  const setAtom = (newValue: T) => {
    atomState.value = newValue;
    atomState.listeners.forEach((l) => l());
  };
  return [value, setAtom];
}
