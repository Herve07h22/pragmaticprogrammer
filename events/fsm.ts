// Chapter 5 "Bend or break" p140

type StateNames = "look_for_string" | "in_string" | "copy_next_char";

type State = {
  name: StateNames;
  currentString: string;
  allParsedStrings: string[];
};

type Action = (initialState: State, char?: string) => State;

type CharParser = {
  [from in StateNames]: {
    [nextChar in string | "default"]: [StateNames, Action];
  };
};

// Actions
const ignore = (state: State) => state;
const startNewString = (state: State) => ({ ...state, currentString: "" });
const addChar = (state: State, char?: string) => ({
  ...state,
  currentString: state.currentString + (char || ""),
});
const finishString = (state: State) => ({
  ...state,
  allParsedStrings: state.allParsedStrings.concat(state.currentString),
});

// Core function of the machine
const dispatch = (parser: CharParser) => (fromState: State, char: string) => {
  const [nextStateName, action] =
    parser[fromState.name][char] || parser[fromState.name]["default"];
  return { ...fromState, ...action(fromState, char), name: nextStateName };
};

// Finite state machine description
const stringParserInDoubleQuote: CharParser = {
  look_for_string: {
    '"': ["in_string", startNewString],
    default: ["look_for_string", ignore],
  },
  in_string: {
    '"': ["look_for_string", finishString],
    "/": ["copy_next_char", ignore],
    default: ["in_string", addChar],
  },
  copy_next_char: {
    default: ["in_string", addChar],
  },
};

const initialState: State = {
  name: "look_for_string",
  currentString: "",
  allParsedStrings: [],
};

// Run it
var state = initialState;
const transition = dispatch(stringParserInDoubleQuote);

const text =
  '"hello"  this is not a string "world" this is code; "!" "say /"good bye/"" and nothing else';

for (let char of text) {
  state = transition(state, char);
}

console.log("Strings found :");
console.log(state.allParsedStrings.join("\n"));
