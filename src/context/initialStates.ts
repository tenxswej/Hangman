export const initialState = {
   wordToGuess: null,
   tries: 0,
   tryLimit: 6,
   status: null,
   guessedWord: "",
};

// Enum values
export type TAction =
   | { type: "setTries" }
   | { type: "addGuessedLetter"; payload: string }
   | { type: "setStatus"; payload: "in-game" | "win" | "lost" }
   | { type: "wordToGuess" }
   | { type: "reset" }
   | { type: "play-again" }
   | { type: "setGuessWord"; payload: string };

export interface IInitialState {
   wordToGuess: null | string;
   tries: number;
   tryLimit: number;
   correctLetters: string[];
   status: string | null;
   guessedWord: string;
}
