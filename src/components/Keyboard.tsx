import { Fragment, useEffect, useId, useState } from "react";
import { useGame } from "../context/context";

function Keyboard({ containerRef }: any) {
  const id = useId();

  const {
    state: { wordToGuess, status },
    dispatch,
  } = useGame();

  const [key, setKey] = useState("");

  useEffect(() => {
    const keyDown = (e: KeyboardEvent) => {
      if (
        [...Array(26)]
          .map((_, i) => String.fromCharCode(65 + i))
          .includes(e.key.toUpperCase())
      ) {
        dispatch({
          type: "setGuessWord",
          payload: e.key.toLowerCase(),
        });
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
    <section className="keyboard-section">
      <div className="guess-container">
        {wordToGuess}
        <div className="words" ref={containerRef}>
          {wordToGuess !== null
            ? wordToGuess.split("").map((word, index) => (
                <div className="word-container" key={id}>
                  <div className="word">
                    <span data-word={word} key={word}>
                      {index === 0 || index === wordToGuess.split("").length - 1
                        ? word
                        : null}
                    </span>
                  </div>
                  <div className="word-base" />
                </div>
              ))
            : null}
        </div>
      </div>
      <dl className="keyboard">
        {[...Array(26).keys()]
          .map((_, i) => String.fromCharCode(65 + i))
          .map((alphabet, index) => (
            <Fragment key={index}>
              <button
                disabled={status === "finish"}
                onClick={() =>
                  dispatch({
                    type: "setGuessWord",
                    payload: alphabet.toLowerCase(),
                  })
                }
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
          disabled={status === "in-game"}
          className="start-button"
          onClick={() => {
            if (status === "lost" || status === "win") {
              dispatch({ type: "reset" });
              dispatch({ type: "play-again" });
            } else {
              dispatch({ type: "wordToGuess" });
              dispatch({ type: "setStatus", payload: "in-game" });
            }
          }}
        >
          Let's Play
        </button>
      </div>
    </section>
  );
}

export default Keyboard;
