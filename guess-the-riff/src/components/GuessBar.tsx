import { Zap } from "lucide-react";
import "./GuessBar.css";
import Skull from "../assets/skull.svg?react";
import Thunder from "../assets/thunder.svg?react";

interface GuessBarProps {
  currentGuessIndex: number;
  totalGuesses: number;
  maxGuesses: number;
  selectedGuessIndex: number;
  setSelectedGuessIndex: (index: number) => void;
}

export default function GuessBar({ currentGuessIndex, totalGuesses, maxGuesses, selectedGuessIndex, setSelectedGuessIndex}: GuessBarProps) {
  const guesses = Array.from({ length: maxGuesses }, (_, i) => i + 1);

  return (
    <div className="guess-bar">
      <div className="guess-icons">
        {guesses.map((guess, index) => (
          /*           <div
                      key={guess}
                      className={`guess-box ${guess <= currentGuess ? "used" : guess === currentGuess + 1 ? "current" : ""
                        }`}
                    >
                      {guess <= totalGuesses ? <Skull className="skull-icon" /> : guess}
                    </div> */
          <div
            key={guess}
            className={`guess-box ${index < currentGuessIndex ? "used" :
                index === currentGuessIndex ? "current" : ""
              } ${index === selectedGuessIndex ? "selected" : ""}`}
            onClick={() => {
              if (index <= currentGuessIndex) setSelectedGuessIndex(index);
            }}
            style={{ cursor: index <= currentGuessIndex ? "pointer" : "default" }}
          >
            {index < totalGuesses ? <Skull /> : guess}
          </div>
        ))}
        <button className="skip-button">
          SKIP <Thunder className="thunder-icon" />
        </button>
      </div>
      <p className="guess-remaining">
        {maxGuesses - totalGuesses} guesses remaining!
      </p>
    </div>
  );
}
