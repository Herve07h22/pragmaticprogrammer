/* **
I think the lack of reusability comes in object oriented languages, not in functional languages. 
Because the problem with object oriented languages is they’ve got all this implicit environment 
that they carry around with them. You wanted a banana but what you got was a gorilla holding 
the banana and the entire jungle
*/

/** ***********************
 * OOP style
 * ************************ */
class Jungle {
  animals: Animal[] = [];
  welcome(animal: Animal) {
    this.animals.push(animal);
  }
  findAnimalByName(name: string) {
    return this.animals.find(Animal.hasName(name));
  }
  getAllBananasInTheJungle() {
    return this.animals.reduce((bananas, animal) => {
      const food = animal.aboutToEat();
      if (Food.isABanana(food)) {
        return [...bananas, food];
      }
      return bananas;
    }, [] as Banana[]);
  }
}

type Nothing = undefined;

class Animal {
  food: Food | Nothing;
  constructor(public name: string) {}
  static hasName(name: string) {
    return (animal: Animal) => animal.name === name;
  }
  eat(): this {
    if (!this.aboutToEat())
      throw new Error(`Sorry, I dont have anything to eat`);
    this.food = undefined;
    return this;
  }
  aboutToEat(): Food | Nothing {
    return this.food;
  }
}

class Lion extends Animal {
  pick(food: Meat): this {
    this.food = food;
    return this;
  }
}

class Gorilla extends Animal {
  pick(food: Banana): this {
    this.food = food;
    return this;
  }
}

class Food {
  static isABanana(food: Food | Nothing): food is Banana {
    return !!food && food instanceof Banana;
  }
}

class Banana extends Food {
  _className!: "Banana"; // TypeScript duke typing
}

class Meat extends Food {
  _className!: "Meat";
}

const jungle = new Jungle();
jungle.welcome(new Lion("Lion #1").pick(new Meat()));
jungle.welcome(new Gorilla("Gorilla #1").pick(new Banana()));
jungle.welcome(new Gorilla("Gorilla #2").pick(new Banana()));

// Get the list of all the bananas
console.log(jungle.getAllBananasInTheJungle());
jungle.findAnimalByName("Gorilla #1")?.eat();
jungle.findAnimalByName("Lion #1")?.eat();
console.log(jungle.getAllBananasInTheJungle());

/** ***********************
 * FP style
 * ************************ */

type FPJungle = FPAnimal[];

type FPNamedAnimal = {
  name: string;
};

type FPCanHoldBanana = { banana?: FPBanana };

type FPLion = FPNamedAnimal;

type FPGorilla = FPNamedAnimal & FPCanHoldBanana;

type FPAnimal = FPLion | FPGorilla;

type FPBanana = { color: "green" | "yellow" };

type Maybe<T> = T | undefined;

const makeNamedAnimal = (name: string) => ({ name });

// An animal may hold a banana. I dont care if it's gorilla or not.
function holdABanana(animal: FPAnimal): animal is FPAnimal & FPCanHoldBanana {
  return (animal as any).banana !== undefined;
}

const getBanana = (animal: FPAnimal): Maybe<FPBanana> =>
  holdABanana(animal) ? animal.banana : undefined;

// Only gorillas can pick a banana
function pickABanana(gorilla: FPGorilla, banana: FPBanana): FPGorilla {
  return { ...gorilla, banana };
}

// Any animal holding a banana can eat it
const eatBanana =
  (name: string) =>
  (animal: FPAnimal): FPAnimal => {
    if (animal.name === name && holdABanana(animal)) {
      const { banana, ...animalWithoutBanana } = animal;
      return animalWithoutBanana;
    }
    return animal;
  };

// Do not need to know if the list of animals are in the jungle or in a zoo.
const enterJungle =
  (animal: FPAnimal) =>
  (jungle: FPJungle = []) =>
    [...jungle, animal];

const greenBanana: FPBanana = { color: "green" };

// Do not need to know what kind of animals are in the jungle
const jungleFP = enterJungle(makeNamedAnimal("Lion #1"))(
  enterJungle(pickABanana(makeNamedAnimal("Gorilla #1"), greenBanana))(
    enterJungle(makeNamedAnimal("Gorilla #2"))()
  )
);

console.log(jungleFP.map(getBanana));

console.log(jungleFP.map(eatBanana("Gorilla #1")).map(getBanana));
