function Human(name: string) {
  return {
    name, // no need for local var
  };
}

function Student(name: string) {
  return {
    ...Human(name),
    study() {
      return `${name} is studying`;
    },
    sayGoobye() {
      return `See you later ${name}.`;
    },
  };
}

function YoungStudent(name: string, age: number) {
  return {
    ...Student(name), // will also spread the function sayGoobye()
    study() {
      // overriding Student.study()
      return `${name} is still studying (overidden)`;
    },
    sayHello() {
      return `Hello ! I'm ${name} and i'm ${age} years old.`;
    },
  };
}

console.log(YoungStudent("Hervé", 20).sayHello());
// Hello ! I'm Hervé and i'm 20 years old.
console.log(YoungStudent("Hervé", 20).study());
// Hervé is still studying (overidden)
console.log(YoungStudent("Hervé", 20).sayGoobye());
// See you later Hervé.
