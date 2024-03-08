import { useEffect } from "react";
import { useGame } from "../context/context";

export const useHangman = function (containerRef: any) {
   const {
      state: { wordToGuess, tries, tryLimit, guessedWord, status },
      dispatch,
   } = useGame();

   useEffect(() => {
      if (wordToGuess === null) return undefined;

      const isCorrect = wordToGuess.includes(guessedWord);

      let correctGuesses: string[] = [];

      if (tries > tryLimit) {
         dispatch({ type: "setStatus", payload: "lost" });
      } else {
         if (isCorrect) {
            [...containerRef.current.children].forEach((element, index) => {
               const ele = element.firstElementChild.querySelector("span");
               if (ele.dataset.word == guessedWord) {
                  [...containerRef.current.children][
                     index
                  ].firstElementChild.firstElementChild.textContent =
                     guessedWord;
               }
            });
            [...containerRef.current.children].forEach((element) => {
               correctGuesses.push(
                  element.firstElementChild.firstElementChild.textContent
               );
            });

            if (
               wordToGuess
                  .split("")
                  .every((word) => correctGuesses.includes(word))
            )
               dispatch({ type: "setStatus", payload: "win" });
         } else {
            dispatch({ type: "setTries" });
         }
      }
   }, [guessedWord, dispatch]);
};
