import words from "../../src/wordList.json";
import { IInitialState, TAction } from "./initialStates";
export const gameReducer = (state: IInitialState, action: TAction) => {
   switch (action.type) {
      case "setGuessWord":
         return { ...state, guessedWord: action.payload };
      case "wordToGuess":
         return {
            ...state,
            wordToGuess: words[Math.floor(Math.random() * words.length)],
         };
      case "setTries":
         return { ...state, tries: state.tries + 1 };
      case "setStatus":
         return { ...state, status: action.payload };
      case "reset":
         return {
            ...state,
            wordToGuess: null,
            status: null,
            tries: 0,
            guessedWord: "",
         };
      case "play-again":
         return {
            ...state,
            wordToGuess: words[Math.floor(Math.random() * words.length)],
            status: "in-game",
            tries: 0,
            guessedWord: "",
         };
   }
};
