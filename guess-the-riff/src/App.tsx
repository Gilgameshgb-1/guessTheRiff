import { useState } from "react";
import Header from "./components/Header";
import AudioPlayer from "./components/AudioPlayer";
import GuessBar from "./components/GuessBar";
import SearchBar from "./components/SearchBar";
import RiffControls from "./components/RiffControls";
import Footer from "./components/Footer";
import "./App.css";
import songs from "../public/songs/songs.json";

interface Song {
  id: string;
  title: string;
  description?: string;
  hints: string[];
}

type Guess = {
  text: string;
  isCorrect?: boolean;
  skipped?: boolean;
};

let currentGuessIndex = 0;

const allSongs: Song[] = songs;

function App() {
  const [guesses, setGuesses] = useState<(string | null)[]>([]);
  const [guessHistory, setGuessHistory] = useState<Guess[]>([]);
  const [input, setInput] = useState("");
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [selectedGuessIndex, setSelectedGuessIndex] = useState(currentGuessIndex);
  const [gameOver, setGameOver] = useState(false); //track game over

  const maxGuesses = 5;
  const currentSong = allSongs[0]; //fixed for now, first song is picked, logic might be differently updated

  const currentHint = currentSong?.hints?.[guesses.length]; //Extract hint

  const handleGuessSubmit = (guess: string) => {
    const isCorrect = guess.toLowerCase() === currentSong.title.toLowerCase();
    const nextGuesses = [...guesses, isCorrect ? guess : null];
    setGuesses(nextGuesses);

    const guessText = guess.trim();
    setGuessHistory(prev => [...prev, { text: guessText, isCorrect }]);

    if (isCorrect) {
      alert("✅ Correct!");
      setGameOver(true);
    } else if (nextGuesses.length >= maxGuesses) {
      setGameOver(true);
      alert("❌ Out of guesses!");
    }
    setCurrentGuessIndex(currentGuessIndex + 1);
    setSelectedGuessIndex(currentGuessIndex + 1);

    setInput("");
  };

  const handleSkip = () => {
    if (guesses.length >= maxGuesses) return;

    setGuessHistory(prev => [...prev, { text: "Skipped", skipped: true }]);

    setGuesses([...guesses, null]); // Count this as a guess
    setCurrentGuessIndex(currentGuessIndex + 1);
    setSelectedGuessIndex(currentGuessIndex + 1);
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <AudioPlayer songId={currentSong?.id || ""} hint={currentSong?.hints?.[selectedGuessIndex] ?? ""} currentGuessIndex={currentGuessIndex} gameOver={gameOver} />
        <GuessBar
          currentGuessIndex={guesses.length}
          totalGuesses={guesses.filter((g) => g === null).length}
          maxGuesses={maxGuesses}
          selectedGuessIndex={selectedGuessIndex}
          setSelectedGuessIndex={setSelectedGuessIndex}
          handleSkip={handleSkip}
          guessHistory={guessHistory}
        />
        {!gameOver && (
          <SearchBar
            songList={songs}
            onSubmitGuess={handleGuessSubmit}
          />
        )}
        <RiffControls />
        <Footer />
      </main>
    </div>
  );
}

export default App;
