// Any more elegant way to do this?

export function pipe<A, A1, A2>(
  fn1: (args: A) => A1,
  fn2: (props: A1) => A2
): (args: A) => A2;
export function pipe<A, A1, A2, A3>(
  fn1: (args: A) => A1,
  fn2: (props: A1) => A2,
  fn3: (props: A2) => A3
): (args: A) => A3;
export function pipe<A, A1, A2, A3, A4>(
  fn1: (args: A) => A1,
  fn2: (props: A1) => A2,
  fn3: (props: A2) => A3,
  fn4: (props: A3) => A4
): (args: A) => A4;

export function pipe(fn1: any, ...fns: any[]) {
  return fns.reduce((acc, val) => (props: any) => val(acc(props)), fn1);
}
