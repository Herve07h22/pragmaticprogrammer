// Chapter 5 "Bend or break" p140

type States = "look_for_string" | "in_string" | "copy_next_char";

type State = {
  state: States;
  currentString: string;
  allParsedStrings: string[];
};

type Action = (initialState: State, char?: string) => State;

type CharParser = {
  [from in States]: {
    [nextChar in string | "default"]: [States, Action];
  };
};

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

const transitionsAndActions: CharParser = {
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

const dispatch = (fromState: State, char: string) => {
  const [nextState, action] =
    transitionsAndActions[fromState.state][char] ||
    transitionsAndActions[fromState.state]["default"];
  return { ...fromState, ...action(fromState, char), state: nextState };
};

var state: State = {
  state: "look_for_string",
  currentString: "",
  allParsedStrings: [],
};

const text =
  '"hello"  this is not a string "world" this is code; "!" "say /"good bye/"" and nothing else';

for (let char of text) {
  state = dispatch(state, char);
}

console.log("Strings found :");
console.log(state.allParsedStrings.join("\n"));
