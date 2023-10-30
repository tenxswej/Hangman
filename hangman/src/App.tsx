import "./App.css";
import { Fragment, useState, useEffect } from "react";
import { useGame } from "./context/context";
import { useHangman } from "./hook/useHangman";
import Countdown from "../src/components/countdown";
import Hangman from "./components/hangman";

function App() {
  const [key, setKey] = useState("");
  const [guessedWord, setGuessedWord] = useState("");

  const [isWin, setIsWin] = useHangman(guessedWord);

  const {
    state: { wordToGuess, correctLetters,status },
    dispatch,
  } = useGame();

  useEffect(() => {
    window.focus();
  }, []);

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (
        [...Array(26)]
          .map((_, i) => String.fromCharCode(65 + i))
          .includes(e.key.toUpperCase())
      ) {
        setGuessedWord(e.key);
      }
    };

    window.addEventListener("keydown", keyDown);

    return () => {
      window.removeEventListener("keydown", keyDown);
    };
  }, [dispatch]);

  useEffect(() => {
    function keyup(e: KeyboardEvent) {
      if (
        [...Array(26)]
          .map((_, i) => String.fromCharCode(65 + i))
          .includes(e.key.toUpperCase())
      ) {
        setKey("");
      }
    }
    window.addEventListener("keyup", keyup);

    return () => {
      window.removeEventListener("keyup", keyup);
    };
  }, [dispatch]);

  return (
    <main>
      <h1 className="title">
        {isWin === null
          ? "hangman"
          : isWin === "win" && wordToGuess !== null
          ? `You win! the answer is "${wordToGuess}"`
          : isWin === "lost" && wordToGuess !== null
          ? `You lost! the answer is "${wordToGuess}"`
          : "hangman"}
      </h1>
      <div className="main-container">
        <section className="illustration-section">
          <Hangman />
          <dd className="time">
            <div>
            Time left:
            </div>
            <Countdown setIsWin={setIsWin}/>
          </dd>
        </section>
        <section className="keyboard-section">
          <div className="guess-container">
            <div className="words">
              {wordToGuess !== null
                ? wordToGuess.split("").map((word, index) => (
                    <div className="word-container" key={index}>
                      <div
                        className={
                          index === 0 ||
                          index === wordToGuess.split("").length - 1 ||
                          correctLetters.includes(word)
                            ? "word word-show"
                            : "word"
                        }
                      >
                        <span>{word}</span>
                      </div>
                      <div className="word-base" />
                    </div>
                  ))
                : null}
            </div>
          </div>
          <dl className="keyboard">
            {[...Array(26)]
              .map((_, i) => String.fromCharCode(65 + i))
              .map((alphabet, index) => (
                <Fragment key={index}>
                  <button
                    onClick={() => setGuessedWord(alphabet.toLowerCase())}
                    className={
                      alphabet.toLowerCase() === key ? "key pressed" : "key"
                    }
                  >
                    {alphabet}
                  </button>
                </Fragment>
              ))}
          </dl>
          <div className="start-button-container">
            <button
              disabled={status === "start" || status === "finish"}
              className="start-button"
              onClick={() => dispatch({ type: "wordToGuess" })}
            >
              Start
            </button>
            <button
              disabled={status === null || status === "new" || status === "start"}
              className="start-button"
              onClick={() => {
                dispatch({ type: "reset" })
                setIsWin(null)
              }}
            >
              new game
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
