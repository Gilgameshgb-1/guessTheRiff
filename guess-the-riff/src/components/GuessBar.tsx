import "./GuessBar.css";
import Skull from "../assets/skull.svg?react";
import Thunder from "../assets/thunder.svg?react";

interface GuessBarProps {
  currentGuessIndex: number;
  totalGuesses: number;
  maxGuesses: number;
  selectedGuessIndex: number;
  setSelectedGuessIndex: (index: number) => void;
  handleSkip: () => void;
  guessHistory: { text: string; isCorrect: boolean; skipped: boolean}[];
}

export default function GuessBar({ currentGuessIndex, totalGuesses, maxGuesses, selectedGuessIndex, setSelectedGuessIndex, handleSkip, guessHistory }: GuessBarProps) {
  const guesses = Array.from({ length: maxGuesses }, (_, i) => i + 1);

  return (
    <div className="guess-bar">
      <div className="guess-icons">
        {guesses.map((guess, index) => (
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
        <button className="skip-button" onClick={handleSkip}>
          SKIP <Thunder className="thunder-icon" />
        </button>
      </div>
      <p className="guess-remaining">
        {maxGuesses - totalGuesses} guesses remaining!
      </p>
      <div className="guess-history">
        {guessHistory.map((guess, index) => (
          <div
            key={index}
            className={`guess-entry ${guess.skipped
                ? "skipped"
                : guess.isCorrect
                  ? "correct"
                  : "incorrect"
              }`}
          >
            {guess.skipped ? "⏭ Skipped" : guess.text}
          </div>
        ))}
      </div>
    </div>
  );
}
