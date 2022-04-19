function pipe<A, B>(fn1: (a: A) => B): (a: A) => B;
function pipe<A, B, C>(fn1: (a: A) => B, fn2: (b: B) => C): (a: A) => C;
function pipe<A, B, C, D>(
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D
): (a: A) => D;
function pipe<A, B, C, D, E>(
  fn1: (a: A) => B,
  fn2: (b: B) => C,
  fn3: (c: C) => D,
  fn4: (d: D) => E
): (a: A) => E;
function pipe<A, B>(...fns: any[]) {
  return (a: A) => fns.reduce((acc, fn) => fn(acc), a);
}

interface Dependencies {
  env: "development" | "production";
  logger: (message: string) => void;
  loader: (row: number) => string;
}

type Reader<A> = {
  value: A;
  deps: Dependencies;
};

// unit
const unit: (deps: Dependencies) => <A>(value: A) => Reader<A> =
  (deps) => (value) => ({
    value,
    deps,
  });

// bind
function bind<A, B>(fn: (params: A) => B): (a: Reader<A>) => Reader<B>;
function bind<A, B>(
  fn: (params: A, deps: Dependencies) => B
): (a: Reader<A>) => Reader<B>;
function bind<A, B>(
  fn: ((params: A) => B) | ((params: A, deps: Dependencies) => B)
) {
  return function (a: Reader<A>): Reader<B> {
    const { value, deps } = a;
    if (fn.length === 1) {
      const fn1 = fn as (params: A) => B;
      return { value: fn1(value), deps };
    }
    return { value: fn(value, deps), deps };
  };
}

const dependencies: Dependencies = {
  env: "production",
  logger: console.log,
  loader: (i) => `row #${i}`,
};

const f1 = (a: number, deps: Dependencies) =>
  deps.env === "production" ? a : 2;
const f2 = (a: number) => a * 2;
const f3 = (a: number, deps: Dependencies) => {
  const message = `The number is ${a}`;
  deps.logger(message);
  return message;
};

const f1b = bind(f1);
const f2b = bind(f2);
const f3b = bind(f3);

const withDependencies = unit(dependencies);

const result = pipe(f1b, f2b, f3b)(withDependencies(12));
