// values are replaced by strings
export enum COLORS_WITH_ENUM {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

// COLORS_WITH_CONST_ENUM is transpiled to an object
export const enum COLORS_WITH_CONST_ENUM {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
}

// No use of TypeScript's enum
export const COLORS_WITH_SYMBOLS = Object.freeze({
  RED: Symbol("red"),
  GREEN: Symbol("green"),
  BLUE: Symbol("blue"),
});

const color1 = COLORS_WITH_CONST_ENUM.RED;
const color2 = COLORS_WITH_SYMBOLS.RED;

console.log(color1 === "red"); // True
//console.log(color1 === "bad-color"); // TypeScript error

//console.log(color2 === "red"); // TypeScript error
console.log(color2 === COLORS_WITH_SYMBOLS.RED); // True
