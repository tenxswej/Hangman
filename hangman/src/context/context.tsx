import { createContext, useReducer, Dispatch, useContext } from "react";
import words from "../../src/wordList.json";

const initialState = {
  wordToGuess: null,
  tries: 0,
  tryLimit: 6,
  guessedLetters: [],
  correctLetters: [],
  isCorrect: false,
  status : null
};

// Enum values
type TAction =
  | { type: "setTries" }
  | { type: "addGuessedLetter"; payload: string }
  | { type: "setStatus"; payload: "in-game" | "new" | "finish" }
  | { type: "addCorrectLetter"; payload: string }
  | { type: "wordToGuess" }
  | { type: "reset" };

interface IContext {
  state: IInitialState;
  dispatch: Dispatch<TAction>;
}

interface IInitialState {
  wordToGuess: null | string;
  tries: number;
  tryLimit: number;
  correctLetters: string[];
  guessedLetters: string[];
  isCorrect: boolean | null;
  status : string | null
}

export const GameContext = createContext<IContext>({
  state: initialState,
  dispatch: () => null,
});

interface IChildren {
  children: React.ReactNode;
}

export const GameContextProvider = ({ children }: IChildren) => {
  const reducer = (state: IInitialState, action: TAction) => {
    switch (action.type) {
      case "wordToGuess":
        return {
          ...state,
          status : "start",
          wordToGuess: words[Math.floor(Math.random() * words.length)],
        };
      //  This will not work
      // case "checkLetter": {
      //   // https://stackoverflow.com/questions/36730793/can-i-dispatch-an-action-in-reducer
      //   const letter = action.payload;
      //   if (state.wordToGuess !== null) {
      //     if (state.wordToGuess.split("").includes(letter.toLowerCase())) {
      //       return { ...state, isCorrect: true };
      //     } else {
      //       return { ...state, isCorrect: false };
      //     }
      //   } else {
      //     return { ...state, isCorrect: false };
      //   }
      // }
      case "addGuessedLetter":
        return {
          ...state,
          correctLetters: [...state.guessedLetters, action.payload],
        };
      case "addCorrectLetter":
        return {
          ...state,
          correctLetters: [...state.correctLetters, action.payload],
        };
      case "setTries":
        return { ...state, tries: state.tries + 1 };
      case "setStatus":
        return { ...state, status: action.payload };
      case "reset":
        return { ...state, correctLetters : [], wordToGuess : null,status : "new", tries : 0  };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => useContext(GameContext);
