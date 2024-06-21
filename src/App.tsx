import "./App.css";
import { useEffect, useRef } from "react";
import Status from "../src/components/Status";
import Countdown from "./components/Countdown";
import Hangman from "./components/Hangman";
import Keyboard from "./components/Keyboard";
import { useGame } from "./context/context";
import { useHangman } from "./hook/useHangman";

function App() {
  useEffect(() => {
    window.focus();
  }, []);

  const {
    state: { wordToGuess },
  } = useGame();

  const containerRef = useRef(null);

  useHangman(containerRef);

  return (
    <main>
      <nav className="nav-bar">
        <img src="Hangman.png" alt="logo" className="logo" title="logo" />
      </nav>
      <Status wordToGuess={wordToGuess} />
      <div className="main-container">
        <section className="illustration-section">
          <Hangman />
          <dd className="time">
            <div>Time left:</div>
            <Countdown />
          </dd>
        </section>
        <Keyboard containerRef={containerRef} />
      </div>
    </main>
  );
}

export default App;
