import { useState, useEffect } from "react";
import { useGame } from "../context/context";

export const useHangman = (guessedWord: string) => {
  const {
    state: { wordToGuess, tries, tryLimit, correctLetters, },
    dispatch,
  } = useGame();

  const [isWin, setIsWin] = useState<null | "win" | "lost">(null);

  useEffect(() => {
    if(wordToGuess === null) return


    if (
      wordToGuess
        .split("")
        .every((e) =>
          [
            ...correctLetters,
            wordToGuess[0],
            wordToGuess[wordToGuess.length - 1],
          ].includes(e)
        )
    ) {
      setIsWin("win");
      dispatch({type : "setStatus", payload : "finish"})
      // setTimeout(() => {
      //     dispatch({type : "reset"})
      //     setIsWin(null)
      // },8000)
    }
    
    if (
      wordToGuess !== null &&
      wordToGuess.split("").includes(guessedWord.toLowerCase())
    ) {
      dispatch({
        type: "addCorrectLetter",
        payload: guessedWord.toLowerCase(),
      });
      
    } else if (wordToGuess !== null && guessedWord !== "") {
      if (tries >= tryLimit) {
        setIsWin("lost");
        dispatch({type : "setStatus", payload : "finish"})
      //   setTimeout(() => {
      //     dispatch({type : "reset"})
      //     setIsWin(null)
      // },8000)
      }
      dispatch({ type: "setTries" });
    }
    
  }, [guessedWord]);

  return [isWin, setIsWin];
};
