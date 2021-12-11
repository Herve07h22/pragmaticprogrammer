type Callback = (exitStatus: number) => void;

export const Terminator = {
  callbacks: [] as Callback[],
  register: (callback: Callback) => Terminator.callbacks.push(callback),
  exit: (exitStatus: number) => {
    for (const callback of Terminator.callbacks) callback(exitStatus);
    process.exit(exitStatus);
  },
};
