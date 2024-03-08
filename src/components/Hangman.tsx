import { Fragment } from "react";
import { useGame } from "../context/context";

function Hangman() {
  const {
    state: { tries },
  } = useGame();
  const Head = <div className="head" />;

  const Body = <div className="body" />;

  const LeftHand = <div className="left-hand" />;

  const RightHand = <div className="right-hand" />;

  const RightLeg = <div className="right-leg" />;

  const LeftLeg = <div className="left-leg" />;

  const bodyParts = [Head, Body, LeftHand, RightHand, RightLeg, LeftLeg];

  return (
    <div className="hangman">
      <div className="pole" />
      <div className="base" />
      <div className="bar" />
      <div className="hang" />
      {bodyParts.splice(0, tries).map((part, index) => (
        <Fragment key={index}>{part}</Fragment>
      ))}
    </div>
  );
}

export default Hangman;
