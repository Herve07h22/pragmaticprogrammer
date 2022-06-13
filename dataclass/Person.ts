let GUARD = Symbol("Empty");
let VALUES = Symbol("Values");

class Data {
  static of<Type extends Data>(values?: Partial<Type>): Type {
    let data = new this(GUARD) as Type;
    console.log(this); // Person class
    console.log(this.prototype); // Data
    console.log(data); // instance of Person
    Object.defineProperty(data, VALUES, { value: values });
    // Object.seal(data);
    Object.assign(data, values);
    return Object.freeze(data);
  }

  constructor(values: any) {
    if (values !== GUARD) {
      throw new Error(
        "Use " +
          this.constructor.name +
          ".create(...) instead of `new` operator"
      );
    }
  }
}

var Test = class {
  static hello(v: string) {
    return new this(); // call the constructor
  }
};

class Person extends Data {
  name!: string;
  age!: number;
}

const p = Person.of({ name: "Bill", age: 34 });
