import { useEffect, useState, useRef } from "react";
import Status from "../src/components/Status";
import "./App.css";
import Keyboard from "./components/Keyboard";
import Hangman from "./components/Hangman";
import { useGame } from "./context/context";
import { useHangman } from "./hook/useHangman";
import Countdown from "./components/countdown";

function App() {
   useEffect(() => {
      window.focus();
   }, []);

   const {
      state: { wordToGuess, tries, tryLimit, correctLetters, guessedWord },
      dispatch,
   } = useGame();

   const containerRef = useRef(null);

   const isWin = useHangman(containerRef);

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
