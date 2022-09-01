import { match, P } from "ts-pattern";

export class Maybe<A> {
  private constructor(private value: A | undefined) {}

  static of<A>(value?: A | null) {
    return new Maybe<A>(
      match(value)
        .with(undefined, () => undefined)
        .with(null, () => undefined)
        .otherwise((v) => v!)
    );
  }

  bind<B>(fn: (a: A) => Maybe<B>): Maybe<B> {
    switch (this.value) {
      case undefined:
        return new Maybe<B>(this.value);
      default:
        return fn(this.value);
    }
  }
}

export function Nothing<A>() {
  return Maybe.of<A>();
}

const divideBy = (denominator: number) => (numerator: number) =>
  denominator === 0 ? Nothing<number>() : Maybe.of(numerator / denominator);

const parseNumber = (text: string) =>
  isNaN(parseFloat(text)) ? Nothing<number>() : Maybe.of(parseFloat(text));

const display = <T>(value: T) => {
  console.log("Value :", value);
  return Maybe.of(value);
};

Maybe.of(12)
  .bind(display) // "Value : 12"
  .bind(divideBy(3))
  .bind(display) // "Value : 4"
  .bind(divideBy(0)) // others functions won't be called
  .bind(divideBy(2))
  .bind(display); // won't run

Maybe.of("12")
  .bind(display) // "Value : 12"
  .bind(parseNumber)
  .bind(divideBy(3))
  .bind(display) // "Value : 4"
  .bind(divideBy(2))
  .bind(display); // "Value : 2"

Maybe.of("This is not a number")
  .bind(display) // "Value : This is not a number"
  .bind(parseNumber) // others functions won't be called
  .bind(divideBy(3))
  .bind(display) //  won't run
  .bind(divideBy(0))
  .bind(divideBy(2))
  .bind(display); // won't run
